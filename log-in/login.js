var pass = $("#password"),
  showpass = $("#eye-icon");

showpass.click(function () {
  if (pass.attr("type") == "password") {
    pass.attr("type", "text")
  } else if (pass.attr("type") == "text") {
    pass.attr("type", "password")
  }
})