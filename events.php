<?php
require_once 'vendor/autoload.php';

$dsn = 'mysql:host=localhost;dbname=calendar;charset=utf8';
$usr = 'root';
$pwd = '';

$pdo = new Slim\PDO\Database($dsn, $usr, $pwd);

$qry = $pdo->query("SELECT * FROM events");
//$result = $qry->execute();

echo json_encode($qry->fetchAll());