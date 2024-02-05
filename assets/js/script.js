var nameValue = document.querySelector("#name");
var typeValue = document.querySelector("#type");
var dueValue = document.querySelector("#due");
var addProject = document.querySelector("#add-project")
var saveProject = document.querySelector("#save")
var now = ""
var index = ""

function timeTracker() {
  setInterval(function() {
    now = dayjs();
    $("#timeNow").text(now.format("MMM D, YYYY [at] hh:mm:ss a"))
  }, 100);
}

$(function() {
  $("#sortable-table tbody").sortable({
  });
});

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

$( function() {
  var availableTags = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Swift", "Go", "TypeScript", "Rust", "Kotlin", "Scala",
    "Perl", "Objective-C", "Haskell", "Lua", "Shell", "HTML", "CSS", "Assembly", "R", "MATLAB", "SQL", "Visual Basic",
    "Groovy", "Dart", "Fortran", "Ada", "COBOL", "Lisp", "Prolog", "Scheme", "Erlang", "F#", "Clojure", "PowerShell",
    "Bash", "Delphi", "PL/SQL", "ABAP", "ActionScript", "ColdFusion", "Elixir", "Julia", "Objective-C++", "Pascal",
    "Racket", "Scratch", "Tcl", "Verilog", "VHDL", "LabVIEW", "Smalltalk", "Ada", "COBOL", "Logo", "RPG", "Rexx", "SAS"
  ];
  $( "#type" ).autocomplete({
    source: availableTags,
  });
} );

function removeEvent(event) {
  // localStorage.removeItem("userProject" + index)
  var deleteButton = $(event.target);
  deleteButton.parent().parent().remove();
}

addProject.addEventListener("click", function() {
  nameValue.value = "";
  typeValue.value = "";
  dueValue.value = "";
  saveProject.disabled = true
}); 

nameValue.addEventListener("change", function(event) {
  event.preventDefault()
  if(nameValue.value){
    saveProject.disabled = false;
  }
}) 

saveProject.addEventListener("click", function() {
  let tableBody = document.querySelector("#tableBody");
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

  // var projectInfo = $(".project-info");

  // projectInfo.each(function(index) {
  //   var userProject = JSON.stringify($(this).val());
  //   localStorage.setItem("userProject" + index, userProject);
  // })

  var dueDate = document.querySelector('.on-time').textContent
  var parsedDate = dayjs(dueDate, "ddd, MMM D [at] hh:mm a");
  var space = now.diff(parsedDate, 'day');

  var hasPassed = parsedDate.isBefore(now);

  if (hasPassed === true) {
    $(function() {
      $(".project-info").css({
        "background-color": "rgb(209, 11, 11, .3)",
        "color": "var(--accent-dk-color)",
      });
    });
  }
  if ((hasPassed === true) && (space === 0)) {
    $(function() {
      $(".project-info").css({
        "background-color": "rgb(254, 255, 81, .3)",
        "color": "var(--accent-dk-color)",
      });
    });
  }

  // if (hasPassed === true) {
  //   $(".project-info").on("click", "#save", function() {
  //     console.log("red")
  //     $(this).css({
  //       "background-color": "rgb(209, 11, 11, .3)",
  //       "color": "var(--accent-dk-color)",
  //     });
  //   });
  // }
  // if ((hasPassed === true) && (space === 0)) {
  //   $(".project-info").on("click", "#save", function() {
  //     console.log("yellow")
  //     $(this).css({
  //       "background-color": "rgb(254, 255, 81, .3)",
  //       "color": "var(--accent-dk-color)",
  //     });
  //   });
  // }

  // $(".project-info").each(function() {
  //   if (hasPassed === true) {
  //     $(this).css({
  //       "background-color": "rgb(209, 11, 11, .3)",
  //       "color": "var(--accent-dk-color)"
  //     });
  //   }
  
  //   if (hasPassed === true && space === 0) {
  //     $(this).css({
  //       "background-color": "rgb(254, 255, 81, .3)",
  //       "color": "var(--accent-dk-color)"
  //     });
  //   }
  // });

});

timeTracker()

// projectInfo.each(function(index) {
//   localStorage.getItem("userProject" + index);
//   JSON.parse($(this).val());
// });
