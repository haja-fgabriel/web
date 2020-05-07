var onClick = function(ref) {
    let options = ref.children();
    let insertIndex = -1;
    for (i = 0; i < options.size(); i++) {
        console.log(options[i].selected);

        if (options[i].selected == true) {
            let otherPicker = ref.attr("name") == "fcsb" ? 
                            $('select[name="realmadrid"]') :
                            $('select[name="fcsb"]');
            otherPicker.insertAt(i, $(options[i]));

            break;
        }
    }
};

$(document).ready(function() {
    $('.player-picker').dblclick(function() {
        onClick($(this));
    });

});