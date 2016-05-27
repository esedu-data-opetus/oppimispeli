function init() {
	
    $.ajax({
        url: "xml/quick.xml",
        type: "GET",
        datatype: "xml",
        cache: !1,
        success: function(a) {
            $("dataPoint", a).each(function() {
                var a = $(this).text(),
                    t = $(this).attr("src");
                $("<option></option>").text(a).val(t).appendTo("#XmlName")
            })
        }
    })
}

if (window.location.href.indexOf("index") > -1){
	
	
		$(document).bind('touchmove', function(e){
		   
			 e.preventDefault();
		   
		
	  });
	  
	
};

	
function change() {
	$('#ohjeetEtusivu').remove();
    correct = 0, $(".block").html(""), $(".drop").html(""), $("#finale").hide();
    var a, t = [],
        e = [];
    a = $("#addIt").val() ? "xml/" + $("#addIt").val() : "xml/" + $("#XmlName").val(), $.ajax({
        url: a,
        type: "GET",
        datatype: "xml",
        cache: !1,
        success: function(a) {
            $("dataPoint", a).each(function() {
                var a, e = $(this).attr("src"),
                    i = $(this).attr("clocks");
                null == e ? (a = $(this).text(), $DropClass = "dropTarget", $draggEr = "numbero audioClass") : "true" == i && (a = '<img src="' + $(this).attr("src") + '" class="imgReg"/>', $DropClass = "clockDrop", $draggEr = "clockDrag");
                var n = [a, $(this).attr("target")];
                t.push(n)
            }), $("target", a).each(function() {
                var a = [$(this).text(), $(this).attr("id")];
                e.push(a)
            });
            for (var i = 0; i < e.length; i++) $("<div class=" + $DropClass + ">" + e[i][0] + "</div>").data("number", e[i][1]).appendTo(".drop").droppable({
                accept: ".block div",
                hoverClass: "hovered",
                drop: handleCardDrop,
                activate: handleDragEvent
            });
            t.sort(function() {
                return Math.random() - .5
            });
            for (var n = 0; n < t.length; n++) $("<div class=" + $draggEr + "  >" + t[n][0] + "</div>").data("number", t[n][1]).appendTo(".block").draggable({
                containment: ".borderPatrol",
                stack: ".block div",
                cursor: "move",
                disable: !1
            }), $("div .clockDrag").each(function(a) {
                $(this).addClass("S" + (a + 1))
            })
        }
    })
}

function handleCardDrop(a, t) {
    var e = $(this).data("number"),
        i = t.draggable.data("number");
    $(this).hasClass("dropTargetImage");
    e == i && "clockDrag" == $draggEr ? (t.draggable.addClass("imageOikein"), t.draggable.data("valid", !0), t.draggable.position({
        of: $(this),
        my: "left top",
        at: "left top"
    }), correct++) : e == i && "numbero audioClass" == $draggEr ? (t.draggable.addClass("oikein"), t.draggable.data("valid", !0), t.draggable.position({
        of: $(this),
        my: "left top",
        at: "left top"
    }), correct++) : e !== i && (t.draggable.data("valid", !1), t.draggable.position({
        of: $(this),
        my: "left top",
        at: "left top"
    }))
}

function handleDragEvent(a, t) {
    t.draggable.data("valid") && (t.draggable.removeClass("oikein"), t.draggable.removeClass("imageOikein"), correct--, t.draggable.data("valid", !1)), $("div#score").html(correct)
}

function validation() {
    $("#gameChangeButton").prop("disabled", function(a, t) {
        return !t
    }).toggleClass("btn-warning"), $("#editorButton").prop("disabled", function(a, t) {
        return !t
    }).toggleClass("btn-danger"), $("#validationButton").toggleClass("btn-info btn-danger").text(function() {
        "Tarkista" === $("#validationButton").text() ? $("#validationButton").text("Jatka peliä") : $("#validationButton").text("Tarkista")
    }), $("div").hasClass("oikein") ? $(".oikein").toggleClass("finish") : $("div").hasClass("imageOikein") && ($(".imageOikein").toggleClass("imageFinish"), $(".imageOikein img").toggleClass("imageResize")), 1 == enableDragging ? ($(".numbero").draggable("disable"), $(".clockDrag").draggable("disable"), enableDragging = 0) : 0 == enableDragging && ($(".numbero").draggable("enable"), $(".clockDrag").draggable("enable"), enableDragging = 1)
	$('#addIt').toggle();
}
var correct = 0,
    enableDragging = 1;
$(init), $(document).ready(function() {
    $.ajaxSetup({
        cache: !1
    })
}), $(document).ready(function() {
    "/quick/index.php" == window.location.pathname && ($(document).bind("touchmove", !1), $("html, body").css({
        overflow: "hidden",
        height: "100%"
    }))
});
var targetDatapointArray = [],
    selectTargets = [],
    chunk = [];
