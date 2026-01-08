<?php
// Klassen direkt verwenden, ohne den ganzen Namespace jedes Mal schreiben zu müssen
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Lädt die vendor/autoload.php, die Composer erstellt. Dadurch werden alle PHPMailer-Klassen automatisch verfügbar.
require __DIR__ . '/../../vendor/autoload.php';

// $_SERVER["REQUEST_METHOD"] sagt dir, welche HTTP-Methode benutzt wurde (GET oder POST)
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Formularwerte auslesen und absichern
    // wandelt Sonderzeichen um, damit kein HTML oder JS im Formular eingeschleust werden kann (Sicherheit gegen XSS)
    $firstname = htmlspecialchars($_POST['firstname'] ?? '');
    $lastname = htmlspecialchars($_POST['lastname'] ?? '');
    $address = htmlspecialchars($_POST['address'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $gender = htmlspecialchars($_POST['gender'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // true bedeutet, dass PHPMailer Exceptions wirft, wenn Fehler auftreten.
    $mail = new PHPMailer(true);

    try {
        // SMTP-Server
        $mail->isSMTP(); // SMTP verwenden
        $mail->Host = 'smtp.web.de'; // SMTP-Server von Web.de
        $mail->SMTPAuth = true;      // Authentifizierung aktivieren
        $mail->Username = 'dbonna@web.de';
        $mail->Password = '6ZX6HZD7TEQZPZ4ZS5H4';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Verschlüsselung
        $mail->Port = 587; // Standard für verschlüsseltes SMTP

        // Empfänger
        $mail->setFrom('dbonna@web.de', 'Formular');
        $mail->addAddress('dbonna@web.de', 'Bonna');

        // Reply-To nur setzen, wenn E-Mail gültig
        // Reply-To sendet direkt Antwort
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($email, "$firstname $lastname");
        }

        $mail->isHTML(true);
        $mail->Subject = 'Neue Formular-Anfrage';
        $mail->Body = '
        <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #0044cc;">Neue Formular-Anfrage</h2>
        <p>Anfrage erhalten mit folgenden Daten:</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Vorname:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">'
             . $firstname . '</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Nachname:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">'
             . $lastname . '</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Adresse:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">'
             . $address . '</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Telefon:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">'
             . $phone . '</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Geschlecht:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">'
             . $gender . '</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Nachricht:</td><td style="padding: 8px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">'
             . $message . '</td></tr>
        </table>
        <p>Diese Nachricht wurde über das Webformular gesendet.</p>
        </body>
        ';
        // Plain-Text-Version für Clients, die kein HTML anzeigen.
        $mail->AltBody = "Neue Formular-Anfrage\n\n"
            . "Vorname: $firstname\n"
            . "Nachname: $lastname\n"
            . "Adresse: $address\n"
            . "Telefon: $phone\n"
            . "Geschlecht: $gender\n"
            . "Nachricht:\n$message";

        $mail->send();
        // Redirect, damit Formular nicht erneut gesendet wird beim Neuladen der Seite:
        header("Location: formular.php?success=1");
        exit; // wichtig, damit kein weiterer Code ausgeführt wird
    } catch (Exception $e) {
        echo "Nachricht konnte nicht gesendet werden. Fehler: {$mail->ErrorInfo}";
    }
} else {
    echo "Keine Daten empfangen.";
}

// Erfolgsmeldung nach Redirect
if (isset($_GET['success'])) {
    echo "<p>Danke! Ihre Nachricht wurde erfolgreich versendet.</p>";
}
