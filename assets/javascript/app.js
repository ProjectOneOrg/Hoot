var placeDetails = [];
var queryBase = "http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";
var localStorageCount = 0;
var placesLocalStorageCount = 0;

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
        localStorage.clear();
        
        var location = $("#location").val().trim();
        var place = location.replace(new RegExp(" ", "g"), '+');
        //gets area within location value//
        var radius = $("#miles").val().trim();
        //gets date value//
        var date = $("#dates").val().trim();
        console.log(date);
        var dateFormat = "DD MMMM YYYY"
        var convertedDate = moment(date, dateFormat);
        var dateRange = moment(convertedDate).format("YYYYMMDD");
        console.log(dateRange);

        //gets number of results desired//
        eventsLength = $("#pageSize").val().trim();
        if(eventsLength === "") {
            eventsLength = 5;
        }

        //Dont Need
        //var allEventPanel = $("<div>").attr("class", "panel panel-default").append($("<div>").attr("class", "panel-heading").attr("id", "events-title").text("Select an Event!"));
        var eventsDiv = $("<ul class = 'collection with-header'>")
        var eventsHeader = $("<li class='collection-header' id='events-header'>").html("<h4>Pick an Event</h4>");
        eventsDiv.append(eventsHeader);
        //var eventPanelBody = $("<div>").attr("class", "panel-body").attr("id","event-output");
        //allEventPanel.append(eventPanelBody);

        var eventfulUrl = 'https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=' + place + 
        '&within=' + radius + '&units=miles&page_size=' + eventsLength + '&t=' + dateRange + '00-2018123100&sort_order=date';
        console.log(eventfulUrl);

        //The Eventful API call//
        fetch(eventfulUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
               eventStop = data.events.event[i].stop_time;
               eventDescription = data.events.event[i].description;
               console.log(eventStart);

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
                    "eventStop": eventStop,
                    "eventDescription": eventDescription


                };

                //storing search data object to localStorage//
                var localStorageKey = "searchResult" + localStorageCount;
                localStorage.setItem(localStorageKey, JSON.stringify(searchResult));

                var eventListItem = $("<li>").attr("class", "collection-item event-item").attr("data-event-num", i).attr("id", localStorageKey);

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
                eventListItem.append(eventTitleDiv);

                selectedEventVal = i;
                // well.text("Event #" + i);
                
                eventsDiv.append(eventListItem);
                //eventPanelBody.append(well);
                //allEventPanel.append(eventPanelBody);
            }


        $("#events-div").html(eventsDiv);
        });
    })

    //When an event well is clicked...
    $("#events-div").on("click", ".event-item", function(ev){
        event.preventDefault();
        console.log('hello')
        //Empty out the events div
        selectedEventVal = $(this).attr("data-event-num");
        var eventsDiv = $("#events-div");
        eventsDiv.empty();
        //$("#events-title").text("The event you are attending");

        //eventsDiv = $("<ul class = 'collection with-header'>");
        //var eventsHeader = $("<li class='collection-header' id='events-header'>").html("<h4>The event you are attending</h4>");
        //eventsDiv.append(eventsHeader);

        //getting the localStorage key specific for the clicked item//
        var selectedResult = localStorage.getItem($(this).attr("id"));
        //turning it back into a JSON object
        var recalSearch = JSON.parse(selectedResult);
        console.log(recalSearch);

        var eventDate = recalSearch.eventStart;
        var eventEnd = recalSearch.eventStop;
        var eventFormat = "YYYY-MM-DD, HH:mm:ss"
        var convertedEvent = moment(eventDate, eventFormat);
        var convertedEventEnd = moment(eventEnd, eventFormat);
        var convertedEventDate = moment(convertedEvent).format('MMMM Do YYYY, h:mm a');
        var convertedEventEndDate = moment(convertedEventEnd).format('MMMM Do YYYY, h:mm a');

        var selectedEventInfo = $("<div>");
        //appending the title retrieved from localStorage//
        selectedEventInfo.append("<h3>" + recalSearch.title + "</h3>");
        //appending the venue & event info//
        selectedEventInfo.append("<h5>" + recalSearch.venueName + ", " + recalSearch.venueLocation + ", " + recalSearch.venueCity + ", " + recalSearch.venueZip + "<br>" + convertedEventDate + " - " + convertedEventEndDate + "</h5>");
        //creating a button that will take a user to the event url//
        var eventUrlBtn = $("<a href='" + recalSearch.eventUrl + "' class='btn btn-info' target='_blank'>Take Me There!</a>");
        //A fix Michael worked up to keep the selected event on the page//
        eventUrlBtn.on('click', function(ev) {
            ev.stopPropagation();
        })
        //appending the button to the selected event div//
        selectedEventInfo.append(eventUrlBtn);
        var selectedEvent = $("<div>").attr("class", "well well-lg event-well");
        //appending all the event info to the appropriate part of the page//
        selectedEvent.append(selectedEventInfo);

        $("#events-div").append(selectedEvent);

        getPlacesData();
        
    })

