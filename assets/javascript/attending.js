var config = {
    apiKey: "AIzaSyCwWK4FLeujPsmc4L5KHURfhgRAWVhKvsE",
    authDomain: "night-out-197223.firebaseapp.com",
    databaseURL: "https://night-out-197223.firebaseio.com",
    projectId: "night-out-197223",
    storageBucket: "night-out-197223.appspot.com",
    messagingSenderId: "357306478807"
  }
firebase.initializeApp(config);
var database = firebase.database();

database.ref().on("child_added", function(childSnapshot) {
    var userName = childSnapshot.val().attendeeName;
    
})



$("#submit-btn").on("click", function() {
    event.preventDefault();
    var attendeeName = $("#attendee-name").val().trim();
    var attedeeEmail =$("#attendee-email").val().trim();
    var eventId = $("#event-id").val().trim();
    
    database.ref().push({
        attendeeName: attendeeName,
        attedeeEmail:attedeeEmail,
        eventId:eventId
    })

})