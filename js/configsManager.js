document.getElementById("spell-cf").addEventListener("change", function(){
    if(!document.getElementById("spell-cf").checked){
        document.getElementById("current-note").spellcheck = false;
    } else{
        document.getElementById("current-note").spellcheck = true;
    }
})