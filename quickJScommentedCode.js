//Quick javascript
var correct = 0;
// THis locks down movement when validation is active
var enableDragging = 1;

//this initializes and currently only affects the driopdown menu
$( init );

//This sets it so no ajax query will stay in teh cache screwing everything up
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});

//This disables overflow and scrolling on the index page
$(document).ready(function(){
	if (window.location.href.indexOf("index") > -1){
			$(document).bind('touchmove', function(e) {
			e.preventDefault();
			}
			$("#zoomiPad").click($(document).bind('touchmove', function(e)){ return true; })
		);
	};
	
});

///////////////////////////////////////////////// v BELOW FUNCTIONS HANDLE SWITCHING GAMES, VALIDATING ANSWERS, CREATING DRAGGABLES AND DROPPABLES AND MAKING THE DROPDOWN LIST ON INDEX.PHP v ///////////////////////////////////////////////////////////////////////////

//The initialization function. Affects the index.php page
function init() {
//This simply updates the dropdown menu, you update it on the preview page

//console.log("init function active");
	$.ajax({
			url: 'xml/quick.xml',
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				//console.log (returnedXMLResponse);
				$('dataPoint',returnedXMLResponse).each(function(){
					var contentsData = $(this).text();
					var contentsVal = $(this).attr('src');
					$("<option></option>")
					.text(contentsData)
					.val(contentsVal)
					.appendTo("#XmlName");
					
				});
				
			}
			
		
	});
	
}
//This function activates when you change the XML file.
function change() {
	var enableDragging = 1;
	//console.log(enableDragging);
	correct = 0;
	$('.block').html( '' );
	$('.drop').html( '' );
	$("#finale").hide();
	
	//this generates the draggables from the generate.xml file form the datapoint element
	var tmpArc=[];
	var tmpDrop=[];
	var xmlFileName;
	if(!$("#addIt").val()){
		xmlFileName = 'xml/' + $("#XmlName").val();
	} else {
		xmlFileName = 'xml/' + $("#addIt").val();
	}
	//In this ajax function the code reads an input fields value and opens the corresponding XML file from xml/ folder
	$.ajax({
			url: xmlFileName,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				//here the function picks up the datapoints from the xml file and reads their src, if they're images (at this points conveyed by the clocks variable),
				//then depending on what it finds gives the correct values to the specific variables.
				
				//console.log (returnedXMLResponse);
				$('dataPoint',returnedXMLResponse).each(function(){
					var $content;
					var $src = $(this).attr('src');
					var $clocks = $(this).attr('clocks')
					//THis one createst text based xmls
						if ($src == null) {
							$content = $(this).text();
							$DropClass = 'dropTarget';
							$draggEr = 'numbero audioClass';
							//this next one loads in image based xmls
						} else if ($clocks == "true") {
							$content = '<img src="' +  $(this).attr('src') + '" class="imgReg"/>';
							$DropClass = 'clockDrop';
							$draggEr = 'clockDrag';
						
						} 
					
					
					
					var row = [$content , $(this).attr('target')];
					
					tmpArc.push(row);
					
					
	
			})
			//this function looks up the target nodes from the xml and creates the droppables where you drop the draggables.
			$('target',returnedXMLResponse).each(function(){
				//it picks up the id attribute that it then uses as part of the identification process for dropping element on top of each other
					var targetting = [$(this).text() , $(this).attr('id')]
					tmpDrop.push(targetting);
			})
			//This is the variable that via for loop goes through all the targets that are in the tmpDrop array, gives them the droppable property and
			//gives them the data attribute for number that corresponds with the same one its pair draggable will get creating a pair.
			//the accept makes it so only elementes of a certain div will be accepted as a drop.
			for (var i=0; i<tmpDrop.length; i++) {
				$("<div class=" + $DropClass + ">" + tmpDrop[i][0] + '</div>').data('number', tmpDrop[i][1]).appendTo('.drop').droppable( {
					
					accept: '.block div',
					hoverClass: 'hovered',
					drop: handleCardDrop,
					activate: handleDragEvent,
					
				});
				
			}
			
			//This randomizes the array coming to the function and this is done to randomize every instance of a game and avoid memorization of placements
			
			tmpArc.sort( function() { return Math.random() - .5 } );
			
			//This for loop is basically identical to the drop one but it simply handles the draggables. The difference is that the draggables are contained to the
			//.borderpatrol div so they can't force weird overflow/ scrolling issues on a tablet or end up becoming unreachable or flicked off the game area.
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class="+ $draggEr +"  >" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					disable: false
					
				});
				//Not exactly sure what it does but removing broke things. Investigate some other time.
				$("div .clockDrag").each(function(i){
					$(this).addClass("S"+(i+1))
				});
			
			}
			}
		
	});
	
}



