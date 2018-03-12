var queryBase = "http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";
var localStorageCount = 0;

var title
var venueName
var venueLocation
var venueCity
var venueZip
var venueLatitude
var venueLongitude
var eventUrl
var eventStart
var eventDescription

var eventsLength = 5;

$(document).ready(function(){

    //DatePicker functionality
    /* var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
      format: 'mm/dd/yyyy',
      container: container,
      todayHighlight: true,
      autoclose: true,
    };
    date_input.datepicker(options);*/

    var selectedEventVal;
    var selectedPlacesVal;

    //clearing localStorage on page load//
    localStorage.clear();
    //When the submit button is clicked with search parameters
    $("#submit-btn").on("click", function() {
        event.preventDefault();

        var location = $("#location").val().trim();
        var place = location.replace(new RegExp(" ", "g"), '+');
        //gets area within location value//
        var radius = $("#miles").val().trim();
        //gets date value//
        var date = $("#dates").val().trim();
        var dateRange = date.replace(new RegExp("/", "g"), "+");
        //gets number of results desired//
        eventsLength = $("#pageSize").val().trim();
        if(eventsLength === "") {
            eventsLength = 5;
        }

        var allEventPanel = $("<div>").attr("class", "panel panel-default").append($("<div>").attr("class", "panel-heading").attr("id", "events-title").text("Select an Event!"));
        var eventPanelBody = $("<div>").attr("class", "panel-body").attr("id","event-output");
        allEventPanel.append(eventPanelBody);

        //The Eventful API call//
        fetch('https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=' + place + 
        '&within=' + radius + '&units=miles&page_size=' + eventsLength + '&t=' + dateRange)
        .then(response => response.json())
        .then(data => {

            for(var i = 0; i < eventsLength; i++) {

                //getting values from the API for our use//
               title = data.events.event[i].title;
               venueName = data.events.event[i].venue_name;
               venueLocation = data.events.event[i].venue_address;
               venueCity = data.events.event[i].city_name;
               venueZip = data.events.event[i].postal_code;
               venueLatitude = data.events.event[i].latitude;
               venueLongitude = data.events.event[i].longitude;
               eventUrl = data.events.event[i].url;
               eventStart = data.events.event[i].start_time;
               eventDescription = data.events.event[i].description;


               getPlacesData();


                //setting data to an object for localStorage//
                var searchResult = {
                    "title": title,
                    "venueName": venueName,
                    "venueLocation": venueLocation,
                    "venueCity": venueCity,
                    "venueZip": venueZip,
                    "venueLatitude": venueLatitude,
                    "venueLongitude": venueLongitude,
                    "eventUrl": eventUrl,
                    "eventStart": eventStart,
                    "eventDescription": eventDescription


                };

                //storing search data object to localStorage//
                var localStorageKey = "searchResult" + localStorageCount;
                localStorage.setItem(localStorageKey, JSON.stringify(searchResult));


                var well = $("<div>").attr("class", "well well-lg event-well").attr("data-event-num", i).attr("id", localStorageKey);

                localStorageCount++;
                //creating div w/ event title//
                var eventTitleDiv = $("<div>").attr("id", title.replace( new RegExp(" ", "g"), "-"));
                eventTitleDiv.append("<h3>" + title + "</h3>");

                //creating div w/ venue name//
                var venueTitleDiv = $("<div>").attr("id", venueName.replace(new RegExp(" ", "g"), "-"));
                venueTitleDiv.append("<h5>" + venueName + "</h5>");

                //appending venue name to event title divs//
                eventTitleDiv.append(venueTitleDiv);
                //appending all that to well//
                well.append(eventTitleDiv);

                selectedEventVal = i;
                // well.text("Event #" + i);
                eventPanelBody.append(well);
                allEventPanel.append(eventPanelBody);
            }


        $("#events-div").html(allEventPanel);
        });
    })

    //When an event well is clicked...
    $("#events-div").on("click", ".event-well", function(){
        event.preventDefault();
        //Empty out the events div
        selectedEventVal = $(this).attr("data-event-num");
        $("#event-output").empty();
        $("#events-title").text("The event you are attending");

        //getting the localStorage key specific for the clicked item//
        var selectedResult = localStorage.getItem($(this).attr("id"));
        //turning it back into a JSON object
        var recalSearch = JSON.parse(selectedResult);

        var selectedEventInfo = $("<div>");
        //appending the title retrieved from localStorage//
        selectedEventInfo.append("<h3>" + recalSearch.title + "</h3>");
        selectedEventInfo.append("<h5>" + recalSearch.venueName + ", " + recalSearch.venueLocation + ", " + recalSearch.venueCity + ", " + recalSearch.venueZip + "</h5>");
        var selectedEvent = $("<div>").attr("class", "well well-lg event-well");
        selectedEvent.append(selectedEventInfo);

        $("#event-output").append(selectedEvent);
        
        //Creating the Google Places Panel
        var allPlacesPanel = $("<div>").attr("class", "panel panel-default").append($("<div>").attr("class", "panel-heading").attr("id", "places-title").text("Select an Resturant!"));
        var placesPanelBody = $("<div>").attr("class", "panel-body").attr("id","places-output");

        var placesLength = 10;
        for(var i = 0; i < placesLength; i++ ) {
            var well = $("<div>").attr("class", "well well-lg places-well").attr("data-places-num", i);
            selectedEventVal = i;
            well.text("Google Places #" + i);
            placesPanelBody.append(well);
            allPlacesPanel.append(placesPanelBody);
        }
        $("#places-div").html(allPlacesPanel);
    })

    //When a google places well is clicked
    $("#places-div").on("click", ".places-well", function(){
        event.preventDefault();
        //Empty out the events div
        selectedPlacesVal = $(this).attr("data-places-num");
        $("#places-output").empty();
        $("#places-title").text("After the event you are going to");
        var selectedPlace = $("<div>").attr("class", "well well-lg places-well").text("Google Places #" + selectedPlacesVal);
        $("#places-output").append(selectedPlace);

        //Google Maps Output
        var apiKey = "AIzaSyDolYU_CqdXxvNhxq04-ZjcxoiwhV6RiBg";
        var start = "15 E. Peace St, Raleigh, NC";
        var destination = "ChIJiyUL2y58hYARe1aYhSjzbrU";
        var directionsURL = "https://www.google.com/maps/embed/v1/directions?key=" + apiKey + "&origin=" + start + "&destination=place_id:" + destination + "&avoid=tolls|highways";

        var map = $("<iframe>").attr("width", "900").attr("height", "500").attr("frameborder","0").attr("style", "border:0").attr("src", directionsURL);
        $("#map-output").append(map);

    });




})

