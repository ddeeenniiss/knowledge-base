/// <reference types="vite/client" />
import { marked } from "marked";

async function loadMD(path: string) {
  try {
    const res = await fetch(path); // await fetch
    if (!res.ok) throw new Error("Datei nicht gefunden");
    const text = await res.text(); // await hier! -> text ist jetzt string
    const content = document.querySelector(".content");
  } catch (err) {
    document.querySelector(".content")!.innerHTML =
      "<p style='color:red;'>Fehler: " + err + "</p>";
  }
}

async function buildNav() {
  const res = await fetch(`${import.meta.env.BASE_URL}structure.json`);
  const data = await res.json();
  const nav = document.querySelector("nav ul") as HTMLElement;
  addItems(data, nav);

  function addItems(obj: any, parent: HTMLElement) {
    for (const key in obj) {
      const li = document.createElement("li");

      if (typeof obj[key] === "string") {
        const a = document.createElement("a");
        a.textContent = key;
        a.onclick = () => loadMD(obj[key]);
        li.appendChild(a);
      } else {
        const folder = document.createElement("span");
        folder.textContent = key;
        li.appendChild(folder);

        const subUl = document.createElement("ul");
        subUl.style.paddingLeft = "15px";
        addItems(obj[key], subUl);
        li.appendChild(subUl);
      }

      parent.appendChild(li);
    }
  }

  addItems(data, nav);
}

buildNav();
