function getLeavingStations() {
    
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                document.getElementsByName("source")[0].innerHTML = req.responseText;
            } else if (req.status == 404) {
                document.getElementsByName("source")[0].innerHTML = "<option>Failed to load</option>";
            }
        } else {
            document.getElementsByName("source")[0].innerHTML = "<option>Loading...</option>";
        }
    }

    req.open('GET', '/ajax/pr1/extra/src/get_trains.php', true);
    req.send();
    
}

function doAJAXRequest(value) {
    let req = new XMLHttpRequest();
    
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                document.getElementsByName("destination")[0].innerHTML = req.responseText;
            } 
        }
    };
    
    req.open('GET', '/ajax/pr1/extra/src/get_arrivals.php?what=' + value, true);
    req.send();
}

function onLoad() {
    getLeavingStations();

    let leftPicker = document.getElementsByName("source")[0];
    
    leftPicker.onclick = () => doAJAXRequest(leftPicker.value);
}