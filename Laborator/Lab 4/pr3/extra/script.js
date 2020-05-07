//import game from "./game.js";


function loadScript(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

$(document).ready(function() {
    console.log("Loaded successfully");

    game.load();
});
