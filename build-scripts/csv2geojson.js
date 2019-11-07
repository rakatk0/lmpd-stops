// call libraries
const fs = require('fs');
const csv2geojson = require('csv2geojson');
const chalk = require('chalk');

function convertCsv() {
// request data
  fs.readFile(__dirname + '/../project-files/austin-traffic-signals.csv', 'utf-8', (err, csvString) => {

    if (err) throw err;

    console.log(chalk.green('austin-traffic-signals.csv loaded'))
    console.log(chalk.green('parsing csv ...'))
// convert csv to geojson
    csv2geojson.csv2geojson(csvString, {
      latfield: 'LATITUDE',
      lonfield: 'LONGITUDE',
      delimiter: ','
    }, (err, geojson) => {

      if (err) throw err;

      var outGeoJSON = filterFields(geojson);

// write file
      fs.writeFile(__dirname + '/../data/austin-traffic-signals.json', JSON.stringify(outGeoJSON), 'utf-8', (err) => {

        if (err) throw err;

        console.log(chalk.green('austin-traffic-signals.json written to file'));
      });
    })
  });
}
// filter data 
function filterFields(geojson) {

  var features = geojson.features,
    newFeatures = [];

  features.forEach((feature) => {

    var tempProps = {};

    for (var prop in feature.properties) {
      if (prop === 'COUNCIL_DISTRICT' || prop === 'SIGNAL_ID') {
        tempProps[prop] = feature.properties[prop];
      }
    }

    newFeatures.push({
      "type": feature.type,
      "geometry": feature.geometry,
      "properties": tempProps
    });
  });

  return {
    "type": "FeatureCollection",
    "features": newFeatures
  }
}

// call functions
exports.convertCsv = convertCsv;
exports.filterFields = filterFields;