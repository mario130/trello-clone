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

var usersMail = [];
var usersPass = [];
var i;

for (i = 0; i < newUsers.length; i++) {
  usersMail.push(newUsers[i].email);
}
for (i = 0; i < newUsers.length; i++) {
  usersPass.push(newUsers[i].password);
}
console.log(newUsers);
var i = 0;
send.click(function (event) {
  event.preventDefault();
  if (localStorage.users) {

    if (usersMail.includes(mail.val()) && usersPass.includes(pass.val())) {
      if (usersMail.indexOf(mail.val()) == usersPass.indexOf(pass.val())) {
        location.replace("../index-page/homepage.html");
      } else {
        $("#email-error").text("The username or password is invalid");
        $("#email-error").css("display", "block");
      }
    } else {
      $("#email-error").text("The username or password is invalid");
      $("#email-error").css("display", "block");
    }

  } else {
    console.log("user Not Fond");
  }

})
// send.click(function (event) {
//   event.preventDefault();
//   if (localStorage.users) {
//     for (const iterator of newUsers) {
//       if (iterator.email == mail.val()) {
//         if (iterator.password == pass.val()) {
//           console.log("Welcom")
//         }
//       } else {
//         console.log("worning")
//       }
//     }
//   } else {
//     console.log("user Not Fond");
//   }

// })

// for (const iterator of newUsers) {
//   console.log(iterator)
// }