var inputForm = {
    "name" : "",
    "birthDate" : "",
    "age" : "",
    "validate" : validateData
}

function onLoad() {
    console.log("Loaded successfully");
    inputForm.name = document.getElementsByTagName("div")[0].children["nume"];
    inputForm.birthDate = document.getElementsByTagName("div")[0].children["data"];
    inputForm.age = document.getElementsByTagName("div")[0].children["varsta"];
    //form.name = document.getElementsByTagName("name");
}

function validateData() {
    console.log(this);
    let birthday = new Date(this.birthDate.value);
    
    this.name.classList.remove('error');
    this.age.classList.remove('error');
    
    if (calculateAge(birthday) == this.age.value && this.name.value.length > 0) {
        alert("Datele sunt completate corect")
    } else {
        alert("Campurile nume si varsta nu sunt completate corect");
        this.name.classList.add("error");
        this.age.classList.add("error");
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