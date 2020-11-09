// function buttonClicked() {
//   alert("The button is clicked!");
// }

// document.getElementById("test").addEventListener("click", buttonClicked);

// document.getElementById("btnSubmit").addEventListener("click", function (e) {
//     e.preventDefault();
//   });

// document.getElementById("btnSubmit").addEventListener("click", function (e) {
//   console.log(e.target.type);
// });

// document.getElementById("btnSubmit").addEventListener("click", function (e) {
//   console.log(`(${e.clientX}, ${e.clientY})`);
// });

// document.getElementById("btnSubmit").addEventListener("click", function (e) {
//   console.log(e.shiftKey);
// });

if ('serviceWorker' in navigator) {
  // register service worker
  navigator.serviceWorker.register('service-worker.js');
}

let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}

function createNote(noteTitle, noteBody) {
  document.getElementById("no-notes").classList.add("hidden");
  let ulTag = document.createElement("ul");
  let liTag = document.createElement("li");
  let aTag = document.createElement("a");
  let h2Tag = document.createElement("h2");
  let btnTag = document.createElement("button");
  let pTag = document.createElement("p");

  let currentRef = 1;
  aTag.id = currentRef.toString();

  btnTag.className = "delete";
  btnTag.innerHTML = "X";
  h2Tag.innerHTML = noteTitle;
  pTag.innerHTML = noteBody;

  aTag.appendChild(h2Tag);
  aTag.appendChild(btnTag);
  aTag.appendChild(pTag);
  liTag.appendChild(aTag);

  let lastNote = document.querySelector("li:last-child");

  if (lastNote == null) {
    ulTag.appendChild(liTag);
    ulTag.insertAdjacentElement("afterbegin", liTag);
  } else {
    ulTag.appendChild(liTag);
    lastNote.insertAdjacentElement("afterend", liTag);
  }
}

function createNoteFromInput(e) {
  e.preventDefault();

  let noteTitle = document.getElementById("new-note-title-input").value;
  let noteBody = document.getElementById("new-note-body-input").value;

  document.getElementById("new-note-title-input").value = "";
  document.getElementById("new-note-body-input").value = "";

  createNote(noteTitle, noteBody);

  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle += " - 1";
  }

  window.localStorage.setItem(noteTitle, noteBody);


}

function removeItem(e) {
  if (e.currentTarget.classList.contains("delete")) {
    if (confirm("Are you sure you wanna delete this note?")) {
      let liTag = e.target.parentElement.parentElement;
      let ulTag = document.getElementById("notes");
      ulTag.removeChild(liTag);
      //count -= 1;
      window.localStorage.setItem("count", count);
      window.localStorage.removeItem(e.currentTarget.parentElement.id);
    }
  }


  if (document.querySelector('a:last-child') == null ) {
    document.getElementById("no-notes").className = "";
  }
}

for (i = 0; i < count + 1; i++) {
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);

  if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteBody);
  }
}

document
  .getElementById("inputForm")
  .addEventListener("submit", createNoteFromInput, false);

document.getElementById("notes").addEventListener("click", removeItem, false);
