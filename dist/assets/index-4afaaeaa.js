(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();document.querySelectorAll(".box").forEach(n=>{let e=!1;n.addEventListener("mouseenter",r=>{if(console.log("mouseenter triggered",r.target,"isAnimating:",e),e)return;e=!0,console.log("Animation startet jetzt"),n.classList.add("animate-hover");const i=()=>{console.log("Animation beendet"),n.classList.remove("animate-hover"),e=!1,n.removeEventListener("animationend",i)};n.addEventListener("animationend",i)}),n.addEventListener("mousemove",r=>{console.log("mousemove innerhalb Box",r.target)}),n.addEventListener("mouseleave",r=>{console.log("mouseleave triggered",r.target)})});const l=`<h3>box-sizing: border-box;</h3>
  <p>Content + Padding + Border sind gemeinsam die width</p>
<h3>content-box:</h3> 
  <p>Nur Inhalt ist width, padding und border zählen exklusiv zusätzlich</p>

<h2>Animations:</h2>

<!-- Beispiel RotateX mit Hover-Effekt -->
<h3>transform: rotateX(0deg)</h3><p> rotiert0 Grad entlang der x-Achse rotateX(0deg)</p>
<div class="card-container">
  <div class="card animate__rotateX">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>.animate__rotateX {
  .box {
    transform: rotateX(0deg);
    &:hover {
      transform: rotateX(360deg);
      transition: transform 2s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>

<!-- Beispiel RotateY mit Hover-Effekt -->
<h3>transform: rotateY(0deg)</h3><p> rotiert0 Grad entlang der x-Achse rotateY(0deg)</p>
<div class="card-container">
  <div class="card animate__rotateY">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__rotateY {
  .box {
    transform: rotateY(0deg);

    &:hover {
      transform: rotateY(360deg);
      transition: transform 2s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>

<!-- Beispiel RotateZ mit Hover-Effekt -->
<h3>transform: rotateZ(0deg)</h3><p> rotiert0 Grad entlang der x-Achse rotateZ(0deg). -360deg gegen den Uhrzeiger</p>
<div class="card-container">
  <div class="card animate__rotateZ">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__rotateZ {
  .box {
    transform: rotateZ(0deg);

    &:hover {
      transform: rotateZ(360deg);
      transition: transform 2s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>

<!-- Beispiel Scale mit Hover-Effekt -->
<h3>transform: scale(factor)</h3><p> skaliert Box um einen Faktor. Die Achsen können auch 
  einzeln angegeben werden scaleX(factor), scaleY(factor). Zusammen einfach scale(factorX, factorY).
  Ebenso ist die Spiegelung möglich mit negativen Werten scaleX(-1).
</p>
<div class="card-container">
  <div class="card animate__scale">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__scale {
  .box {
    transform: scale(1);

    &:hover {
      transform: scale(1.5);
      transition: transform 2s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>


  <!-- Bereich, um CSS zu zeigen -->
  <pre class="css-output" style="display: none"></pre>
</div>

<p>
Wichtig: Es muss immer einen Änderungszustand geben, bsp hover, click!
transition: property duration timing-function delay;
property: zB transform, all
duration: wie lange dauert die Transition, zB 2s
timing-function: linear konstante Geschwindigkeit cubic-bezier(0, 0, 1, 1) ease
(default) langsam → schnell → langsam cubic-bezier(0.25, 0.1, 0.25, 1) ease-in startet langsam ease-in = 
cubic-bezier(0.42, 0, 1, 1) ease-out endet langsam ease-out = cubic-bezier(0, 0, 0.58, 1) ease-in-out langsam rein und raus = ease-in-out =
cubic-bezier(0.42, 0, 0.58, 1) step-start sofortiger Sprung step-end Sprung am Ende: Für hover empfohlen: cubic-bezier(0.4, 0, 0.2, 1)
cubic-bezier: (x1, y1, x2, y2) 
Eine Timing-Function beschreibt nicht die Bewegung im Raum, sondern: Wie schnell der Fortschritt
der Animation über die Zeit passiert x-Achse → Zeit (0 → 1) y-Achse → Fortschritt der Animation (0 → 1) Startpunkt ist immer
(0,0) Endpunkt ist immer (1,1) Beispiel: cubic-bezier(0.25, 0.1, 0.25, 1) x1 = 0.25 bedeutet sehr früher Einfluss der
Geschwindigkeit</p>
<img
  width="287"
  height="301"
  alt="image"
  src="https://github.com/user-attachments/assets/f5f246d0-f14e-4a64-b8fb-218176019287"
/>
<h4>Wie lässt sich der Effekt direkt beim neuladen einer Seite animieren?</h4>
<div class="card">#myDiv { transform:
rotateZ(0deg); animation: flip 3s ease infinite; } @keyframes
flip { to { transform: rotateZ(360deg); } }</div>

<!-- Beispiel Translate mit Hover-Effekt -->
<h3>transform: translate(x, y)</h3><p> verschiebt Box in x, y Achse.
</p>
<div class="card-container">
  <div class="card animate__translate">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__translate {
  .box {
    transform: translate(0px, 0px);

    &:hover {
      transform: translate(20px, 25px);
      transition: transform 1s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>

<!-- Beispiel Skew mit Hover-Effekt -->
<h3>transform: skew(xdeg, ydeg)</h3><p> verschiebt Box in x, y Winkel.
</p>
<div class="card-container">
  <div class="card animate__skew">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__skew {
  .box {
    transform: skew(0deg, 0deg);

    &:hover {
      transform: skew(20deg, 25deg);
      transition: transform 1s ease-out;
    }
  }
}
</code></pre>
  </div>
</div>

<!-- Beispiel Filter Blur mit Hover-Effekt -->
<h3>filter: blur(px)</h3><p> macht Element unscharf. Bereits kleine Werte bis 10px sind ausreichend.
</p>

<!-- Beispiel Filter Brightness mit Hover-Effekt -->
<h3>filter: brightness()</h3><p> verändert Helligkeit des Elements. 0% = schwarz, 100% = Original, >100% = heller.
</p>

<!-- Beispiel Filter Grayscale mit Hover-Effekt -->
<h3>filter: grayscale()</h3><p> macht Element in Graustufen. 100% = vollständig grau, 0% = Originalfarbe.
</p>

<!-- Flexbox Erklärung -->
<h3>display: flex</h3><p> macht Container zu flexiblen Boxen. Elemente darin können flexibel angeordnet werden.
</p><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">Link zur Flexbox Dokumentation</a>`;document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("content");n&&(n.innerHTML=l)});function u(n){return n.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/```([\s\S]*?)```/gim,"<pre><code>$1</code></pre>").replace(/`([^`]+)`/gim,"<code>$1</code>").replace(/\n/g,"<br>")}async function p(){try{const e=await(await fetch("/structure.json")).json(),r=document.getElementById("navigation");if(!r)return;r.innerHTML=f(e),r.addEventListener("click",async i=>{const t=i.target;if(t.tagName==="A"){i.preventDefault();const a=t.getAttribute("href");a&&await m(a)}})}catch(n){console.error("Fehler beim Laden der Navigation:",n)}}async function m(n){const e=document.getElementById("content");if(e){if(n==="./frontend/css/css.html"){e.innerHTML=l;return}try{const i=await(await fetch(n)).text();e.innerHTML=n.endsWith(".md")?u(i):i}catch(r){console.error("Fehler beim Laden des Contents:",r)}}}function f(n){return`<ul>${n.map(e=>`<li><a href="${e.path}">${e.title}</a></li>`).join("")}</ul>`}document.addEventListener("DOMContentLoaded",async()=>{await p(),await m("../frontend/css/css.php")});document.addEventListener("click",n=>{var r;const e=n.target;if(e.classList.contains("copy-btn")){const i=e.closest(".card"),t=i==null?void 0:i.querySelector("pre code");if(!t)return;const a=(r=t.textContent)==null?void 0:r.trim();if(!a)return;navigator.clipboard.writeText(a).then(()=>{e.textContent="Copied!",setTimeout(()=>{e.textContent="Copy"},1200)})}});async function h(n){try{const e=await fetch(n);if(!e.ok)throw new Error("Datei nicht gefunden");const r=await e.text(),i=document.querySelector(".content")}catch(e){document.querySelector(".content").innerHTML="<p style='color:red;'>Fehler: "+e+"</p>"}}async function g(){const e=await(await fetch("/knowledge-base/structure.json")).json(),r=document.querySelector("nav ul");i(e,r);function i(t,a){for(const s in t){const c=document.createElement("li");if(typeof t[s]=="string"){const o=document.createElement("a");o.textContent=s,o.onclick=()=>h(t[s]),c.appendChild(o)}else{const o=document.createElement("span");o.textContent=s,c.appendChild(o);const d=document.createElement("ul");d.style.paddingLeft="15px",i(t[s],d),c.appendChild(d)}a.appendChild(c)}}i(e,r)}g();
