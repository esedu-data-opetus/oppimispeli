//Quick javascript
var correct = 0;
var enableDragging = 1;
//$(document).bind('touchmove', false);
$( init );
$(document).ready(
	function(){
		$("#saving").hide();
		$('div#score').hide();
		
	});
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
});
$(document).ready(function(){
	if (window.location.pathname == '/quick/index.php'){
		$(document).bind('touchmove', false);
		//console.log("AWWWW YEEEEEE!")
		$('html, body').css({
			'overflow': 'hidden',
			'height': '100%'
		});
		};
	
});

//The initialization function
function init() {
console.log("It works dumdum");
	$.ajax({
			url: 'xml/quick.xml',
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse);
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

function change() {
	var enableDragging = 1;
	console.log(enableDragging);
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

	$.ajax({
			url: xmlFileName,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				console.log (returnedXMLResponse);
				$('dataPoint',returnedXMLResponse).each(function(){
					var $content;
					var $src = $(this).attr('src');
					var $clocks = $(this).attr('clocks')
					
						if ($src == null) {
							$content = $(this).text();
							$DropClass = 'dropTarget';
							$draggEr = 'numbero audioClass';
						} else if ($clocks == "true") {
							$content = '<img src="' +  $(this).attr('src') + '" class="imgReg"/>';
							$DropClass = 'clockDrop';
							$draggEr = 'clockDrag';
						
						} else {
							$content = '<img src="' +  $(this).attr('src') + ' height=\'150\' width=\'150\' />';
							$DropClass = 'dropTargetImage' + $(this).text();
							$draggEr = 'imageDragger';
						}
					
					
					
					var row = [$content , $(this).attr('target')];
					
					tmpArc.push(row);
					
					
	
			})
			
			$('target',returnedXMLResponse).each(function(){
	
					var targetting = [$(this).text() , $(this).attr('id')]
					tmpDrop.push(targetting);
			})
			
			for (var i=0; i<tmpDrop.length; i++) {
				$("<div class=" + $DropClass + ">" + tmpDrop[i][0] + '</div>').data('number', tmpDrop[i][1]).appendTo('.drop').droppable( {
					
					accept: '.block div',
					hoverClass: 'hovered',
					drop: handleCardDrop,
					activate: handleDragEvent,
					
				});
				//console.log(i +  ': data-number ' + $('#item_'+tmpDrop[i]).data('number'));
			}
			//console.log(tmpArc);
			//This here randomizes the draggables and then makes them into different divs with the numbero class.
			
			tmpArc.sort( function() { return Math.random() - .5 } );
			for (var j=0; j<tmpArc.length; j++) {
	
				$("<div class="+ $draggEr +" onclick=\"\" >" + tmpArc[j][0] + '</div>').data('number', tmpArc[j][1]).appendTo('.block').draggable( {
					containment: '.borderPatrol',
					stack: '.block div',
					cursor: 'move',
					disable: false
					//revert: true
				});
				$("div .clockDrag").each(function(i){
					$(this).addClass("S"+(i+1))
				});
			
			}
			}
		
	});
	
}



//This function handles what happens when a draggable is put into a droppable
function handleCardDrop(event, ui) {
	var slotNumber = $(this).data('number');
	var cardNumber = ui.draggable.data('number');
	var isImage = $(this).hasClass('dropTargetImage');
	//var isAclock = $(draggEr).hasClass('clockDrag');
	
	//console.log("card " + cardNumber);
	//console.log("slot " + slotNumber);
	if (slotNumber == cardNumber &&  $draggEr == 'clockDrag') {
		ui.draggable.addClass('imageOikein');
		ui.draggable.data("valid", true);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		correct++
	}
	
	else if (slotNumber == cardNumber && $draggEr == 'numbero audioClass') {
		ui.draggable.addClass('oikein');
		ui.draggable.data("valid", true);
		//ui.draggable.draggable('disable');
		//$(this).droppable('disable');
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
		//ui.draggable.draggable('option', 'revert', false);
		correct++;
		
		
	} else if (slotNumber !== cardNumber) {
		ui.draggable.data("valid",false);
		ui.draggable.position( { of: $(this), my:'left top', at: 'left top'});
	}
	$('div#score').html(correct);
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
//This function checks for right answers
function validation(){
	if($("div").hasClass("oikein")){
		$(".oikein").toggleClass("finish");
		
	}else if($("div").hasClass("imageOikein")){
	$(".imageOikein").toggleClass("imageFinish");
	$('.imageOikein img').toggleClass('imageResize');
	};
	if(enableDragging == 1){
		$('.numbero').draggable('disable');
		$('.clockDrag').draggable('disable');
		enableDragging = 0;
	} else if (enableDragging == 0){
		$('.numbero').draggable('enable');
		$('.clockDrag').draggable('enable');
		enableDragging = 1;
	}
	console.log("Jee jee" + enableDragging);
}
//Audio worker. It looks bad. Fix it later you dolt.
/* $(document).ready(function() {
      var obj = document.createElement("audio");
      obj.src="audio/5vaille7.ogg";
        obj.volume=1.0;
        obj.autoPlay=false;
        obj.preLoad=true;       
			$("body").bind('touchstart', '.S1', function(){ 
			obj.play();
			});
		var sound2 = document.createElement("audio");
		sound2.src="audio/tasanKLO10.ogg";
        sound2.volume=1.0;
        sound2.autoPlay=false;
        sound2.preLoad=true;       
			$("body").on('mousedown', '.S2', function(){
			sound2.play();
			});
		var sound3 = document.createElement("audio");
		sound3.src="audio/15vaille5.ogg";
        sound3.volume=1.0;
        sound3.autoPlay=false;
        sound3.preLoad=true;       
			$("body").on('mousedown', '.S3', function(){
			sound3.play();
			});
		var sound4 = document.createElement("audio");
		sound4.src="audio/15yli5.ogg";
        sound4.volume=1.0;
        sound4.autoPlay=false;
        sound4.preLoad=true;       
			$("body").on('mousedown', '.S4', function(){
			sound4.play();
			});
		var sound5 = document.createElement("audio");
		sound5.src="audio/20vaille8.ogg";
        sound5.volume=1.0;
        sound5.autoPlay=false;
        sound5.preLoad=true;       
			$("body").on('mousedown', '.S5', function(){
			sound5.play();
			});
		var sound6 = document.createElement("audio");
		sound6.src="audio/25yli12.ogg";
        sound6.volume=1.0;
        sound6.autoPlay=false;
        sound6.preLoad=true;       
			$("body").on('mousedown', '.S6', function(){
			sound6.play();
			});
		var sound7 = document.createElement("audio");
		sound7.src="audio/20yli8.ogg";
        sound7.volume=1.0;
        sound7.autoPlay=false;
        sound7.preLoad=true;       
			$("body").on('mousedown', '.S7', function(){
			sound7.play();
			});
		var sound8 = document.createElement("audio");
		sound8.src="audio/tasan2.ogg";
        sound8.volume=1.0;
        sound8.autoPlay=false;
        sound8.preLoad=true;       
			$("body").on('mousedown', '.S8', function(){
			sound8.play();
			});
		var sound9 = document.createElement("audio");
		sound9.src="audio/tasan9.ogg";
        sound9.volume=1.0;
        sound9.autoPlay=false;
        sound9.preLoad=true;       
			$("body").on('mousedown', '.S9', function(){
			sound9.play();
			});
		var sound10 = document.createElement("audio");
		sound10.src="audio/puoli4.ogg";
        sound10.volume=1.0;
        sound10.autoPlay=false;
        sound10.preLoad=true;       
			$("body").on('mousedown', '.S10', function(){
			sound10.play();
			});
		var sound11 = document.createElement("audio");
		sound11.src="audio/puoli3.ogg";
        sound11.volume=1.0;
        sound11.autoPlay=false;
        sound11.preLoad=true;       
			$("body").on('mousedown', '.S11', function(){
			sound11.play();
			});
		var sound12 = document.createElement("audio");
		sound12.src="audio/tasan12.ogg";
        sound12.volume=1.0;
        sound12.autoPlay=false;
        sound12.preLoad=true;       
			$("body").on('mousedown', '.S12', function(){
			sound12.play();
			});
		
        }); */
//lists the datapoints and targets for review
var targetDatapointArray = [];
var selectTargets = [];
var chunk = [];
//Adds options to selects
$(document).ready(function(){
	$("#buttTarget").click(function(){
		//$("#listArrayBase").empty();
		$('.dexTarget').empty();
		selectTargets.push($("#targetPointer").val());
		console.log(selectTargets);
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
				//$(".targetOption:first").attr("value",0).text("Ei paria");
			});
	
	});
	//Adds input and selecst to the Admin PHP page
	$("#addDataInput").click(function(){
		$('<div class=\"input-group delClass\"><input class=\'dataGlue form-control\'></input><span class=\"input-group-addon dexPlace\"></span></div>').appendTo("#listArrayBase");
		
		$('.dexTarget:first').clone().appendTo(".dexPlace:last");
		
	});
	// Removes the last input and select from the admin page
	$("#removeLastDP").click(function(){
		/* $(".dataGlue").last().remove();
		$(".dexPlace").last().remove();
		$(".dexTarget").last().remove(); */
		$(".delClass:last").remove();
	});
	//Removes the last target from the select list
	$("#removeLastTAR").click(function(){
		selectTargets.pop();
		$(".targetOption").last().remove();
	});
	//adds targets to a list
$("#addToList").click(function(){
		
	var listing = $("#outputUL");
			
			chunk = [];
			var rawdata = [];
			if($('#listArrayBase img').hasClass('delPic')){
				console.log("Arr me mateys")
				var preppingPush = ($('#listArrayBase').find(".hideInput, .dexTarget")).map(function(){return $(this).val();}).get();
			} else {
			var preppingPush = ($('#listArrayBase').find(".dataGlue, .dexTarget")).map(function(){return $(this).val();}).get();
			}
			console.log(preppingPush);
			/* var m,n,tempSlicedtoTwoArray,chunk = preppingPush.length;
			for (m=0,n=preppingPush.length; m<n; m+=chunk){
				tempSlicedtoTwoArray = preppingPush.slice(m,m+chunk);
			} */
			
			while(preppingPush.length > 0){
				chunk.push(preppingPush.splice(0 , 2));
			}
			console.log(chunk);
			//console.log(tempSlicedtoTwoArray);
			//targetDatapointArray.push(chunk, selectTargets);
			//console.log(targetDatapointArray);
			//$(".dataGlue .dexTarget").each(function(i, e){
				//rawdata.push(testingDT);
				//targetDatapointArray.push(rawdata);
				$("#outputUL").html("");	
			$.each(chunk, function(i){
				var li = $('<li>')
				.appendTo(listing)
				.text(chunk[i]);
			
			//console.log(targetDatapointArray);
				
	});
});
	
});		
			
	
//this one is for generating and editing a newly created XML file.
 //var generatedFile = $('#address').val() + '.xml';	
 $(document).ready(function(){
		$('#XMLchanges').click(function(){
		var generatedFile = $('#address').val() + '.xml';
		//var exportPreview = $("#previewedFileName").val();
		console.log(generatedFile);
		var redirectWindow = window.open('preview.php?thing='+generatedFile, '_blank');
		//var redirectWindowOther = window.open('index.php?incoming='+exportPreview, '_blank');
		var generatedFile = $('#address').val() + '.xml';
		var dataPointToAdd = $('#dataPointer').val();
		var targetToAdd = $('#targetPointer').val();
		var output = $('#output').val();
		var arrayOfXMLdataPoints = [];
		var arrayOfXMLtargets = [];
		var isImage;
		if($('img').hasClass('delPic')){
			isImage = "true";
		} else {
			isImage = "false";
		}
		console.log(isImage);
		$.ajax({
			url: 'changeTheXMLfile.php',
			type: 'POST',
			dataType: 'text',
			cache: false,
			data: {address: generatedFile, chunk: chunk, selectTargets: selectTargets, isImage: isImage},
			//data: { address: generatedFile, dataPointer: dataPointToAdd, targetPointer: targetToAdd },
			error: function( data ){
				console.log("It didn't work you dolt" + data)
			},
			success: function( data ){
				console.log(data);
				//console.log(JSON.stringify(targetDatapointArray));
				//console.log("success");
				//console.log(data.dataPointer );
				redirectWindow;
				
			}
			/* success: function( data ){
				console.log('success' + data);
				//Below code: Remove the ajax and make it a Json return dealio.
				success: function(returnedXMLResponse) {
					$('dataPoint',returnedXMLResponse).each(function(){
						var $allTheNewData = $(this).text();
						var dataPointarray = [$allTheNewData];
						arrayOfXMLdataPoints.push(dataPointarray);
					});
					console.log(arrayOfXMLdataPoints);
					$('target',returnedXMLResponse).each(function(){
						var $nearlyDoneTar = $(this).text();
						var targetArray1 = [$nearlyDoneTar];
						arrayOfXMLtargets.push(targetArray1);
					});
					for (var o=0; 0<arrayOfXMLdataPoints.length; o++){
						$("<input></input><select id=\'allTargets\'></select>")
							.appendTo("#output");
					};
					console.log(targetArray1);
					for (var p=0; 0<targetArray1.length; p++){
						$('#allTargets')
							.append($("<option></option>")
							.attr("value", targetArray1[i])
							.text(value));
					}
					
					
				}
			}) */
				
			//}
			
		});
		
	});	

	
	$("#exportNewgame").click(function(){
		var exportPreview = $("#previewedFileName").val();
		var exportingName = $("#exportName").val();
		console.log(exportingName);
		var redirectWindowOther = window.open('index.php?incoming='+exportPreview, '_blank');
		
		$.ajax({
			url: "listMaker.php",
			type: 'POST',
			datatype: 'text',
			data: {previewedFileName: exportPreview, exportingName: exportingName},
			cache: false,
			success: function(returnedXMLResponse){
				console.log(returnedXMLResponse);
				redirectWindowOther;
				
			}
		});
	
	});
	//This loads the editable file
	$("#editEngage").click(function(){
		var importEdit = 'xml/'+$("#editable").val();
		
		$.ajax({
			url: importEdit,
			type: 'GET',
			datatype: 'xml',
			cache: false,
			success: function(returnedXMLResponse){
				$('target', returnedXMLResponse).each(function(){
					var editableTargets = $(this).text();
					var targetID = $(this).attr('id');
					console.log(editableTargets);
					
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
					//console.log(targetPair);
					if(clocks){
						$('<div class="wrapUp"><input class="hideInput" value="' + isAnImage + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + isAnImage + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo("#spawnEditables");
						$('.dexTarget:first').clone().val(targetPair).appendTo(".delClass:last");
					} else {
						$('<div class="input-group delClass"><input class="dataGlue form-control" data-target=' + targetPair + ' value="'+ contentsEditable +' "></input><span class="input-group-addon dexPlace"></span></div>').appendTo("#spawnEditables");
						$('.dexTarget:first').clone().val(targetPair).appendTo(".dexPlace:last");
					}
					
					
					 
					//$('select option[value="' + targetPair + '"]').attr("selected", true);
					
					//$('.delClass:first').clone().appendTo("#spawnEditables");
					
					//slashContents.push(contentsEditable);
					//console.log(slashContents)
					//console.log(contentsEditable);
					/* $('<div class=\"input-group delClass\"></div>')
					.appendTo('#spawnEditables');
					$('<input class=\'dataGlue form-control\'></input>')
					.text(contentsEditable)
					.appendTo('.delClass');
					$('<span class=\"input-group-addon dexPlace\"></span>')
					.appendTo('.delClass');
					
					
					$('.dexTarget:first').clone().appendTo(".dexPlace:last");*/
					
					/* if($('input').data('target') == $('select').val()){
						
						$('option').attr('selected','selected');
						} else {
							console.log($('select').val());
						
						} */
					 
					
				}); 
				
				
				
				
				
			}
		});
	
	});
	//This makes all current option elements of teh first select into an array ready for export into xml.
	var editArrayTargets = [];
	$("#finalizeEdit").click(function(){
		editArrayTargets = [];
		chunk = [];
		/* editArrayTargets.push($("select:first option").text(), $("select:first option").val()); */
		var tisNotaTest = [];
		tisNotaTest = $(".dexTarget:first .targetOption").map(function() { return [$(this).text(), $(this).val()]; }).get();
		
		while(tisNotaTest.length > 0){
				editArrayTargets.push(tisNotaTest.splice(0 , 2));
			}
		console.log(editArrayTargets);
		if($('#spawnEditables img').hasClass('delPic')){
				console.log("Arr me mateys")
				var preppingPush = ($('#spawnEditables').find(".hideInput, .dexTarget")).map(function(){return $(this).val();}).get();
			} else {
		var preppingPush = ($('#spawnEditables').find(".dataGlue, .dexTarget")).map(function(){return $(this).val();}).get();
			}
		//console.log(preppingPush);
		while(preppingPush.length > 0){
				chunk.push(preppingPush.splice(0 , 2));
			}
		console.log(chunk);
		});
		
	$("#addNotherTargetToFirstSelect").click(function(){
		$("<option class='targetOption'></option>").text($("#addOptionTargetToList").val()).val(+$("option:last").val()+1).appendTo(".dexTarget");
	});
	$("#UploadEditAndContinue").click(function(){
		var exportPreviewEdit = $("#editable").val();
		if($('img').hasClass('delPic')){
			isImage = "true";
		} else {
			isImage = "false";
		}
		//var redirectWindowOther = window.open('index.php?incoming='+exportPreviewEdit, '_blank');
		
		$.ajax({
			url: "finalEdit.php",
			type: 'POST',
			datatype: 'text',
			data: {address: exportPreviewEdit, chunk: chunk, selectTargets: editArrayTargets, isImage: isImage},
			cache: false,
			success: function(returnedXMLResponse){
				console.log(returnedXMLResponse);
				//redirectWindowOther;
				
			}
		});
	
	});
	$(document).on('click', '.removebtn', function () {
        $(this).parent().remove();   
    });
	
	
	//This handles the Pictures for new xml files
	
	$("#lisaaKuvia").click(function(){
		var folderOfPics = $("#listOfFolders43").val();
		console.log(folderOfPics);
		$.ajax({
			url: "searchFolderForImg.php",
			type: "POST",
			datatype: "text",
			data: {folder: folderOfPics},
			cache: false,
			success(data){
				console.log(data);
				$("#listArrayBase").html(data);
				
				$(".dexTarget:first").clone().appendTo(".delClass");
				
			}
			
		});
		
	});
var tunk = 1;
	//imagePreviewer functions
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
			success(data){
				console.log(data);
				$(".imagePreviewer").html(data);
				
			}
		});
		
	});
		$("#listOfFolders43").change(function(){
		var folderOfPics = $("#listOfFolders43").val();
		console.log(folderOfPics);
		$.ajax({
			url: "imagePreviewer.php",
			type: "POST",
			datatype: "text",
			data: {folder: folderOfPics},
			cache: false,
			success(data){
				console.log(data);
				$(".imagePreviewer").html(data);
				
			}
		});
		
	});
	$("#openPicAdder").click(function(){
		$(".imagePreviewer").toggle();
	});
	};
	$(document).on('click','.imagePreviewer img', function(){
			var funky = $(this).attr('src')
			console.log(funky);
			if ($("#spawnEditables").length === 0){
				$('<div class="wrapUp"><input class="hideInput" value="' + funky + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + funky + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo('#listArrayBase');
			} else {
			$('<div class="wrapUp"><input class="hideInput" value="' + funky + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + funky + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo('#spawnEditables');
			}
			$(".dexTarget:first").clone().appendTo(".delClass:last");
		});
});
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
						} else if ($clocks == "true") {
							$content = '<img src="' +  $(this).attr('src') + '" height=\'95\' width=\'100\' />';
							$DropClass = 'clockDrop';
							$draggEr = 'clockDrag';
						
						} else {
							$content = '<img src="' +  $(this).attr('src') + ' height=\'90\' width=\'90\' />';
							$DropClass = 'dropTargetImage' + $(this).text();
							$draggEr = 'imageDragger';
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



 

 

