<?php
if (!empty($_GET['newishFile'])) {
$addressVal = $_GET['newishFile'];
} else {
	$addressVal = "";
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>admin</title>
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
	<button class="ToFrontPage btn btn-primary" onclick="location.href='index.php'">Etusivulle</button><button class="ToFrontPage btn btn-info" onclick="location.href='editing.php'">Editoi vanhaa peliä</button>
		<form id="submitGenValue" class="form-horizontal" id="adminForm" action="genFile.php" method="get">
		<div class="row">
			<div class="input-group">
				<input id="genFileName" class="col-xs-4 form-control" name="fileName" placeholder="Uuden pelin nimi"></input>
				<span class="input-group-btn">
				<button class="btn btn-warning" type="submit" value="Generate file">Luo tiedosto</button>
				</span>
			</div>
		</div>
		</form>
		<div class="row">
			<div class="input-group" id="menuAddress">
				<input class="col-xs-4 form-control" id="address" name="address" <?php echo "value='". $addressVal ."'" ?> placeholder="Pelin nimi"></input>
				
			</div>
		</div>
		
		<div class="row">
			<div class="input-group" id="menuTargets">
				<input class="col-xs-4 form-control" id="targetPointer" name="targetPointer" placeholder="Lisättävä maali"></input>
				<span class="input-group-btn">
				<button class="btn btn-warning" id="buttTarget">Lisää maali</button>
				</span>
			</div>
		</div>
		<div class="navbar navbar-default">
			<select class='dexTarget'></select>
		
			<button id="removeLastTAR" class="btn btn-default navbar-btn btn-danger">Poista viimeinen maali</button>
			
		</div>
		<div class="navbar navbar-default">
			<button class="btn btn-primary" onclick="location.href='uploadPics.php'">Kuvien lataus serverille</button>
			<select id="listOfFolders43" name="folderList"><?php include 'readImgFolder.php' ?> </select>
			<button id="lisaaKuvia" class="btn btn-warning navbar-btn">Lisää kaikki kansion kuvat</button>
			<button id="openPicAdder" class="btn btn-default navbar-btn">Avaa kuvan lisäys</button>
		</div>
		<div class="imagePreviewer row">
			</div>
		<div class="navbar navbar-default" id="menuDataPoints">
			<button id="addDataInput" class="btn btn-warning navbar-btn">Lisää liikkuva osa</button>
			<button id="removeLastDP" class="btn btn-danger navbar-btn">Poista viimeisin liikkuva osa</button>
			
			<button id="XMLchanges" class="btn btn-success navbar-btn">Upload / vie</button>
		</div>
		
		<div class="form-group" id="listArrayBase">
		
		</div>
		<div class="form-group" id="output">
			<ul id="outputUL">
			
			
			</ul>
		</div>
	

	
	</div>
	</body>
	
</html>