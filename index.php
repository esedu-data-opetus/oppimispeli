<?php
if (!empty($_GET['incoming'])) {
$theGameToBeAdded = $_GET['incoming'];
} else {
	$theGameToBeAdded = "";
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Quick</title>
		<link href="BStrapCss/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="quick.css">
		<!-- THIS DISABLES ZOOMING <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">-->
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
		<script type="text/javascript" src="quickTesting.js"></script>
	</head>

	<body>
		<div class="container">
			
			
				<?php
					echo "<div class='borderPatrol'><div id=\"content\">
				<img id='ohjeetEtusivu' src='images/ohjeet/ohjeet.png'>
				<div id=\"makeMeDraggable\" class=\"block dragging\">
				</div>
				
				<div class=\"drop droppable\" id=\"makeMeDroppable\">
				</div>
			
		</div>
			
		</div>
		<footer id=\"footing\">
				
				<button id='validationButton' class='btn btn-info' onclick='validation()'>Tarkista</button>
				<button id='gameChangeButton' class='btn btn-warning' onclick=\"change()\">Vaihda peliä</button>
				<select type=\"text\" id=\"XmlName\">
					
					
				</select>
				
				<input id=\"addIt\" placeholder=\"Pelin nimi\"  value=". $theGameToBeAdded ." ></input>
				
				<button id='editorButton' class=\"testing2 btn btn-danger\" onclick=\"location.href='admin.php'\">Editori</button>
				
				
				
				<button class='btn btn-default' onclick=\"location.href='ohjeet.php'\" id='ohjeetButton'>Ohjeet</button>
				<button class='btn btn-default' id='zoomiPad'>Zoom</button>
				
			
		</footer>
		
		";
				?>
			
		</div>
	</body>
	
</html>