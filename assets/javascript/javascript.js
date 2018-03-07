var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=restaurant";
var queryURLB = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+raleigh&key= AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY&type=bar";
var myRestaurantQuery;
var restaurantNames = [];
var myBarQuery;
var barNames = [];

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
console.log(response);

myRestaurantQuery = response.results;

console.log(myRestaurantQuery);


for (i=0; i<20; i++) {
    var restname = myRestaurantQuery[i].name;
    restaurantNames.push(restname);
 }

console.log(restaurantNames);


});

$.ajax({
    url: queryURLB,
    method: "GET"
}).then(function(response) {
console.log(response);

myBarQuery = response.results;

console.log(myBarQuery);


for (i=0; i<20; i++) {
    var barname = myBarQuery[i].name;
    barNames.push(barname);
 }

console.log(barNames);


});




