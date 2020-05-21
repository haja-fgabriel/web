var header;
var numberOfRows;
var currentRow = 0;

function getNumberOfRows() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            numberOfRows = parseInt(req.responseText);
        }
    }
    req.open("GET", "/ajax/pr2/extra/src/get_people_count.php", true);
    req.send();
}

function getFirstEntries(index) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                document.getElementsByTagName('table')[0].innerHTML = header + req.responseText;
            } else {
                document.getElementsByTagName('table')[0].innerHTML = header + "<tr><td>Failed to load.</td></tr>";
            }
        }
    }
    req.open("GET", "/ajax/pr2/extra/src/get_people.php?index=" + index, true);
    req.send();
}

function moveLeft() {
    if (currentRow > 0) {
        currentRow -= 3;
        document.getElementById('next').disabled = false;
        getFirstEntries(currentRow);
        if (currentRow == 0) {
            document.getElementById('prev').disabled = true;
        }

    }
}

function moveRight() {
    if (currentRow + 3 < Math.ceil(numberOfRows/3) * 3 ) {
        currentRow += 3;
        document.getElementById('prev').disabled = false;
        getFirstEntries(currentRow);
        if (currentRow + 3 >= Math.ceil(numberOfRows/3) * 3) {
            document.getElementById('next').disabled = true;
        }

    }
}

function onLoad() {
    header = document.getElementsByTagName('table')[0].innerHTML;
    getNumberOfRows();
    getFirstEntries(0);

    document.getElementById('prev').onclick = moveLeft;
    document.getElementById('next').onclick = moveRight;
    //document.getElementById('prev').onclick = ;
}