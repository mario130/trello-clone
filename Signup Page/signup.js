
$(document).ready(function() {
$(".password-progress::before").css("background", "red")
    //global variables
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // validate email and make the input enabled if it is valid
    $("#email").on("keyup",  function() {
    if(validateInput($("#email"),emailRegExp)){
        $("#signup-continue").attr("disabled", false)
        return true
    } else {
        $("#signup-continue").attr("disabled", true)
        return false
    }
})
/*************************************** */

    $("#signup-continue").on("click",function () {
        $(this).addClass("hidden")
        $("#signup-submit").removeClass("hidden")
        $("#fullName").parent().removeClass("hidden")
        $("#password").parent().removeClass("hidden")

        $("#password-validation").removeClass("hidden")

      })
/*************************************** */

      $("#signup").on("submit", function(e) {
        e.preventDefault()
        const email = $("#email").val()
        const fullName = $("#fullName").val()
        const password = $("#password").val()

        console.log(checkFullName())
      })
      /*************************************** */

      $("#eye-icon").click(function() {
          
          if($(this).children().attr("class") ===  "bi bi-eye-slash"){
              $(this).children().removeClass("bi-eye-slash").addClass("bi-eye")
              $("#password").attr("type","text")
          } else if($(this).children().attr("class") ===  "bi bi-eye"){
            $(this).children().removeClass("bi-eye").addClass("bi-eye-slash")
            $("#password").attr("type","password")

          }
      })
/*********************************************** */
$("#password").on("keyup",checkPasswordStrength)
$("#fullName").on("change",checkFullName)
})
function checkFullName() {
    if(! validateInput($("#fullName"),/^([\w]{3,})+\s+([\w\s]{3,})+$/i) ){
        $("#name-error").text("Invalid full name")
        return false
   } else{
    $("#name-error").text("")
    return true
   }
}
/********************************************** */



//validate any input -- using regexp
function validateInput(input,RegExp){
   if( input.val().match(RegExp))
   return true
   else return false
}

//check for password strength 
function checkPasswordStrength() {
    var password = $("#password").val();
    var score= 0
    if(password){

    
    if(password.length <= 8)
    {
    $(".password-text").text("Password must have at least 8 characters")
    score = 0
}
else{
     $(".password-text").text("")
        if(password.length > 9) score +=1
        if(password.match(/[a-z]/)) score +=1;
        if(password.match(/[A-Z]/)) score +=1;
        if(password.match(/\d+/)) score +=1;
        if(password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) score +=1; 
        }
        switch (score) {
            case 0:
                $(".password-text").text("Password must have at least 8 characters")
                $(".password-progress").removeClass().addClass("password-progress")
                break;

            case 1:
             $(".password-text").text("Weak")
             $(".password-progress").removeClass().addClass("password-progress").addClass("weak")
             break;
             case 2:
             $(".password-text").text("Fair")
             $(".password-progress").removeClass().addClass("password-progress").addClass("fair")


             break;
             case 3:
             $(".password-text").text("Good")
             $(".password-progress").removeClass().addClass("password-progress").addClass("good")


             break;
             case 4:
             $(".password-text").text("Strong")
             $(".password-progress").removeClass().addClass("password-progress").addClass("strong")

             break;
             case 5:
             $(".password-text").text("Very Strong")
             $(".password-progress").removeClass().addClass("password-progress").addClass("verystrong")

             break;
     
            default:
                break;
        }
     
    }
    if(score>= 1) {
        return true
    } else{
        return false
    }
}