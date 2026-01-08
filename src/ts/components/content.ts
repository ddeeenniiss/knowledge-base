/// <reference types="vite/client" />

// -------------------------------
// Einfache Markdown-zu-HTML-Funktion
// -------------------------------
function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}

// -------------------------------
// Navigation laden
// -------------------------------
async function loadNavigation() {
  try {
    const base = import.meta.env.BASE_URL || '/';
    const response = await fetch(base + "structure.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const structure = await response.json();
    const nav = document.getElementById("navigation");
    if (!nav) return;

    nav.innerHTML = buildNavHTML(structure);

    nav.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        e.preventDefault();
        const path = target.getAttribute("href");
        if (path) {
          await loadContent(path);
        }
      }
    });
  } catch (error) {
    console.error("Fehler beim Laden der Navigation:", error);
  }
}

// -------------------------------
// Content laden
// -------------------------------
async function loadContent(path: string) {
  const content = document.getElementById("content");
  if (!content) return;

  try {
    // Basis-Pfad dynamisch ermitteln
    const base = import.meta.env.BASE_URL || '/';
    const url = base + path;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    content.innerHTML = path.endsWith(".md") ? parseMarkdown(text) : text;
  } catch (error) {
    console.error("Fehler beim Laden des Contents:", error);
    content.innerHTML = "<p>Inhalt konnte nicht geladen werden.</p>";
  }
}

// -------------------------------
// Navigation HTML bauen
// -------------------------------
function buildNavHTML(structure: any[]): string {
  return `
    <ul>
      ${structure
        .map(
          (item) =>
            `<li><a href="${item.path}">${item.title}</a></li>`
        )
        .join("")}
    </ul>
  `;
}

// -------------------------------
// Initialisierung
// -------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const base = import.meta.env.BASE_URL || '/';
  await loadNavigation();
  await loadContent(base + "frontend/css/css.html"); // Startseite dynamisch
});

