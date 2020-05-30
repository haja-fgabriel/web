<?php
    require "train_getters.php";

    $cities = get_all_cities();

    error_reporting(E_ERROR | E_PARSE);

    $conn = new mysqli('localhost', 'hfir2522', 'hfir2522', 'hfir2522');
    if ($conn->errno) {
        echo "Failed to connect to database. Error: " . $conn->errno;
        exit();
    }
    $conn->set_charset('UTF-8');

    $src = $conn->real_escape_string(test_input($_GET["source"]));
    $dest = $conn->real_escape_string(test_input($_GET["destination"]));
    
    $depth_stack = array();
    $visited = array();
    $neighbors = array();
    $result = false;

    foreach ($cities as $city) {
        $visited[$city] = false;
        $neighbors[$city] = array();
    }

    function dfs($x) {
        global $depth_stack, $visited, $neighbors, $dest, $result;

        //echo $x . ' ' . $dest . "\r\n";
        

        echo "\r\n";

        $visited[$x] = true;
        if ($x == $dest) {
            if ($result) {
                echo ", ";
            }
            echo json_encode($depth_stack);
            $result = true;
            
            $visited[$x] = false;
            return;
        }

        foreach ($neighbors[$x] as $y) {
            if (!$visited[$y->end]) {
                array_push($depth_stack, $y);
                dfs($y->end, $result);
                array_pop($depth_stack);
            }
        }
        $visited[$x] = false;
    }


    if ($src == $dest) {
        echo json_encode("You have chosen the same city");
        exit();
    }

    function get_direct_trains() {
        global $conn, $src, $dest;
        $result = array();

        $stmt = $conn->prepare('SELECT * from trains where BeginStation=? and EndStation=?');
        $stmt->bind_param("ss", $src, $dest);
        $stmt->bind_result($number, $type, $beg, $end, $depart, $arrival);
        if ($stmt->execute()) {
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                while ($stmt->fetch()) {
                    $train = new stdClass();
                    $train->number = $number;
                    $train->type = $type;
                    $train->beg = $beg;
                    $train->end = $end;
                    $train->depart = $depart;
                    $train->arrival = $arrival;
                    $path = array($train);
                    array_push($result, $path);
                }
                $stmt->free_result();
                return json_encode($result);
            } else {
                $stmt->free_result();
                return json_encode("Could not find any train");
            }
        }
    }

    function get_all_trains() {
        global $conn, $src, $dest, $visited, $neighbors;
        $result = array();

        $stmt = $conn->prepare('SELECT * from trains');
        $stmt->bind_result($number, $type, $beg, $end, $depart, $arrival);
        if ($stmt->execute()) {
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                while ($stmt->fetch()) {
                    $neighbor = new stdClass();
                    $neighbor->beg = $beg;
                    $neighbor->end = $end;
                    $neighbor->type = $type;
                    $neighbor->number = $number;
                    $neighbor->depart = $depart;
                    $neighbor->arrival = $arrival;
                    array_push($neighbors[$beg], $neighbor);
                }
            }
            $stmt->free_result();
        }
        echo '[';
        dfs($src);
        echo ']';
        //return json_encode($result);
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    if ($_GET["only-direct"] == "true") {
        echo get_direct_trains();
    } else {
        echo get_all_trains();
    }
    
    $conn->close();
?>