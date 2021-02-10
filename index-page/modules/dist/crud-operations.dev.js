"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteList = deleteList;
exports.deleteBoard = deleteBoard;

var _helperFunctions = require("./helper-functions.js");

var _rendering = require("./rendering.js");

//adding another list
$("#addlistBtn").click(function () {
  var activeTeamIndex;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var i = 0; i < teams.length; i++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = teams[i].teamMembers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var member = _step.value;
        //loop on team members
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var user = _step2.value;

            //loop on users to compare
            if (member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[i].boards;
              activeTeamIndex = i;
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
  } //create list object and push


  var listTitle = $(this).parent().prev().val();
  var isAlready = false;

  if (listTitle) {
    boards[currentActiveBoardIdx].lists.forEach(function (list) {
      if (list.listName === listTitle) {
        isAlready = true;
      }
    });

    if (isAlready) {
      alert("this List is Alreay Created");
      $(this).parent().prev().val("");
      return;
    }

    var list = {
      id: generateId(5),
      listName: listTitle,
      todos: []
    };
    teams[activeTeamIndex].boards[currentActiveBoardIdx].lists.push(list);
    console.log(teams);
    (0, _helperFunctions.saveData)("teams", teams);
    (0, _rendering.renderList)(boards[currentActiveBoardIdx].lists, boards[currentActiveBoardIdx].todos);
    (0, _rendering.renderTodos)(boards[currentActiveBoardIdx].todos);
  }

  $(this).parent().prev().val("");
  $(".new-list").hide();
  $("#addAnotherList").fadeIn();
}); // delete list

