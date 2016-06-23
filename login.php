<?php
$user=$_POST['user'];
$pass=$_POST['pass'];

if (strlen(trim($user)) < 4) {
echo "error: user has no name.";
return;
}

if (strlen(trim($pass)) < 4) {
echo "error: user has no pass.";
return;
}

echo "User: $user<br>Pass: $pass<br>Ok.";
?>
