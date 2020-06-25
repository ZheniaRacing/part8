"use stict"
$(document).ready(function(){
  $("#phone1").mask("8 (999) 999-99-99");
  $("#phone2").mask("8 (999) 999-99-99");
});

$(document).ready(function() {
    $('.typewriter').typeIt({
     strings: ["Мы позаботимся о вашем питомце    ",
      "Лучшие специалисты, новейшие технологии, удобный сервис  ",
       "Если бы животные могли говорить, они бы сказали спасибо    ",
        "Доверьте ваших домашних любимцев профессионалам!"],
     speed: 170,
     loop: true,
     breakLines: false,
     autoStart: true
}).tiPause(9000);
});

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}