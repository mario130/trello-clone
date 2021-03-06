const teams = JSON.parse(localStorage.getItem("teams")) ||[];

let getTeamMembers = [];
const allUsers = JSON.parse(localStorage.getItem("users"));
let activeUserID= JSON.parse(localStorage.getItem("activeUserID"))
const activeUser = allUsers.filter(user=>{
    return user.id === activeUserID
})
$('#welcome-message').text(`👋 Welcome, ${activeUser[0].fullName.split(' ')[0]}`)

/******************* Events **************************** */
$("#haveTeam").click(function () {
  $("#createTeam").slideToggle();
  let text = $(this).children("a").text();
  text =
    text === "Already Have A Team?"
      ? "Create New Team"
      : "Already Have A Team?";
  $(this).children("a").text(text);
  $("#chooseTeam").slideToggle();
});

// $("#addTeamMembers").on("keyup", function (e) {
//   let userNameSpan = $(`<span class="badge bg-secondary me-2"></span>`);
//   //comma , pressed
//   onCommaPress($(this), userNameSpan, e);
//   // enter press
//   onEnterPress($(this), userNameSpan, e);
// });

$("#createTeam").on("submit", function (e) {
  e.preventDefault();
  const teamName = $("#teamName").val();
  const category = $("#chooseCategory").val();
  if (teamName && category !== "notChoice") {
    var teamAlreadyExists = false;
    for (team of teamNames) {
      if (teamName === team) {
        alert('There\'s a team with this name!')
        teamAlreadyExists = true;
      } 
    }
    if (!teamAlreadyExists){

      $("#required").fadeOut()
      $("#required").text("")
  
      let newTeam = {
        id: generateId(5),
        teamName: teamName,
        category: category,
        teamMembers:  [activeUser[0].userName,...getTeamMembers],
        boards: [
          {
            id: generateId(5),
            title: "Board 1",
            boardMembers: [getData('activeUserID')],
            todoboardMembers: [getData('activeUserID')],
            todos: [],
            lists: [
              // { id: generateId(5), listName: "todos", todos: [] },
              // { id: generateId(5), listName: "doing", todos: [] },
              // { id: generateId(5), listName: "done", todos: [] },
            ],
            creatorID: getData('activeUserID'),
            bgColor: '#1f79bf'
          },
        ]
      };
      teams.push(newTeam);
      localStorage.setItem("teams",JSON.stringify(teams))
      saveData('currentActiveBoardIdx', 0);
      // console.log("sent ",teams)
      $("#teamName").val("");
      $("#chooseCategory").val("");
      $("#showUsers").text("");
      document.location.href = "../index-page/homepage.html";
    } else {
      alert(`Team ${teamName} already exist`)
    }
  } else {
      $("#required").text("Please fill all required fields")
      $("#required").fadeIn()
  }
});

// auto complete jquery UI
const usersExceptCreator = allUsers.filter(user => user.userName !== activeUser[0].userName)
const userNames = usersExceptCreator.map((user) => {
    if (user.userName !== activeUser[0].userName){
      return "@" + user.userName;
    }
});
if (userNames){
  $(function () {
    var usersemail = [...userNames];
    $("#addTeamMembers").autocomplete({
      source: usersemail,
    });
  });
}

/************************************************************** */
// get current badges to avoid duplicates
var badges = document.getElementsByClassName('badge')
var badgeNames = [activeUser[0].userName]

/************************************************************** */
const teamNames = teams.map((team) => {
    return  team.teamName;
  });
$(function () {

    $("#chooseTeamNames").autocomplete({
      source: teamNames,
    });
  });
  let chosenTeamIdx;
$("#chooseTeam").on("submit", function(e){
    e.preventDefault()
    
   let value =  $("#chooseTeamNames").val()
  let isExist = teams.some(team=>{
      return team.teamName === value
  })
  if(value &&isExist) {
    $("#isExistTeam").fadeOut()
    $("#isExistTeam").text("")
  let teamChosen = teams.filter((team=>{
        return team.teamName === value
      }))

    for(let i = 0; i < teams.length; i++) {
      if (teams[i].teamName === value){
        chosenTeamIdx = i
      }
    }

      if (!(teams[chosenTeamIdx].teamMembers.indexOf(activeUser[0].userName) !== -1)){
        teams[chosenTeamIdx].teamMembers.push(activeUser[0].userName)
        saveData('teams', teams)
        document.location.href = "../index-page/homepage.html";
      } else {
        alert ('already joined this team!')
        document.location.href = "../index-page/homepage.html";
      }
  } else {
    $("#isExistTeam").fadeIn()
      $("#isExistTeam").text("Not exist ")
  }
})


/************** functions************************** */
// function onCommaPress(input, textBadge, e) {
//   if (e.keyCode === 188) {
//     let value = input.val();
//     if (value) {
//       if (value.startsWith("@")) {
//         userName = value.slice(1, -1);
//         addToListWithAt(userName, textBadge) // with @
//       } else {
//         userName = value.slice(0, -1);
//         addToListWithoutAt(textBadge)
//       }
//       completeAddition(input,textBadge)
      
//     }
//   }
// }

// push team leader
let teamLeaderSpan = $(`<span class="badge bg-secondary me-2"></span>`)
teamLeaderSpan.text(activeUser[0].userName)
$("#showUsers").append(teamLeaderSpan);


// function onEnterPress(input, textBadge, e) {
//     e.preventDefault()
//   if (e.keyCode === 13) {
//     let value = input.val();
//     if (value) {
//       if (value.startsWith("@")) {
//         userName = value.slice(1);
//         addToListWithAt(userName, textBadge) // with @
//       } else {
//         userName = value;
//         addToListWithoutAt(textBadge)
//       }
//       completeAddition(input,textBadge)
      
//     }
//   }
// }
// function addToListWithAt(userName, textBadge){
//   let isUserExist = allUsers.some((elem) => {
//     return elem.userName === userName;
//   });
//   if (isUserExist) {
//     $("#userError").fadeOut();
//     $("#userError").text("");
//     textBadge.text(userName);
//   } else {
//     $("#userError").fadeIn();
//     $("#userError").text("this user doesn't exist");
//   }
// }
// function addToListWithoutAt(textBadge){
//   let isUserExist = allUsers.some((elem) => {
//     return elem.userName === userName;
//   });

//   if (isUserExist) {
//     $("#userError").fadeOut();
//     $("#userError").text("");
//     textBadge.text(userName);
//   } else {
//     $("#userError").fadeIn();
//     $("#userError").text("this user doesn't exist");
//   }
// }
// function completeAddition(input, textBadge){
//   if (badgeNames.some(badge => badge === userName)){
//     alert('This user is already in your team!')
//     $('#addTeamMembers').val('')
//   } else {

//     //push users in array
//     getTeamMembers.push(userName);
    
//     $("#showUsers").append(textBadge);
//     input.val("");

//     badgeNames.push(userName)
//     console.log(badgeNames);
//   }
// }

// helper functions
function getData(key) {
  var data = localStorage.getItem(key);
  return JSON.parse(data);
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}