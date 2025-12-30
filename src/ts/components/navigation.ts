/// <reference types="vite/client" />
import { marked } from "marked";

async function loadMD(path: string) {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}${path}`);
    if (!res.ok) throw new Error("Datei nicht gefunden");

    const text = await res.text();
    
    if (path.endsWith('.html')) {
      document.querySelector(".content")!.innerHTML = text;
    } else {
      document.querySelector(".content")!.innerHTML = marked.parse(text);
    }
  } catch (err) {
    document.querySelector(".content")!.innerHTML =
      "<p style='color:red;'>Fehler: " + err + "</p>";
  }
}

async function buildNav() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}structure.json`);
    if (!res.ok) throw new Error("structure.json nicht gefunden");

    const data = await res.json();
    const nav = document.querySelector("nav ul");

    if (!(nav instanceof HTMLElement)) return;

    addItems(data, nav);
  } catch (err) {
    console.error("Fehler beim Laden der Navigation:", err);
    document.querySelector(".content")!.innerHTML =
      "<p style='color:red;'>Navigation konnte nicht geladen werden.</p>";
  }
}

function addItems(obj: any, parent: HTMLElement) {
  for (const key in obj) {
    const li = document.createElement("li");

    if (typeof obj[key] === "string") {
      const a = document.createElement("a");
      a.textContent = key;
      a.href = "#";
      a.onclick = (e) => {
        e.preventDefault();
        loadMD(obj[key]);
      };
      li.appendChild(a);
    } else {
      const folder = document.createElement("span");
      folder.textContent = key;
      folder.style.fontWeight = "bold";
      li.appendChild(folder);

      const subUl = document.createElement("ul");
      subUl.style.paddingLeft = "15px";
      addItems(obj[key], subUl);
      li.appendChild(subUl);
    }

    parent.appendChild(li);
  }
}

buildNav();