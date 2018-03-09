

var apiKey = "AIzaSyDolYU_CqdXxvNhxq04-ZjcxoiwhV6RiBg";
var start = "15 E. Peace St, Raleigh, NC";
//var destination = "200 N Blount St, Raleigh, NC";
var destination = "ChIJiyUL2y58hYARe1aYhSjzbrU";
var directionsURL = "https://www.google.com/maps/embed/v1/directions?key=" + apiKey + "&origin=" + start + "&destination=place_id:" + destination + "&avoid=tolls|highways";


var map = $("<iframe>").attr("width", "900").attr("height", "500").attr("frameborder","0").attr("style", "border:0").attr("src", directionsURL);
$("#map-output").append(map);
console.log("append map");

$(function() {
    $( "#datepicker" ).datepicker();
});
