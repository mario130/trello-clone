//data
$(document).ready(function () {
  /******************** Data Store ******************** */
  //initialize data
var boards = getData("boards") ||
   [
	  {
		  id: generateId(5),
      title: "board1",
      todos:[],
		  lists: [
			  { id: generateId(5), listName: "todos", todos: [] },
			  { id: generateId(5), listName: "doing", todos: [] },
			  { id: generateId(5), listName: "done", todos: [] },
			],
		},
	];


  /*************************** Rendering ********************************* */
  //render
  function renderTodos(todos) {
    deleteAllTodos();
    todos.forEach((todo) => {
      $(`#${todo.listedIn}`)
        .children(".card-bottom")
        .before(
          '<div class="list-cards"><a href="#" class="list-card">' +
            todo.title +
            "</a></div>"
        );
    });
  }

  //   renderTodos(todos);
  function renderList(lists,todos) {
    deleteAllLists();
    lists.map((list) => {
      todos.map((todo) => {
        if (todo.listedIn === list.listName) {
          list.todos.push(todo);
        }
      });

      $("#listItems").append(listComponent(list));
    });
    renderTodos(todos)
  }
  renderList(boards[0].lists,boards[0].todos);

  /**************************** handling by events ************************************* */

  // click on NEW todo-btn

  $("#listItems").on("click", ".new-todo-btn", function (e) {
    e.preventDefault();
    $(this)
      .parent()
      .next(".new-task")
      .slideToggle()
      .children("textarea")
      .focus();
    $(this).parents(".card-wrapper").siblings().find(".new-task").slideUp();

    $(this).slideUp();
    $(this).parents(".card-wrapper").siblings().find(".new-todo-btn").show();
  });

  ///// close todo
  $("#listItems").on("click", ".cancel-todo", function () {
    $(this).parents(".new-task").slideUp();

    $(this).parents(".new-task").siblings().eq(1).find(".new-todo-btn").show();
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
      $(".new-task").slideUp();
      $(".new-todo-btn").show();
      // close list tab
      $(".new-list").slideUp();
      $("#addAnotherList").show();
    }
  });

  //click on add-card-btn and adding todo in

  $("#listItems").on("click", ".add-card-btn", function (ev) {
    var todoName = $(this).parent().prev().val();
    if (todoName.trim() === "") return;

    var listName = ev.target.dataset.list;
    var todo2BeAdded = {
      id: generateId(10),
      title: todoName,
      listedIn: listName,
      teamMembers: [],
      description: "",
      isDone: false,
    };

	boards[0].todos.push(todo2BeAdded);
   
   saveData("boards",boards)

   
    renderTodos(boards[0].todos);
    $(this).parent().prev().val("");
    $(this).parents(".new-task").children("textarea").focus();
  });

  // detecting clicks outside lists to close the card composer
  $(document.body).click(function (ev) {
    if (
      ev.target.classList.contains("container-fluid") ||
      ev.target.classList.contains("row") ||
      ev.target.classList.contains("col")
    ) {
      $("textarea").val("");
      $(".new-task").slideUp();
      $(".new-todo-btn").show();

      $("#addAnotherList").show();
      $(".new-list").slideUp();
    }
  });

  //adding another list
  $("#addlistBtn").click(function () {
    //create list object and push
    var listTitle = $(this).parent().prev().val();
    if (listTitle) {
      var list = {
        id: generateId(5),
        listName: listTitle,
        todos: [],
      };
      boards[0].lists.push(list);
      renderList(boards[0].lists,boards[0].todos);
      renderTodos(boards[0].todos);
    }

    $(this).parent().prev().val("");
  });

  //showing edit list item
  $("#addAnotherList").click(function () {
    $(this).next().slideToggle();
    $(this).hide();
  });
  /***************************************************************** */

  // FOR RENDERING
  function deleteAllTodos() {
    $(".list-cards").remove();
  }
  function deleteAllLists() {
    $(".list").remove();
  }
  function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function getData(key) {
   var data = localStorage.getItem(key);
    return JSON.parse(data);
  }
  // logout logic
  function logOut() {
    localStorage.removeItem("activeUserID");
    location.assign("/log-in/login.html");
  }
  /*************          changes      ***************/

  /******************* conponents ******************************* */
  function listComponent(list) {
    return `<div class="card-wrapper mt-2 ml-0 mr-2 list">
  
	<div class="card" id="${list.listName}">
	  <div class="card-header mb-1">
		<h2>${list.listName}</h2>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
		  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
		</svg>
	  </div>


	  
	  <div class="card-bottom">
		
		<a href="#" class="card-composer new-todo-btn">
		  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
			<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
		  </svg>
		  Add another card</a>
	  </div>

	  <div class="new-task">

		<textarea class="" name="new-task" cols="24" rows="3"></textarea>

		<div class="add-card-actions">
		  <button class="add-card-btn bar-2-btn" data-list=${list.listName}>Add card</button>

		  <a href="#" class="cancel-todo">
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
			  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
			</svg>
		  </a>

		</div>
	  </div>

	</div>


  </div>`;
  }
  console.log(boards[0])
});