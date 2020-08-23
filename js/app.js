let notes = [
  {
    title: "Carol's Party",
    text:
      'Bring her a gift and buy soda. <div class="img-wp"><img src="./images/1.jpg" alt="" /></div> I\'m thinking of buying a really big gift because i wanna show all my love for her. Maybe a biiggg teddy bear would be perfect: <div class="img-wp"><img src="./images/3.jpg" alt="" /></div>',
    images: ["./images/1.jpg"],
  },
  {
    title: "Shopping List",
    text: "Eggs, lemonade, tomatos, soda, bread, milk, cheese",
    images: [],
  },
  {
    title: "Tomorrow's Brunch",
    text:
      'Call Diego and tell him about the brunch. Brunch is a combination of breakfast and lunch, and regularly has some form of alcoholic drink (most usually champagne or a cocktail) served with it. It is usually served anytime before 3 o\'clock in the afternoon. <div class="img-wp"><img src="./images/2.jpg" alt="" /></div>',
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
let currentIndex = 0;
let dataURL;

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
  currentIndex = ev.target.dataset.note;
  document.getElementById("current-wrapper").dataset.note =
    "" + ev.target.dataset.note;
  document.getElementById("current-title").innerHTML = currentNote.title;
  document.getElementById("current-note").innerHTML = currentNote.text;
  /*if (currentNote.images.length > 0) {
    let res = "";
    let currentString;
    let minusCurrentString;

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
      }
    }
    for (var a = 0; a < currentNote.images.length; a++) {
      res = res.replace("yhyi891gt5a" + a, "");
    }

    document.getElementById("current-note").innerHTML = res;
  }*/
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
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].images[0] == undefined) {
      content =
        '<div class="text"><h2>' +
        notes[i].title +
        "</h2><p>" +
        stripHtml(notes[i].text.substring(0, 200)) +
        '</p></div><div class="aux" data-note="' +
        i +
        '"><div class="img"></div></div>';
    } else {
      content =
        '<div class="text"><h2>' +
        notes[i].title +
        "</h2><p>" +
        stripHtml(notes[i].text.substring(0, 200)) +
        '</p></div><div class="aux" data-note="' +
        i +
        '"><div class="img"><img src="' +
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
    ev.target.focus();
  });

document
  .getElementById("current-title")
  .addEventListener("focusout", function (ev) {
    notes[ev.target.parentElement.dataset.note].title = document.getElementById(
      "current-title"
    ).innerHTML;
    updateNotePreviewers();
  });

document.getElementById("add-image").addEventListener("click", function () {
  var inp = document.createElement("input");
  inp.type = "file";

  inp.addEventListener("change", function (event) {
    openFile(event);
  });
  inp.click();
});

var openFile = function (file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function () {
    dataURL = reader.result;
    document.getElementById("current-note").innerHTML +=
      '<div class="img-wp"><img src="' + dataURL + '" /></div>';
    notes[
      document.getElementById("current-wrapper").dataset.note
    ].text = document
      .getElementById("current-note")
      .innerHTML.replace("'", "'");
    notes[document.getElementById("current-wrapper").dataset.note].images.push(
      "" + dataURL
    );
    updateNotePreviewers();
  };
  reader.readAsDataURL(input.files[0]);
};

function stripHtml(html) {
  // Create a new div element
  var temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

function addTags(tags) {
  var container_contenteditable = document.getElementById("current-note");

  //Retrieve the selected text :
  var sel = window.getSelection();
  var text = container_contenteditable.innerHTML;
  container_contenteditable.innerHTML = text.replace(
    sel,
    "<" + tags + ">" + sel + "</" + tags + ">"
  );
}

document.getElementById("to-bold").addEventListener("click", function () {
  addTags("b");
});
document.getElementById("to-italic").addEventListener("click", function () {
  addTags("i");
});
document.getElementById("to-underlined").addEventListener("click", function () {
  addTags("u");
});
document.getElementById("to-s").addEventListener("click", function () {
  addTags("s");
});
document.getElementById("to-em").addEventListener("click", function () {
  addTags("em");
});
