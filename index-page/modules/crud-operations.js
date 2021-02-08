import {getData, saveData} from './helper-functions.js'
import {renderList, renderTodos, initializeBoardsList, colorTheBoard} from './rendering.js'

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


//adding another list
$("#addlistBtn").click(function () {




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
    console.log(teams);
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
export function deleteList(that){
  
  
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

//click on add-card-btn and adding todo in
$("#listItems").on("click", ".add-card-btn", function (ev) {



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
  
  
  
  
  
  teams = getData('teams');
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
  var users = JSON.parse(localStorage.getItem("users"));
  var activeUser = JSON.parse(localStorage.getItem("activeUserID"));

for (let i = 0; i< users.length; i++){
	if (users[i].id == activeUser){
    $(userImg[0]).text(users[i].initial);
  }
}

export function deleteBoard(){
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
  console.log(teams[activeTeamIndex].boards);
  renderList(teams[activeTeamIndex].boards[0].lists, teams[activeTeamIndex].boards[0].todos)
  colorTheBoard()
  initializeBoardsList()
  $('#board-name').html(boards[0].title)
}
