//Using jQuery!!!//
// rest of queryBase = + "&within=" + milesOf + "&units=miles&t=" + dateRange + "&page_size=" + pageSize,

//Possible issues://
	//What happens when a search field is left blank, and therefore doesn't contribute a value to the queryURL?  
	//Can I write code to delete a selection of the queryURL accordingly?//

//API-specific variables//

//Michael added this to my queryBase.  Not sure why but it breaks it.  Putting it here to save it just in case//
	//https://cors-anywhere.herokuapp.com/...  //

var queryBase = "http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=";

//Info from search input//
var location;
var milesOf = 0;  
var dateRange;
var pageSize = 10; //Setting to 10 for testing purposes.

//Info generated from AJAX call//
var artist;
var venueLocation;
var venueName;
var venueCity;
var venueZip;
var eventUrl;
var eventStart;
var eventDescription;

$("#submit-btn").on("click", function(event) {
	event.preventDefault();
				//"#location" - a placeholder id for whatever our text field is//
	locationValue = $("#location").val().trim().toLowerCase();
	var place = locationValue.replace(new RegExp(" ", "g"), '+');
	console.log(place);
				//"#dates" - a placeholder id for whatever gives us dates//
	dateRangeValue = $("#dates").val().trim();
	dateRange = dateRangeValue.replace(new RegExp(" ", "g"), '+');
	console.log(dateRange);
				//"#miles" - a placeholder id for whatever gives us the miles range//
	milesOf = $("#miles").val();
	console.log(milesOf);
	
	var locationURL = queryBase + place;
	console.log(locationURL);

	//"fetch" is a method David recommended to me.  No idea how it works, but it seems to.  And running an AJAX call was giving me fits
	//I'm leaving the AJAX stuff commented out for now.
	fetch('https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=' + place + '&within=' + milesOf + '&units=miles&page_size=' + pageSize)
		.then(response => response.json())
		.then(data => {
			// Here's a list of repos!
			console.log(data.events.event[0].title)
			for (var i = 0; i < pageSize; i++) {

				artist = data.events.event[i].title;
				venueLocation = data.events.event[i].venue_address;
				venueName = data.events.event[i].venue_name;
				venueCity = data.events.event[i].city_name;
				venueZip = data.events.event[i].postal_code;
				eventUrl = data.events.event[i].url;
				eventStart = data.events.event[i].start_time;
				eventDescription = data.events.event[i].description;
			//Got the Eventful API to return the following data
				console.log("Artist:  " + artist);
				console.log("Venue Location:  " + venueLocation);
				console.log("Venue Name:  " + venueName);
				console.log("Venue City:  " + venueCity);
				console.log("Venue Zip Code:  " + venueZip);
				console.log("Event Webpage:  " + eventUrl);
				console.log("Event Starts At:  " + eventStart);
				console.log("Event Description:  " + eventDescription);
				console.log("-------------------------Next Array--------------------");

			}
		});
	// $.ajax({
	// 	url: "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=" + place,
	// 	method: "GET"



	// }).then(function(response) {
	// 	console.log(JSON.parse(response,null,2));
	// 	console.log(JSON.parse(response.Last_item,null,2));

	// 	for (var i = 0; i < pageSize; i++) {

	// 	var title = response.events.event[i].title;
		
	// 	console.log("Artist: " + title);
	// 	// console.log("Venue Location:  " + venueLocation);
	// 	// console.log("Venue Name:  " + venueName);
	// 	// console.log("Venue Zip Code:  " + venueZip);
	// 	// console.log("Event URL:  " + eventUrl);
	// 	// console.log("Event Start Time & Date:  " + eventStart);
	// 	// console.log("Event Description:  " + eventDescription);
	// 	// console.log("----New Item" + "------");

	// 	}
	// });

})

