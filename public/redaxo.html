<?php
use FriendsOfRedaxo\MForm;

$mform = MForm::factory()
    ->addFieldsetArea(['label' => 'Kategorie'])
    ->addTextField(1, ['label' => 'Titel'])       // Text
    ->addTextAreaField(2, ['label' => 'Text'])    // Textfeld
    ->addMediaField(3, ['label' => 'Text'])       // Bild
    ->addLinkField(4, ['label' => 'Titel'])       // Link
    ->addSelectField('1.background', [            // Dropdown Auswahl
        ''        => 'Weiß (kein Hintergrund)',
        'grey-90' => 'Grau (grey-90)',
    ], [
        'label' => 'Hintergrundfarbe des kompletten Moduls',
        'full'  => true
    ])
    ->addCheckboxField('1.center', [1 => 'Inhalt zentrieren']); // Checkbox

echo $mform->show();
?>

<h2>Ausgabe:</h2>

REX_TEMPLATE[key=inc_rexvalues]
REX_TEMPLATE[key=basic_functions]

<?php
$data = $REX_VALUE[1] ?? [];
?>

<?php if (rex::isFrontend()): ?>

<div class="footer__right-title"><?= $data['right_title'] ?? '' ?></div>

<?php if (!empty($products)): ?>
    <?php foreach ($products as $item): 
        $iconType = $item['icon_type'] ?? 'basic';
        $iconClass = ($iconType === 'download') ? 'icn--arrow-download' : 'icn--arrow-up-right';
        $href = '';
        $target = '_self';
        $download = false;
        $headerClass = (!empty($data['center']) && $data['center'] == 1)
                        ? 'stage__header-center'
                        : 'stage__header';
    ?>
        <div class="<?= $headerClass ?>">
            <a href="<?= getUrlFromCustomLink($data['left_cta_link'] ?? '') ?>" 
               target="<?= getTargetAttribute($data['left_cta_link'] ?? '') ?>" 
               class="button button--secondary button--small">
                <?= $data['left_cta_label'] ?? '' ?>
                <span class="icn icn--arrow-right-thin" aria-hidden="true"></span>
            </a>
        </div>
    <?php endforeach; ?>
<?php endif; ?>

<?php endif; ?>

REX_TEMPLATE[key=inc_moduleinfo]

<?php
// Accordeon-Element Beispiel
$grid = MForm::factory()
    ->addAccordionElement('Grid', MForm::factory()
        ->addMediaField(3, ['label' => 'Bild'])
        ->addTextField('2.0.overline', ['label' => 'Overline'])
        ->addTextAreaField('2.0.title', ['label' => 'Titel'])
        ->addCustomLinkField('2.0.link', ['label' => 'Link'])
        ->addTextAreaField('2.0.caption', ['label' => 'Beschreibung'])
        ->addSelectField('2.0.icon_type', [
            'basic'    => 'Basic (Pfeil nach oben rechts)',
            'download' => 'Download (Pfeil nach unten)',
        ], ['label' => 'Icon-Typ', 'full' => true, 'default' => 'basic'])
    );

echo MBlock::show(2, $grid->show());
?>

<?php
// CK5Editor Beispiel
if (!empty($data['left_text'])): ?>
    <div class="text-block__text"><?= $data['left_text']; ?></div>
<?php endif; ?>
