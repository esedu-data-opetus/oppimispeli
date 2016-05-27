<?php
include 'config.php';
$dir = $saveImages;
$exclude = array( ".","..","error_log","_notes" );
if (is_dir($dir)) {
    $files = scandir($dir);
    foreach($files as $file){
        if(!in_array($file,$exclude)){
            echo '<option val=' . $file .'>' . $file . '</option>';
        }
    }
}
?>