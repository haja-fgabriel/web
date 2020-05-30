var cities = [];
var routes = [];
var isError;

function getCities() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            cities = eval(req.responseText);
            for (city in cities) {
                let srcOpt = document.createElement("option");
                let destOpt = document.createElement("option");

                srcOpt.value = cities[city];
                srcOpt.text = cities[city];
                
                destOpt.text = cities[city];
                destOpt.value = cities[city];
                
                document.querySelector('[name="source"]').add(srcOpt);
                document.querySelector('[name="destination"]').add(destOpt);
            }
        }
    };
    req.open("GET", "src/get_all_trains.php", true);
    req.send('');
}

function createLabel(description, value) {
    var toReturn = document.createElement("label");
    toReturn.innerHTML = description + ": <b>" + value + "</b>";
    return toReturn;
}

function updateTable() {
    var table = document.getElementsByClassName('train-route')[0];
    table.innerHTML = "";
    for (var i = 0; i < routes.length; i++) {
        var newRoute = document.createElement("div");
        
        for (var j = 0; j < routes[i].length; j++) {
            var newTrain = document.createElement("div");
            
            var src = createLabel("Departing from", routes[i][j].beg);
            var dst = createLabel("Arriving to", routes[i][j].end);
            var type = createLabel("Type", routes[i][j].type);
            var srcTime = createLabel("Departing at", routes[i][j].depart);
            var dstTime = createLabel("Arriving at", routes[i][j].arrival);            
            var number = createLabel("Train number", routes[i][j].number);

            newTrain.appendChild(src);
            newTrain.appendChild(dst);
            newTrain.appendChild(type);
            newTrain.appendChild(srcTime);
            newTrain.appendChild(dstTime);
            newTrain.appendChild(number);

            newRoute.appendChild(newTrain);
        }
        table.appendChild(newRoute);
    }

}

function searchRoutes() {

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            routes = eval(req.responseText);
            if (typeof routes == "string") {
                console.log("good");
                ;
            } else {    
                updateTable();
            }
            
        }
    };

    var src = document.querySelector('[name="source"]').value;
    var dest = document.querySelector('[name="destination"]').value;

    var data = "src/get_route.php?source=" + src + "&destination=" + dest;
    var check = document.querySelector('[name="only-direct"]');
    if (check.checked) {
        data += "&only-direct=true";
    }

    req.open("GET", data, true);
    req.send('');
}

function onLoad() {
    getCities();
    document.getElementsByTagName("button")[0].onclick = searchRoutes;
    
}   