$(document).ready(function() {
    $("#buttTarget").click(function() {
        $(".dexTarget").empty(), selectTargets.push($("#targetPointer").val());
        var a = 1,
            t = $("<option class='targetOption'></option>").attr("value", 0).text("ei paria").appendTo(".dexTarget");
        $.each(selectTargets, function(e) {
            t = $("<option class='targetOption'></option>").attr("value", a++).text(selectTargets[e]).appendTo(".dexTarget")
        })
    }), $("#addDataInput").click(function() {
        $('<div class="input-group delClass"><input class=\'dataGlue form-control\'></input><span class="input-group-addon dexPlace"></span></div>').appendTo("#listArrayBase"), $(".dexTarget:first").clone().appendTo(".dexPlace:last")
    }), $("#removeLastDP").click(function() {
        $(".delClass:last").remove()
    }), $("#removeLastTAR").click(function(){
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
}), $(document).ready(function() {
    $("#XMLchanges").click(function() {
        var a = $("#outputUL");
        chunk = [];
        if ($("#listArrayBase img").hasClass("delPic")) var t = $("#listArrayBase").find(".hideInput, .dexTarget").map(function() {
            return $(this).val()
        }).get();
        else var t = $("#listArrayBase").find(".dataGlue, .dexTarget").map(function() {
            return $(this).val()
        }).get();
        for (; t.length > 0;) chunk.push(t.splice(0, 2));
        $("#outputUL").html(""), $.each(chunk, function(t) {
            $("<li>").appendTo(a).text(chunk[t])
        });
        var e, i = $("#address").val() + ".xml";
        window.open("preview.php?thing=" + i, "_blank"), $("#dataPointer").val(), $("#targetPointer").val(), $("#output").val();
        e = $("#listArrayBase img").hasClass("delPic") ? "true" : "false", $.ajax({
            url: "changeTheXMLfile.php",
            type: "POST",
            dataType: "text",
            cache: !1,
            data: {
                address: i,
                chunk: chunk,
                selectTargets: selectTargets,
                isImage: e
            },
            error: function(a) {
                console.log("An error has happened" + a)
            },
            success: function(a) {}
        })
    }), $("#exportNewgame").click(function() {
        var a = $("#previewedFileName").val(),
            t = $("#exportName").val();
        window.open("index.php?incoming=" + a, "_blank");
        $.ajax({
            url: "listMaker.php",
            type: "POST",
            datatype: "text",
            data: {
                previewedFileName: a,
                exportingName: t
            },
            cache: !1,
            success: function(a) {}
        })
    }), $("#editEngage").click(function() {
        var a = "xml/" + $("#editable").val();
        $.ajax({
            url: a,
            type: "GET",
            datatype: "xml",
            cache: !1,
            success: function(a) {
                $("target", a).each(function() {
                    var a = $(this).text(),
                        t = $(this).attr("id");
                    $('<option class="targetOption"></option>').attr("value", t).text(a).appendTo(".dexTarget:first")
                }), $("dataPoint", a).each(function() {
                    var a = $(this).attr("clocks"),
                        t = $(this).attr("src"),
                        e = $(this).text(),
                        i = $(this).attr("target");
                    a ? ($('<div class="wrapUp"><input class="hideInput" value="' + t + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + t + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo("#spawnEditables"), $(".dexTarget:first").clone().val(i).appendTo(".delClass:last")) : ($('<div class="wrapUp"><div class="input-group delClass"><input class="dataGlue form-control" data-target=' + i + ' value="' + e + ' "></input><span class="input-group-addon dexPlace"></span></div><button class="removebtn">Poista osio</button></div>').appendTo("#spawnEditables"), $(".dexTarget:first").clone().val(i).appendTo(".dexPlace:last"))
                })
            }
        })
    });
    var a = [];
    $("#addNotherTargetToFirstSelect").click(function() {
        $("<option class='targetOption'></option>").text($("#addOptionTargetToList").val()).val(+$("option:last").val() + 1).appendTo(".dexTarget")
    }),
	
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
	$('#comeOn').click(function(){
		$('<div class="wrapUp"><div class=\"input-group delClass\"><input class=\'dataGlue form-control\'></input><span class=\"input-group-addon dexPlace\"></span></div><button class="removebtn">Poista osio</button></div>').appendTo("#spawnEditables");
		
		$('.dexTarget:first').clone().appendTo(".dexPlace:last");
		
	
			console.log('we did it reddit!');
	});
	$("#UploadEditAndContinue").click(function() {
        a = [], chunk = [];
        var t = [];
        for (t = $(".dexTarget:first .targetOption").map(function() {
                return [$(this).text(), $(this).val()]
            }).get(); t.length > 0;) a.push(t.splice(0, 2));
        if (console.log(a), $("#spawnEditables img").hasClass("delPic")) var e = $("#spawnEditables").find(".hideInput, .dexTarget").map(function() {
            return $(this).val()
        }).get();
        else var e = $("#spawnEditables").find(".dataGlue, .dexTarget").map(function() {
            return $(this).val()
        }).get();
        for (; e.length > 0;) chunk.push(e.splice(0, 2));
        var i = $("#editable").val();
        $("#spawnEditables img").hasClass("delPic") ? isImage = "true" : isImage = "false";
        window.open("index.php?incoming=" + i, "_blank");
        $.ajax({
            url: "finalEdit.php",
            type: "POST",
            datatype: "text",
            data: {
                address: i,
                chunk: chunk,
                selectTargets: a,
                isImage: isImage
            },
            cache: !1,
            success: function(a) {}
        })
    }), $(document).on("click", ".removebtn", function() {
        $(this).parent().remove()
    }), $("#lisaaKuvia").click(function() {
        var a = $("#listOfFolders43").val();
        console.log(a), $.ajax({
            url: "searchFolderForImg.php",
            type: "POST",
            datatype: "text",
            data: {
                folder: a
            },
            cache: !1,
            success: function(a) {
                $("#listArrayBase").html(a), $(".dexTarget:first").clone().appendTo(".delClass")
            }
        })
    });
    var t = 1;
    (t = 1) && ($(".imagePreviewer").hide(), $(document).ready(function() {
        var a = $("#listOfFolders43").val();
        console.log(a), $.ajax({
            url: "imagePreviewer.php",
            type: "POST",
            datatype: "text",
            data: {
                folder: a
            },
            cache: !1,
            success: function(a) {
                console.log(a), $(".imagePreviewer").html(a)
            }
        })
    }), $("#listOfFolders43").change(function() {
        var a = $("#listOfFolders43").val();
        console.log(a), $.ajax({
            url: "imagePreviewer.php",
            type: "POST",
            datatype: "text",
            data: {
                folder: a
            },
            cache: !1,
            success: function(a) {
                console.log(a), $(".imagePreviewer").html(a)
            }
        })
    }), $("#openPicAdder").click(function() {
        $(".imagePreviewer").toggle()
    })), $(document).on("click", ".imagePreviewer img", function() {
        var a = $(this).attr("src");
        console.log(a), 0 === $("#spawnEditables").length ? $('<div class="wrapUp"><input class="hideInput" value="' + a + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + a + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo("#listArrayBase") : $('<div class="wrapUp"><input class="hideInput" value="' + a + '"></input><div class="row delClass"><img class="imgReg delPic" src="' + a + '" /></div><button class="removebtn">Poista kuva</button></div>').appendTo("#spawnEditables"), $(".dexTarget:first").clone().appendTo(".delClass:last")
    })
}), $(document).ready(function() {
    $("#initPreview").click(function() {
        correct = 0, $(".block").html(""), $(".drop").html(""), $("#finale").hide();
        var a = [],
            t = [],
            e = "xml/" + $("#previewedFileName").val();
        $.ajax({
            url: e,
            type: "GET",
            datatype: "xml",
            cache: !1,
            success: function(e) {
                console.log(e), $("dataPoint", e).each(function() {
                    var t, e = $(this).attr("src"),
                        i = $(this).attr("clocks");
                    null == e ? (t = $(this).text(), $DropClass = "dropTarget", $draggEr = "numbero audioClass") : "true" == i && (t = '<img src="' + $(this).attr("src") + '" class="imgReg"/>', $DropClass = "clockDrop", $draggEr = "clockDrag");
                    var n = [t, $(this).attr("target")];
                    a.push(n)
                }), $("target", e).each(function() {
                    var a = [$(this).text(), $(this).attr("id")];
                    t.push(a)
                });
                for (var i = 0; i < t.length; i++) $("<div class=" + $DropClass + ">" + t[i][0] + "</div>").data("number", t[i][1]).appendTo(".drop").droppable({
                    accept: ".block div",
                    hoverClass: "hovered",
                    drop: handleCardDrop,
                    activate: handleDragEvent
                });
                for (var n = 0; n < a.length; n++) $("<div class=" + $draggEr + ' onclick="" >' + a[n][0] + "</div>").data("number", a[n][1]).appendTo(".block").draggable({
                    containment: ".borderPatrol",
                    stack: ".block div",
                    cursor: "move"
                }), $("div .clockDrag").each(function(a) {
                    $(this).addClass("S" + (a + 1))
                })
            }
        })
    })
});