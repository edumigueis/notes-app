let notes = [
  {
    title: "Carol's Party",
    text:
      "Bring her a gift and buy soda. yhyi891gt5a0 I'm thinking of buying a really big gift because i wanna show all my love for her. Maybe a biiggg teddy bear would be perfect: yhyi891gt5a1",
    images: ["./images/1.jpg", "./images/3.jpg"],
  },
  {
    title: "Shopping List",
    text: "Eggs, lemonade, tomatos, soda, bread, milk, cheese",
    images: [],
  },
  {
    title: "Tomorrow's Brunch",
    text: "Call Diego and tell him about the brunch.",
    images: ["./images/2.jpg"],
  },
  {
    title: "Project Ideas",
    text: "A cool fashion website, inspired by vogue.",
    images: [],
  },
];
let allNotes = document.getElementsByClassName("note");
let currentNote;

function addEventsToPreviews() {
  for (let note of allNotes) {
    note.addEventListener("click", function (event) {
      openNote(event);
    });
  }
}
addEventsToPreviews();
function openNote(ev) {
  removeAllActive();
  ev.target.classList.add("active");
  currentNote = notes[ev.target.dataset.note];
  document.getElementById("current-wrapper").dataset.note =
    "" + ev.target.dataset.note;
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

function removeAllActive() {
  for (let note of allNotes) {
    note.classList.remove("active");
  }
}

document.getElementById("add-note").addEventListener("click", function () {
  notes.push({ title: "New Anotation", text: "Add text here.", images: [] });
  updateNotePreviewers();
});

function updateNotePreviewers() {
  let el = document.getElementById("notes-preview");
  elChild = document.createElement("div");
  elChild.classList.add("note");
  elChild.dataset.note = "" + notes.length - 1;
  el.appendChild(elChild);
  let content;
  allNotes = document.getElementsByClassName("note");
  console.log(allNotes);
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].images[0] == undefined) {
      content =
        '<div class="text"><h2>' +
        notes[i].title +
        "</h2><p>" +
        notes[i].text.substring(0, 200).replace(/<img[^>]*>/g, "") +
        '</p></div><div class="aux" data-note="4"><div class="img"></div></div>';
    } else {
      content =
        '<div class="text"><h2>' +
        notes[i].title +
        "</h2><p>" +
        notes[i].text.substring(0, 200).replace(/<img[^>]*>/g, "") +
        '</p></div><div class="aux" data-note="4"><div class="img"><img src="' +
        notes[i].images[0] +
        '" alt="" /></div></div>';
    }
    allNotes[i].innerHTML = content;
  }
  addEventsToPreviews();
}

document
  .getElementById("current-title")
  .addEventListener("click", function (ev) {
    ev.target.contentEditable = true;
  });
document
  .getElementById("current-title")
  .addEventListener("focusout", function (ev) {
    notes[ev.target.parentElement.dataset.note].title = document.getElementById(
      "current-title"
    ).innerHTML;
  });
