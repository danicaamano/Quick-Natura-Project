$mail='sergom31@hotmail.com';  
$empresa = $_POST['empresa']; 
$apel = $_POST['apel']; 
$domicilio = $_POST['domicilio']; 
$ciudad = $_POST['ciudad']; 
$provincia = $_POST['provincia']; 
$telefono = $_POST['telefono']; 
$cp = $_POST['cp']; 
$email = $_POST['email']; 
$comentario = $_POST['comentario'];  
$thank = "gracias.htm"; 
$asunto="ENVIO CONTACTO";   

$message =  
"Asunto:".$asunto. 
"Empresa:".$empresa. 
"Apellido y Nombre:".$apel. 
"Domicilio:".$domicilio. 
"Ciudad:".$ciudad. 
"Provincia:".$provincia. 
"Telefono:".$telefono. 
"Codigo_Postal:".$cp. 
"E-Mail:".$email. 
"Comentario:".$comentario."";   
if (mail($mail,$message,"from: ".$apel." <".$email.">"))  Header ("Location: $thank");
