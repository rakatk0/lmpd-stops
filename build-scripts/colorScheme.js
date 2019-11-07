// call libraries 
const fs = require('fs');
const chalk = require('chalk');


function extractColors() {
// read data
  fs.readFile(__dirname + '/../project-files/cartocolors.json', function (err, response) {

    if (err) throw err;

    console.log(chalk.blue("cartocolors.json data loaded!"));

    const data = JSON.parse(response);

    console.log(chalk.blue("cartocolors.json data parsed to JSON"));
// filter data
    const outputData = {
      'Vivid': data['Vivid']
    };

    console.log(chalk.blue("vivid scheme extracted from parsed data"));
// export data
    fs.writeFile(__dirname + '/../data/vividcolors.json', JSON.stringify(outputData), 'utf-8', function (err) {

      if (err) throw err;

      console.log(chalk.blue('vividcolors.json written to data/ dir'));
    });
  });
}

exports.extractColors = extractColors