const fs = require('fs');
const parseString = require('xml2js').parseString;

var listPlaces = function(arr){
	arr.forEach( function(value){
		//console.log(value.Point[0].coordinates);
		console.log(value.Point[0].coordinates);
		console.log('###\n\n');
	});
}

fs.readFile('./vermont.kml', function(err, data){
	var KML = data.toString();
	parseString(KML, function(err, result){
		var places = result.kml.Document[0].Placemark;
		listPlaces(places);
	});
});