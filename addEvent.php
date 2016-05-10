<?php
require_once 'vendor/autoload.php';

$dsn = 'mysql:host=localhost;dbname=calendar;charset=utf8';
$usr = 'root';
$pwd = '';

$pdo = new Slim\PDO\Database($dsn, $usr, $pwd);

$start = $_GET['start'];
$end = $_GET['end'];

if ($_GET['type'] === 'add') {
	$title = $_GET['title'];
	$qry = $pdo->insert(['title', 'start', 'end'])
			->into('events')
			->values([$title, $start, $end]);

	$qry->execute(false);

	echo json_encode(['status' => true]);	
} elseif($_GET['type'] === 'resize') {
	$updateStatement = $pdo->update(array('start' => $start, 'end' => $end))
                       ->table('events')
                       ->where('id', '=', $_GET['id']);

	$affectedRows = $updateStatement->execute();
	echo json_encode(['status' => true]);
} elseif ($_GET['type'] === 'delete') {
	$deleteStatement = $pdo->delete()
                       ->from('events')
                       ->where('id', '=', $_GET['id']);

	$affectedRows = $deleteStatement->execute();
	echo json_encode(['status' => true]);	
}

