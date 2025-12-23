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
