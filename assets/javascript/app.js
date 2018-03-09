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
        var location = $("#location").val().trim();
        var radius = $("#miles").val().trim();
        var date = $("#dates").val().trim();
        
        eventsLength = 10;
        var allEventPanel = $("<div>").attr("class", "panel panel-default").append($("<div>").attr("class", "panel-heading").attr("id", "events-title").text("Select an Event!"));
        var eventPanelBody = $("<div>").attr("class", "panel-body").attr("id","event-output");
        allEventPanel.append(eventPanelBody);
        for(var i = 0; i < eventsLength; i++ ) {
            var well = $("<div>").attr("class", "well well-lg event-well").attr("data-event-num", i);
            selectedEventVal = i;
            well.text("Event #" + i);
            eventPanelBody.append(well);
            allEventPanel.append(eventPanelBody);
        }
        $("#events-div").html(allEventPanel);
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


