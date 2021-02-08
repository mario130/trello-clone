import {getData, saveData} from './helper-functions.js'
import {renderList, renderTodos} from './rendering.js'
import {activateListDeletion} from '../homepage.js'

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
  activateListDeletion()
});

// delete list
export function deleteList(that){
  
  
  
  
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
  activateListDeletion()
}

//click on add-card-btn and adding todo in
$("#listItems").on("click", ".add-card-btn", function (ev) {
  teams = getData('teams');
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