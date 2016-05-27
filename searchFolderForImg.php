<?php
include 'config.php';
$dir = $saveImages . $_POST['folder'];
$exclude = array( ".","..","error_log","_notes" );
if (is_dir($dir)) {
    $files = scandir($dir);
    foreach($files as $file){
        if(!in_array($file,$exclude)){
           echo '<div class="wrapUp"><input class="hideInput" value="' . $dir .'/'. $file . '"></input><div class="row delClass"><img class="imgReg delPic" src="' . $dir .'/'. $file . '" /></div><button class="removebtn">Poista kuva</button></div>';
        }
    }
}
?>