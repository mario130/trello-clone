var pass = $("#password"),
  showpass = $("#eye-icon");

showpass.click(function () {
  if (pass.attr("type") == "password") {
    pass.attr("type", "text")
  } else if (pass.attr("type") == "text") {
    pass.attr("type", "password")
  }
})
var arr = [{ email: "mostafa.fathy367@gmail.com", pass: "Mostafa123" }, { email: "tito_stear@yahoo.com", pass: "titoStear123" }];
var newArr = JSON.stringify(arr);
localStorage.setItem("users", newArr);
var users = localStorage.getItem("users");

var newUsers = JSON.parse(users);

var mail = $("#email");
var send = $("#signup-submit");

var usersMail = [];
var usersPass = [];
var i;
function checkUsers(users) {
  user = [users.email, users.pass];
  return user;

}
console.log(newUsers.map(checkUsers));
for (i = 0; i < newUsers.length; i++) {
  usersMail.push(newUsers[i].email);
}
for (i = 0; i < newUsers.length; i++) {
  usersPass.push(newUsers[i].pass);
}

var i = 0;
send.click(function (event) {
  event.preventDefault();
  if (localStorage.users) {
    if (usersMail.includes(mail.val()) && usersPass.includes(pass.val())) {
      location.replace("../index-page/homepage.html");
    } else {
      $("#email-error").text("The username or password is invalid");
      $("#email-error").css("display", "block");
    }
  } else {
    console.log("user Not Fond");
  }

})