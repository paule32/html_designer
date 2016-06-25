<?php
//--------------------------------------------------------
// HTML-Designer 1.0 Prototype
// (c) 2016 Jens Kallup
//--------------------------------------------------------
if (defined('STDIN')) {  // for testing
  $user=$argv[1];        // on console ...
  $pass=$argv[2];
} else {
  $user=$_POST['user'];  // browser parameter
  $pass=$_POST['pass'];
}

if (strlen(trim($user)) < 4) { echo "error: user has no name."; return; }
if (strlen(trim($pass)) < 4) { echo "error: user has no pass."; return; }

date_default_timezone_set("UTC");

$dbh = new PDO('sqlite:hd_data.db');
if (!$dbh) {
  echo "error: database not found/can not install.";
  return;
}
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$res = $dbh->query("CREATE TABLE IF NOT EXISTS hd_users ("
. "id INTEGER PRIMARY KEY AUTOINCREMENT,"
. "user VARCHAR(30),"
. "pass VARCHAR(30),"
. "flag CHAR(1))"
);
if (!$res) {
  echo "error: can not create table: 'hd_users'";
  return;
}

$res = $dbh->prepare("SELECT user,pass FROM hd_users WHERE user=:user");
$res->bindParam(":user",$user);
$res->execute();
$cro = $res->fetchAll();
$cnt = 0;
foreach ($cro as $row)
$cnt = $cnt + 1;
$flag = 0;
if ($cnt < 1) {
  $rea = $dbh->prepare("INSERT INTO hd_users (user,pass,flag) VALUES (:user,:pass,:flag)");
  $rea->bindParam(":user", $user, PDO::PARAM_STR, 30);
  $rea->bindParam(":pass", $pass, PDO::PARAM_STR, 30);
  $rea->bindParam(":flag", $flag, PDO::PARAM_INT);
  $rea->execute();
  echo  "info: ok.";
  return;
}

echo "info: no data changed.";

?>
