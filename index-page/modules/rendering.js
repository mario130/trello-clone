import { getData } from "./helper-functions.js";
import { makeTodosDraggable } from "./jQueryUI.js";
import { activateMmodals } from "./bootstrap-functions.js";
import { deleteList } from "./crud-operations.js";
import "./getActiveTeamIdx.js";

// FOR RENDERING
function deleteAllTodos() {
	$(".list-cards").remove();
}
function deleteAllLists() {
	$(".list").remove();
}

/*************************** Rendering ********************************* */
//render
export function renderTodos(todos) {
	deleteAllTodos();
	if (todos) {
		todos.forEach((todo) => {
			$(`#${properId(todo.listedIn)}`)
				.children(".card-bottom")
				.before(
					'<div class="list-cards" id="' +
						todo.id +
						'"><a href="#" class="list-card" data-id="' +
						todo.id +
						'" data-done="' +
						todo.isDone +
						'">' +
						todo.title +
						"</a></div>"
				);
		});
		makeTodosDraggable();
		activateMmodals();
	}
}

//   renderTodos(todos);
export function renderList(lists, todos) {
	let activeTeamIndex;
	let teams = getData("teams");
	let boards;
	let currentActiveBoardIdx = getData("currentActiveBoardIdx");

	for (let i = 0; i < teams.length; i++) {
		for (let member of teams[i].teamMembers) {
			for (let user of getData("users")) {
				if (member === user.userName) {
					// match the team which has this user's id to get the team's boards
					boards = teams[i].boards;
					const activeTeamId = teams[i].id;
					activeTeamIndex = i;
				}
			}
		}
	}

	deleteAllLists();
	lists.forEach((list) => {
		$("#listItems").append(listComponent(list));
	});

	// update board title button on every list render
	$(".currentBoardName").html(boards[currentActiveBoardIdx].title);
	renderTodos(todos);
	activateListDeletion();
}

function activateListDeletion() {
	$(".delete-list").bind("click", function () {
		deleteList(this);
	});
}

export function colorTheBoard() {
	let activeTeamIndex;
	let teams = getData("teams");
	let currentActiveBoardIdx = getData("currentActiveBoardIdx");

	for (let i = 0; i < teams.length; i++) {
		for (let member of teams[i].teamMembers) {
			for (let user of getData("users")) {
				if (member === user.userName) {
					const activeTeamId = teams[i].id;
					activeTeamIndex = i;
				}
			}
		}
	}

	// Start coloring..
	$(".bar-1").css({
		"background-color":
			teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor,
	});
	$(".bar-2").css({
		"background-color":
			teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor,
	});
	$(".slid-menu-board").css({
		"background-color":
			teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor,
	});
}

// Boards dropdown
export function initializeBoardsList() {
	let teams = getData("teams");
	let boards;

	for (let i = 0; i < teams.length; i++) {
		for (let member of teams[i].teamMembers) {
			for (let user of getData("users")) {
				if (member === user.userName) {
					// match the team which has this user's id to get the team's boards
					boards = teams[i].boards;
				}
			}
		}
	}

	$(".boardLink").parent().remove();
	for (let i = 0; i < boards.length; i++) {
		let boardLink = $(
			`<div class="slid-board"><button class="boardLink" data-board="${i}" >${boards[i].title}</button></div>`
		);
		$(".create-new-board").before(boardLink);
	}
}

// display team members
import { activeTeamIndex, teams } from "./getActiveTeamIdx.js";
export function displayMembers() {
	var users = getData("users");
	for (let member of teams[activeTeamIndex].teamMembers) {
		for (let user of users) {
			if (member === user.userName) {
				$("#team-members").append(
					`<div class = "userImg"><span class="initials">${user.initial}</span><span class="tooltiptext">${user.fullName}</span></div>`
				);
			}
		}
	}
	$("#team-members").append('<span id="members-tag">Members</span>');
}

/******************* conponents ******************************* */
function listComponent(list) {
	return `
  <div class="card-wrapper mt-2 ml-0 mr-2 list">
    <div class="card" id="${properId(list.listName)}">
      <div class="card-header mb-1">
        <h2>${list.listName}</h2>
        <button class="delete-list">
          <svg height="365pt" viewBox="0 0 365.71733 365" width="365pt" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
        </button>
      </div>
            
      <div class="card-bottom">
        <a href="#" class="card-composer new-todo-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        Add another card</a>
      </div>

      <div class="new-task">
        <textarea class="" name="new-task" cols="24" rows="3"></textarea>
        <div class="add-card-actions">
          <button class="add-card-btn bar-2-btn" data-list="${
						list.listName
					}">Add card</button>
          <a href="#" class="cancel-todo">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
}
