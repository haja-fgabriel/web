<?php
    error_reporting(E_ERROR | E_PARSE);
    $con = new mysqli('127.0.0.1', 'hfir2522', 'hfir2522', 'hfir2522');
    $con->set_charset("utf-8");

    $result = $con->query("select * from Stations");

    while($row = $result->fetch_assoc()) {
        echo "<option value=\"{$row["Name"]}\"> {$row["Name"]} </option>";
    }
?>