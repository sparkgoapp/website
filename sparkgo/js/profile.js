$(document).ready(function(){
    var profile=JSON.parse(window.localStorage.profile);
    console.log(profile);
    $('.head').css('background-image','url('+profile.image+')');
    $('.head').css('background-size','cover');
    $('.name').html(profile.nickname);
    $('.smallname').html(profile.nickname);
});

