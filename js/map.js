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

};

// Function for getting data
var numWhite=0;
var numBlack=0;
var numUnknown=0;
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  
  $.ajax({
    url:'../police-shooting/data/response.json',
    type: "get",
    success:function(dat) {
       data = dat;
	   var data;
       data.map(function(d){
         var circle = new L.circle([d.lat, d.lng], 1000, {
    		color: 'red',
    		fillColor: '#f03',
    		fillOpacity: 0.5
		 }).addTo(map);

        if(d.Race =="White")  {
        	numWhite++;
        } 
        if (d.Race=="Black or African American") {
        	numBlack++;
        } 
        if (d.Race == "Unknown") {
        	numUnknown++;
        }

		circle.bindPopup(d.City + ", " + d.State + ": " + d.Summary);

      });

    }, 
    dataType:"json"
  }); 

  // When your request is successful, call your customBuild function

};

// Do something creative with the data here!  
var customBuild = function() {
// Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Race');
        data.addColumn('number', 'Number');
        data.addRows([
          ['White', numWhite],
          ['Black or African American', numBlack],
          ['Unknown', numUnknown]
          
        ]);

        // Set chart options
        var options = {'title':"Victim's Race",
                       'width':450,
                       'height':450,
                       'backgroundColor':'black'

                   		};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
  
};
