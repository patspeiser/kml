const fs = require('fs');
const parseString = require('xml2js').parseString;
const geolib = require('geolib');

// returns to readFile() a 
var listPlaces = function(arr){
	var listOfCoordinates = [];
	arr.forEach( function(value){
		listOfCoordinates.push(value.Point[0].coordinates);
	});
	return latLong(listOfCoordinates);
}

//used by listPlaces() to convert the ARRAY of STRINGS of coords to an ARRAY of OBJECTs of coords
var latLong = function(arr){
	arr.forEach(function(val, ind, arr){
		arr[ind] = arr[ind][0].split(','); 
		arr[ind] = { 
			'latitude': arr[ind][0],
			'longitude': arr[ind][1]
			}
	});
	return arr;
}

//well geolib werkz
var getDistance = function(arr){
	for (var i = 0; i < arr.length; i++){
		if (arr[i+1]){
			console.log(geolib.getDistance(arr[i], arr[i+1]));
		}
	}
}

fs.readFile('./vermont.kml', function(err, data){
	var KML = data.toString();
	parseString(KML, function(err, result){
		var places = result.kml.Document[0].Placemark;
		var arr = listPlaces(places);
		getDistance(arr);
		//console.log(arr);
	});
});