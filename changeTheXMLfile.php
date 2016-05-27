<?php

//This file is used to edit and create new XML files for the games. Mostly used by the admin.php page
include 'config.php';

if (!empty($_POST["address"])) {
		$ifImage = $_POST["isImage"];
		$array = $_POST['chunk'];
		$targetArray = $_POST['selectTargets'];
		
		$whatWereEditing = $_POST["address"];
		$s = 1;
		$t = 1;
		$theXMLtoEdit = simplexml_load_file($newXMLfiles . $whatWereEditing);
		
		if($ifImage == "true"){
			foreach($array as $key => $subArray) {
		
				$dataPointer = $subArray[0];
				$dataIndex = $subArray[1];
				$newData = $theXMLtoEdit->item->addChild('dataPoint', "S". $t++);
				$newData->addAttribute("target","". $dataIndex . "");
				$newData->addAttribute("clocks", "true");
				$newData->addAttribute("src","" . $dataPointer . "");
			}
			foreach($targetArray as $key => $tarArr){
				$targetPointer = $tarArr;
				$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $s++ . "");
			}
		} else {
		
		foreach($array as $key => $subArray) {
		
			$dataPointer = $subArray[0];
			$dataIndex = $subArray[1];
			$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer)->addAttribute("target","". $dataIndex . "");
			
		}
		foreach($targetArray as $key => $tarArr){
			$targetPointer = $tarArr;
			$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $s++ . "");
		}
		}
		
	} else {
		echo "ei toimi";
		header("location: admin.php");
	}
	
	
	

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($newXMLfiles . $whatWereEditing);
	


?>