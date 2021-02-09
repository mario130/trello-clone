$("#listItems").on("click", ".new-todo-btn", function (e) {
	e.preventDefault();
	$(this).parent().next(".new-task").slideToggle().children("textarea").focus();
	$(this).parents(".card-wrapper").siblings().find(".new-task").slideUp();

	$(this).slideUp();
	$(this).parents(".card-wrapper").siblings().find(".new-todo-btn").show();
});

///// close todo
$("#listItems").on("click", ".cancel-todo", function () {
	$(this).parents(".new-task").slideUp();

	$(".new-todo-btn").slideDown();
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
	} else if (e.keyCode == 18){
		$('.test-btn').show()
	}
});
$(document.body).keyup(function(e){
	if (e.keyCode === 18){
		$('.test-btn').hide()
	}
})

// detecting clicks outside lists to close the card composer
$(document.body).click(function (ev) {
	ev.stopPropagation();
	if (
		ev.target.classList.contains("container-fluid") ||
		ev.target.classList.contains("row") ||
		ev.target.classList.contains("col") ||
		ev.target.id === "listItems"
	) {
		$("textarea").val("");
		$(".new-task").slideUp();
		$(".new-todo-btn").slideDown();

		$(".new-list").hide();
		$("#addAnotherList").fadeIn();
	}
});
