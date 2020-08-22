let notes = [
  {
    title: "Carol's Party",
    text:
      "Bring her a gift and buy soda. yhyi891gt5a0 I'm thinking of buying a really big gift because i wanna show all my love for her. Maybe a biiggg teddy bear would be perfect: yhyi891gt5a1",
    images: ["./images/1.jpg", "./images/2.jpg"],
  },
  {
    title: "Shopping List",
    text: "Eggs, lemonade, tomatos, soda, bread, milk, cheese",
    images: [],
  },
];
let allNotes = document.getElementsByClassName("note");
let currentNote;

for (let note of allNotes) {
  note.addEventListener("click", function (event) {
    openNote(event);
  });
}

function openNote(ev) {
  currentNote = notes[ev.target.dataset.note];
  document.getElementById("current-title").innerHTML = currentNote.title;
  document.getElementById("current-note").innerHTML = currentNote.text;
  if (currentNote.images.length > 0) {
    let res = "";
    let currentString;
    let minusCurrentString;

    /*The weird section of characters is a indexed mark to show that there is a photo there. 
    This sequence is used because it isn't something a user would normally type. */
    
    for (var i = 0; i < currentNote.images.length; i++) {
      currentString = "yhyi891gt5a" + i;
      minusCurrentString = "yhyi891gt5a" + (i - 1);
      alert(minusCurrentString);
      if (i == 0) {
        res +=
          currentNote.text.slice(0, currentNote.text.indexOf(currentString)) +
          "<div class='img-wp'><img src=" +
          currentNote.images[i] +
          " /><div>";
      } else {
        res +=
          currentNote.text.substring(
            currentNote.text.indexOf(minusCurrentString) +
              minusCurrentString.length
          ) +
          "<div class='img-wp'><img src=" +
          currentNote.images[i] +
          " /><div>";
        console.log(res);
      }
    }
    for (var a = 0; a < currentNote.images.length; a++) {
      res = res.replace("yhyi891gt5a" + a, "");
    }

    document.getElementById("current-note").innerHTML = res;
  }
}

document
  .getElementById("current-note")
  .addEventListener("dblclick", function (event) {
    editNote(event);
  });
document.getElementById("edit-note-btn").addEventListener("click", function () {
  editNote(document.getElementById("current-note"));
});

function editNote(ev) {
  if (ev.target == undefined) {
    ev.contentEditable = true;
    ev.focus();
  } else {
    ev.target.contentEditable = true;
  }
}
