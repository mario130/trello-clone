// slide down on click
$(".new-todo-btn").click(function () {
	$(this).parent().next(".new-task").slideToggle().children("textarea").focus();
	$(this).parents(".card-wrapper").siblings().find(".new-task").slideUp();
});

$(".cancel-todo").click(function () {
	$(this).parents(".new-task").slideUp();
});

var textareas = $("textarea");
textareas.keydown(function (e) {
	if (e.keyCode == 13) {
		$(this).next().children("button").click();
		e.preventDefault();
	}
});
$(document.body).keydown(function (e) {
	if (e.keyCode == 27) {
		$(".new-task").slideUp();
	}
});

var ls = window.localStorage;
var selectedBoard;

// rendering cards to their lists
function makeCards() {
	var boards = JSON.parse(ls.getItem("boards"));

	if (!boards) {
		boards = [];
		var firstBoard = {
			id: generateId(20),
			title: "Board 1",
			lists: [
				{
					id: generateId(20),
					listName: "Todos",
					todos: [],
				},
				{
					id: generateId(20),
					listName: "Doing",
					todos: [],
				},
				{
					id: generateId(20),
					listName: "Done",
					todos: [],
				},
			],
		};
		boards.push(firstBoard);
		ls.setItem("boards", JSON.stringify(boards));
	}

	selectedBoard = selectedBoard ? selectedBoard : "Board 1";
	lists = {
		// todos to be rendered (name only)
		Todos: [],
		Doing: [],
		Done: [],
	};
	var receivedBoard;
	// Next, get todos

	boards.forEach(function (board) {
		// select wanted board which the user selected (if isn't selected then select the template one)
		if (board.title === selectedBoard) {
			receivedBoard = board;
		}
	});

	receivedBoard.lists.forEach(function (list) {
		if (list.listName === "Todos") {
			list.todos.forEach(function (todo) {
				lists.Todos.push(todo.title);
			});
		}

		if (list.listName === "Doing") {
			list.todos.forEach(function (todo) {
				lists.Doing.push(todo.title);
			});
		}

		if (list.listName === "Done") {
			list.todos.forEach(function (todo) {
				lists.Done.push(todo.title);
			});
		}
	});

	// start rendering for each list
	lists.Todos.forEach(function (todo) {
		$("#listTodos")
			.children(".card-bottom")
			.before(
				'<div class="list-cards"><a href="#" class="list-card">' +
					todo +
					"</a></div>"
			);
	});

	lists.Doing.forEach(function (todo) {
		$("#listDoing")
			.children(".card-bottom")
			.before(
				'<div class="list-cards"><a href="#" class="list-card">' +
					todo +
					"</a></div>"
			);
	});

	lists.Done.forEach(function (todo) {
		$("#listDone")
			.children(".card-bottom")
			.before(
				'<div class="list-cards"><a href="#" class="list-card">' +
					todo +
					"</a></div>"
			);
	});
}
makeCards();

// add new todo to local storage
$(".add-card-btn").click(function (ev) {
	var todoName = $(this).parent().prev().val();
	if (todoName.trim() === "") return;
	var listName = ev.target.dataset.list;

	var todo2BeAdded = {
		id: generateId(20),
		title: todoName,
		isDone: false,
		team: [ls.getItem("activeUserID")],
		description: ''
	};

	lists[listName].push(todo2BeAdded);
	var boards = JSON.parse(ls.getItem("boards"));

	boards.forEach(function (board) {
		board.lists.forEach(function (list) {
			if (list.listName === listName) {
				list.todos.push(todo2BeAdded);
				ls.setItem("boards", JSON.stringify(boards));
			}
		});
	});

	$(this) // render the new todo
		.parents(".new-task")
		.prev()
		.before(
			'<div class="list-cards"><a href="#" class="list-card">' +
				todoName +
				"</a></div>"
		);

	$(this).parent().prev().val("");
	$(this).parents(".new-task").children("textarea").focus();

	deleteAllCards();
	makeCards();
});

// FOR RENDERING
function deleteAllCards() {
	$(".list-cards").remove();
}

// FOR TESTING
function deleteAllTodos() {
	ls.removeItem("todos");
	ls.removeItem("boards");

	deleteAllCards();
	makeCards();
}

// detecting clicks outside lists to close the card composer
$(document.body).click(function (ev) {
	if (
		ev.target.classList.contains("container-fluid") ||
		ev.target.classList.contains("row") ||
		ev.target.classList.contains("col")
	) {
		$("textarea").val("");
		$(".new-task").slideUp();
	}
});

// logout logic
function logOut() {
	ls.removeItem("activeUserID");
	location.assign("/log-in/login.html");
}
