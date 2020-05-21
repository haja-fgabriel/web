<?php
    error_reporting(E_ERROR | E_PARSE);
    $con = new mysqli('127.0.0.1', 'hfir2522', 'hfir2522', 'hfir2522');
    $con->set_charset('UTF-8');

    $query = $con->query("select count(*) from Persoane");
    $row = $query->fetch_row();
    echo $row[0];

?>