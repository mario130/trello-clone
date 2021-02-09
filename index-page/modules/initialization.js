import { getData, saveData } from "./helper-functions.js";
import {
	displayMembers,
	colorTheBoard,
	initializeBoardsList,
	renderList,
	renderTodos,
} from "./rendering.js";
import { activeModalTodoId } from "./bootstrap-functions.js";
import { getDummyData, getBasicBoard } from "./testing-functions.js";
import { deleteBoard } from "./crud-operations.js";

/******************** Data Store ******************** */
//initialize data
var selectedBoard = selectedBoard ? selectedBoard : "Board 1";
var teams = getData("teams");
export let boards;
export let activeTeamIndex = getData("activeTeamIndex");
let selectedTodo;
let activeUserName;

let activeUserId = getData('activeUserID')
let users = getData('users')

if (!activeTeamIndex){
	for (let i = 0; i < users.length; i++){
		if (users[i].id === activeUserId){
			activeUserName = users[i].userName
			saveData('activeUserName', activeUserName)
		}
	}
	
	for (let i = 0; i < teams.length; i++){
		for(let j=0; j < teams[i].teamMembers.length; j++){
			if (teams[i].teamMembers[j] === activeUserName){
				activeTeamIndex = i
				saveData('activeTeamIndex', activeTeamIndex)
			}
		}
	}
}


// save active team index
for (let i = 0; i < teams.length; i++) {
	//loop on teams (used normal loop to get team index from i)
	for (let member of teams[i].teamMembers) {
		//loop on users to compare
		if (member === activeUserName) {
			// match the team which has this user's id to get the team's boards
			boards = teams[i].boards;
		}
	}
}
var currentActiveBoardIdx = getData("currentActiveBoardIdx");
if (!currentActiveBoardIdx) {
	var currentActiveBoardIdx;
}

// display team name
$("#team-name").html(teams[activeTeamIndex].teamName);

// display team members
$("#team").append('<div id="team-members"></div>');

// main operations
displayMembers();
colorTheBoard();
initializeBoardsList();

if (!currentActiveBoardIdx) {
	currentActiveBoardIdx = 0;
	saveData("currentActiveBoardIdx", currentActiveBoardIdx);
}

renderList(
	boards[currentActiveBoardIdx].lists,
	boards[currentActiveBoardIdx].todos
);

//showing edit list item | main events
$("#addAnotherList").click(function () {
	$(this).next().fadeIn().children("input").focus();
	$(this).hide();
});
$("#newList").on("keydown", function (e) {
	if (e.keyCode === 13) {
		$(this).next().children("button").click();
	} else if (e.keyCode === 27) {
		// $(this).
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
	boards[currentActiveBoardIdx].todos.map((todo) => {
		if (todo.id === activeModalTodoId) {
			todo.description = $($(ev).parent().prev()[0]).find("#desc").val();
			saveData("teams", teams);
			renderTodos(boards[currentActiveBoardIdx].todos);
		}
	});
}

// slid
$("#open-slid-menu").click(function () {
	$("#slid-menu").slideToggle();
});
$(".close-slid-menu").click(function () {
	$("#slid-menu").slideUp();
});
$("#open-board-modail").click(function () {
	$("#board-modai").css("display", "flex");
	$("#titlenewbord").focus();
});
$("#slid-menu").on("click", ".boardLink", function () {
	let idx = this.dataset.board;

	let teams = getData("teams");
	let boards;
	let currentActiveBoardIdx = getData("currentActiveBoardIdx");

	for (let i = 0; i < teams.length; i++) {
		//loop on teams (used normal loop to get team index from i)
		for (let member of teams[i].teamMembers) {
			//loop on team members
			for (let user of getData("users")) {
				//loop on users to compare

				if (member === user.userName) {
					// match the team which has this user's id to get the team's boards
					boards = teams[i].boards;
				}
			}
		}
	}

	currentActiveBoardIdx = idx;
	saveData("currentActiveBoardIdx", currentActiveBoardIdx);
	renderList(boards[idx].lists, boards[idx].todos);
	renderTodos(boards[idx].todos);
	$("#slid-menu").slideUp();
	$(".currentBoardName").text(boards[idx].title);
	$("#board-name").text(boards[idx].title);
	colorTheBoard();
});

$(".clr").each(function (idx, val) {
	$(this).css({ "background-color": val.dataset.color });
});
$(".close-modial").click(function () {
	$("#board-modai").fadeOut();
});
var lisColor = $(".board-style li");
lisColor.click(function () {
	$(".board-title").css("background-color", $(this).attr("data-color"));
});

$("#get-dummy-data").click(function () {
	getDummyData();
});

function doneTodo() {
	teams[activeTeamIndex].boards[currentActiveBoardIdx].todos.map((todo) => {
		if (todo.id === selectedTodo) {
			todo.isDone = !todo.isDone;
			saveData("teams", teams);
			$('.list-card[data-done="true"]').css({
				"text-decoration": "line-through",
			});
			renderTodos(boards[currentActiveBoardIdx].todos);
		}
	});
}

$("#done-todo").click(function () {
	doneTodo();
});

$("#get-basic-board").click(function () {
	getBasicBoard();
});

$("#delete-board").click(function () {
	deleteBoard();
});
