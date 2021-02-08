// detect if user passed login
if (!(getData('activeUserID'))){
  document.location.href = "/log-in/login.html";
}

//data
/******************** Data Store ******************** */
//initialize data
var selectedBoard = selectedBoard ? selectedBoard : "Board 1";
var teams = getData('teams')
let boards;
let activeTeamIndex;
let selectedTodo;

for (let i = 0; i < teams.length; i++){     //loop on teams (used normal loop to get team index from i)
  for (let member of teams[i].teamMembers){ //loop on team members
    for (let user of getData('users')){     //loop on users to compare

      if (member === user.userName){ // match the team which has this user's id to get the team's boards
        boards = teams[i].boards
        const activeTeamId = teams[i].id
        activeTeamIndex = i
        
      }
    }
  }
}
// var boards = getData("boards")
var currentActiveBoardIdx = getData('currentActiveBoardIdx')
if (!currentActiveBoardIdx){
  var currentActiveBoardIdx;
}

// if (!boards){
//   createBasicBoard()
// }

// display team name
$('#team-name').html(teams[activeTeamIndex].teamName)

// display team members
$('#team').append('<div id="team-members"></div>')
function displayMembers(){
  // console.log(teams[activeTeamIndex].teamMembers);
  var users = getData('users')

  for (member of teams[activeTeamIndex].teamMembers){
    for (user of users) {
      if (member === user.userName){
        $('#team-members').append(`<div class = "userImg"><span class="initials">${user.initial}</span><span class="tooltiptext">${user.fullName}</span></div>`)
      }
    }
  }
  $('#team-members').append('<span id="members-tag">Members</span>')
}
displayMembers()

function colorTheBoard(){
  var currentActiveBoardIdx = getData('currentActiveBoardIdx')
  $('.bar-1').css({'background-color': teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor})
  $('.bar-2').css({'background-color': teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor})
  $('.slid-menu-board').css({'background-color': teams[activeTeamIndex].boards[currentActiveBoardIdx].bgColor})

}
colorTheBoard()

function createBasicBoard(){
  boards = 
  [
    {
      id: generateId(5),
      title: "Board 1",
      boardMembers: [getData('activeUserID')],
      todos:[],
      lists: [
        { id: generateId(5), listName: "todos", todos: [] },
        { id: generateId(5), listName: "doing", todos: [] },
        { id: generateId(5), listName: "done", todos: [] },
      ],
      creatorID: getData('activeUserID'),
      bgColor: '#1f79bf'
    },
  ];
  teams[activeTeamIndex].boards = boards
  saveData('teams', teams)
  currentActiveBoardIdx = 0;
  saveData('currentActiveBoardIdx', currentActiveBoardIdx);
}