//This function handles what happens when a draggable is put into a droppable
//Specifically it checks for the "number" data attribute and if it finds a match it adds a correct class and add the valid data attribute.
function handleCardDrop(event, ui) {
	var slotNumber = $(this).data('number');
	var cardNumber = ui.draggable.data('number');
	var isImage = $(this).hasClass('dropTargetImage');
	//the if is checking for images
	if (slotNumber == cardNumber &&  $draggEr == 'clockDrag') {
		ui.draggable.addClass('imageOikein');
		ui.draggable.data("valid", true);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		correct++
	}
	//This is for a normal text based one
	else if (slotNumber == cardNumber && $draggEr == 'numbero audioClass') {
		ui.draggable.addClass('oikein');
		ui.draggable.data("valid", true);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		correct++;
		
	//and this one will refuse to add valid or correct classes in case of a mis match in numbers.
	} else if (slotNumber !== cardNumber) {
		ui.draggable.data("valid",false);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
	}
	
}
// This one handles the dragging event for example when you drag it off a correct square it substracts from the correct pool preventing infinite points
function handleDragEvent(event, ui){
		if(ui.draggable.data("valid")) {
			ui.draggable.removeClass('oikein');
			ui.draggable.removeClass('imageOikein');
			correct--;
			ui.draggable.data("valid",false);
		}
		$('div#score').html(correct);
		
	}	
//This function checks for right answers and whenever it's pressed it'll lock all draggables down by disabling them. The correct way to reenable them back up is to press the "tarkista" button again. Otherwise it bugs out.
function validation(){
	$('#gameChangeButton').prop('disabled', function(i, v){ return !v; }).toggleClass('btn-warning');
	$('#editorButton').prop('disabled', function(k, y){ return !y; }).toggleClass('btn-danger');
	$('#validationButton').toggleClass('btn-info btn-danger').text(function(){if($('#validationButton').text() === 'Tarkista'){$('#validationButton').text('Jatka peliä')}else($('#validationButton').text('Tarkista'))});
	$('#addIt').toggle();
	if($("div").hasClass("oikein")){
		$(".oikein").toggleClass("finish");
		//Checks if the draggable is an image
	}else if($("div").hasClass("imageOikein")){
	$(".imageOikein").toggleClass("imageFinish");
	$('.imageOikein img').toggleClass('imageResize');
	};
	//this if structure checks if dragging should be disabled or not
	if(enableDragging == 1){
		$('.numbero').draggable('disable');
		$('.clockDrag').draggable('disable');
		enableDragging = 0;
	} else if (enableDragging == 0){
		$('.numbero').draggable('enable');
		$('.clockDrag').draggable('enable');
		enableDragging = 1;
	}
	//console.log("enableDragging status =" + enableDragging);
}

///////////////////////////////////////////////// ^ ABOVE FUNCTIONS HANDLE SWITCHING GAMES, VALIDATING ANSWERS, CREATING DRAGGABLES AND DROPPABLES AND MAKING THE DROPDOWN LIST ON INDEX.PHP ^ ///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// v BELOW FUNCTIONS HANDLE THE MAKING OF A NEW GAME v ///////////////////////////////////////////////////////////////////////////

