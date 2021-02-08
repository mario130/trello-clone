import {getData, saveData} from './modules/helper-functions.js'
import {getDummyData, getBasicBoard} from './modules/testing-functions.js'
import {renderList, renderTodos, colorTheBoard, initializeBoardsList, displayMembers} from './modules/rendering.js'
import {activeModalTodoId} from './modules/bootstrap-functions.js'
// import {} from './modules/crud-operations.js'

import './modules/events.js'
import './modules/crud-operations.js'
// import './modules/initialization.js' //TODO!

// detect if user passed login
if (!(getData('activeUserID'))){
  document.location.href = "/log-in/login.html";
}

/******************** Data Store ******************** */
//initialize data
var selectedBoard = selectedBoard ? selectedBoard : "Board 1";
var teams = getData('teams')
export let boards;
export let activeTeamIndex = getData('activeTeamIndex');
console.log(activeTeamIndex);
let selectedTodo;

// save active team index
if (!activeTeamIndex){
  for (let i = 0; i < teams.length; i++){     //loop on teams (used normal loop to get team index from i)
    for (let member of teams[i].teamMembers){ //loop on team members
      for (let user of getData('users')){     //loop on users to compare
  
        if (member === user.userName){ // match the team which has this user's id to get the team's boards
          boards = teams[i].boards
          const activeTeamId = teams[i].id
          activeTeamIndex = i
          saveData('activeTeamIndex', activeTeamIndex)
          
        }
      }
    }
  }
}
var currentActiveBoardIdx = getData('currentActiveBoardIdx')
if (!currentActiveBoardIdx){
  var currentActiveBoardIdx;
}

// display team name
$('#team-name').html(teams[activeTeamIndex].teamName)

// display team members
$('#team').append('<div id="team-members"></div>')

displayMembers()


colorTheBoard()


initializeBoardsList()

  if (!currentActiveBoardIdx) {
    currentActiveBoardIdx = 0;
    saveData('currentActiveBoardIdx', currentActiveBoardIdx);
  }
  renderList(boards[currentActiveBoardIdx].lists,boards[currentActiveBoardIdx].todos);


  

  

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
  
  // DRAG N DROP
  /***************************************************************** */

  // MODAL

  $('#save-description').click(function(){
    saveDescription(this)
  })
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

  
  
  // logout logic
  function logOut() {
    localStorage.removeItem("activeUserID");
    localStorage.removeItem("activeTeamIndex");
    location.assign("../log-in/login.html");
  }
  $('#log-out').click(function(){
    logOut()
  })
  // delete local storage
  function deleteLocalStorage(){
    localStorage.removeItem('boards');
    
  }
  // TODO
  $('#get-basic-board').click(function(){
    getBasicBoard()
  })
  /*************          changes      ***************/

  
  

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


    let activeTeamIndex;
    let teams = getData('teams');
    let boards;
    let currentActiveBoardIdx = getData('currentActiveBoardIdx');

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


$('#slid-menu').on('click', '.boardLink', function(){

  let idx = this.dataset.board
  console.log(idx);


  let activeTeamIndex;
  let teams = getData('teams')
  let boards;
  let currentActiveBoardIdx = getData('currentActiveBoardIdx')

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
  

  currentActiveBoardIdx = idx;
  saveData('currentActiveBoardIdx', currentActiveBoardIdx);
  renderList(boards[idx].lists,boards[idx].todos);
  renderTodos(boards[idx].todos)
  $('#slid-menu').slideUp();
  // console.log(boards[idx].title);
  $(".currentBoardName").text(boards[idx].title)
  $("#board-name").text(boards[idx].title)
  colorTheBoard()
})

$('#get-dummy-data').click(function(){
  getDummyData()
})

// done todo
$('#done-todo').click(function(){
  doneTodo()
})
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
$('#delete-board').click(function(){
  deleteBoard()
})
function deleteBoard(){


  let activeTeamIndex;
  let teams = getData('teams');
  let boards;
  let currentActiveBoardIdx = getData('currentActiveBoardIdx');



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
