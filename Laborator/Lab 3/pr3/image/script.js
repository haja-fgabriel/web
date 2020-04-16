//import game from "./game.js";


function loadScript(url) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function onLoad() {
    console.log("Loaded successfully");

    loadScript('./game.js');

    game.load();
}