//    When a google places well is clicked
    $("#places-div").on("click", ".places-well", function(){
        event.preventDefault();
        //Empty out the events div
        selectedPlacesVal = $(this).attr("data-places-num");
        $("#places-title").text("After the event you are going to");

        //getting the localStorage key specific for the clicked item//
        var selectedPlaceResult = localStorage.getItem($(this).attr("id"));
        console.log(selectedPlaceResult);
        //turning it back into a JSON object
        var recalPlaceSearch = JSON.parse(selectedPlaceResult);
        console.log(recalPlaceSearch);

        var selectedPlaceInfo = $("<div>");
        //appending the title retrieved from localStorage//
        selectedPlaceInfo.append("<h3>" + recalPlaceSearch.name + "</h3>");

       //appending the rating and price from localStorage//
        var placeInfo = $("<div><span id='rating'>Rating: " + recalPlaceSearch.rating + "</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: " + 
        recalPlaceSearch.price + "</span></div>");

        selectedPlaceInfo.append(placeInfo);

        //creating div w/ place address//
        var placeAddressDiv = $("<div><span>" + recalPlaceSearch.address + "</span><div>");

        var selectedPlace = $("<div>").attr("class", "well well-lg event-well");
        selectedPlace.append(selectedPlaceInfo);

        $("#places-output").append(selectedPlace);

        //Google Maps Output
        
        var lat = parseFloat(venueLatitude);
        var lng = parseFloat(venueLongitude);
        var apiKey = "AIzaSyDolYU_CqdXxvNhxq04-ZjcxoiwhV6RiBg";
        var start = lat,lng;
        var destination = recalPlaceSearch.place;
        var directionsURL = "https://www.google.com/maps/embed/v1/directions?key=" + apiKey + "&origin=" + start + "&destination=place_id:" + destination + "&avoid=tolls|highways";

        var map = $("<iframe>").attr("width", "900").attr("height", "500").attr("frameborder","0").attr("style", "border:0").attr("src", directionsURL);
        $("#map-output").append(map);

    });
})

function getPlacesData() {

    var lat = parseFloat(venueLatitude);
    var lng = parseFloat(venueLongitude);

    // var lat = 35.993248;
    // var lng = -78.9021923;

    //define query URL for ajax call to Google Places API//
    var foodDrinkQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + 
    "location=" + lat + "," + lng + "&radius=500&type=restaurant&key=AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY";
    
    //create variable to store Place Data//
    var foodDrinkPlaceData = [];

    //ajax call to Google Places API//
    $.ajax({
        url: foodDrinkQueryURL,
        method: "GET"
    }).then(function(response) {

        //variable to store query results//
        var myFoodDrinkQuery = response.results;

        //loop through each of the Place IDs//
        for(i=0; i<myFoodDrinkQuery.length; i++) {

            //pull place_id data from query results//
            var fdplaceID = myFoodDrinkQuery[i].place_id;
            var fdplaceLat = myFoodDrinkQuery[i].geometry.location.lat;
            var fdplaceLng = myFoodDrinkQuery[i].geometry.location.lng;
            var fdplaceName = myFoodDrinkQuery[i].name;
            var fdplaceRating = myFoodDrinkQuery[i].rating;
            var fdplacePrice = myFoodDrinkQuery[i].price_level;
            var fdplaceAddress = myFoodDrinkQuery[i].vicinity;

            var priceLevel;

             //convert price level to $ symbols//
        if (fdplacePrice == 1) {
            priceLevel = "$";
        } else if (fdplacePrice == 2) {
            priceLevel = "$$";
        } else if (fdplacePrice == 3) {
            priceLevel = "$$$";
        } else if (fdplacePrice == 4) {
            priceLevel = "$$$$";
        } else if (fdplacePrice == 5) {
            priceLevel = "$$$$$";
        }

        //create object to store specific data from query results//
        var foodDrinkDataObject = {
            name: fdplaceName,
            rating: fdplaceRating,
            price: priceLevel,
            place: fdplaceID,
            lat: fdplaceLat,
            lng: fdplaceLng,
        };

        //push object to placeDetails array//
        foodDrinkPlaceData.push(foodDrinkDataObject);
        }

        //check to see if foodDrinkDataObjects for all 20 places have been pushed to array//
        // if(foodDrinkDataObject.length == 20) {

        //     //call function to display Places//
        //     displayPlaces(foodDrinkPlaceData);
        // } 

        displayPlaces(foodDrinkPlaceData);


    });

}

