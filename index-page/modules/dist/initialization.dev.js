"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activeTeamIndex = exports.boards = void 0;

var _helperFunctions = require("./helper-functions.js");

var _rendering = require("./rendering.js");

var _bootstrapFunctions = require("./bootstrap-functions.js");

var _testingFunctions = require("./testing-functions.js");

var _crudOperations = require("./crud-operations.js");

/******************** Data Store ******************** */
//initialize data
var selectedBoard = selectedBoard ? selectedBoard : "Board 1";
var teams = (0, _helperFunctions.getData)("teams");
var boards;
exports.boards = boards;
var activeTeamIndex = (0, _helperFunctions.getData)("activeTeamIndex");
exports.activeTeamIndex = activeTeamIndex;
var selectedTodo;
var activeUserName;
var activeUserID = (0, _helperFunctions.getData)('activeUserID');
var users = (0, _helperFunctions.getData)('users');

for (var i = 0; i < users.length; i++) {
  if (users[i].id === activeUserID) {
    activeUserName = users[i].userName;
    (0, _helperFunctions.saveData)('activeUserName', activeUserName);
  }
}

for (var _i = 0; _i < teams.length; _i++) {
  for (var j = 0; j < teams[_i].teamMembers.length; j++) {
    if (teams[_i].teamMembers[j] === activeUserName) {
      exports.activeTeamIndex = activeTeamIndex = _i;
      (0, _helperFunctions.saveData)('activeTeamIndex', activeTeamIndex);
    }
  }
} // save active team index


for (var _i2 = 0; _i2 < teams.length; _i2++) {
  //loop on teams (used normal loop to get team index from i)
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = teams[_i2].teamMembers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var member = _step.value;

      //loop on users to compare
      if (member === activeUserName) {
        // match the team which has this user's id to get the team's boards
        exports.boards = boards = teams[_i2].boards;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

if (!currentActiveBoardIdx) {
  var currentActiveBoardIdx;
} // display team name


$("#team-name").html(teams[activeTeamIndex].teamName); // display team members

$("#team").append('<div id="team-members"></div>'); // main operations

(0, _rendering.displayMembers)();
(0, _rendering.colorTheBoard)();
(0, _rendering.initializeBoardsList)();

if (!currentActiveBoardIdx) {
  currentActiveBoardIdx = 0;
  (0, _helperFunctions.saveData)("currentActiveBoardIdx", currentActiveBoardIdx);
}

(0, _rendering.renderList)(boards[currentActiveBoardIdx].lists, boards[currentActiveBoardIdx].todos); //showing edit list item | main events

$("#addAnotherList").click(function () {
  $(this).next().fadeIn().children("input").focus();
  $(this).hide();
});
$("#newList").on("keydown", function (e) {
  if (e.keyCode === 13) {
    $(this).next().children("button").click();
  } else if (e.keyCode === 27) {// $(this).
  }
});
$("#cancel-list").click(function () {
  $(".new-list").hide();
  $("#addAnotherList").fadeIn();
});
$("#save-description").click(function () {
  saveDescription(this);
});

function saveDescription(ev) {
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var _i3 = 0; _i3 < teams.length; _i3++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = teams[_i3].teamMembers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _member = _step2.value;
        //loop on team members
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var user = _step3.value;

            //loop on users to compare
            if (_member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[_i3].boards;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  boards[currentActiveBoardIdx].todos.map(function (todo) {
    if (todo.id === _bootstrapFunctions.activeModalTodoId) {
      todo.description = $($(ev).parent().prev()[0]).find("#desc").val(); // $("#desc").html(" ");

      $('#desc').val("");
      (0, _helperFunctions.saveData)("teams", teams);
      (0, _rendering.renderTodos)(boards[currentActiveBoardIdx].todos);
    }
  });
} // slid


$("#open-slid-menu").click(function () {
  $("#slid-menu").slideToggle();
});
$(".close-slid-menu").click(function () {
  $("#slid-menu").slideUp();
});
$(".open-board-modail").click(function () {
  $("#board-modai").css("display", "flex");
  $("#titlenewbord").focus();
  $(".bar-2, .bar-1").css({
    "filter": "blur(3px)"
  });
});
$("#slid-menu").on("click", ".boardLink", function () {
  var idx = this.dataset.board;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var _i4 = 0; _i4 < teams.length; _i4++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = teams[_i4].teamMembers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _member2 = _step4.value;
        //loop on team members
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var user = _step5.value;

            //loop on users to compare
            if (_member2 === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[_i4].boards;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  currentActiveBoardIdx = idx;
  (0, _helperFunctions.saveData)("currentActiveBoardIdx", currentActiveBoardIdx);
  (0, _rendering.renderList)(boards[idx].lists, boards[idx].todos);
  (0, _rendering.renderTodos)(boards[idx].todos);
  $("#slid-menu").slideUp();
  $(".currentBoardName").text(boards[idx].title);
  $("#board-name").text(boards[idx].title);
  (0, _rendering.colorTheBoard)();
});
$(".clr").each(function (idx, val) {
  $(this).css({
    "background-color": val.dataset.color
  });
});
$(".close-modial").click(function () {
  $("#board-modai").fadeOut();
  $(".bar-2, .bar-1").css({
    "filter": "blur(0)"
  });
});
var lisColor = $(".board-style li");
lisColor.click(function () {
  $(".board-title").css("background-color", $(this).attr("data-color"));
});
$("#get-dummy-data").click(function () {
  (0, _testingFunctions.getDummyData)();
});

function doneTodo() {
  teams[activeTeamIndex].boards[currentActiveBoardIdx].todos.map(function (todo) {
    if (todo.id === selectedTodo) {
      todo.isDone = !todo.isDone;
      (0, _helperFunctions.saveData)("teams", teams);
      $('.list-card[data-done="true"]').css({
        "text-decoration": "line-through"
      });
      (0, _rendering.renderTodos)(boards[currentActiveBoardIdx].todos);
    }
  });
}

$("#done-todo").click(function () {
  doneTodo();
});
$("#get-basic-board").click(function () {
  (0, _testingFunctions.getBasicBoard)();
});
$("#delete-board").click(function () {
  (0, _crudOperations.deleteBoard)();
});