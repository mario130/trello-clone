import { getData, saveData } from "./helper-functions.js";
import { draggingInProgress } from "./jQueryUI.js";
import { renderTodos } from "./rendering.js";

export let activeModalTodoId;
let selectedTodo;

// modal window
export function activateMmodals() {
	let users = getData("users");
	let currentActiveBoardIdx = getData("currentActiveBoardIdx");

	let teams = getData("teams");
	let boards;

	for (let i = 0; i < teams.length; i++) {
		for (let member of teams[i].teamMembers) {
			for (let user of users) {
				if (member === user.userName) {
					// match the team which has this user's id to get the team's boards
					boards = teams[i].boards;
				}
			}
		}
	}

	// activate modal on press
	$(".list-card").click(function () {
		selectedTodo = this.dataset.id;
		$(".modal-title").html(this.textContent);

		// loop for the chosen todo to get its info
		var todos = boards[currentActiveBoardIdx].todos;
		var chosenId = $(this)[0].getAttribute("data-id");
		activeModalTodoId = chosenId;
		var chosenTodo = [];
		todos.forEach((todo) => {
			if (todo.id === chosenId) {
				chosenTodo.push(todo);
				// $("#desc").html(chosenTodo[0].description);
				
				
				// $('#desc').attr('placeholder', chosenTodo[0].description)
				$('#desc').val(chosenTodo[0].description)
			}
		});

		// fill todo description
		

		// get current user full name
		var activeUserId = getData("activeUserID");
		var users = getData("users");
		var chosenUser = users.forEach((user) => {
			if (user.id === activeUserId) {
				$("#modal-members").html(user.fullName);
			}
		});

		if (!draggingInProgress) {
			$("#myModal").appendTo("body").modal("show");
			$("#myModal").modal("show");
		}
	});
}

function doneTodo() {
	let activeTeamIndex;
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
					const activeTeamId = teams[i].id;
					activeTeamIndex = i;
				}
			}
		}
	}

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
// done todo
$("#done-todo").click(function () {
	doneTodo();
});