// initialize boards list
function initializeBoardsList(){
  $('.boardLink').parent().remove()
  for (let i = 0; i < boards.length; i++){
    let boardLink = $(`<div class="slid-board"><button class="boardLink" onclick="switchBoard(${i})">${boards[i].title}</button></div>`);
    $('.create-new-board').before(boardLink)
  }
}
initializeBoardsList()

  /*************************** Rendering ********************************* */
  //render
  function renderTodos(todos) {
    deleteAllTodos();
    if (todos){
      todos.forEach((todo) => {
        $(`#${properId(todo.listedIn)}`)
          .children(".card-bottom")
          .before(
            '<div class="list-cards" id="'+todo.id+'"><a href="#" class="list-card" data-id="'+todo.id+'" data-done="'+todo.isDone+'">' +
              todo.title +
              "</a></div>"
          );
      });
      makeTodosDraggable()
      activateMmodals()
    }
  }

  //   renderTodos(todos);
  function renderList(lists,todos) {
    let teams = getData('teams')
    let boards = teams[activeTeamIndex].boards
    deleteAllLists();
    lists.forEach((list) => {
      $("#listItems").append(listComponent(list));
    });

    // update board title button on every list render
    // console.log(boards);
    $('.currentBoardName').html(boards[currentActiveBoardIdx].title)
    renderTodos(todos)
  }
  if (!currentActiveBoardIdx) {
    currentActiveBoardIdx = 0;
    saveData('currentActiveBoardIdx', currentActiveBoardIdx);
  }
  renderList(boards[currentActiveBoardIdx].lists,boards[currentActiveBoardIdx].todos);

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

    // $(this).parents(".new-task").siblings().eq(1).find(".new-todo-btn").show();
    $('.new-todo-btn').slideDown()
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
    }
  });

  //click on add-card-btn and adding todo in

  $("#listItems").on("click", ".add-card-btn", function (ev) {
    var currentActiveBoardIdx = getData('currentActiveBoardIdx')
    var todoName = $(this).parent().prev().val();
    if (todoName.trim() === "") return;

    var listName = ev.target.dataset.list;
    var todo2BeAdded = {
      id: generateId(10),
      title: todoName,
      listedIn: listName,
      // teamMembers: [],
      description: "",
      isDone: false,
    };

    // console.log(boards[currentActiveBoardIdx]);
  boards[currentActiveBoardIdx].todos.push(todo2BeAdded);
  boards[currentActiveBoardIdx].lists.forEach(list=>{
    if(list.listName === todo2BeAdded.listedIn){
      list.todos.push(todo2BeAdded)
    }
  })
  teams[activeTeamIndex].boards = boards
    saveData("teams",teams)

    renderTodos(boards[currentActiveBoardIdx].todos);
    $(this).parent().prev().val("");
    $(this).parents(".new-task").children("textarea").focus();
  });

  // detecting clicks outside lists to close the card composer
  $(document.body).click(function (ev) {
    ev.stopPropagation();
    if (
      ev.target.classList.contains("container-fluid") ||
      ev.target.classList.contains("row") ||
      ev.target.classList.contains("col") ||
      ev.target.id === 'listItems'
    ) {
      $("textarea").val("");
      $(".new-task").slideUp();
      $(".new-todo-btn").slideDown();

      $(".new-list").hide();
      $("#addAnotherList").fadeIn();
    }
  });

  //adding another list
  $("#addlistBtn").click(function () {
    //create list object and push
    var listTitle = $(this).parent().prev().val();
    var isAlready=false
    if (listTitle) {
      boards[currentActiveBoardIdx].lists.forEach(list=>{
        if(list.listName === listTitle) {
          isAlready =true
        }
      })
      if(isAlready) {
        alert("this List is Alreay Created")
        $(this).parent().prev().val("")
        return;
      };
      var list = {
        id: generateId(5),
        listName: listTitle,
        todos: [],
      };
      
      teams[activeTeamIndex].boards[currentActiveBoardIdx].lists.push(list);
      saveData('teams', teams)
      renderList(boards[currentActiveBoardIdx].lists,boards[currentActiveBoardIdx].todos);
      renderTodos(boards[currentActiveBoardIdx].todos);
    }

    $(this).parent().prev().val("");
    $(".new-list").hide();
    $("#addAnotherList").fadeIn();
    // console.log(boards);
  });
  // delete list
  function deleteList(that){
    var ans = confirm('Are you sure?');
    if (ans){

      var listNameToBeDeleted = $(that).prev().html()
      for(let i = 0; i < boards[currentActiveBoardIdx].lists.length; i++){
        if (boards[currentActiveBoardIdx].lists[i].listName === listNameToBeDeleted){
          var listIdxToBeDeleted = i
          // console.log(boards[0].lists[i].listName);
        }
      }
      if (listIdxToBeDeleted > -1) {
        // console.log('present', listIdxToBeDeleted);
        teams[activeTeamIndex].boards[currentActiveBoardIdx].lists.splice(listIdxToBeDeleted, 1)
        // console.log(boards);
        saveData('teams', teams)
        renderList(boards[currentActiveBoardIdx].lists,boards[currentActiveBoardIdx].todos);
        renderTodos(boards[currentActiveBoardIdx].todos);
        // console.log('deleted');
      }
    }
  }

  //showing edit list item
  $("#addAnotherList").click(function () {
    $(this).next().fadeIn().children('input').focus();
    $(this).hide();
  });
  $('#newList').on("keydown", function(e){
    if (e.keyCode === 13) {
      $(this).next().children('button').click()
    } else if (e.keyCode === 27) {
      // $(this).
    }
  })
  $('#cancel-list').click(function(){
    $(".new-list").hide();
    $("#addAnotherList").fadeIn();
  })
  /***************************************************************** */
  
  // Drag & drop logic
  var draggingInProgress = false;
  function makeTodosDraggable(){

    $(".list-cards").draggable({
      revert: 'invalid',
      start: function(ev, ui){
        $($(ev.target).parents('.card')[0]).addClass('todo-leave')
        draggingInProgress = true;
      },
      stop: function(){
        draggingInProgress = false
      }
    })
    $(".card").droppable({
      accept:'.list-cards',
      classes: {
        'ui-droppable-hover': 'todo-enter'
      },
      drop: function(ev, ui){
        
        boards[currentActiveBoardIdx].todos.forEach(function(todo){
          if (todo.id === ui.draggable[0].getAttribute('id')){
            todo.listedIn = ev.target.id;
            saveData('teams', teams)
            renderList(boards[currentActiveBoardIdx].lists,boards[currentActiveBoardIdx].todos);
          }
        })
      }
    })
  }
  /***************************************************************** */

  var activeModalTodoId;
  // modal window
  function activateMmodals(){

    // activate modal on press
    $('.list-card').click(function(){
      selectedTodo = this.dataset.id
      $('.modal-title').html(this.textContent)
      
      // loop for the chosen todo to get its info
      var todos = boards[currentActiveBoardIdx].todos
      var chosenId = $(this)[0].getAttribute('data-id')
      activeModalTodoId = chosenId
      var chosenTodo = []; 
      todos.forEach(todo => {
        if (todo.id === chosenId){
          chosenTodo.push(todo)
        }
      })

      // fill todo description
      $('#desc').html('')
      $('#desc').html(chosenTodo[0].description)

      // get current user full name
      var activeUserId = getData('activeUserID');
      var users = getData('users')
      var chosenUser = users.forEach(user => {
        // console.log(user.id);
        // console.log(activeUserId);
        if (user.id === activeUserId){
          $('#modal-members').html(user.fullName)
          ////////////////////////////////////////////    TODO      ////////////////////////////////
          // write todo members logic 
          
        }
      })
      // console.log(chosenUser);
      if (!draggingInProgress){
        $('#myModal').appendTo("body").modal('show');
        $('#myModal').modal('show')
      }
    })
  }

  function saveDescription(ev){
    boards[currentActiveBoardIdx].todos.map(todo => {
      if (todo.id === activeModalTodoId){
        todo.description = $($(ev).parent().prev()[0]).find('#desc').val()
        saveData('teams', teams)
        renderTodos(boards[currentActiveBoardIdx].todos);
      }
    })
  }
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
    location.assign("../log-in/login.html");
  }
  // delete local storage
  function deleteLocalStorage(){
    localStorage.removeItem('boards');
    
  }
  // TODO
  function getBasicBoard(){
    teams[activeTeamIndex].boards[0].lists = []
    teams[activeTeamIndex].boards[0].todos = []
    createBasicBoard()
    saveData('teams', teams)
    renderList(boards[0].lists,boards[0].todos);
    renderTodos(boards[0].todos);
    initializeBoardsList()
    colorTheBoard()
  }
  /*************          changes      ***************/

  /******************* conponents ******************************* */
  function listComponent(list) {
    return `<div class="card-wrapper mt-2 ml-0 mr-2 list">
  
  <div class="card" id="${properId(list.listName)}">
    <div class="card-header mb-1">
    <h2>${list.listName}</h2>
    <button onclick="deleteList(this)" class="delete-list">
      <svg height="365pt" viewBox="0 0 365.71733 365" width="365pt" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
    </button>
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
      <button class="add-card-btn bar-2-btn" data-list="${list.listName}">Add card</button>

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
  

  $("#open-slid-menu").click(function () {
    $("#slid-menu").slideToggle();
  })
  $('.close-slid-menu').click(function(){
    $("#slid-menu").slideUp();
  })
  $("#open-board-modail").click(function () {
    $("#board-modai").css("display","flex");
    $('#titlenewbord').focus()
  })
  // $('.clr').css({'background-color': this.dataset.color})
  // $('.clr')[0].getAttribute('data-color')
  // console.log($('.clr').dataset.color);
  $('.clr').each(function(idx, val){
    // console.log(val.dataset.color);
    $(this).css({'background-color': val.dataset.color})
  })
  $(".close-modial").click(function () {
    $("#board-modai").fadeOut();
  })
  var lisColor = $(".board-style li");
  lisColor.click(function(){
    // console.log($(this).attr("data-color"));
    $(".board-title").css("background-color",$(this).attr("data-color"))
  })
  
  $("#add-board").click(function(){
    var newBoardTitle = $("#titlenewbord").val();

    teams[activeTeamIndex].boards.forEach(board => {
      if (board.title === newBoardTitle) {
        alert('board already present')
        throw 'board already present'
      }
    })
    
    if(newBoardTitle){
      $("#board-name").text(newBoardTitle)
      // console.log(newBoardTitle)
      $("#titlenewbord").val("");
      $("#board-modai").css("display","none");
      var newboard = 
    {
      id: generateId(5),
      title: newBoardTitle,
      // boardMembers: [getData('activeUserID')],
      todos:[],
      lists: [
        { id: generateId(5), listName: "todos", todos: [] },
        { id: generateId(5), listName: "doing", todos: [] },
        { id: generateId(5), listName: "done", todos: [] },
      ],
      creatorID: getData('activeUserID'),
      bgColor: $(".board-title").css("background-color")
    };
    teams[activeTeamIndex].boards.push(newboard)
    saveData('teams', teams)
    renderList(boards[boards.length-1].lists,boards[boards.length-1].todos);
    renderTodos(boards[boards.length-1].todos)
    currentActiveBoardIdx = teams[activeTeamIndex].boards.length-1
    // console.log(currentActiveBoardIdx);
    // console.log(boards);
    saveData('currentActiveBoardIdx', currentActiveBoardIdx);
    
    $('#slid-menu').slideUp()
    initializeBoardsList()
    colorTheBoard()
    
    } else {
      alert('Please enter the board title')
    }
  })
  var userImg = $(".userImg");
  // console.log(userImg);
  // userImg.text('sd');

var users = JSON.parse(localStorage.getItem("users"));
var activeUser = JSON.parse(localStorage.getItem("activeUserID"));

// console.log(activeUser);

for (let i = 0; i< users.length; i++){
	if (users[i].id == activeUser){
    $(userImg[0]).text(users[i].initial);
  }
}

function switchBoard(idx){
  currentActiveBoardIdx = idx;
  saveData('currentActiveBoardIdx', currentActiveBoardIdx);
  renderList(boards[idx].lists,boards[idx].todos);
  renderTodos(boards[idx].todos)
  $('#slid-menu').slideUp();
  // console.log(boards[idx].title);
  $(".currentBoardName").text(boards[idx].title)
  $("#board-name").text(boards[idx].title)
  colorTheBoard()
}

// Get dummy data
function getDummyData(){

  localStorage.clear()

  const teams = fetch('./dummy data/teams.json')
  teams.then(res => res.json()).then(res => {
    saveData('teams', res)
    renderList(res[0].boards[0].lists, res[0].boards[0].todos);
    $('.currentBoardName').html('Board 1')
    boards = res[0].boards
    initializeBoardsList()
  })
  
  const users = fetch('./dummy data/users.json')
  users.then(res => res.json()).then(res => {
    saveData('users', res)
  })
  .then(()=>location.reload())

  saveData('activeUserID', "_NekmV__*u@c#C$&X4JfR")
  saveData('currentActiveBoardIdx', 0)

  colorTheBoard()

}

// done todo
function doneTodo(){
  teams[activeTeamIndex].boards[currentActiveBoardIdx].todos.map(todo => {
    if (todo.id === selectedTodo){
      todo.isDone = !todo.isDone;
      saveData('teams', teams)
      $('.list-card[data-done="true"]').css({
        'text-decoration': 'line-through'
      })
      renderTodos(boards[currentActiveBoardIdx].todos)
    }
  })
}

// Delete board logic
function deleteBoard(){
  if (teams[activeTeamIndex].boards.length < 2) {
    alert('There\'s no boards left except this one')
    throw 'no boards left'
  }
  delete teams[activeTeamIndex].boards[currentActiveBoardIdx];
  teams[activeTeamIndex].boards = teams[activeTeamIndex].boards.filter(board => board)
  // console.log(teams[activeTeamIndex].boards);

  currentActiveBoardIdx = 0
  saveData('currentActiveBoardIdx', currentActiveBoardIdx)
  saveData('teams', teams)
  boards = teams[activeTeamIndex].boards
  renderList(teams[activeTeamIndex].boards[0].lists, teams[activeTeamIndex].boards[0].todos)
  colorTheBoard()
  initializeBoardsList()
  $('#board-name').html(boards[0].title)
}
