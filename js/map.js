/* Joseph Topasna
 * Instr: Mike Freeman
 * INFO 343
 * Polic-Shooting
 * 06 July 15 */
 
var map;
var numWhite=0;
var numBlack=0;
var numUnknown=0;

var drawMap = function() {

	map = L.map('map').setView([41.1456, -104.8019], 4);

	var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	id: 'jtopasna.4a70938e',
    	accessToken: 'sk.eyJ1IjoianRvcGFzbmEiLCJhIjoiY2M3NjNkZDFkNjdmMmIxMDI1NWI5Y2VmZWMwZGM5MDMifQ.YQy8szTvotF29FCy6ZasBQ'
	}).addTo(map);

};

/* Gives Chrome access to local file data/response.json: "open /Applications/Google\ Chrome.app --args --allow-file-access-from-files" */
var getData = function() {  
  
  $.ajax({
    url:'../police-shooting/data/response.json',
    type: "get",
    success:function(dat) {
       data = dat;
	   var data;
       data.map(function(d){
         var circle = new L.circle([d.lat, d.lng], 1000, {
    		color:'red',
    		fillColor:'#f03',
    		fillOpacity:0.5
		 });

        if(d.Race =="White")  {
        	numWhite++;
        } 
        if (d.Race=="Black or African American") {
        	numBlack++;
        	circle.setStyle({color:'darkblue', fillColor:'blue'});
        } 
        if (d.Race == "Unknown") {
        	numUnknown++;
        	circle.setStyle({color:'orange', fillColor:'yellow'});
        }

		circle.addTo(map);
		circle.bindPopup(d.City + ", " + d.State + ", Victim's Race: " + d.Race + ", " + d.Summary);

      });

    }, 
    dataType:"json"
  }); 
};
 
var customBuild = function() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Race');
        data.addColumn('number', 'Number');
        data.addRows([
          ['White', numWhite],
          ['Black or African American', numBlack],
          ['Latino or Unknown', numUnknown]
          
        ]);

        var options = {'title':"Race of Victims",
                       'width':600,
                       'height':600,
                       'chartArea.left':1,
                       'chartArea.right':1,
                       'chartArea.top':1,
                       'chartArea.bottom':1, 
                       'backgroundColor':'transparent',
                       'titleTextStyle': {'fontSize':20}
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
  
};
