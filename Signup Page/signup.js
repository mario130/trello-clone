//global variables
const emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const nameRegExp = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

const login =
  "<a class= 'redirect-login' href='./../log-in/login.html'>login</a>";

$(document).ready(function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  $(".password-progress::before").css("background", "red");
  // validate email and make the input enabled if it is valid
  $("#email").on("keyup", function () {
    if (validateInput($("#email"), emailRegExp)) {
      $("#signup-continue").attr("disabled", false);
      return true;
    } else {
      $("#signup-continue").attr("disabled", true);
      return false;
    }
  });
  /*************************************** */

  let isRegistered = false;
  $("#signup-continue").on("click", function () {
    isRegistered = false;
    const email = $("#email").val();
    users.map(function (user) {
      if (user.email === email) {
        $("#errorMsg")
          .fadeIn("slow")
          .text("Email already in use by another account. You can use ");
        $("#errorMsg").append(login);
        isRegistered = true;
      }
    });
    if (!isRegistered) {
      $("#errorMsg").fadeOut("slow").text("");
      $(this).addClass("hidden");
      $("#signup-submit").removeClass("hidden");
      $('#login-details').slideDown()

      $("#password-validation").removeClass("hidden");
    }
  });
  /*************************************** */

  $("#signup").on("submit", function (e) {
    e.preventDefault();
    const email = $("#email").val();
    const fullName = $("#fullName").val();
    const password = $("#password").val();
    isRegistered = false;
    users.forEach(function (user) {
      if (user.email === email) {
        isRegistered = true;
      }
    });
    if (!isRegistered) {
      if (validateInput($("#fullName"), nameRegExp)) {
        if (password.length > 8) {
          $("#errorMsg").fadeOut("slow").text("");
          const user = {
            id: generateId(),
            email,
            fullName,
            password,
            userName: generateUserName(fullName),
            initial: initials(),
          };
          console.log( user)
          //saving in localstoragw
          const currentUsers = JSON.parse(localStorage.getItem("users")) || [];
          const newUsers = [...currentUsers, user];
          localStorage.setItem("users", JSON.stringify(newUsers));
          localStorage.setItem('activeUserID', JSON.stringify(user.id))
          //initialize values again after login
          $("#email").val("");
          $("#fullName").val("");
          $("#password").val("");
          //routing to login Page
          window.location.replace("../createTeamPage/createteam.html");
        } else {
          $("#errorMsg")
            .fadeIn("slow")
            .text("Password should be Greater than 8 characters");
        }
      } else {
        $("#errorMsg").fadeIn("slow").text("Invalid Name");
      }
    } else {
      $("#errorMsg")
        .fadeIn("slow")
        .text("Email already in use by another account. You can use ");
      $("#errorMsg").append(login);
    }
  });
  /*************************************** */

  $("#eye-icon").click(function () {
    if ($(this).children().attr("class") === "bi bi-eye-slash") {
      $(this).children().removeClass("bi-eye-slash").addClass("bi-eye");
      $("#password").attr("type", "text");
    } else if ($(this).children().attr("class") === "bi bi-eye") {
      $(this).children().removeClass("bi-eye").addClass("bi-eye-slash");
      $("#password").attr("type", "password");
    }
  });
  /*********************************************** */
  $("#password").on("keyup", checkPasswordStrength);
  $("#fullName").on("change", checkFullName);
});
function checkFullName() {
  if (!validateInput($("#fullName"), nameRegExp)) {
    $("#name-error").text("Invalid full name");
    return false;
  } else {
    $("#name-error").text("");
    return true;
  }
}
/********************************************** */

//validate any input -- using regexp
function validateInput(input, RegExp) {
  if (input.val().match(RegExp)) return true;
  else return false;
}

//check for password strength
function checkPasswordStrength() {
  var password = $("#password").val();
  var score = 0;
  if (password) {
    if (password.length <= 8) {
      $(".password-text").text("Password must have at least 8 characters");
      score = 0;
    } else {
      $(".password-text").text("");
      if (password.length > 9) score += 1;
      if (password.match(/[a-z]/)) score += 1;
      if (password.match(/[A-Z]/)) score += 1;
      if (password.match(/\d+/)) score += 1;
      if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) score += 1;
    }
    switch (score) {
      case 0:
        $(".password-text").text("Password must have at least 8 characters");
        $(".password-progress").removeClass().addClass("password-progress");
        break;

      case 1:
        $(".password-text").text("Weak");
        $(".password-progress")
          .removeClass()
          .addClass("password-progress")
          .addClass("weak");
        break;
      case 2:
        $(".password-text").text("Fair");
        $(".password-progress")
          .removeClass()
          .addClass("password-progress")
          .addClass("fair");

        break;
      case 3:
        $(".password-text").text("Good");
        $(".password-progress")
          .removeClass()
          .addClass("password-progress")
          .addClass("good");

        break;
      case 4:
        $(".password-text").text("Strong");
        $(".password-progress")
          .removeClass()
          .addClass("password-progress")
          .addClass("strong");

        break;
      case 5:
        $(".password-text").text("Very Strong");
        $(".password-progress")
          .removeClass()
          .addClass("password-progress")
          .addClass("verystrong");

        break;

      default:
        break;
    }
  }
  if (score >= 1) {
    return true;
  } else {
    return false;
  }
}
var docLocation = document.location.search;

if (docLocation) {
  var email = docLocation.split("=");
  var welcomeEmail = email[1].replace("%40", "@");
  $("#email").val(welcomeEmail);
}

window.onload = function () {
  if (validateInput($("#email"), emailRegExp)) {
    $("#signup-continue").attr("disabled", false);
    return true;
  } else {
    $("#signup-continue").attr("disabled", true);
    return false;
  }
};

function generateUserName(fullName){
  return  fullName.split(" ").join("_") + Math.ceil(Math.random()*1000)
}
/************************* */
// function validateEmail( anyUsers) {
//   let isValid= false
//   anyUsers.map(function (user) {
//     if (user.email === email){
//       console.log("checked")
//       $("#errorMsg").fadeIn("slow").text("Email already in use by another account. You can use " );
//       $("#errorMsg").append(login)
//       isValid =  false
//     } else {

//     }
//   })
//   return isValid
//  }

function initials(){
  const fullName = $("#fullName").val();
  var splitFullName = fullName.split(" ");
  var firstName = splitFullName[0],
  lastName = splitFullName[1],
  firstLiter = firstName[0].toUpperCase(),
  lastLiter = lastName[0].toUpperCase();
  fulLiter = firstLiter + lastLiter;
  return fulLiter;
}
