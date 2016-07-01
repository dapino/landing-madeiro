<?php
$result           = new stdClass;
$emailToSend      = "ejemplo@mail.com"; 


contacto($_POST['nombre'], $_POST['email'], $_POST['telefono'], $_POST['celular'], $_POST['mensaje']);


function sendMail($emailSender, $subject, $message) {

	global $emailToSend;

	$cabeceras = 'From: noreply@madeiro.com' . "\r\n" .
	    'Reply-To: ' . $emailSender . "\r\n" . 
	    "Content-type: text/html; charset=UTF-8" . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();

	$envio = mail($emailToSend, $subject, $message, $cabeceras);
	if ($envio == true) {
		header("Location: ./");
	}
}

function contacto($nombre, $email, $mensaje, $telefono, $celular){
	$nombre = stripslashes(trim($nombre));
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$email = $email;
	}
	$telefono = stripslashes(trim($telefono));
	$celular = stripslashes(trim($celular));
	$mensaje = stripslashes(trim($mensaje));

	$mensaje_  = "<p>Nombre: " . $nombre . "</p>";
	$mensaje_  .= "<p>Email: " . $email . "</p>";
	$mensaje_  .= "<p>teléfono: " . $telefono . "</p>";
	$mensaje_  .= "<p>Mensaje: " . $celular . "</p>";
	$mensaje_  .= "<p>Mensaje: " . $mensaje . "</p>";
	sendMail($email, "asunto", $mensaje_);
}

?>