(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();document.querySelectorAll(".box").forEach(n=>{let e=!1;n.addEventListener("mouseenter",r=>{if(console.log("mouseenter triggered",r.target,"isAnimating:",e),e)return;e=!0,console.log("Animation startet jetzt"),n.classList.add("animate-hover");const o=()=>{console.log("Animation beendet"),n.classList.remove("animate-hover"),e=!1,n.removeEventListener("animationend",o)};n.addEventListener("animationend",o)}),n.addEventListener("mousemove",r=>{console.log("mousemove innerhalb Box",r.target)}),n.addEventListener("mouseleave",r=>{console.log("mouseleave triggered",r.target)})});const s=`<div class="card">
  box-sizing: border-box; //Inhalt + Padding + Border sind gemeinsam die width
  content-box: // Nur Inhalt ist width, padding und border exclusive
</div>
<h2>Animations:</h2>

<!-- Beispiel RotateX mit Hover-Effekt -->
<h3>transform: rotateX(0deg)</h3><p> rotiert0 Grad entlang der x-Achse rotateX(0deg)</p>
<div class="card-container">
  <div class="card animate__rotateX">
    <div class="box">HOVER ME</div>
  </div>
  <div class="card">
    <button class="copy-btn">Copy</button>
    <pre><code>
  .animate__rotateX {
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

<div
  class="example-section"
  style="
    .demo-card-container {
      margin-top: 10px;
    }

    .demo-card {
      width: 150px;
      height: 150px;
      background-color: coral;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 5px;
    }

    .demo-card:hover {
      transform: scale(1.2);
    }

    .show-css-btn {
      margin-top: 5px;
      cursor: pointer;
    }

    .css-output {
      background: #f0f0f0;
      padding: 10px;
      margin-top: 5px;
      overflow-x: auto;
    }
  "
>
  <!-- Erklärung -->
  <div class="info">
    <h3>Hover Animation</h3>
    <p>Wenn man über die Card hovert, skaliert sie leicht.</p>
  </div>

  <!-- Live-Demo Card -->
  <div class="demo-card-container">
    <div class="demo-card">Hover mich</div>

    <!-- Button zum CSS anzeigen -->
    <button
      class="show-css-btn"
      data-css=" 
.demo-card {
  width: 150px;
  height: 150px;
  background-color: coral;
  transition: transform 0.3s ease;
}
.demo-card:hover {
  transform: scale(1.2);
}"
    >
      CSS anzeigen & kopieren
    </button>
  </div>

  <!-- Bereich, um CSS zu zeigen -->
  <pre class="css-output" style="display: none"></pre>
</div>

<script>
  document.querySelectorAll(".show-css-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pre = btn.nextElementSibling;
      pre.style.display = "block";
      pre.textContent = btn.dataset.css.trim();

      // Code automatisch kopieren
      navigator.clipboard.writeText(btn.dataset.css.trim()).then(() => {
        btn.textContent = "CSS kopiert!";
        setTimeout(() => (btn.textContent = "CSS anzeigen & kopieren"), 1500);
      });
    });
  });
<\/script>
Wichtig: Es muss immer einen Änderungszustand geben, bsp hover, click
transition:
<property>
  <duration>
    <timing-function>
      <delay
        >;
        <property
          >: zB transform, all
          <duration
            >: wie lange dauert die Transition, zB 2s
            <timing-function
              >: linear konstante Geschwindigkeit cubic-bezier(0, 0, 1, 1) ease
              (default) langsam → schnell → langsam cubic-bezier(0.25, 0.1,
              0.25, 1) ease-in startet langsam ease-in = cubic-bezier(0.42, 0,
              1, 1) ease-out endet langsam ease-out = cubic-bezier(0, 0, 0.58,
              1) ease-in-out langsam rein und raus = ease-in-out =
              cubic-bezier(0.42, 0, 0.58, 1) step-start sofortiger Sprung
              step-end Sprung am Ende
              <delay
                >: Für hover empfohlen: cubic-bezier(0.4, 0, 0.2, 1)
                cubic-bezier: (x1, y1, x2, y2) Eine Timing-Function beschreibt
                nicht die Bewegung im Raum, sondern: Wie schnell der Fortschritt
                der Animation über die Zeit passiert x-Achse → Zeit (0 → 1)
                y-Achse → Fortschritt der Animation (0 → 1) Startpunkt ist immer
                (0,0) Endpunkt ist immer (1,1) Beispiel: cubic-bezier(0.25, 0.1,
                0.25, 1) x1 = 0.25 bedeutet sehr früher Einfluss der
                Geschwindigkeit
                <img
                  width="287"
                  height="301"
                  alt="image"
                  src="https://github.com/user-attachments/assets/f5f246d0-f14e-4a64-b8fb-218176019287"
                />

                Animieren bei Seite neu laden: #myDiv { transform:
                rotateZ(0deg); animation: flip 3s ease infinite; } @keyframes
                flip { to { transform: rotateZ(360deg); } }</delay
              ></timing-function
            ></duration
          ></property
        ></delay
      ></timing-function
    ></duration
  ></property
>
`;document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("content");n&&(n.innerHTML=s)});function d(n){return n.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/```([\s\S]*?)```/gim,"<pre><code>$1</code></pre>").replace(/`([^`]+)`/gim,"<code>$1</code>").replace(/\n/g,"<br>")}async function l(){try{const e=await(await fetch("/structure.json")).json(),r=document.getElementById("navigation");if(!r)return;r.innerHTML=m(e),r.addEventListener("click",async o=>{const t=o.target;if(t.tagName==="A"){o.preventDefault();const i=t.getAttribute("href");i&&await c(i)}})}catch(n){console.error("Fehler beim Laden der Navigation:",n)}}async function c(n){const e=document.getElementById("content");if(e){if(n==="./frontend/css/css.html"){e.innerHTML=s;return}try{const o=await(await fetch(n)).text();e.innerHTML=n.endsWith(".md")?d(o):o}catch(r){console.error("Fehler beim Laden des Contents:",r)}}}function m(n){return`<ul>${n.map(e=>`<li><a href="${e.path}">${e.title}</a></li>`).join("")}</ul>`}document.addEventListener("DOMContentLoaded",async()=>{await l(),await c("../frontend/css/css.php")});document.addEventListener("click",n=>{var r;const e=n.target;if(e.classList.contains("copy-btn")){const o=e.closest(".card"),t=o==null?void 0:o.querySelector("pre code");if(!t)return;const i=(r=t.textContent)==null?void 0:r.trim();if(!i)return;navigator.clipboard.writeText(i).then(()=>{e.textContent="Copied!",setTimeout(()=>{e.textContent="Copy"},1200)})}});
