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
    var lists = $('.card-wrapper .card');
    for (var i = 0; i < lists.length; i++) {
      for (var j = 0; j < response[i].length; j++) {
        $(lists[i]).children('.card-bottom').before('<div class="list-cards"><a href="#" class="list-card">'+response[i][j]+'</a></div>')
      }
    }
    $('.list-cards').draggable({
      revert: 'invalid'
    })
  }
});

$('.card').droppable({
  accept: '.list-cards',
})

$('.add-card-btn').click(function(){
  var newTodo = $(this).parent().prev().val()
  $(this).parents('.new-task').prev().before('<div class="list-cards"><a href="#" class="list-card">'+newTodo+'</a></div>')
  $(this).parent().prev().val('')
})

