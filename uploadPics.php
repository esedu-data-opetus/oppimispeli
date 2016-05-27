<!DOCTYPE html>

<html>
	<head>
		<title>Picture upload</title>
		<link href="BStrapCss/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="quick.css">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="format-detection" content="telephone=no">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.3.0.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
		<script src="jquery.ui.touch.js"></script>
		<script src="jquery.mobile.custom.min.js"></script>
		<script type="text/javascript" src="quickJSmin.js"></script>
	</head>
	
	
	<body>
	<div class="container">
	<button class="ToFrontPage btn btn-primary" onclick="location.href='index.php'">Etusivulle</button><button class="ToFrontPage btn btn-info" onclick="location.href='admin.php'">Takaisin Editoriin</button>
		<form action="upload.php" method="post" enctype="multipart/form-data">
			
			Valitse kuva:
			<input type="file" name="fileToUpload[]" id="fileToUpload" multiple>
			<div class="row"><label>Nimeä uusi kansio tai valitse olemassa olevan peliin liittyvän kansion nimi</label></div>
			<select id="listOfFolders43" name="folderList"><?php include 'readImgFolder.php' ?> </select>
			<input name="folderName" placeholder="Nimeä kuvien kansio"></input>
			<button type="submit" class="btn btn-success" value="Lataa kuvat" name="submit"> Lataa Kuvat </button>
			
		</form>
		<button id="openPicAdder" class="btn btn-default navbar-btn">Avaa kuvien selaus</button>
		<div class="imagePreviewer row">
			</div>
	</div>
	
	</body>
	
</html>