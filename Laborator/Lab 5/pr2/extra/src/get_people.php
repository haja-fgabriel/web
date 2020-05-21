<?php
    error_reporting(E_ERROR | E_PARSE);
    $con = new mysqli('127.0.0.1', 'hfir2522', 'hfir2522', 'hfir2522');
    $con->set_charset('UTF-8');

    $query = $con->prepare("select * from Persoane limit 3 offset " . $_GET["index"]);

    if ($query->execute()) {
        $query->bind_result($Nume, $Prenume, $Telefon, $Email);
        while ($row = $query->fetch()) {
            echo "<tr><td>{$Nume}</td><td>{$Prenume}</td><td>{$Telefon}</td><td>{$Email}</td></tr>";
        }
    }


?>