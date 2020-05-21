function onClick() {
    $.ajax({
        type : 'GET',
        url : "/ajax/pr1/extra/src/get_arrivals.php?what=" + $("[name=source]").val()[0],
        success : (c) => $('[name=destination]').html(c),
        error : (c) => $('[name=destination]').html("<option>Failed to load</option>")
    });
}

function getDepartingStations() {
    $.ajax({
        type : 'GET',
        url : "/ajax/pr1/extra/src/get_trains.php",
        success : (c) => $('[name=source]').html(c),
        error : (c) => $('[name=source]').html("<option>Failed to load</option>")
    });
}

$("document").ready(function() {
    getDepartingStations();
    $("[name=source]").click(onClick);
});