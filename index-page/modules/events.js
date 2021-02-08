import {getData, saveData} from './helper-functions.js'
import {renderTodos} from './rendering.js'

let activeTeamIndex;
let teams = getData('teams');
let boards;
let currentActiveBoardIdx = getData('currentActiveBoardIdx');

for (let i = 0; i < teams.length; i++){     //loop on teams (used normal loop to get team index from i)
  for (let member of teams[i].teamMembers){ //loop on team members
    for (let user of getData('users')){     //loop on users to compare
      
      if (member === user.userName){ // match the team which has this user's id to get the team's boards
      boards = teams[i].boards
      const activeTeamId = teams[i].id
      activeTeamIndex = i
      }
    }
  }
}


$("#listItems").on("click", ".new-todo-btn", function (e) {
  e.preventDefault();
  $(this)
    .parent()
    .next(".new-task")
    .slideToggle()
    .children("textarea")
    .focus();
  $(this).parents(".card-wrapper").siblings().find(".new-task").slideUp();

  $(this).slideUp();
  $(this).parents(".card-wrapper").siblings().find(".new-todo-btn").show();
});

///// close todo
$("#listItems").on("click", ".cancel-todo", function () {
  $(this).parents(".new-task").slideUp();

  // $(this).parents(".new-task").siblings().eq(1).find(".new-todo-btn").show();
  $('.new-todo-btn').slideDown()
});

//// press ENTER in keyboard

$("#listItems").on("keydown", "textarea", function (e) {
  if (e.keyCode == 13) {
    $(this).next().children("button").click();
    e.preventDefault();
  }
});
/// press ESC in keyboard
$(document.body).keydown(function (e) {
  if (e.keyCode == 27) {
    $("textarea").val("");
    $(".new-task").slideUp();
    $(".new-todo-btn").slideDown();
    // close list tab
    $(".new-list").hide();
    $("#addAnotherList").fadeIn();
    $("#board-modai").fadeOut();
    $("#slid-menu").slideUp();
  }
});



// detecting clicks outside lists to close the card composer
$(document.body).click(function (ev) {
  ev.stopPropagation();
  if (
    ev.target.classList.contains("container-fluid") ||
    ev.target.classList.contains("row") ||
    ev.target.classList.contains("col") ||
    ev.target.id === 'listItems'
  ) {
    $("textarea").val("");
    $(".new-task").slideUp();
    $(".new-todo-btn").slideDown();

    $(".new-list").hide();
    $("#addAnotherList").fadeIn();
  }
});