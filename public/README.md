# Knowledge Base

```sh
Zusammenfassung und Erleichterungen von alles möglichem!
Neue Files in der structure.json mit anlegen!
Auf systematisches Layout achten!

---
```
## Inhaltsverzeichnis

```sh
- [Installation](#installation)
- [Benutzung](#benutzung)
- [Git Workflow](#git-workflow)
- [Struktur](#struktur)
- [Suche im Repository](#suche-im-repository)

---

Installation

Lokale Einrichtung des Projekts:  
PHP sollte installiert sein für Formulare

git clone https://github.com/ddeeenniiss/knowledge-base.git
cd knowledge-base


Wenn im lokalen Repository etwas geändert wird:

git add .  //oder Datei die für commit gedacht ist
git commit -m "" //Nachricht hinzufügen, damit jeder weiß was geändert wurde
git push //Hochladen der commits auf Remote Server Github

git pull --rebase --autostash //Pullen aller commits, rebasen der eigenen Änderungen auf die externen Änderungen und stashen der Änderungen, die noch nicht committet sind.

yarn build //Startet Projekt


Wenn direkt auf github etwas geändert wird: 
commit reicht. Es dauert immer ca 1min, bis die Änderungen live sind.

---

Benutzung

Für schnelle und einfache Erklärungen
---

Git Workflow

---

Suche im Repository

Gängig ist die Suche per command + F auf Mac (aktuelle Seite)
1) In Browser IDE wechseln: github.dev/ eingeben statt github.com/ oder . drücken um repo zu öffnen
2) in Suchleiste nach Begriff suchen. Jedes .md wird mit grünem Kreis + Suchbegriff strukturiert, um navigieren zu können
---

Struktur im Verzeichnis

README.md
Theoriewissen
    Generelle Theorie
        General
        Objekte
        Mails
    Bash-Commands
        Bash-Commands
    Git
        Git Basics
        Lokales Setup
        Fixup!
        Maintainance
        Rebase + Merge
Frontend HTML / CSS / JS
    HTML
        HTML Basics
    CSS
        CSS-Styling
        Animationen
        Buttonvorlagen
    JS
        JS Basics
Backend PHP / Redaxo
    PHP
        PHP Basics
        PHP-Mailer
    Redaxo
        Redaxo Basics
    Typo3
    Formulare
        Formular ohne AJAX
        Formular mit AJAX
Projekte
    Informationen
        Kuhnle
        GL PIM API
        TSSI
        Instagram Plugin

---
```