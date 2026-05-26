/// <reference types="vite/client" />

type HeadingType = 'h1' | 'h2' | 'h3';
type EntryType = HeadingType | 'p';

interface SearchEntry {
  text: string;
  type: EntryType;
  path: string;
  pageTitle: string;
  id?: string;
}

interface SearchResult {
  entry: SearchEntry;
  score: number;
  highlight: string;
}

type NodeValue = string | NodeMap;
interface NodeMap extends Record<string, NodeValue> {}

const WEIGHTS: Record<EntryType, number> = { h1: 100, h2: 60, h3: 30, p: 5 };

let searchIndex: SearchEntry[] = [];
let indexReady = false;
let indexBuilding = false;

function flattenPages(
  obj: NodeMap,
  acc: Map<string, string> = new Map()
): Map<string, string> {
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'string') {
      acc.set(val, key);
    } else {
      flattenPages(val, acc);
    }
  }
  return acc;
}

async function buildIndex(): Promise<void> {
  if (indexReady || indexBuilding) return;
  indexBuilding = true;

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}structure.json`);
    if (!res.ok) return;
    const data: NodeMap = await res.json();
    const pages = flattenPages(data);

    const fetches = [...pages.entries()].map(async ([path, pageTitle]) => {
      try {
        const r = await fetch(`${import.meta.env.BASE_URL}${path}`);
        if (!r.ok) return;
        const html = await r.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const entries: SearchEntry[] = [];

        doc.querySelectorAll<HTMLElement>('h1, h2, h3').forEach((el) => {
          const text = el.textContent?.trim().replace(/\s+/g, ' ') ?? '';
          if (!text) return;
          entries.push({
            text,
            type: el.tagName.toLowerCase() as HeadingType,
            path,
            pageTitle,
            id: el.id || undefined,
          });
        });

        doc.querySelectorAll<HTMLElement>('p, li').forEach((el) => {
          const text = el.textContent?.trim().replace(/\s+/g, ' ') ?? '';
          if (text.length < 8) return;
          entries.push({ text: text.slice(0, 180), type: 'p', path, pageTitle });
        });

        searchIndex.push(...entries);
      } catch {
        // page not reachable — skip silently
      }
    });

    await Promise.all(fetches);
    indexReady = true;
  } catch {
    /* structure.json failed */
  } finally {
    indexBuilding = false;
  }
}

function highlight(text: string, terms: string[]): string {
  let out = text;
  for (const term of terms) {
    const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    out = out.replace(re, '<mark>$1</mark>');
  }
  return out;
}

function runSearch(query: string): SearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const entry of searchIndex) {
    const lower = entry.text.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (!lower.includes(term)) continue;
      const base = WEIGHTS[entry.type];
      score += base;
      if (lower === term) score += base;
      if (lower.startsWith(term)) score += base * 0.5;
    }

    if (score === 0) continue;

    // deduplicate identical texts within the same page
    const key = `${entry.path}::${entry.text}`;
    if (seen.has(key)) continue;
    seen.add(key);

    results.push({ entry, score, highlight: highlight(entry.text, terms) });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 14);
}

// ─── DOM ────────────────────────────────────────────────────────────────────

function getTypeLabel(type: EntryType): string {
  if (type === 'h1') return 'H1';
  if (type === 'h2') return 'H2';
  if (type === 'h3') return 'H3';
  return '';
}

function renderResults(results: SearchResult[], list: HTMLElement): void {
  list.innerHTML = '';

  if (!results.length) {
    list.innerHTML = '<li class="search-results__empty">Keine Ergebnisse</li>';
    list.classList.add('search-results--visible');
    return;
  }

  results.forEach(({ entry, highlight: hl }, i) => {
    const li = document.createElement('li');
    li.className = `search-results__item search-results__item--${entry.type}`;
    if (i === 0) li.classList.add('search-results__item--active');

    const label = getTypeLabel(entry.type);
    li.innerHTML = `
      ${label ? `<span class="search-results__badge search-results__badge--${entry.type}">${label}</span>` : ''}
      <span class="search-results__text">${hl}</span>
      <span class="search-results__page">${entry.pageTitle}</span>
    `;

    li.addEventListener('mousedown', (e) => {
      e.preventDefault();
      navigateTo(entry);
    });

    list.appendChild(li);
  });

  list.classList.add('search-results--visible');
}

function navigateTo(entry: SearchEntry): void {
  // Fire a custom event that navigation.ts already handles via loadMD
  const event = new CustomEvent('search:navigate', { detail: entry });
  document.dispatchEvent(event);
  closeResults();
}

function closeResults(): void {
  const list = document.getElementById('search-results');
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  if (list) list.classList.remove('search-results--visible');
  if (input) input.value = '';
}

export function initSearch(): void {
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  const list = document.getElementById('search-results');

  if (!input || !list) return;

  input.addEventListener('focus', () => {
    buildIndex();
  });

  let debounce: ReturnType<typeof setTimeout>;

  input.addEventListener('input', () => {
    clearTimeout(debounce);
    const query = input.value.trim();

    if (!query) {
      list.classList.remove('search-results--visible');
      return;
    }

    debounce = setTimeout(async () => {
      if (!indexReady) await buildIndex();
      renderResults(runSearch(query), list);
    }, 180);
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    const items = list.querySelectorAll<HTMLElement>('.search-results__item');
    const active = list.querySelector<HTMLElement>('.search-results__item--active');
    let idx = [...items].indexOf(active!);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active?.classList.remove('search-results__item--active');
      items[(idx + 1) % items.length]?.classList.add('search-results__item--active');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active?.classList.remove('search-results__item--active');
      items[(idx - 1 + items.length) % items.length]?.classList.add('search-results__item--active');
    } else if (e.key === 'Enter') {
      const current = list.querySelector<HTMLElement>('.search-results__item--active');
      current?.dispatchEvent(new MouseEvent('mousedown'));
    } else if (e.key === 'Escape') {
      closeResults();
    }
  });

  // Close on outside click
  const wrapper = document.getElementById('search-wrapper');
  document.addEventListener('click', (e) => {
    if (!wrapper?.contains(e.target as Node)) {
      list.classList.remove('search-results--visible');
    }
  });
}
