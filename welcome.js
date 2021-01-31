var mainNav = document.getElementById("navbar");
window.onscroll = function () {
  if (this.scrollY >= 50) {
    mainNav.style.backgroundColor = "#0079bf";
    mainNav.style.boxShadow = "0 0 10px rgb(0 0 0 / 30%)";
  } else {
    mainNav.style.backgroundColor = "transparent";
    mainNav.style.boxShadow = "none"
  }
}

var slidNext = $("#next");
var slidPrev = $("#prev");

slidNext.click(function () {
  $("#carousel .board.active").each(function () {
    $("#carousel .board.active").removeClass("active").next().not("ul").addClass("active");
    var self = $(this);
    if (self.is(":last-of-type")) {
      $("#carousel .board").eq(0).addClass("active");
    }
  })

  $("#carousel li.selcted").each(function () {
    $("#carousel li.selcted").removeClass("selcted").next().addClass("selcted");
    var _self = $(this);
    if (_self.is(":last-of-type")) {
      $("#carousel li").eq(0).addClass("selcted");
    }
  })
})

slidPrev.click(function () {
  $("#carousel .board.active").each(function () {
    $(".board.active").removeClass("active").prev().addClass("active");
    var self = $(this);
    if (self.is(":first-of-type")) {
      $("#carousel .board").last().addClass("active");
    }
  })
  $("#carousel li.selcted").each(function () {
    $("#carousel li.selcted").removeClass("selcted").prev().addClass("selcted");
    var _self = $(this);
    if (_self.is(":first-of-type")) {
      $("#carousel li").last().addClass("selcted");
    }
  })
})


$(".slider li").each(function (index) {
  $(this).click(function () {
    $(this).addClass("selcted").siblings().removeClass("selcted");
    $("#carousel .board").eq(index).addClass("active").siblings().removeClass("active");
  })
})