import { saveData, getData } from "./helper-functions.js";
import {
	renderList,
	renderTodos,
	initializeBoardsList,
	colorTheBoard,
} from "./rendering.js";

let boards;
let teams;
let activeTeamIndex;
let currentActiveBoardIdx;

export function getBasicBoard() {
	teams = getData("teams");

	for (let i = 0; i < teams.length; i++) {
		//loop on teams (used normal loop to get team index from i)
		for (let member of teams[i].teamMembers) {
			//loop on team members
			for (let user of getData("users")) {
				//loop on users to compare

				if (member === user.userName) {
					// match the team which has this user's id to get the team's boards
					boards = teams[i].boards;
					activeTeamIndex = i;
				}
			}
		}
	}

	teams[activeTeamIndex].boards[0].lists = [];
	teams[activeTeamIndex].boards[0].todos = [];

	createBasicBoard();

	initializeBoardsList();
	colorTheBoard();
	$("#slid-menu").slideUp();
}

export function createBasicBoard() {

	let teams = getData("teams");
	let activeTeamIndex = getData('activeTeamIndex');
	let currentActiveBoardIdx;
	
	let boards = [
		{
			id: generateId(5),
			title: "Board 1",
			boardMembers: [getData("activeUserID")],
			todos: [],
			lists: [
				{ id: generateId(5), listName: "todos", todos: [] },
				{ id: generateId(5), listName: "doing", todos: [] },
				{ id: generateId(5), listName: "done", todos: [] },
			],
			creatorID: getData("activeUserID"),
			bgColor: "#1f79bf",
		},
	];
	
	teams[activeTeamIndex].boards = boards;
	currentActiveBoardIdx = 0;

	saveData("teams", teams);
	saveData("currentActiveBoardIdx", currentActiveBoardIdx);

	renderList(boards[0].lists, boards[0].todos);
	renderTodos(boards[0].todos);
}

export function getDummyData() {
	localStorage.clear();
	const users = fetch("./dummy data/users.json");
	const teams = fetch("./dummy data/teams.json");
	teams
		.then((res) => res.json())
		.then((res) => {
			saveData("teams", res);
			renderList(res[0].boards[0].lists, res[0].boards[0].todos);
			$(".currentBoardName").html("Board 1");
			boards = res[0].boards;
			initializeBoardsList();
			colorTheBoard();
		});

	users
		.then((res) => res.json())
		.then((res) => {
			saveData("users", res);
		})
		.then(() => location.reload());

	saveData("activeUserID", "_NekmV__*u@c#C$&X4JfR");
	saveData("currentActiveBoardIdx", 0);

	$("#slid-menu").slideUp();
}
