<?php
//--------------------------------------------------------
// HTML-Designer 1.0 Prototype
// (c) 2016 Jens Kallup
//--------------------------------------------------------
//if (defined('STDIN')) {  // for testing
//  $user=$argv[1];        // on console ...
//  $pass=$argv[2];
//} else {
  $user=$_REQUEST['user'];  // browser parameter
  $pass=$_REQUEST['pass'];
//}

if (strlen(trim($user)) < 4) { echo "error: user has no name."; return; }
if (strlen(trim($pass)) < 4) { echo "error: user has no pass."; return; }

@$dbh = new SQLite3('hd_data.db');
if (!$dbh) {
  echo "error: database not found/can not install.";
  return;
}

@$res = $dbh->query("SELECT * FROM hd_user WHERE name='nil'");
if (!$res || $res->numRows() < 1) {
  $res = $dbh->query("CREATE TABLE IF NOT EXISTS hd_users ("
  . "id INTEGER PRIMARY KEY AUTOINCREMENT,"
  . "user VARCHAR(30),"
  . "pass VARCHAR(30),"
  . "flag BOOLEAN)"
  );
  if (!$res) {
    echo "error: can not create table: 'hd_users'";
    return;
  }
}

$res = $dbh->query("SELECT user,pass FROM hd_users WHERE user='$user'");
$res = $res->fetchArray(SQLITE3_ASSOC);
if (!$res) {
  $sql = "INSERT INTO hd_users (user,pass,flag) VALUES ('"
  . $user . "', '"
  . $pass . "',0)";
  $res = $dbh->query($sql);
  echo  "info: ok.";
  return;
}

echo "info: no data changed.";

?>
