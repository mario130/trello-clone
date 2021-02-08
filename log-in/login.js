var pass = $("#password"),
  showpass = $("#eye-icon");

showpass.click(function () {
  if (pass.attr("type") == "password") {
    pass.attr("type", "text")
  } else if (pass.attr("type") == "text") {
    pass.attr("type", "password")
  }
})

var users = localStorage.getItem("users");
var newUsers = JSON.parse(users);

var mail = $("#email");
var send = $("#signup-submit");



var isRegistered = false;

send.click(function (event) {
  event.preventDefault();
  isRegistered = false;
  if (localStorage.users) {
    newUsers.map(function (user) {
      if (user.email == mail.val()) {
        if (user.password == pass.val()) {
          localStorage.setItem("activeUserID", JSON.stringify(user.id))
          isRegistered = true;
          location.replace("../index-page/homepage.html");
        }

      }
    })

    if (!isRegistered) {
      $("#email-error").text("The username or password is invalid");
      $("#email-error").css("display", "block");
    }
  } else {
    $("#email-error").text("The username or password is invalid");
    $("#email-error").css("display", "block");
  }
})

