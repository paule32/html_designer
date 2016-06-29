<?php
//--------------------------------------------------------
// HTML-Designer 1.0 Prototype
// (c) 2016 Jens Kallup
//--------------------------------------------------------
if (defined('STDIN')) {  // for testing
  $user=$argv[1];        // on console ...
  $pass=$argv[2];
  $mode=$argv[3];
} else {
  $user=$_POST['user'];  // browser parameter
  $pass=$_POST['pass'];
  $mode=$_POST['mode'];
}

if (strlen(trim($user)) < 4) { echo "error: user has no name."; return; }
if (strlen(trim($pass)) < 4) { echo "error: user has no pass."; return; }

date_default_timezone_set("UTC");

$dbh = new PDO('sqlite:/var/www/kallup.net/html/andreas/hd_data.db');
if (!$dbh) {
  echo "error: database not found/can not install.";
  return;
}

$res = $dbh->query("CREATE TABLE IF NOT EXISTS hd_users ("
. "id INTEGER PRIMARY KEY AUTOINCREMENT,"
. "user VARCHAR(30),"
. "pass VARCHAR(30),"
. "flag CHAR(1))"
);

$res = $dbh->prepare("SELECT user,pass FROM hd_users WHERE user='$user' AND pass='$pass';");
$res->execute();
$arr = $res->fetchAll();

if ($mode == 0
&& ($user != $arr[0][0])
&& ($pass != $arr[0][1])) {
echo "error: no data sel.";
die();
}

$cnt = 0;
foreach ($arr as $row)
$cnt = ++$cnt;

$flag = 0;
$fh = fopen("/var/www/html/hd_data.db","rb");
if ($fh == null) {
  echo "error: cant save data.";
  die();
} else {
  fclose($fh);
}

if ($cnt < 1) {
  $res = $dbh->prepare("INSERT INTO hd_users (user,pass,flag) VALUES (:user,:pass,:flag);");
  $res->bindParam(":user", $user, PDO::PARAM_STR, 30);
  $res->bindParam(":pass", $pass, PDO::PARAM_STR, 30);
  $res->bindParam(":flag", $flag, PDO::PARAM_INT);
  $res->execute();
  echo "info: ok. ins";
  die();
} else {
    if ($mode == 0
    && ($user == $arr[0][0])
    && ($pass == $arr[0][1])) {
    echo "info: ok. sel";
    die();
  }
}

echo "info: no data changed.";

?>
