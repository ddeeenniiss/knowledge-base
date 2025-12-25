// Import als roher Text
import cssHtml from '../../frontend/css/css.html?raw';
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = cssHtml; // HTML aus der Datei einfügen
    }
});

// Einfache Markdown-zu-HTML-Funktion (ohne externe Lib)
function parseMarkdown(md: string): string {
    // Grundlegende Konvertierungen; erweitere bei Bedarf
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

// Navigation und Content laden
async function loadNavigation() {
    try {
        const response = await fetch('/structure.json');
        const structure = await response.json();

        const nav = document.getElementById('navigation');
        if (!nav) return;

        nav.innerHTML = buildNavHTML(structure);

        nav.addEventListener('click', async (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
                e.preventDefault();
                const path = target.getAttribute('href');
                if (path) await loadContent(path);
            }
        });
    } catch (error) {
        console.error('Fehler beim Laden der Navigation:', error);
    }
}

async function loadContent(path: string) {
    const content = document.getElementById('content');
    if (!content) return;

    if (path === './frontend/css/css.html') {
        // Direkt importierte Datei benutzen
        content.innerHTML = cssHtml;
        return;
    }

    try {
        const response = await fetch(path);
        const text = await response.text();
        content.innerHTML = path.endsWith('.md') ? parseMarkdown(text) : text;
    } catch (error) {
        console.error('Fehler beim Laden des Contents:', error);
    }
}

function buildNavHTML(structure: any): string {
    return `<ul>${structure.map((item: any) => `<li><a href="${item.path}">${item.title}</a></li>`).join('')}</ul>`;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadNavigation();
    await loadContent('../frontend/css/css.php');
});