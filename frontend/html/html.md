Mögliche Emojis: 🔵🟢🟡❗⚠️🧩➤📁⌘⌥⇧⌃
**<h2>🔵 theory / background: </h2>**
```php **<h2>🟢img</h2>** ```
< img src="<bild.jpg>" alt="Beschreibung des Bildes" title="Text bei Hover">
<img> → HTML-Tag für Bilder (Self-Closing, kein < img >< /img > nötig)

src ➤ „Source“ ➤ die **Datei/URL des Bildes“
Angabe als relative URL: "images/logo.png" oder als absolute URL: "https://example.com/logo.png"

alt ➤ „Alternative Text“ ➤ Beschreibung, falls das Bild nicht geladen wird
Beschreibt das Bild für Screenreader (Menschen mit Sehbehinderung, Pflichtfeld)
Wichtig für SEO (Suchmaschinen lesen alt aus)

title ➤ Text erscheint bei hover, Zusatzinformation zum Bild, aber keine Pflicht

**<h2>🟢 nav </h2>**
<nav> ist ein semantisches HTML-Element, das Navigation enthält.
Es zeigt wichtige Links, die die Benutzer durch die Hauptstruktur der Website führen.
Browser, Screenreader und Suchmaschinen erkennen <nav> als Navigationsbereich.
aria-label: Benennung für mehrere Navigationsbereiche
  
```php
<nav aria-label="Hauptnavigation">
  <ul>
    <li><a href="#home">Start</a></li>
    <li><a href="#about">Über uns</a></li>
    <li><a href="#services">Leistungen</a></li>
    <li><a href="#contact">Kontakt</a></li>
  </ul>
</nav>
```

**<h2>🟢 href </h2>**
href = „Hypertext REFerence“ → Ziel des Links
Kann sein: URL zu einer anderen Seite, Interner Anker auf derselben Seite (#), Externe URL

```php
<a href="#">Hier klicken</a>
```
(#) = Verweis auf den Seitenanfang / leeren Anker
Macht die Seite nicht neu, springt zum Top
Problem: ohne preventDefault() springt die Seite nach oben → nicht ideal

```php
<a href="/">Startseite</a>
```
/ = Root der Domain (Startseite der Website)
Absoluter Pfad relativ zur Domain
Beispiel: https://example.com/ → / verweist darauf

```php
<a href="#section-about">Über uns</a>
```
Springt zu einem Element mit id="section-about"
Praktisch für One-Page-Websites oder Inhaltsverzeichnisse

```php
<section id="section-about">
  <h2>Über uns</h2>
</section>
```

**<h2>🟡 code explanation: </h2>**
Zeile x: 
 
```markdown
> ⚠️ Achtung: Vergiss nicht `echo $mform->show();`