//get place details function//

function getPlaceDetails(placeID) {

    //define query URL for ajax call to Google Places API for Place Details search//
    var placesDetailsQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?" + 
    "&place_id=" + placeID + "&key=AIzaSyB2Ys8ExJDWr3CF94ia0_Oyxm8gBM87udY";

    //ajax call to Google Places API for Place Details search//
    $.ajax({
    url: placesDetailsQueryURL,
    method: "GET"
    }).then(function(response) {

        //variable to store query results//
        var myPlaceDetailsQuery = response.result;
        console.log(myPlaceDetailsQuery);

        //variables to store specific data from query results//
        
        var fdplacePhone = myPlaceDetailsQuery.formatted_phone_number;
        var fdplaceReviews = myPlaceDetailsQuery.reviews;
        var fdplacePhotos = myPlaceDetailsQuery.photos;
        var website = myPlaceDetailsQuery.website;

        //create object to store specific data from query results//
        placeDetailsObject = {
            phone: fdplacePhone,
            reviews: fdplaceReviews,
            photos: fdplacePhotos,
            website: website
        };

        //push object to placeDetails array//
        placeDetails.push(placeDetailsObject);

        //call function to display Places//
        // displayPlaces();//
    });
}

//end get place details function//

//display places function//       

function displayPlaces(placeData) {

    //Creating the Google Places Panel//
    //var allPlacesPanel = $("<div>").attr("class", "panel panel-default").append($("<div>").attr("class", "panel-heading").attr("id", "places-title").text("Select an Resturant!"));
    //var placesPanelBody = $("<div>").attr("class", "panel-body").attr("id","places-output");
    //allPlacesPanel.append(placesPanelBody);

    var placesDiv = $("<ul class = 'collection with-header'>")
    var placesHeader = $("<li class='collection-header' id='places-header'>").html("<h4>Pick a Restaurant</h4>");
    placesDiv.append(placesHeader);

    console.log(placeData);

    //loop through each of the place objects in the placeDetails array//
    for(var i = 0; i < placeData.length; i++ ) {

        //storing search data object to localStorage//
        var placesLocalStorageKey = "placesSearchResult" + placesLocalStorageCount;
        localStorage.setItem(placesLocalStorageKey, JSON.stringify(placeData[i]));

        placesLocalStorageCount++;

        var placeListItem = $("<li>").attr("class", "collection-item places-item").attr("data-places-num", i).attr("id", placesLocalStorageKey);

        //creating div w/ place name//
        var placeTitleDiv = $("<div>").attr("id", placeData[i].name);
        placeTitleDiv.append("<h3>" + placeData[i].name + "</h3>");

        //dreating div w/ place info//
        var placeInfoDiv = $("<div id='placeInfo'" + i + "><span>Rating: " + placeData[i].rating + "</span><span>&nbsp;&nbsp;&nbsp;&nbsp;Price: " + 
        placeData[i].price + "</span></div>");

        //creating div w/ place address//
        var placeAddressDiv = $("<div><span>" + placeData[i].address + "</span><div>");

        //appending place info to place title div//
        placeTitleDiv.append(placeInfoDiv);

        //appending place address div to place title div//
        placeTitleDiv.append(placeAddressDiv);

        //appending all that to well//
        placeListItem.append(placeTitleDiv);

        selectedPlacesVal = i;
        placesDiv.append(placeListItem);

        
        //placesPanelBody.append(well);
        //allPlacesPanel.append(placesPanelBody);
        
    }
    $("#places-div").html(placesDiv);
}
//end display places function//