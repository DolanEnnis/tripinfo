/**
 * @author BD Aug 2015
 */

Template.position.created =  function() {
  var input = {
  	lat : 52,
  	longtitude : 9.5,
  	speed : 10.0,
  	delay : 0,
  };

   var line = []; // array to keep track of firstLeg line ship to waypoint!

  var output = {
  	dToWP : 0,
  	dToKil : 0,
  	tToKil : 0,
  	ETAScattery : "",
  	mrwp: "",
  	lastSeen : new Date(),
  	ETAKil : "",
  };

  var waypoints = [
  new waypoint ("Kilcreadaun",52.55333,-9.71667,0),
  new waypoint ("Loop Head",52.53333,-10,10.43),
  new waypoint ("Slyne Head",53.40000,-10.46667,65.11),
  new waypoint ("Black Rock",54.08333,-10.48333,106.12),
  new waypoint ("Eagle Island",54.31333,-10.33333,120.89),
  new waypoint ("Tory Island",55.32167,-8.28333,214.19),
  new waypoint ("Inishtrahull",55.50833,-7.23333,251.74),
  new waypoint ("Middle Bank",55.42500,-6.24333,285.86),
  new waypoint ("Rathlin TSS",55.40167,-6.05,292.60),
  new waypoint ("East Maiden",55.06667,-5.46667,320.96),
  new waypoint ("Black Head",54.75833,-5.63333,340.33),
  new waypoint ("Inishtoosk",52.15935,-10.61583,40.63),
  new waypoint ("Inishtearaght",52.08675,-10.72698,46.61),
  new waypoint ("Little Foze",52.01442,-10.75322,51.05),
  new waypoint ("Skellig",51.75122,-10.60485,67.7783),
  new waypoint ("Bull",51.56700,-10.3489,82.3865),
  new waypoint ("Fastnet",51.25328,-9.57865,116.877),
  new waypoint ("BANN SHOAL BUOY",50.34187,-5.88902,267.458),
  new waypoint ("Wolf Rock",49.99257,-5.8866,288.42),
  new waypoint ("Lizard",49.90167,-5.20282,315.45),
  new waypoint ("CS1",50.53037,-0.05217,517.30),
  new waypoint ("Scilly",49.72,-6.6412,261.88),
  guard(52.532953,-9.99620,"Kilcreadaun"),
  guard(53.39683,-10.46664,"Loop Head"),
  guard(54.08,-10.48333,"Slyne Head"),
  guard(54.31333,-10.33633,"Black Rock"),
  guard(55.31951,-8.28533,"Eagle Island"),
  guard(55.50833,-7.23433,"Tory Island"),
  guard(55.42549,-6.243823,"Inishtrahull"),
  guard(55.40236,-6.05070,"Middle Bank"),
  guard(55.06903,-5.46967,"Rathlin TSS"),
  guard(54.76152,-5.63633,"East Maiden"),
  guard(52.16129,-10.61883,"Kilcreadaun"),
  guard(52.08918,-10.72998,"Inishtoosk"),
  guard(52.01767,-10.75324,"Inishtearaght"),
  guard(51.75121,-10.60785,"Little Foze"),
  guard(51.75122,-10.75322,"Little Foze"),
  guard(51.5670,-10.35190,"Skellig"),
  guard(51.25328,-9.58165,"Bull"),
  guard(50.34487,-5.89052,"Fastnet"),
  guard(49.9959,-5.88660,"BANN SHOAL BUOY"),
  guard(49.89867,-5.20582,"Wolf Rock"),
  guard(50.52974,-0.05317,"Lizard"),
  guard(49.72,-6.6418,"Bull"),
  guard(49.99,-5.89,"Scilly"),];

  var map;
 function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.5, lng: -9.71},
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
  mapWaypoints(waypoints);
}
  var shipPos = new google.maps.LatLng(input.lat,input.longtitude);

  function waypoint(name , lat, longtit,distToKil, useWaypoint){
      this.name = name;
      this.lat = lat;
      this.longtit = longtit;
      this.distToKil = distToKil;
      this.useWaypoint = useWaypoint||name;
    }

  function guard(lat,longtit,useWaypoint){
  	return new waypoint("guard "+useWaypoint,lat,longtit,1000000,useWaypoint);
  }

  function mapWaypoints(waypoints){
  	for (i = 0; i < waypoints.length; i++){
  	    var markerOptions = {
      		position: new google.maps.LatLng(waypoints[i].lat,waypoints[i].longtit),
      		icon: {path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,scale: 1},
      		title: "Use waypoint " +waypoints[i].useWaypoint
  			};
  		if (waypoints[i].distToKil<1000000){
  			markerOptions.title = waypoints[i].name + "  "+waypoints[i].distToKil;
  			markerOptions.icon = {path: google.maps.SymbolPath.CIRCLE,scale: 3};
  			}
  		var marker = new google.maps.Marker(markerOptions);
  		marker.setMap(map);
    		// Set up listner so that clicking marker changes MRWP

  		marker.addListener('click', function() {
     				var markerPos = this.getPosition();
     				output.mrwp = nextWP(markerPos,waypoints);
     				console.log (output.mrwp);
     				mainOutput();
    				});
  		 }
  	}

}


