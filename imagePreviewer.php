<?php
include 'config.php';
$dir = $saveImages . $_POST['folder'];
$exclude = array( ".","..","error_log","_notes" );
if (is_dir($dir)) {
    $files = scandir($dir);
    foreach($files as $file){
        if(!in_array($file,$exclude)){
           echo '<img class="imgReg delPic" src="' . $dir .'/'. $file . '" />';
        }
    }
}
?>