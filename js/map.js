var map;

var drawMap = function() {

	map = L.map('map').setView([41.1456, -104.8019], 4);

	var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	id: 'jtopasna.4a70938e',
    	accessToken: 'sk.eyJ1IjoianRvcGFzbmEiLCJhIjoiY2M3NjNkZDFkNjdmMmIxMDI1NWI5Y2VmZWMwZGM5MDMifQ.YQy8szTvotF29FCy6ZasBQ'
	}).addTo(map);

	/*var marker = L.marker([41.1456, -104.8019]).addTo(map); /* Cheyenne, WY */
	/* SAVE!!! 
 	layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	
	layer.addTo(map);*/

}

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  var data;
  $.ajax({
    url:'../police-shooting/data/response.json',
    type: "get",
    success:function(dat) {
       data = dat;

       data.map(function(d){
         var circle = new L.circle([d.lat, d.lng], 500, {
    		color: 'red',
    		fillColor: '#f03',
    		fillOpacity: 0.5
		 }).addTo(map);

		 circle.bindPopup(d.City + ", " + d.State);

      });

    }, 
    dataType:"json"
  }); 

  // When your request is successful, call your customBuild function

}

// Do something creative with the data here!  
var customBuild = function() {

  
}
