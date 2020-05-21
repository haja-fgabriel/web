var header;
var numberOfRows;
var currentRow = 0;

function getNumberOfRows() {
    $.ajax({
        type : "GET",
        url : "/ajax/pr2/extra/src/get_people_count.php",
        success : (c) => {numberOfRows = parseInt(c);}
    });
}

function getFirstEntries(index) {
    $.ajax({
        type : "GET",
        url : "/ajax/pr2/extra/src/get_people.php",
        data : "index=" + index,
        success : (c) => $("table").html(header + c),
        error : (c) => $("table").html(header + "<tr><td>Failed to load.</td></tr>")
    });
}

function moveLeft() {
    if (currentRow > 0) {
        currentRow -= 3;
        $("#next").prop("disabled", false);
        getFirstEntries(currentRow);
        if (currentRow == 0) {
            $("#prev").prop("disabled", true);
        }

    }
}

function moveRight() {
    if (currentRow + 3 < Math.ceil(numberOfRows/3) * 3 ) {
        currentRow += 3;
        $("#prev").prop("disabled", false);
        getFirstEntries(currentRow);
        if (currentRow + 3 >= Math.ceil(numberOfRows/3) * 3) {
            $("#next").prop("disabled", true);
        }

    }
}
$(document).ready(function() {
    header = $("table").html();
    getNumberOfRows();
    getFirstEntries(0);

    $("#prev").click(moveLeft);
    $("#next").click(moveRight);
    //document.getElementById('prev').onclick = ;
});