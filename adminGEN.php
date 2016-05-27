<?php
//save score to xml
include 'config.php';

if (!empty($_GET[""]) && !empty($_GET["nimi"])){
		$mail = $_GET["mail"];
		$nimi = $_GET["nimi"];
		$pisteet = $_GET["sentScore"];
	} else {
		header("location: index.php");
	}
	
	
	$score = simplexml_load_file('quick.xml');
	
	$newPlayer = $score->addChild('player');
	$newPlayer->addChild('nimi', $nimi);
	$newPlayer->addChild('playerScore', $pisteet);
	$newPlayer->addChild('yhteystiedot', $mail);

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($score->asXML());
	$dom->save("quick.xml");
	
	header("location: index.php");






?>