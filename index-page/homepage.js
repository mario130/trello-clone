$(".new-todo-btn").click(function () {
	// $('#new-todo-show').slideToggle()
	$(this).parent().next(".new-task").slideToggle();
});

$(".cancel-todo").click(function () {
	// $('#new-todo-show').slideUp()
	$(this).parents(".new-task").slideUp();
});

$.ajax({
  type: "GET",
  url: "./todos.json",
  data: "data",
  success: function (response) {
    
  }
});