import { getData } from "./helper-functions.js";

export let activeTeamIndex;
export let teams = getData("teams");
export let boards;

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
