import { saveData, getData } from "./helper-functions.js";
import { renderList } from "./rendering.js";

// Drag & drop logic
export var draggingInProgress = false;
export function makeTodosDraggable() {
	$(".list-cards").draggable({
		revert: "invalid",
		start: function (ev, ui) {
			$($(ev.target).parents(".card")[0]).addClass("todo-leave");
			draggingInProgress = true;
		},
		stop: function () {
			draggingInProgress = false;
		},
	});
	$(".card").droppable({
		accept: ".list-cards",
		classes: {
			"ui-droppable-hover": "todo-enter",
		},
		drop: function (ev, ui) {
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
						}
					}
				}
			}

			boards[currentActiveBoardIdx].todos.forEach(function (todo) {
				if (todo.id === ui.draggable[0].getAttribute("id")) {
					todo.listedIn = ev.target.id;
					saveData("teams", teams);
					renderList(
						boards[currentActiveBoardIdx].lists,
						boards[currentActiveBoardIdx].todos
					);
				}
			});
		},
	});
}
