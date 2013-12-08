<?php

$session = $_GET['uuid'];

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://crocodoc.com/api/v2/session/create',
    CURLOPT_USERAGENT => 'Doksend',
    CURLOPT_POST => 1,
    CURLOPT_POSTFIELDS => array(
        token => 'ls9ciZXHa5oGv8zxE3eFY2Oh',
        uuid => $session,
        downloadable => 'true'
    )
));

$resp = curl_exec($curl);
curl_close($curl);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 

$array = json_decode($resp, true);
echo json_encode($array['session']);

?>