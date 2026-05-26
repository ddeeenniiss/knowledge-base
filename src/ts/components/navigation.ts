/// <reference types="vite/client" />
import { marked } from "marked";

async function loadMD(path: string) {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}${path}`);
    if (!res.ok) throw new Error("Datei nicht gefunden");

    const text: string = await res.text();
    const container = document.querySelector(".content");
    if (!container) return;

    if (path.endsWith(".html")) {
      container.innerHTML = text;
    } else {
      // marke.parse kann je nach Version ein Promise<string> zurückgeben
      const html = await marked.parse(text);
      container.innerHTML = html;
    }
  } catch (err) {
    const container = document.querySelector(".content");
    if (container) {
      container.innerHTML =
        "<p style='color:red;'>Fehler: " + (err instanceof Error ? err.message : err) + "</p>";
    }
  }
}

type Structure = string | Record<string, any>;

async function buildNav() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}structure.json`);
    if (!res.ok) throw new Error("structure.json nicht gefunden");

    const data: Record<string, Structure> = await res.json();
    const nav = document.querySelector("nav ul");
    if (!(nav instanceof HTMLElement)) return;

    addItems(data, nav);
  } catch (err) {
    console.error("Fehler beim Laden der Navigation:", err);
    const container = document.querySelector(".content");
    if (container) {
      container.innerHTML =
        "<p style='color:red;'>Navigation konnte nicht geladen werden.</p>";
    }
  }
}

function addItems(obj: Record<string, Structure>, parent: HTMLElement) {
  for (const key in obj) {
    const li = document.createElement("li");

    if (typeof obj[key] === "string") {
      const a = document.createElement("a");
      a.textContent = key;
      a.href = "#";
      a.onclick = async (e) => {
        e.preventDefault();
        await loadMD(obj[key] as string);
      };
      li.appendChild(a);
    } else {
      const folder = document.createElement("span");
      folder.textContent = key;
      folder.style.fontWeight = "bold";
      li.appendChild(folder);

      const subUl = document.createElement("ul");
      subUl.style.paddingLeft = "15px";
      addItems(obj[key] as Record<string, Structure>, subUl);
      li.appendChild(subUl);
    }

    parent.appendChild(li);
  }
}

// Navigate from search results
document.addEventListener('search:navigate', async (e: Event) => {
  const { path, id, text, type } = (e as CustomEvent).detail as {
    path: string;
    id?: string;
    text: string;
    type: string;
  };
  await loadMD(path);

  requestAnimationFrame(() => {
    const container = document.querySelector('.content');
    if (!container) return;

    // 1. Try by id attribute
    if (id) {
      const byId = document.getElementById(id);
      if (byId) { byId.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }

    // 2. Match heading by text content (headings without ids)
    if (type === 'h1' || type === 'h2' || type === 'h3') {
      const headings = container.querySelectorAll<HTMLElement>('h1, h2, h3');
      for (const h of headings) {
        if (h.textContent?.trim().replace(/\s+/g, ' ') === text) {
          h.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
    }
  });
});

// Navigation direkt beim Laden bauen
buildNav();