function deleteList(that) {
  var activeTeamIndex;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var i = 0; i < teams.length; i++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = teams[i].teamMembers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var member = _step3.value;
        //loop on team members
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var user = _step4.value;

            //loop on users to compare
            if (member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[i].boards;
              activeTeamIndex = i;
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

  var ans = confirm("Are you sure?");

  if (ans) {
    var listNameToBeDeleted = $(that).prev().html();

    for (var _i = 0; _i < boards[currentActiveBoardIdx].lists.length; _i++) {
      if (boards[currentActiveBoardIdx].lists[_i].listName === listNameToBeDeleted) {
        var listIdxToBeDeleted = _i;
      }
    }

    if (listIdxToBeDeleted > -1) {
      teams[activeTeamIndex].boards[currentActiveBoardIdx].lists.splice(listIdxToBeDeleted, 1);
      (0, _helperFunctions.saveData)("teams", teams);
      (0, _rendering.renderList)(boards[currentActiveBoardIdx].lists, boards[currentActiveBoardIdx].todos);
      (0, _rendering.renderTodos)(boards[currentActiveBoardIdx].todos);
    }
  }
} //click on add-card-btn and adding todo in


$("#listItems").on("click", ".add-card-btn", function (ev) {
  var activeTeamIndex;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var i = 0; i < teams.length; i++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = teams[i].teamMembers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var member = _step5.value;
        //loop on team members
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var user = _step6.value;

            //loop on users to compare
            if (member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[i].boards;
              activeTeamIndex = i;
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
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

  teams = (0, _helperFunctions.getData)("teams");
  var todoName = $(this).parent().prev().val();
  if (todoName.trim() === "") return;
  var listName = ev.target.dataset.list;
  var todo2BeAdded = {
    id: generateId(10),
    title: todoName,
    listedIn: listName,
    description: "",
    isDone: false
  };
  boards[currentActiveBoardIdx].todos.push(todo2BeAdded);
  boards[currentActiveBoardIdx].lists.forEach(function (list) {
    if (list.listName === todo2BeAdded.listedIn) {
      list.todos.push(todo2BeAdded);
    }
  });
  teams[activeTeamIndex].boards = boards;
  (0, _helperFunctions.saveData)("teams", teams);
  (0, _rendering.renderTodos)(boards[currentActiveBoardIdx].todos);
  $(this).parent().prev().val("");
  $(this).parents(".new-task").children("textarea").focus();
});
$("#add-board").click(function () {
  var activeTeamIndex;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var i = 0; i < teams.length; i++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = teams[i].teamMembers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var member = _step7.value;
        //loop on team members
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var user = _step8.value;

            //loop on users to compare
            if (member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[i].boards;
              activeTeamIndex = i;
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }

  var newBoardTitle = $("#titlenewbord").val();
  teams[activeTeamIndex].boards.forEach(function (board) {
    if (board.title === newBoardTitle) {
      alert("board already present");
      throw "board already present";
    }
  });

  if (newBoardTitle) {
    $("#board-name").text(newBoardTitle);
    $("#titlenewbord").val("");
    $("#board-modai").css("display", "none");
    var newboard = {
      id: generateId(5),
      title: newBoardTitle,
      todos: [],
      lists: [// { id: generateId(5), listName: "Todos", todos: [] },
        // { id: generateId(5), listName: "Currently", todos: [] },
        // { id: generateId(5), listName: "For later", todos: [] },
      ],
      creatorID: (0, _helperFunctions.getData)("activeUserID"),
      bgColor: $(".board-title").css("background-color")
    };
    teams[activeTeamIndex].boards.push(newboard);
    (0, _helperFunctions.saveData)("teams", teams);
    (0, _rendering.renderList)(boards[boards.length - 1].lists, boards[boards.length - 1].todos);
    (0, _rendering.renderTodos)(boards[boards.length - 1].todos);
    currentActiveBoardIdx = teams[activeTeamIndex].boards.length - 1;
    (0, _helperFunctions.saveData)("currentActiveBoardIdx", currentActiveBoardIdx);
    $("#slid-menu").slideUp();
    (0, _rendering.initializeBoardsList)();
    (0, _rendering.colorTheBoard)();
  } else {
    alert("Please enter the board title");
  }

  $(".bar-2, .bar-1").css({
    "filter": "blur(0)"
  });
});
var userImg = $(".userImg");
var users = JSON.parse(localStorage.getItem("users"));
var activeUser = JSON.parse(localStorage.getItem("activeUserID"));

for (var i = 0; i < users.length; i++) {
  if (users[i].id == activeUser) {
    $(userImg[0]).text(users[i].initial);
  }
}

function deleteBoard() {
  var activeTeamIndex;
  var teams = (0, _helperFunctions.getData)("teams");
  var boards;
  var currentActiveBoardIdx = (0, _helperFunctions.getData)("currentActiveBoardIdx");

  for (var _i2 = 0; _i2 < teams.length; _i2++) {
    //loop on teams (used normal loop to get team index from i)
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = teams[_i2].teamMembers[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var member = _step9.value;
        //loop on team members
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = (0, _helperFunctions.getData)("users")[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var user = _step10.value;

            //loop on users to compare
            if (member === user.userName) {
              // match the team which has this user's id to get the team's boards
              boards = teams[_i2].boards;
              activeTeamIndex = _i2;
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
          _iterator9["return"]();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }
  }

  if (teams[activeTeamIndex].boards.length < 2) {
    alert("There's no boards left except this one");
    throw "no boards left";
  }

  delete teams[activeTeamIndex].boards[currentActiveBoardIdx];
  teams[activeTeamIndex].boards = teams[activeTeamIndex].boards.filter(function (board) {
    return board;
  });
  currentActiveBoardIdx = 0;
  (0, _helperFunctions.saveData)("currentActiveBoardIdx", currentActiveBoardIdx);
  (0, _helperFunctions.saveData)("teams", teams);
  boards = teams[activeTeamIndex].boards;
  console.log(teams[activeTeamIndex].boards);
  (0, _rendering.renderList)(teams[activeTeamIndex].boards[0].lists, teams[activeTeamIndex].boards[0].todos);
  (0, _rendering.colorTheBoard)();
  (0, _rendering.initializeBoardsList)();
  $("#board-name").html(boards[0].title);
}