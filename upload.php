<?php
//this script is used to upload images via uploadPics.php

include 'config.php';
// Count # of uploaded files in array
$total = count($_FILES["fileToUpload"]["name"]);
$allowed_extension = array('jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif', 'JPG', 'JPEG', 'PNG', 'BMP', 'TIFF', 'GIF');
$errors = array();
$folderName = $_POST["folderName"];
$folderList = $_POST["folderList"];
if(!file_exists($folderName)){
mkdir($saveImages . $folderName, 0755);
}
print_r($folderName);
// Loop through each file
for($i=0; $i<$total; $i++) {
  //Get the temp file path
  $tmpFilePath = $_FILES["fileToUpload"]["tmp_name"][$i];
	$fileSize = $_FILES['fileToUpload']['size'][$i];

	foreach($_FILES["fileToUpload"]["name"] as $key => $array_value){

        if(!in_array(pathinfo($_FILES["fileToUpload"]["name"][$key], PATHINFO_EXTENSION), $allowed_extension)){
               die("An error has occured while uploading your picture");
			   header("location: uploadPics.php");
        }
	}
 
	
	

    //Upload size check
	if ($fileSize > 2097152){
        $errors[$tmpFilePath][] = "maxsize of 2MB on $tmpFilePath has reached";
		print_r($errors);
		die();
                    }
	// Check if upload is a-ok
	if(count($errors) == 0){
		
		//Make sure we have a filepath
		if ($tmpFilePath != ""){
		
			//Setup our new file path
			$newFilePath = $saveImages . $folderName . "/" . uniqid() . $_FILES["fileToUpload"]["name"][$i];
			$ifFolderNameisEmpty = $saveImages . $folderList . "/" . uniqid() . $_FILES["fileToUpload"]["name"][$i];
			print_r($newFilePath);
			print_r($ifFolderNameisEmpty);
			}
				if(empty($_POST["folderName"])){
					move_uploaded_file($tmpFilePath, $ifFolderNameisEmpty);
				} else{
					move_uploaded_file($tmpFilePath, $newFilePath);
					}
		}
	
  }
  header("location: admin.php");

?>