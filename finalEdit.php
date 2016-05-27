<?php
include 'config.php';

if (!empty($_POST["address"])) {
		$array = $_POST['chunk'];
		$targetArray = $_POST['selectTargets'];
		$ifImage = $_POST["isImage"];
		$whatWereEditing = $_POST["address"];
		$t = 1;
		copy($newXMLfiles . $whatWereEditing , $oldXMLfiles . time()."_".$whatWereEditing);
		
		unlink($newXMLfiles . $whatWereEditing);
		
		$domtree = new DOMDocument('1.0','UTF-8');
	
			$xmlRoot = $domtree->createElement("items");
			$xmlRoot = $domtree->appendChild($xmlRoot);
			
			$item = $domtree->createElement("item");
			$item = $xmlRoot->appendChild($item);
			
			$dropper = $domtree->createElement("Dropper");
			$dropper = $xmlRoot->appendChild($dropper);
	
		$domtree->save($newXMLfiles . $whatWereEditing);
		
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
				$targetPointer = $tarArr[0];
				$targetID = $tarArr[1];
				$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $targetID . "");	
				
			}
		} else {
			
		
		
		foreach($array as $key => $subArray) {
		
			$dataPointer = $subArray[0];
			$dataIndex = $subArray[1];
			$newData = $theXMLtoEdit->item->addChild('dataPoint', $dataPointer)->addAttribute("target","". $dataIndex . "");
			
		}
		foreach($targetArray as $key => $tarArr){
			$targetPointer = $tarArr[0];
			$targetID = $tarArr[1];
			$newDropper = $theXMLtoEdit->Dropper->addChild('target', $targetPointer)->addAttribute("id","". $targetID . "");
		}
		
	}
} else {
		echo "ei toimi";
		header("location: editing.php");
		die();
	}
	
	
	

$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($theXMLtoEdit->asXML());
	$dom->save($newXMLfiles . $whatWereEditing);
	
	

?>