//lists the datapoints and targets for review
//Select targets is used to store the new targets that are written during editing.
//Chunk stores the datapoint and the target pairs number so they can be saved into the xml file
var targetDatapointArray = [];
var selectTargets = [];
var chunk = [];
//Adds options to selects
//By pressing the #buttTarget button each individual target is first pushed to selectTargets and then put into an option as its text. The numerical value is so it can be recognized by its pair Datapoint.
$(document).ready(function(){
	$("#buttTarget").click(function(){
		
		$('.dexTarget').empty();
		selectTargets.push($("#targetPointer").val());
		//console.log(selectTargets);
		var t = 1;
		var opt = $('<option class=\'targetOption\'></option>')
				.attr("value", 0)
				.text("ei paria")
				.appendTo(".dexTarget");
			$.each(selectTargets, function(i){
				opt = $('<option class=\'targetOption\'></option>')
				.attr("value", t++)
				.text(selectTargets[i])
				.appendTo(".dexTarget");
				
			});
	
	});
	//Adds input and selecst to the Admin PHP page
	$("#addDataInput").click(function(){
		$('<div class=\"input-group delClass\"><input class=\'dataGlue form-control\'></input><span class=\"input-group-addon dexPlace\"></span></div>').appendTo("#listArrayBase");
		
		$('.dexTarget:first').clone().appendTo(".dexPlace:last");
		
	});
	// Removes the last input and select from the admin page
	$("#removeLastDP").click(function(){
		$(".delClass:last").remove();
	});
	//Removes the last target from the select list
	$("#removeLastTAR").click(function(){
		selectTargets.pop();
		$('.dexTarget').empty();
		var t = 1;
		var opt = $('<option class=\'targetOption\'></option>')
				.attr("value", 0)
				.text("ei paria")
				.appendTo(".dexTarget");
			$.each(selectTargets, function(i){
				opt = $('<option class=\'targetOption\'></option>')
				.attr("value", t++)
				.text(selectTargets[i])
				.appendTo(".dexTarget");
				
			});
		
	});

		
	

	
});		
			
	
//this one is for generating and editing a newly created XML file.
	//First it adds pair consisting of datapoints and targets to the chunk array
		//during this it checks if the datapoint is a picture and finds and maps the relevant values.
			//Note it's not actually taking the img values but gets the value from a hidden input that is above the picture.
 $(document).ready(function(){
		$('#XMLchanges').click(function(){
			var listing = $("#outputUL");
			
			chunk = [];
			var rawdata = [];
			if($('#listArrayBase img').hasClass('delPic')){
				//console.log("image detected");
				var preppingPush = ($('#listArrayBase').find(".hideInput, .dexTarget")).map(function(){return $(this).val();}).get();
			} else {
			var preppingPush = ($('#listArrayBase').find(".dataGlue, .dexTarget")).map(function(){return $(this).val();}).get();
			}
			//console.log(preppingPush);
			
			
			
			while(preppingPush.length > 0){
				chunk.push(preppingPush.splice(0 , 2));
			}
			//console.log(chunk);
	
				$("#outputUL").html("");	
			$.each(chunk, function(i){
				var li = $('<li>')
				.appendTo(listing)
				.text(chunk[i]);
			
			
				
	});
	//after the the values are stored in the chunk array, relevant data is gathered.
		//generatedFile is the xml files name and address
		//redirect window opens another window to preview.php and sends the name of the new xml file forward so the user doesn't have to write it again
		//dataPointToAdd are the values of added movable objects aka datapoints
		//targetToAdd is basically the same thing but for the specific target in the select right next to the datapoint
		//output is a P tag in admin.php that lists the pairs.
		//isImage is a variable that is sent to the PHP file to specifically tell it to generate an image based game xml file.
		var generatedFile = $('#address').val() + '.xml';
		//console.log(generatedFile);
		
		var redirectWindow = window.open('preview.php?thing='+generatedFile, '_blank');
		
		var dataPointToAdd = $('#dataPointer').val();
		var targetToAdd = $('#targetPointer').val();
		var output = $('#output').val();
		
		var isImage;
		if($('#listArrayBase img').hasClass('delPic')){
			isImage = "true";
		} else {
			isImage = "false";
		}
		//console.log("Image status" + isImage);
		
		//This ajax sends the data gathered by the above variables and after it gets its answer it redirects to the preview.php page
		$.ajax({
			url: 'changeTheXMLfile.php',
			type: 'POST',
			dataType: 'text',
			cache: false,
			data: {address: generatedFile, chunk: chunk, selectTargets: selectTargets, isImage: isImage},
			
			error: function( data ){
				console.log("An error has happened" + data)
			},
			success: function( data ){
				//console.log(data);
				
				redirectWindow;
				
			}
			
			
		});
		
	});	

	//After the XML has been made and the user is redirected to the preview page they can name the file whatever they wish and export it into the list on the index file for other users to play.
	$("#exportNewgame").click(function(){
		var exportPreview = $("#previewedFileName").val();
		var exportingName = $("#exportName").val();
		
		var redirectWindowOther = window.open('index.php?incoming='+exportPreview, '_blank');
		
		$.ajax({
			url: "listMaker.php",
			type: 'POST',
			datatype: 'text',
			data: {previewedFileName: exportPreview, exportingName: exportingName},
			cache: false,
			success: function(returnedXMLResponse){
				//console.log(returnedXMLResponse);
				redirectWindowOther;
				
			}
		});
	
	});
	
///////////////////////////////////////////////// ^ ABOVE FUNCTIONS HANDLE MAKING A NEW GAME ^ ///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// v BELOW FUNCTIONS HANDLE EDITING OF OLD FILES v ///////////////////////////////////////////////
	
	//This loads the editable file
	//Do note that if you change the folder name and location of the xml files importEdit MUST BE CHANGED accordingly.
	$("#editEngage").click(function(){
		var importEdit = 'xml/'+$("#editable").val();
		//what happens in this ajax function is that the xml file gets read and datapoints and targets are implemented as elements and the xmls ID, SRC, Clock attributes and text are used as building blocks
		$.ajax({
			url: importEdit,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				$('target', returnedXMLResponse).each(function(){
					var editableTargets = $(this).text();
					var targetID = $(this).attr('id');
					
					
					$('<option class="targetOption"></option>')
						.attr("value", targetID)
						.text(editableTargets)
						.appendTo(".dexTarget:first");
				});	
				
				
				$('dataPoint',returnedXMLResponse).each(function(){
					var clocks = $(this).attr('clocks');
					var isAnImage = $(this).attr('src');
					var contentsEditable = $(this).text();
					var targetPair = $(this).attr('target');
					
					if(clocks){
						$('<div class="wrapUp"><input class="hideInput" value="' + isAnImage + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + isAnImage + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo("#spawnEditables");
						$('.dexTarget:first').clone().val(targetPair).appendTo(".delClass:last");
					} else {
						$('<div class="wrapUp"><div class="input-group delClass"><input class="dataGlue form-control" data-target=' + targetPair + ' value="'+ contentsEditable +' "></input><span class="input-group-addon dexPlace"></span></div><button class="removebtn">Poista osio</button></div>').appendTo("#spawnEditables");
						$('.dexTarget:first').clone().val(targetPair).appendTo(".dexPlace:last");
					}
					
					
					 
					
					 
					
				}); 
				
				
				
				
				
			}
		});
	
	});
	
	var editArrayTargets = [];
	
	//This adds another target into the selects
	$("#addNotherTargetToFirstSelect").click(function(){
		$("<option class='targetOption'></option>").text($("#addOptionTargetToList").val()).val(+$("option:last").val()+1).appendTo(".dexTarget");
	});
	//Removes the last target from the edit page
	$("#removeLastTARedit").click(function(){
		var slamTar = [];
		
		slamTar = $(".dexTarget:first .targetOption").map(function() { return [$(this).text()]; }).get();
		
		slamTar.pop();
		
		$('.dexTarget').empty();
		var t = 1;
				var opt = $('<option></option>')
				.attr("value", 0)
				.text("Ei paria")
				.appendTo(".dexTarget");
			$.each(slamTar, function(i){
				opt = $('<option class=\'targetOption\'></option>')
				.attr("value", t++)
				.text(slamTar[i])
				.appendTo(".dexTarget");
				
			});
		
	});
	
	//add an input to edit page
	$('#comeOn').click(function(){
		$('<div class="wrapUp"><div class=\"input-group delClass\"><input class=\'dataGlue form-control\'></input><span class=\"input-group-addon dexPlace\"></span></div><button class="removebtn">Poista osio</button></div>').appendTo("#spawnEditables");
		
		$('.dexTarget:first').clone().appendTo(".dexPlace:last");
		
	
			
	});
	console.log('we did it reddit!');
	//After the XML file has been loaded by #editEngage and the changes have been made you use the below function to upload said edits back into the file
		//How this works in practice is that the old file is copied, moved and then deleted/ unlinked to the oldXMLs folder.
			//Otherwise the process is exactly the same as when making a new xml file.
	$("#UploadEditAndContinue").click(function(){
		
		editArrayTargets = [];
		chunk = [];
		
		var tisNotaTest = [];
		tisNotaTest = $(".dexTarget:first .targetOption").map(function() { return [$(this).text(), $(this).val()]; }).get();
		
		while(tisNotaTest.length > 0){
				editArrayTargets.push(tisNotaTest.splice(0 , 2));
			}
		console.log(editArrayTargets);
		if($('#spawnEditables img').hasClass('delPic')){
				
				var preppingPush = ($('#spawnEditables').find(".hideInput, .dexTarget")).map(function(){return $(this).val();}).get();
			} else {
		var preppingPush = ($('#spawnEditables').find(".dataGlue, .dexTarget")).map(function(){return $(this).val();}).get();
			}
		
		while(preppingPush.length > 0){
				chunk.push(preppingPush.splice(0 , 2));
			}
		
		
		var exportPreviewEdit = $("#editable").val();
		if($('#spawnEditables img').hasClass('delPic')){
			isImage = "true";
		} else {
			isImage = "false";
		}
		var redirectWindowOther = window.open('index.php?incoming='+exportPreviewEdit, '_blank');
		
		$.ajax({
			url: "finalEdit.php",
			type: 'POST',
			datatype: 'text',
			data: {address: exportPreviewEdit, chunk: chunk, selectTargets: editArrayTargets, isImage: isImage},
			cache: false,
			success: function(returnedXMLResponse){
				//console.log(returnedXMLResponse);
				redirectWindowOther;
				
			}
		});
	
	});
	//This is simply a remove button for an added image.
	$(document).on('click', '.removebtn', function () {
        $(this).parent().remove();   
    });
	
	
	//This handles the Pictures for new xml files
		// Essentially how it works is that the php code searches through given folder name from teh drop down list
			//after that it simply goes through the folder and adds them all into the "#listArrayBase" div on the admin.php page.
	$("#lisaaKuvia").click(function(){
		var folderOfPics = $("#listOfFolders43").val();
		console.log(folderOfPics);
		$.ajax({
			url: "searchFolderForImg.php",
			type: "POST",
			datatype: "text",
			data: {folder: folderOfPics},
			cache: false,
			success: function(data){
				//console.log(data);
				$("#listArrayBase").html(data);
				
				$(".dexTarget:first").clone().appendTo(".delClass");
				
			}
			
		});
		
	});
var tunk = 1;
	//imagePreviewer functions
		//This does almost exactly what the above image function does but instead of dumping all the images into the listArrayBase
			//it adds them to a preview div for easy perusal of available images.
			
				//This first one simply triggers the base folder at document.ready.
	if (tunk = 1){
		$(".imagePreviewer").hide();
		$(document).ready(function(){
		var folderOfPics = $("#listOfFolders43").val();
		console.log(folderOfPics);
		$.ajax({
			url: "imagePreviewer.php",
			type: "POST",
			datatype: "text",
			data: {folder: folderOfPics},
			cache: false,
			success: function(data){
				console.log(data);
				$(".imagePreviewer").html(data);
				
			}
		});
		
	});
		//This one changes the folder whenever the folder dropdown value changes
		$("#listOfFolders43").change(function(){
		var folderOfPics = $("#listOfFolders43").val();
		console.log(folderOfPics);
		$.ajax({
			url: "imagePreviewer.php",
			type: "POST",
			datatype: "text",
			data: {folder: folderOfPics},
			cache: false,
			success: function(data){
				console.log(data);
				$(".imagePreviewer").html(data);
				
			}
		});
		
	});
	
	//The pic previewer is always hidden and this simply shows it to the user.
	$("#openPicAdder").click(function(){
		$(".imagePreviewer").toggle();
	});
	};
	
	//What this does is add a single picture the same way you would do to with the function that adds all teh folders pictures.
		//works by just clicking the picture in the image previewer
			//$(this).attr(src) refers to the source of the picture otherwise the code is the same as other that adds different elements.
	$(document).on('click','.imagePreviewer img', function(){
			var funky = $(this).attr('src')
			//console.log(funky);
			if ($("#spawnEditables").length === 0){
				$('<div class="wrapUp"><input class="hideInput" value="' + funky + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + funky + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo('#listArrayBase');
			} else {
			$('<div class="wrapUp"><input class="hideInput" value="' + funky + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + funky + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo('#spawnEditables');
			}
			$(".dexTarget:first").clone().appendTo(".delClass:last");
		});
});

//////////////////////////////////////// ^ ABOVE FUNCTIONS HANDLE EDITING OF OLD FILES ^ //////////////////////////////////////////////////////////
 
 //This functions handles the previewing of an XML file.
	//in practice it's completely the same with the change function that switches game xmls. Only difference is that it affects the preview.php page.
$(document).ready(function(){
$('#initPreview').click(function(){
	correct = 0;
	$('.block').html( '' );
	$('.drop').html( '' );
	$("#finale").hide();
	//this generates the draggables from the generate.xml file form the datapoint element
	var tmpArc=[];
	var tmpDrop=[];
	var xmlFileName = 'xml/' + $("#previewedFileName").val();

	$.ajax({
			url: xmlFileName,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse)
				$('dataPoint',returnedXMLResponse).each(function(){
					var $content;
					var $src = $(this).attr('src');
					var $clocks = $(this).attr('clocks');
					
						if ($src == null) {
							$content = $(this).text();
							$DropClass = 'dropTarget';
							$draggEr = 'numbero audioClass';
							//this next one loads in image based xmls
						} else if ($clocks == "true") {
							$content = '<img src="' +  $(this).attr('src') + '" class="imgReg"/>';
							$DropClass = 'clockDrop';
							$draggEr = 'clockDrag';
						
						} 
					
					
					
					var row = [$content , $(this).attr('target')];
					
					tmpArc.push(row);
					
					
	
			})
			
			$('target',returnedXMLResponse).each(function(){
	
					var targetting = [$(this).text() , $(this).attr('id')]
					tmpDrop.push(targetting);
			});
			
			for (var i=0; i<tmpDrop.length; i++) {
				$("<div class=" + $DropClass + ">" + tmpDrop[i][0] + '</div>').data('number', tmpDrop[i][1]).appendTo('.drop').droppable( {
					
					accept: '.block div',
					hoverClass: 'hovered',
					drop: handleCardDrop,
					activate: handleDragEvent
				});
				//console.log(i +  ': data-number ' + $('#item_'+tmpDrop[i]).data('number'));
			};
			//console.log(tmpArc);
			//This here randomizes the draggables and then makes them into different divs with the numbero class.
			
	
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class="+ $draggEr +" onclick=\"\" >" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					
					//revert: true
				});
				$("div .clockDrag").each(function(i){
					$(this).addClass("S"+(i+1))
				});
			
			}
		}
		
	});
	
	});
	
});



 

 

