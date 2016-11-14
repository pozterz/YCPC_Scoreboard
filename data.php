<?php
	header('Content-Type: application/json');
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "http://172.26.116.158:8888");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);

	$data = curl_exec($ch);
	echo $data;
	curl_close($ch);
?>