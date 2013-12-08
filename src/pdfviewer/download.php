<?php
	$b = $_GET['url'];
	$name = 'kbportal - ' . $_GET['name'] . ' - ' . $b;
	$url = 'http://www.doksend.com/kbportal/articles/' . $b;

	header("Content-Description: File Transfer"); 
	header("Content-Type: application/pdf"); 
	header("Content-Disposition: attachment; filename=\"$name\"");
	
	readfile ($url); 
?>