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

var outputDiv = $("#database-output");

$("#submit-btn").on("click", function() {
    event.preventDefault();
    var attendeeName = $("#attendee-name").val().trim();
    var eventId = $("#event-id").val().trim();

    database.ref().once("value")
      .then(function(snapshot) {
        var a = snapshot.child(eventId).exists();  
        if(!a){
            database.ref("/"+ eventId).push({
                attendeeName: attendeeName
            })
        }
      });

    // outputDiv.empty();
  
    // var ref = firebase.database().ref(eventId);

})
