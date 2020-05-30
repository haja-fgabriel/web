<?php
    function get_all_cities() {
        error_reporting(E_ERROR | E_PARSE);
        $conn = new mysqli('localhost', 'hfir2522', 'hfir2522', 'hfir2522');
        $conn->set_charset('UTF-8');

        $result = array();

        $stmt = $conn->query("SELECT BeginStation FROM `trains` UNION SELECT EndStation FROM `trains`");
        while ($row = $stmt->fetch_row()) {
            array_push($result, $row[0]);
        }
        
        $conn->close();
        return $result;
    }
?>