Template.position.events ( {
  'click .btn-success': function (event) {
     event.preventDefault();
     document.getElementById("myForm").reset();
   	var lat, longtitude;
   	var thenum = [0,0,0];
   	var posAsString = document.getElementById("posAsString").value;
   	var theBignum = posAsString.match(/\d+/g);
   	if(theBignum.length==4)
   		{thenum = theBignum ;}
   	else if(theBignum.length>10){
   		input.delay=theBignum[0];
   		thenum = [theBignum[6],theBignum[7],theBignum[8],theBignum[9]];
   		var temp =theBignum.reverse();
   		input.speed = temp[2]/1+(temp[1]/10);}
   	else{
   		thenum = [theBignum[0],theBignum[1],theBignum[2],theBignum[3]];
   		var temp =theBignum.reverse();
   		input.speed = temp[2]/1+(temp[1]/10);}
   	document.getElementById("lat").defaultValue  = thenum[0];
   	document.getElementById("latMin").defaultValue  = (60*numToDecimal(thenum[1])).toFixed(3);
   	document.getElementById("long").defaultValue  = thenum[2];
   	document.getElementById("longMin").defaultValue  = (60*numToDecimal(thenum[3])).toFixed(3);
   	document.getElementById("speed").defaultValue  = input.speed;
   	document.getElementById("delay").defaultValue  = input.delay;
   	main();
   }
} );



