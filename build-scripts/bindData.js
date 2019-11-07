// call required packages

const fs = require('fs');  
const csvParse = require('csv-parse');
const chalk = require('chalk');
const mapshaper = require('mapshaper');

// call function
function processBindFiles() {

  fs.readFile(__dirname + "/../project-files/austin-council-districts.json", 'utf8', (err, geojson) => {

    if (err) throw err;
// mapshaper command specifications
    const commands = '-filter-fields council_di -simplify dp 15% -o precision=.0001 format=geojson';

    mapshaper.applyCommands(commands, geojson, (err, data) => {

      if (err) throw err;

      const geojson = JSON.parse(data);
// call data as csv
      fs.readFile(__dirname + "/../project-files/austin-traffic-signals.csv", "utf8", (err, csvString) => {

        if (err) throw err;

        csvParse(csvString, {
          columns: true
        }, (err, csv) => {

          const outGeoJSON = bindData(geojson, csv);
// output geojson
          fs.writeFile(__dirname + '/../data/districts-counts.json', JSON.stringify(outGeoJSON), 'utf8', function (err) {

            if (err) throw err;

            console.log(chalk.green('districts-counts.json written'));
          })
        });
      });
    });
  });
}

function bindData(geojson, csv) {

  geojson.features.forEach(function (feature) {

    let count = 0;

    csv.forEach((row) => {
      if (feature.properties.council_di === row.COUNCIL_DISTRICT) {
        count++
      }
    });

    feature.properties.count = count;

  });

  return geojson;

}

exports.processBindFiles = processBindFiles;
exports.bindData = bindData;