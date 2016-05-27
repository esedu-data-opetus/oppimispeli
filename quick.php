<?php

//Quick php
echo	"<div id=\"content\">

				<div id=\"makeMeDraggable\" class=\"block dragging\">
				</div>
				
				<div class=\"drop droppable\" id=\"makeMeDroppable\">
				</div>
			
		</div>
			
		<div id=\"saving\">
			
				<div id=\"actualForm\">
					<h2 id='finale' class='finalScore'>0</h2>
					<form  method=\"get\" action=\"quickSavePlayerScore.php\">
						<fieldset class=\"form-group row col-xs-5 text-center\">
							<input id=\"nameA\" class=\"form-control col-sm-2\" name=\"nimi\" placeholder=\"Nimesi?\" />
							<input id=\"eMail\" class=\"form-control col-sm-2\" name=\"mail\" placeholder=\"Sähköpostisi?\" />
							<input class=\"form-control col-sm-2\" id=\"hidScore\" name=\"sentScore\" readonly>
							<button class=\"form-control col-sm-2 btn-success\" type=\"submit\" value=\"Save the score\" />Save The Score</button>
						</fieldset>
					</form>
				</div>
		</div>
		<footer id=\"footing\">
				<div id='score'>0</div>			
				<button onclick='validation()'>Validate</button>
				<button onclick=\"change()\">Change XML</button>
				<select type=\"text\" id=\"XmlName\">
					<option value=generate>Alkuperäinen</option>
					<option value=imageFlow>Kuva testi</option>
					<option value=imageExample>Kuva testi2</option>
					<option value=flowtest2>Max testi</option>
					<option value=math>Max merkki testi</option>
					<option value=mathProto>Math Prototype</option>
					<option value=mathProto2>Math Prototype 2</option>
					<option value=clocks3>Kellotaulutehtävä 1</option>
					<option value=elementConversion>Mittayksikkö muutoksia</option>
					<option value=whatTime>Aikayksikkö muutoksia</option>
					
				</select>
				<input id=\"addIt\"></input><button id=\"theAdder\">Lisää listaan</button>
				<button class=\"testing2\" onclick=\"location.href='admin.php'\">Editori</button>
		</footer>
		
		";
		
		



?>