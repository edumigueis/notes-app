document.getElementById("spell-cf").addEventListener("change", function () {
    if (!document.getElementById("spell-cf").checked) {
        document.getElementById("current-note").spellcheck = false;
    } else {
        document.getElementById("current-note").spellcheck = true;
    }
});

document
    .getElementById("change-ft-size")
    .addEventListener("change", function () {
        if (
            document.getElementById("change-ft-size").value > 25 ||
            document.getElementById("change-ft-size").value < 9
        ) {
            document.getElementById("change-ft-size").value = 16;
            return;
        } else {
            document.getElementById("current-note").style.fontSize =
                document.getElementById("change-ft-size").value + "px";
        }
    });
document.getElementById("dark-mode").addEventListener("change", function(){
    if (!document.getElementById("dark-mode").checked) {
        lightMode();
    } else {
        darkMode();
    }
})

function darkMode(){
    document.body.classList.add( "dark" );
}

function lightMode(){
    document.body.classList.remove( "dark" );
}