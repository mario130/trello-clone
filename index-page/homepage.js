$(".new-todo-btn").click(function () {
  $(this).parent().next(".new-task").slideToggle().children('textarea').focus();
  
});

$(".cancel-todo").click(function () {
	$(this).parents(".new-task").slideUp();
});


var ls = window.localStorage
// ls.setItem('listTodo', ['task 1', 'task 2', 'task 3'])
// ls.setItem('listDoing', ['task 4', 'task 5', 'task 6', 'task 7'])
// ls.setItem('listDone', ['task 8', 'task 9'])

function makeCards(){
  var listTodos = ls.getItem('listTodo').split(',')
  var listDoing = ls.getItem('listDoing').split(',')
  var listDone = ls.getItem('listDone').split(',')



  listTodos.forEach(function(todo, idx) {
    $('#listTodos').children('.card-bottom').before('<div class="list-cards"><a href="#" class="list-card" data-idx='+idx+' data-list="listTodo">'+todo+'</a></div>')
  })

  listDoing.forEach(function(todo, idx) {
    $('#listDoing').children('.card-bottom').before('<div class="list-cards"><a href="#" class="list-card" data-idx='+idx+' data-list="listDoing">'+todo+'</a></div>')
  })

  listDone.forEach(function(todo, idx) {
    $('#listDone').children('.card-bottom').before('<div class="list-cards"><a href="#" class="list-card" data-idx='+idx+' data-list="listDone">'+todo+'</a></div>')
  })
  activateCardDeletion()
}
makeCards()

$('.add-card-btn').click(function(ev){
  var newTodo = $(this).parent().prev().val()

  var listName = ev.target.dataset.list
  var listToBeEdited = ls.getItem(`list${listName}`).split(',')
  listToBeEdited.push(newTodo)
  ls.setItem(`list${listName}`, listToBeEdited)
  console.log(ls.getItem('listTodo'));
  
  $(this).parents('.new-task').prev().before('<div class="list-cards"><a href="#" class="list-card">'+newTodo+'</a></div>')
  $(this).parent().prev().val('')
  
  deleteAllCards()
  makeCards()

  activateCardDeletion()
})

function activateCardDeletion() {
  $('.list-card').click(function(ev){
    // var idx = ev.target.dataset.idx;
    var listName = ev.target.dataset.list
    var todoContent = ev.target.innerText
    var todosBeforeDeletion = ls.getItem(listName).split(',')

    var newTodos = todosBeforeDeletion.filter(function(todo) {
      if(todo === todoContent) {
        return false
      } else {
        return true
      }
    })
    ls.setItem(listName, newTodos)
    deleteAllCards()
    makeCards()
  })
}
activateCardDeletion()

function deleteAllCards() {
  $('.list-cards').remove()
}