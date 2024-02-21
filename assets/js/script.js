// Global variables
var nameValue = document.querySelector("#name");
var typeValue = document.querySelector("#type");
var dueValue = document.querySelector("#due");
var addProject = document.querySelector("#add-project");
var saveProject = document.querySelector("#save");
var tableBody = document.querySelector("#tableBody");
var userProject = JSON.parse(localStorage.getItem("userProject")) || [];

// to keep time, and refresh the page at the start of a new day
function timeTracker() {
  setInterval(function() {
    let now = dayjs();
    $("#timeNow").text(now.format("MMM D, YYYY [at] hh:mm:ss a"))
    const hour = now.format("hh")
    const min = now.format("mm")
    const sec = now.format("ss")
    const midMark = now.format("a")
    if (hour == "12" && min == "00" && sec == "00" && midMark == "am") {
      location.reload()
    }
  }, 1000);
}

// making the  projects sortable, currently resets everyday though
$(function() {
  $("#sortable-table tbody").sortable({
  });
});

// for the calendar date choice, currently set to a max range of 10 years
$(function () {
  $("#due").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "D: M d, yy",
    maxDate: "+10yy",
    onClose: function(dateText) {
      var isValidDate = !isNaN(Date.parse(dateText));
      if (!isValidDate) {
        $(this).val("");
      }
    }
  });
});

// list of predictive words in project type
$(function() {
  var availableTags = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "TypeScript", "Rust", "Kotlin", "Scala",
    "Perl", "Objective-C", "Haskell", "Lua", "Shell", "HTML", "CSS", "Assembly", "R", "MATLAB", "SQL", "Visual Basic",
    "Groovy", "Dart", "Fortran", "Ada", "COBOL", "Lisp", "Prolog", "Scheme", "Erlang", "F#", "Clojure", "PowerShell",
    "Bash", "Delphi", "PL/SQL", "ABAP", "ActionScript", "ColdFusion", "Elixir", "Julia", "Objective-C++", "Pascal",
    "Racket", "Scratch", "Tcl", "Verilog", "VHDL", "LabVIEW", "Smalltalk", "Ada", "COBOL", "Logo", "RPG", "Rexx", "SAS"
  ];
  $("#type").autocomplete({
    source: availableTags,
  });
} );

// removes project from page and localStorage
function removeEvent(event) {
  var deleteButton = $(event.target);
  var projectIndex = deleteButton.data("index");
  deleteButton.parent().parent().remove();
  if (projectIndex < userProject.length) {
    userProject.splice(projectIndex, 1);
  } else {
    userProject.pop(projectIndex);
  }
  localStorage.setItem("userProject", JSON.stringify(userProject));
}

// runs through localStorage to dynamically create all projects and give appropriate background colors to
function savedProjects() {
  for (let i = 0; i < userProject.length; i++) {
    let tableRow = document.createElement("tr");
    let namePlace = document.createElement("th");
    let typePlace = document.createElement("td");
    let timePlace = document.createElement("td");
    let duePlace = document.createElement("td");
    let exitPlace = document.createElement("td");
    let exitValue = document.createElement("button");

    tableRow.classList.add("project-info");
    duePlace.classList.add("on-time");
    exitValue.textContent = "X";
    exitValue.classList.add("btn", "btn-outline-none", "text-center");
    exitValue.setAttribute("data-index", i);
    exitPlace.appendChild(exitValue);
    exitValue.addEventListener("click", removeEvent);

    namePlace.textContent = userProject[i][0];
    typePlace.textContent = userProject[i][1];
    timePlace.textContent = userProject[i][2];
    duePlace.textContent = userProject[i][3];

    tableRow.appendChild(namePlace);
    tableRow.appendChild(typePlace);
    tableRow.appendChild(timePlace);
    tableRow.appendChild(duePlace);
    tableRow.appendChild(exitPlace);

    tableBody.appendChild(tableRow);

    let now = dayjs();
    let dueDate = userProject[i][3]
    let parsedDate = dayjs(dueDate, "ddd, MMM D [at] hh:mm a");
    let space = now.diff(parsedDate, "day");
    let hasPassed = parsedDate.isBefore(now);

    if ((hasPassed === true) && (space !== 0)) {
      tableRow.classList.remove("due-today")
      tableRow.classList.add("late")
    }
    if ((hasPassed === true) && (space === 0)) {
      tableRow.classList.add("due-today")
    }
    if (hasPassed === false) {
      tableRow.classList.remove("late")
      tableRow.classList.remove("due-today")
    }
  }
}

// to initially dynamically create the projects
function projectTracker() {
  let now = dayjs();
  let tableRow = document.createElement("tr");
  let namePlace = document.createElement("th");
  let typePlace = document.createElement("td");
  let timePlace = document.createElement("td");
  let duePlace = document.createElement("td");
  let exitPlace = document.createElement("td");
  let exitValue = document.createElement("button");

  tableRow.classList.add("project-info")
  duePlace.classList.add("on-time");
  exitValue.textContent = "X";
  exitValue.classList.add("btn", "btn-outline-none", "text-center");
  exitValue.setAttribute("data-index", userProject.length);
  exitPlace.appendChild(exitValue);
  exitValue.addEventListener("click", removeEvent)

  namePlace.textContent = nameValue.value
  typePlace.textContent = typeValue.value
  timePlace.textContent = (now.format("ddd: MMM D"))
  duePlace.textContent = dueValue.value

  tableRow.appendChild(namePlace);
  tableRow.appendChild(typePlace);
  tableRow.appendChild(timePlace);
  tableRow.appendChild(duePlace);
  tableRow.appendChild(exitPlace);

  tableBody.appendChild(tableRow);

  userProject.push([namePlace.textContent, typePlace.textContent, timePlace.textContent, duePlace.textContent]);
  localStorage.setItem("userProject", JSON.stringify(userProject));

  for (let i=0; i<userProject.length; i++) {
    let now = dayjs();
    let dueDate = userProject[i][3]
    let parsedDate = dayjs(dueDate, "ddd, MMM D [at] hh:mm a");
    let space = now.diff(parsedDate, "day");
    let hasPassed = parsedDate.isBefore(now);

    if ((hasPassed === true) && (space !== 0)) {
      tableRow.classList.remove("due-today")
      tableRow.classList.add("late")
    }
    if ((hasPassed === true) && (space === 0)) {
      tableRow.classList.add("due-today")
    }
    if (hasPassed === false) {
      tableRow.classList.remove("late")
      tableRow.classList.remove("due-today")
    }
  }
};

// resets input in modal
addProject.addEventListener("click", function() {
  nameValue.value = "";
  typeValue.value = "";
  dueValue.value = "";
  saveProject.disabled = true
}); 

// makes it to where a value has to be in the project name area
nameValue.addEventListener("change", function(event) {
  event.preventDefault()
  if(nameValue.value){
    saveProject.disabled = false;
  }
}) 

// to save project to page
saveProject.addEventListener("click", projectTracker);

timeTracker()
savedProjects()
