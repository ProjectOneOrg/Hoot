var queryBase = "http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";
var localStorageCount = 0;

$(document).ready(function(){

    //DatePicker functionality
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
      format: 'mm/dd/yyyy',
      container: container,
      todayHighlight: true,
      autoclose: true,
    };
    date_input.datepicker(options);


    var selectedEventVal;
    var selectedPlacesVal;
    //When the submit button is clicked with search parameters
    $("#submit-btn").on("click", function() {
        event.preventDefault();
        //gets location value//
        var location = $("#location").val().trim();
        var place = location.replace(new RegExp(" ", "g"), '+');
        //gets area within location value//
        var radius = $("#miles").val().trim();
        //gets date value//
        var date = $("#dates").val().trim();
        var dateRange = date.replace(new RegExp("/", "g"), "+");
        //gets number of results desired//
        eventsLength = $("#pageSize").val().trim();

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
               var title = data.events.event[i].title;
               var venueName = data.events.event[i].venue_name;
               var venueLocation = data.events.event[i].venue_address;
               var venueCity = data.events.event[i].city_name;
               var venueZip = data.events.event[i].postal_code;
               var venueLatitude = data.events.event[i].latitude;
               var venueLongitude = data.events.event[i].longitude;
               var eventUrl = data.events.event[i].url;
               var eventStart = data.events.event[i].start_time;
               var eventDescription = data.events.event[i].description;

                //setting search parameters to an object for localStorage//
                var savedSearch = {
                    "location": place,
                    "radius": radius,
                    "date": dateRange,
                    "pageSize": eventsLength
                };

                //storing search parameters to localStorage//
                var localStorageKey = "savedSearch" + localStorageCount;
                localStorage.setItem(localStorageKey, JSON.stringify(savedSearch));


                var well = $("<div>").attr("class", "well well-lg event-well").attr("data-event-num", i);

                var eventTitleDiv = $("<div>").attr("id", title.replace( new RegExp(" ", "g"), "-"));
                eventTitleDiv.append("<h3>" + title + "</h3>");

                var venueTitleDiv = $("<div>").attr("id", venueName.replace(new RegExp(" ", "g"), "-"));
                venueTitleDiv.append("<h5>" + venueName + "</h5>");

                eventTitleDiv.append(venueTitleDiv);
                well.append(eventTitleDiv);

                selectedEventVal = i;
                // well.text("Event #" + i);
                eventPanelBody.append(well);
                allEventPanel.append(eventPanelBody);
            }

        localStorageCount++;

        var oldSearch = localStorage.getItem(localStorageKey);
        var recalSearch = JSON.parse(oldSearch);

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
        var selectedEvent = $("<div>").attr("class", "well well-lg event-well").text("Event #" + selectedEventVal);
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


