<?php
//save score to xml
include 'config.php';

if (!empty($_GET["fileName"])){
		$onlyFileName = $_GET["fileName"];
		$newFileName = $_GET["fileName"] . ".xml";
	} else {
		header("location: admin.php");
	}
	
	$domtree = new DOMDocument('1.0','UTF-8');
	
	$xmlRoot = $domtree->createElement("items");
	$xmlRoot = $domtree->appendChild($xmlRoot);
	
	$item = $domtree->createElement("item");
	$item = $xmlRoot->appendChild($item);
	
	$dropper = $domtree->createElement("Dropper");
	$dropper = $xmlRoot->appendChild($dropper);
	
	$domtree->save($newXMLfiles . $newFileName);

	header("location: admin.php?newishFile=". $onlyFileName);



?>