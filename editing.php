<!DOCTYPE html>
<html>
	<head>
		<title>Editing</title>
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
		<div class="input-group" id="menuAddress">
				<input class="col-xs-4 form-control" id="editable" name="editable" placeholder="Editoitava peli"></input>
				<span class="input-group-btn">
				<button class="btn btn-warning" id="editEngage" value="">Avaa editoitava tiedosto</button>
				</span>
		</div>
		<div class="input-group" id="menuAddress1">
		
				<input class="col-xs-4 form-control" id="addOptionTargetToList" name="addOptionTargetToList" placeholder="Lisää maali vaihtoehto"></input>
				<span class="input-group-btn">
				<button class="btn btn-warning" id="addNotherTargetToFirstSelect" value="">Lisää maali</button>
				</span>
				
		</div>
		<select class="dexTarget"><option value="0">Ei paria</option></select><button id="removeLastTARedit" class="btn btn-danger">Poista viimeinen maali</button>
		<div class="navbar navbar-default">
			<button class="btn btn-warning" id="comeOn">Lisää liikkuva osa</button>
			<button class="btn btn-primary" onclick="location.href='uploadPics.php'">Kuvien lisäys</button>
			<select id="listOfFolders43" name="folderList"><?php include 'readImgFolder.php' ?> </select>
			<button id="openPicAdder" class="btn btn-default navbar-btn">Avaa kuvan lisäys</button>
			<button id="UploadEditAndContinue" class="btn btn-success navbar-btn">Tallenna editoimasi tiedosto</button>
			
		</div>
			<div class="imagePreviewer row">
			</div>
		<div id="spawnEditables">
			
		</div>
	</body>
	
</html>