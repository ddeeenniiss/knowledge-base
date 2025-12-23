box-sizing:
border-box; //Inhalt + Padding + Border sind gemeinsam die width
content-box: // Nur Inhalt ist width, padding und border exclusive

Animations:

transform: rotateX(0deg) // rotiert 0 Grad entlang der x-Achse
           rotateY(0deg) // rotiert 0 Grad entlang der y-Achse
           rotateZ(0deg) // rotiert 0 Grad entlang der z-Achse

#myDiv {
  transform: rotateZ(0deg);
}

#myDiv:hover {
  transform: rotateZ(360deg);
  transition: transform 2s ease-out;
}

<div class="example-section" style=".demo-card-container {
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
}">

  <!-- Erklärung -->
  <div class="info">
    <h3>Hover Animation</h3>
    <p>Wenn man über die Card hovert, skaliert sie leicht.</p>
  </div>

  <!-- Live-Demo Card -->
  <div class="demo-card-container">
    <div class="demo-card">
      Hover mich
    </div>

    <!-- Button zum CSS anzeigen -->
    <button class="show-css-btn" data-css=" 
.demo-card {
  width: 150px;
  height: 150px;
  background-color: coral;
  transition: transform 0.3s ease;
}
.demo-card:hover {
  transform: scale(1.2);
}">CSS anzeigen & kopieren</button>
  </div>

  <!-- Bereich, um CSS zu zeigen -->
  <pre class="css-output" style="display:none;"></pre>
</div>

<script>
document.querySelectorAll('.show-css-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pre = btn.nextElementSibling;
    pre.style.display = 'block';
    pre.textContent = btn.dataset.css.trim();

    // Code automatisch kopieren
    navigator.clipboard.writeText(btn.dataset.css.trim()).then(() => {
      btn.textContent = 'CSS kopiert!';
      setTimeout(() => btn.textContent = 'CSS anzeigen & kopieren', 1500);
    });
  });
});
</script>
Wichtig: Es muss immer einen Änderungszustand geben, bsp hover, click

transition: <property> <duration> <timing-function> <delay>;
<property>: zB transform, all
<duration>: wie lange dauert die Transition, zB 2s
<timing-function>:
linear	konstante Geschwindigkeit cubic-bezier(0, 0, 1, 1)
ease (default)	langsam → schnell → langsam cubic-bezier(0.25, 0.1, 0.25, 1)
ease-in	startet langsam ease-in = cubic-bezier(0.42, 0, 1, 1)
ease-out	endet langsam ease-out = cubic-bezier(0, 0, 0.58, 1)
ease-in-out	langsam rein und raus = ease-in-out = cubic-bezier(0.42, 0, 0.58, 1)
step-start	sofortiger Sprung
step-end	Sprung am Ende
<delay>:

Für hover empfohlen: cubic-bezier(0.4, 0, 0.2, 1)

cubic-bezier: (x1, y1, x2, y2)
Eine Timing-Function beschreibt nicht die Bewegung im Raum, sondern:

Wie schnell der Fortschritt der Animation über die Zeit passiert

x-Achse → Zeit (0 → 1)
y-Achse → Fortschritt der Animation (0 → 1)

Startpunkt ist immer (0,0)
Endpunkt ist immer (1,1)

Beispiel: cubic-bezier(0.25, 0.1, 0.25, 1)
x1 = 0.25 bedeutet sehr früher Einfluss der Geschwindigkeit
<img width="287" height="301" alt="image" src="https://github.com/user-attachments/assets/f5f246d0-f14e-4a64-b8fb-218176019287" />

Animieren bei Seite neu laden:

#myDiv {
  transform: rotateZ(0deg);
  animation: flip 3s ease infinite;
}

@keyframes flip {
  to {
    transform: rotateZ(360deg);
  }
}