Template.Awaitingberth.helpers({

main:function() {
	//Take input and mark ships position on map
	var now = new Date();
	input.delay = (document.getElementById("delay").value)*60*1000;
	output.lastSeen = new Date(now.getTime() - input.delay);
	var latmin =(document.getElementById("latMin").value)/60;
	input.lat = document.getElementById("lat").value;
	input.lat = (input.lat/1)+latmin;
	input.longtitude = document.getElementById("long").value;
	var longmin = (document.getElementById("longMin").value)/60;
	input.longtitude = input.longtitude/1 + longmin;
	var quad = document.getElementById("E/W").value;
	if (quad == "W"||quad == "w"){
		input.longtitude =-input.longtitude;
	};
	shipPos = new google.maps.LatLng(input.lat,input.longtitude);
	var markerOptions = {
    	position: shipPos
	};
	var marker = new google.maps.Marker(markerOptions);
	marker.setMap(map);

	// change zoom level of map
	var KilcreadaunPos = new google.maps.LatLng(waypoints[0].lat,waypoints[0].longtit);
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(KilcreadaunPos);
	bounds.extend(shipPos);
	map.fitBounds(bounds);

	output.mrwp = nextWP(shipPos,waypoints);

	mainOutput();
},

numToDecimal:function(num){
	var numlenght = num.toString().length;
	var numLog=Math.log(num) / Math.LN10;
	var decLog = (numLog-numlenght);
	return Math.pow(10,decLog);
},

distanceInNM:function(loc,waypoint){
	var to =  new google.maps.LatLng(waypoint.lat, waypoint.longtit);
	var dist = (google.maps.geometry.spherical.computeDistanceBetween(loc,to))/1852;
	return dist;
},

nextWP:function(loc,waypoints){
    var nearestDist = 10000000;
    var nearWP = new waypoint("Nothing Near",0,0,10000000,[]);
    for (i = 0; i < waypoints.length; i++){
        var point = waypoints[i];
        var dist = distanceInNM(loc,waypoints[i]);

        if (dist < nearestDist){
            nearestDist = dist;
            nearWP = point;
        }
        }

    return nearWP;
},

pickWP:function(wp,waypoints) {
	for (i = 0; i < waypoints.length; i++){
		if (wp.useWaypoint == waypoints[i].name){
			return waypoints[i];
		}
	}
	alert("Error");
},



mainOutput:function(){
	var appropriateWP = pickWP(output.mrwp,waypoints);
	//clear old lines
	for (i=0; i<line.length; i++)
		{
  			line[i].setMap(null); //or line[i].setVisible(false);
		}
	//draw line from ship to first WP

	var legCoordinates = [
    	 {lat: appropriateWP.lat, lng: appropriateWP.longtit},
    	shipPos];
	var firstLeg = new google.maps.Polyline({
    path: legCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  	});
	line.push(firstLeg);
  	firstLeg.setMap(map);


	input.speed = document.getElementById("speed").value;

	output.dToWP = distanceInNM(shipPos,appropriateWP);
	output.dToKil  = output.dToWP + appropriateWP.distToKil;
	output.tToKil = output.dToKil/input.speed;
	output.ETAKil = new Date (output.lastSeen.getTime() + (output.tToKil*60*60*1000));
	//Time to scattery!
	output.ETAScattery = new Date (output.lastSeen.getTime()+((output.dToKil+8.8)/input.speed)*60*60*1000);

	document.getElementById("WPdist").innerHTML = output.dToWP.toFixed(1);
	document.getElementById("KillDist").innerHTML = output.dToKil.toFixed(1);
	document.getElementById("KillTime").innerHTML = output.tToKil.toFixed(2);
	document.getElementById("ETAScattery").innerHTML = output.ETAScattery.toLocaleString();
	document.getElementById("WP").innerHTML = output.mrwp.useWaypoint;
	document.getElementById("timeSeen").innerHTML = output.lastSeen.toLocaleString();
	document.getElementById("ETAKil").innerHTML = output.ETAKil.toLocaleString();
	tableOutput();
},

tableOutput:function(){
	var speedDiff = [
		-2,-1.5,-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75,1,1.5,2,3
	];

	var speedRange = [];
	var etaKilRange  = [];
	var etaScatteryRange = [];
	// declare html variable (a string holder):
	var html = '<tr><th>Speed  </th><th class="speedTable">ETA</th> <th class="speedTable">ETA<th></tr>';
	html += '<tr><th></th><th class="speedTable">Kilcreadaun</th> <th class="speedTable">Scattery<th></tr>'
	for (i=0; i<speedDiff.length; i++){
		speedRange.push(parseFloat(input.speed) + speedDiff[i]);
		etaKilRange.push(
(new Date (output.lastSeen.getTime()+((output.dToKil)/speedRange[i])*60*60*1000)).toTimeString().substring(0, 5)
		);
		etaScatteryRange.push(
(new Date (output.lastSeen.getTime()+((output.dToKil+8.8)/speedRange[i])*60*60*1000)).toTimeString().substring(0, 5)
		);
		html += "<tr><td class='speedClass'>"+speedRange[i]+"  Kts  "+"</td><td>"+etaKilRange[i]+"</td><td>"+etaScatteryRange[i]+"</td></tr>"
	};
	console.log(etaScatteryRange);
	//append created html to the table body:
	$('#varSpeed').html(html);


}

});
