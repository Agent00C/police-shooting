
var drawMap = function() {
	
	var map = L.map('map').setView([31.7903, -106.4233], 10);

 	layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	
	layer.addTo(map);

}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  var data;
  $.ajax({
    url:'data/response.json',
    type: "get",
    success:function(dat) {
       data = dat

       data.map(function(d){
         var circle = new L.circle([d.lat, d.lng], 200, {
         	color:'red', 
         	opacity:0.5}).addTo(map)
      });

    }, 
    dataType:"json"
  }); 

  // When your request is successful, call your customBuild function

}

// Do something creative with the data here!  
var customBuild = function() {

  
}
