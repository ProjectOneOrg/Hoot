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
	console.log("Location:  " + place);
				//"#dates" - a placeholder id for whatever gives us dates//
	dateRangeValue = $("#dates").val().trim();
	dateRange = dateRangeValue.replace(new RegExp(" ", "g"), '+');
	console.log("Date entered:  " + dateRange);
				//"#miles" - a placeholder id for whatever gives us the miles range//
	milesOf = $("#miles").val().trim();
	console.log("Radius:  " + milesOf);

	pageSize = $("#pageSize").val().trim();
	console.log("Number of Items desired:  " + pageSize);
	
	var locationURL = queryBase + place;
	console.log(locationURL);

	//"fetch" is a method David recommended to me.  No idea how it works, but it seems to.  And running an AJAX call was giving me fits
	//I'm leaving the AJAX stuff commented out for now.
	fetch('https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=hqWvGHfDvqhZ62Bm&q=music&l=' + place + '&within=' + milesOf + '&units=miles&page_size=' + pageSize)
		.then(response => response.json())
		.then(data => {
			// Here's a list of repos!
			for (var i = 0; i < pageSize; i++) {

				title = data.events.event[i].title;
				venueName = data.events.event[i].venue_name;
				venueLocation = data.events.event[i].venue_address;
				venueCity = data.events.event[i].city_name;
				venueZip = data.events.event[i].postal_code;
				eventUrl = data.events.event[i].url;
				eventStart = data.events.event[i].start_time;
				eventDescription = data.events.event[i].description;

			var eventObject = {
				"title": title,
				"venueName": venueName,
				"venueLocation": venueLocation,
				"venueCity": venueCity,
				"venueZip": venueZip,
				"eventUrl": eventUrl,
				"eventStart": eventStart,
				"eventDescription": eventDescription

			};

			console.log(eventObject);

			localStorage.setItem("eventObject", JSON.stringify(eventObject));

			//Got the Eventful API to return the following data
				// console.log("Event Title:  " + title);
				// console.log("Venue Location:  " + venueLocation);
				// console.log("Venue Name:  " + venueName);
				// console.log("Venue City:  " + venueCity);
				// console.log("Venue Zip Code:  " + venueZip);
				// console.log("Event Webpage:  " + eventUrl);
				// console.log("Event Starts At:  " + eventStart);
				// console.log("Event Description:  " + eventDescription);
				// console.log("-------------------------Next Array--------------------");
			//Local Storage code below//
				// localStorage.setItem("title", title);
				// localStorage.setItem("venueName", venueName);
				// localStorage.setItem("venueLocation", venueLocation);
				// localStorage.setItem("venueCity", venueCity);
				// localStorage.setItem("venueZip", venueZip);
				// localStorage.setItem("eventUrl", eventUrl);
				// localStorage.setItem("eventStart", eventStart);
				// localStorage.setItem("eventDescription", eventDescription);
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

