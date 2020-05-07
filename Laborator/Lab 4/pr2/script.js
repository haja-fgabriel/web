function validateData() {
    let
        name =        $("div").find('input[name=nume]'),
        birthday =    new Date($("div").find('input[name=data]').val()),
        age =         $("div").find('input[name=varsta]');
        
    name.removeClass('error');
    age.removeClass('error');
    
    if (calculateAge(birthday) == age.val() && name.val().length > 0) {
        alert("Datele sunt completate corect");
    } else {
        alert("Campurile nume si varsta nu sunt completate corect");
        name.addClass("error");
        age.addClass("error");
    }
}

function calculateAge(birthDate) {
    let currentDate = new Date();
    currentDate.setUTCHours(24, 0, 0, 0);
    birthDate.setUTCHours(24, 0, 0, 0);

    let milliseconds = currentDate - birthDate;
    let ageDate = new Date(milliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

$(document).ready(function() {
    $("button.form-validator").click(validateData);
});