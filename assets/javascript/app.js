$("#submit-btn").on("click", function() {
    var location = $("#location").val().trim();
    var radius = $("#miles").val().trim();
    var date = $("#dates").val().trim();
    console.log("getting into on click function");
    console.log(location,radius, date);
    
    eventsLength = 10;
    var allEventPanels = $("<div>");
    for(var i = 0; i < eventsLength; i++ ) {
       var panel = $("<div>").attr("class", "panel panel-default");
       var panelContent = $("<div>").attr("class", "panel-body");
       panelContent.text    ("Panel #" + i);
       panel.append(panelContent);
       allEventPanels.append(panel);

    }
    $("#events-div").html(allEventPanels);
})


