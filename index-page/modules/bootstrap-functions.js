import {saveData, getData} from './helper-functions.js'
import {draggingInProgress} from './jQueryUI.js'
import {boards} from '../homepage.js'

export let activeModalTodoId;
let selectedTodo;
let teams = getData('teams')
let activeTeamIndex = getData('activeTeamIndex')
if (!activeTeamIndex){
  // save active team index
  if (!activeTeamIndex){
    for (let i = 0; i < teams.length; i++){     //loop on teams (used normal loop to get team index from i)
      for (let member of teams[i].teamMembers){ //loop on team members
        for (let user of getData('users')){     //loop on users to compare
    
          if (member === user.userName){ // match the team which has this user's id to get the team's boards
            const activeTeamId = teams[i].id
            activeTeamIndex = i
            saveData('activeTeamIndex', activeTeamIndex)
            
          }
        }
      }
    }
  }
}

// let boards = teams[activeTeamIndex].boards
let currentActiveBoardIdx = getData('currentActiveBoardIdx')

  // modal window
  export function activateMmodals(){
    let users = getData('users')
    
    let activeTeamIndex;
    let teams = getData('teams');
    let boards;
    let currentActiveBoardIdx = getData('currentActiveBoardIdx');
    
    
    
    for (let i = 0; i < teams.length; i++){     //loop on teams (used normal loop to get team index from i)
      for (let member of teams[i].teamMembers){ //loop on team members
        for (let user of users){                //loop on users to compare
          
          if (member === user.userName){ // match the team which has this user's id to get the team's boards
          boards = teams[i].boards
          const activeTeamId = teams[i].id
          activeTeamIndex = i
          }
        }
      }
    }

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
        }
      })
      // console.log(chosenUser);
      if (!draggingInProgress){
        $('#myModal').appendTo("body").modal('show');
        $('#myModal').modal('show')
      }
    })
  }