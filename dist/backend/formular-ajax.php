<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $firstname = htmlspecialchars($_POST['firstname'] ?? '');
    $lastname  = htmlspecialchars($_POST['lastname'] ?? '');
    $address   = htmlspecialchars($_POST['address'] ?? '');
    $email     = htmlspecialchars($_POST['email'] ?? '');
    $phone     = htmlspecialchars($_POST['phone'] ?? '');
    $gender    = htmlspecialchars($_POST['gender'] ?? '');
    $message   = htmlspecialchars($_POST['message'] ?? '');

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.web.de';
        $mail->SMTPAuth = true;
        $mail->Username = 'dbonna@web.de';
        $mail->Password = '6ZX6HZD7TEQZPZ4ZS5H4';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('dbonna@web.de', 'Formular');
        $mail->addAddress('dbonna@web.de', 'Bonna');

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
        $mail->AltBody = "Neue Formular-Anfrage\n\n"
            . "Vorname: $firstname\n"
            . "Nachname: $lastname\n"
            . "Adresse: $address\n"
            . "Telefon: $phone\n"
            . "Geschlecht: $gender\n"
            . "Nachricht:\n$message";

        $mail->send();
        
        // Für AJAX: direkt Text ausgeben statt redirect
        echo "Nachricht erfolgreich gesendet!";

    } catch (Exception $e) {
        echo "Nachricht konnte nicht gesendet werden. Fehler: {$mail->ErrorInfo}";
    }
} else {
    echo "Keine Daten empfangen.";
}
