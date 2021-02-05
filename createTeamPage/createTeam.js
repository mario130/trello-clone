const teams = JSON.parse(localStorage.getItem("teams")) ||[];

let getTeamMembers = [];
const allUsers = JSON.parse(localStorage.getItem("users"));
let activeUserID= JSON.parse(localStorage.getItem("activeUserID"))
const activeUser = allUsers.filter(user=>{
    return user.id === activeUserID
})

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

$("#addTeamMembers").on("keyup", function (e) {
  let userNameSpan = $(`<span class="badge bg-secondary me-2"></span>`);
  //comma , pressed
  onCommaPress($(this), userNameSpan, e);
  // enter press
  onEnterPress($(this), userNameSpan, e);
});

$("#createTeam").on("submit", function (e) {
  e.preventDefault();
  const teamName = $("#teamName").val();
  const category = $("#chooseCategory").val();
  if (teamName && category !== "notChoice" && getTeamMembers.length !== 0) {
    $("#required").fadeOut()
    $("#required").text("")

    let newTeam = {
      id: generateId(5),
      teamName: teamName,
      category: category,
      teamMembers: [...getTeamMembers,activeUser[0].userName],
    };
    teams.push(newTeam);
    localStorage.setItem("teams",JSON.stringify(teams))
    console.log("sent ",teams)
    $("#teamName").val("");
    $("#chooseCategory").val("");
    $("#showUsers").text("");
  } else {
      $("#required").text("Please fill all required fields")
      $("#required").fadeIn()
  }
});

// auto complete jquery UI
const userNames = allUsers.map((user) => {
  return "@" + user.userName;
});
$(function () {
  var usersemail = [...userNames];
  $("#addTeamMembers").autocomplete({
    source: usersemail,
  });
});
/************************************************************** */
const teamNames = teams.map((team) => {
    return  team.teamName;
  });
  console.log(teamNames)
$(function () {

    $("#chooseTeamNames").autocomplete({
      source: teamNames,
    });
  });
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
    console.log(activeUser[0])
   let isParticipate = teamChosen[0].teamMembers.some(member=>{
       console.log(member)
        return  member === activeUser[0].userName
    })
        if(isParticipate){
 $("#isExistTeam").fadeOut()
$("#isExistTeam").text("")

        } else{
            $("#isExistTeam").fadeIn()
            $("#isExistTeam").text("you are not a participant in that team  ")
        }
  } else {
    $("#isExistTeam").fadeIn()
      $("#isExistTeam").text("Not exist ")
  }
})


/************** functions************************** */
function onCommaPress(input, textBadge, e) {
  if (e.keyCode === 188) {
    let value = input.val();
    if (value) {
      if (value.startsWith("@")) {
        userName = value.slice(1, -1);
        let isUserExist = allUsers.some((elem) => {
          return elem.userName === userName;
        });
        if (isUserExist) {
          $("#userError").fadeOut();
          $("#userError").text("");
          textBadge.text(userName);
        } else {
          $("#userError").fadeIn();
          $("#userError").text("this user doesn't exist");
        }
      } else {
        userName = value.slice(0, -1);
        let isUserExist = allUsers.some((elem) => {
          return elem.userName === userName;
        });

        if (isUserExist) {
          $("#userError").fadeOut();
          $("#userError").text("");
          textBadge.text(userName);
        } else {
          $("#userError").fadeIn();
          $("#userError").text("this user doesn't exist");
        }
      }
      //push users in array
      getTeamMembers.push(userName);

      $("#showUsers").append(textBadge);
      input.val("");
    }
  }
}
function onEnterPress(input, textBadge, e) {
    e.preventDefault()
  if (e.keyCode === 13) {
    let value = input.val();
    if (value) {
      if (value.startsWith("@")) {
        userName = value.slice(1);
        let isUserExist = allUsers.some((elem) => {
          return elem.userName === userName;
        });
        if (isUserExist) {
          $("#userError").fadeOut();
          $("#userError").text("");
          textBadge.text(userName);
        } else {
          $("#userError").fadeIn();
          $("#userError").text("this user doesn't exist");
        }
      } else {
        userName = value;
        let isUserExist = allUsers.some((elem) => {
          return elem.userName === userName;
        });

        if (isUserExist) {
          $("#userError").fadeOut();
          $("#userError").text("");
          textBadge.text(userName);
        } else {
          $("#userError").fadeIn();
          $("#userError").text("this user doesn't exist");
        }
      }
      //push users in array

      getTeamMembers.push(userName);
      $("#showUsers").append(textBadge);
      input.val("");
    }
  }
}
