// slide down on click 
$(".new-todo-btn").click(function () {
  $(this).parent().next(".new-task").slideToggle().children("textarea").focus();
  $(this).parents('.card-wrapper').siblings().find('.new-task').slideUp()
});

$(".cancel-todo").click(function () {
	$(this).parents(".new-task").slideUp();
});

var ls = window.localStorage;

// rendering cards to their lists
function makeCards() {
	var lists = JSON.parse(ls.getItem("todos"));

	if (lists) {
		lists.forEach(function (listItem) {
			if (listItem.list === "listTodo") {
				$("#listTodos")
					.children(".card-bottom")
					.before(
						'<div class="list-cards"><a href="#" class="list-card">' +
							listItem.name +
							"</a></div>"
					);
			} else if (listItem.list === "listDoing") {
				$("#listDoing")
					.children(".card-bottom")
					.before(
						'<div class="list-cards"><a href="#" class="list-card">' +
							listItem.name +
							"</a></div>"
					);
			} else if (listItem.list === "listDone") {
				$("#listDone")
					.children(".card-bottom")
					.before(
						'<div class="list-cards"><a href="#" class="list-card">' +
							listItem.name +
							"</a></div>"
					);
			}
		});
	}
}
makeCards();

// add new todo to local storage
$(".add-card-btn").click(function (ev) {
	var todoName = $(this).parent().prev().val();

	var listName = ev.target.dataset.list;
	var listToBeEdited = JSON.parse(ls.getItem(`todos`)) || [];
	var todo2BeAdded = { name: todoName, list: "list" + listName };

	listToBeEdited.push(todo2BeAdded);
	ls.setItem("todos", JSON.stringify(listToBeEdited));

	$(this)
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

	deleteAllCards();
	makeCards();
}

// detecting clicks outside lists to close the card composer
$(document.body).click(function(ev){
  if (ev.target.classList.contains('container-fluid') || ev.target.classList.contains('row') ||ev.target.classList.contains('col')){
    $('.new-task').slideUp()
  }
})