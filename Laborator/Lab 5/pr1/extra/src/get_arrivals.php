<?php
    error_reporting(E_ERROR | E_PARSE);

    $con = new mysqli('127.0.0.1', 'hfir2522', 'hfir2522', 'hfir2522');
    $con->set_charset("utf-8");

    $query = $con->prepare("select St2.Name from Stations as St inner join StationRoutes as SR on St.StId=SR.StBegin inner join Stations as St2 on SR.StEnd=St2.StId where St.Name=?");

    $query->bind_param("s", $_GET["what"]);
    
    if ($query->execute()) {
        $query->bind_result($Name);
        while($query->fetch()) {
            echo "<option value=\"{$Name}\"> {$Name} </option>";
        }
    }

?>