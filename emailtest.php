<?php

$email_to   = $_REQUEST['emailto'];
$email_body = $_REQUEST['emailbody'];
$email_from = $_REQUEST['emailfrom'];

$subject = "Ein Mail Betreff";
$message = "<b>Lieber Kunde</b><br>leider haben Sie... $email_body";
$headers = "From: $email_from"    . "\r\n" .
           "Reply-To: $email_to"  . "\r\n" ;

if (strcmp($email_from,"jkallup@web.de"))
{
  mail($email_to, $subject, $message, $headers);
  echo "<b>email to: " . $email_to . " is ok!</b>";
  die();
}
else {
  echo "falsche email";
  die();
}
?>