function getPlacesData() {

    var foodDrinkQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + 
    "location=" + venueLatitude + "," + venueLongitude + "&radius=500&type=restaurant|bar&key=AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY";
    
    var foodDrinkID = [];
    // var barID = [];
    var myFoodDrinkQuery;
    // var myBarQuery;

    $.when(

        $.ajax({
            url: foodDrinkQueryURL,
            method: "GET"
        }).then(function(response) {
    
        myFoodDrinkQuery = response.results;
    
        for (i=0; i<myFoodDrinkQuery.length; i++) {
            var  fdplaceID = myFoodDrinkQuery[i].place_id;
            var fdlaceLat = myFoodDrinkQuery[i].geometry.location.lat;
            var fdlaceLng = myFoodDrinkQuery[i].geometry.location.lng;
            foodDrinkID[i] = {
                place: fdplaceID,
                lat: fdlaceLat,
                lng: fdlaceLng
            };
        }
    
        }),


        // $.ajax({
        //     url: queryURLB,
        //     method: "GET"
        // }).then(function(response) {
    
        // myBarQuery = response.results;    
    
        //     for (i=0; i<myBarQuery.length; i++) {
        //         var bplaceID = myBarQuery[i].place_id;
        //         var bplaceLat = myBarQuery[i].geometry.location.lat;
        //         var bplaceLng = myBarQuery[i].geometry.location.lng;
        //         barID[i] = {
        //             place: bplaceID,
        //             lat: bplaceLat,
        //             lng: bplaceLng
        //         };
        //     }
    
        // });

    ).then(function() {

        var places = foodDrinkID;
       
        initMap(places);

    });
}


function initMap(foodDrinkPlaces) {

    var geo = {lat: venueLatitude, lng: venueLongitude};

    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: geo
    });
    
    restaurant(foodDrinkPlaces);

}


function restaurant(foodDrinkID) {

    console.log(foodDrinkID);
  
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    for (i = 0; i < foodDrinkID.length; i++) {  

        var placeID = foodDrinkID[i].place;
        var placeLat = foodDrinkID[i].lat;
        var placeLng = foodDrinkID[i].lng;

        var position = {lat: placeLat, lng: placeLng};

        marker = new google.maps.Marker({
          position: position,
          map: map
        });

        var placeID = foodDrinkID[i].place;

        service.getDetails({
            placeId: placeID
        }, function(place, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {

                console.log(place);

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                    infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        });
    }
}
