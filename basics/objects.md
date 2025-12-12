Mögliche Emojis: 🔵🟢🟡❗⚠️🧩➤📁⌘⌥⇧⌃
**<h2>🔵 theory / background: </h2>**
Alle Eingaben hier sind Objekte, dabei sind Objekte Instanzen einer Klasse.

zB

```php
class Person {
    public $name;
    public $age;

    public function greet() {
        return "Hallo, ich bin $this->name";
    }
}

// Objekt erstellen
$max = new Person();
$max->name = "Max";
$max->age = 30;

echo $max->greet(); // Hallo, ich bin Max
```

**<h2>🟢 code snippet: </h2>**
```php
$content = MForm::factory()
	->addMediaField('1.background', ['label' => 'Hintergrundbild', 'full' => true])
	->addTextField('1.heading', ['label' => 'Headline', 'full' => true])
	->addTextField('1.subheading', ['label' => 'Sub-Heading', 'full' => true])
	->addTextAreaField('1.text', ['label' => 'Text', 'full' => true])
	->addHtml('<br><br>')
	->addFieldsetArea('Button')
	->addCustomLinkField('1.button.link', ['label' => 'Link', 'full' => true])
	->addTextField('1.button.label', ['label' => 'Label', 'full' => true]);
```
Diese werden gespeichert als:

```php
$data = (object)[
    "value_1" => (object)[
        "background" => "bild.jpg",
        "heading"    => "Meine Überschrift",
        "subheading" => "Meine Subheadline",
        "text"       => "Lorem ipsum…",

        "button" => (object)[
            "link"  => "https://example.com",
            "label" => "Mehr erfahren"
        ]
    ],
    "anchorId" => "…" // wenn in Settings gesetzt
];
```
1. wird zu value_1
button.something wird zu $data->value_1->button->something
Jeder Punkt erzeugt ein neues Unterobjekt

**<h2>🟡 code explanation: </h2>**
Zeile x: 
 
```markdown
> ⚠️ Achtung: Vergiss nicht `echo $mform->show();`
