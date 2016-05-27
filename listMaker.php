<?php
include 'config.php';

if (!empty($_POST["previewedFileName"]) && !empty($_POST["exportingName"])){
	$theActualName = $_POST["exportingName"];
	$addingNewGameToList = $_POST["previewedFileName"];
} else {
	echo "Didn't Work";
	die();
	//header("location: preview.php");
}
	$addIt = simplexml_load_file($newXMLfiles . 'quick.xml');
	$addition = $addIt->addChild('dataPoint', $theActualName)->addAttribute("src", $addingNewGameToList );
	
$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($addIt->asXML());
	$dom->save($newXMLfiles . "quick.xml");
	
	

?>