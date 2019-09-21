const fs = require('fs');
const parse = require('csv-parse');
const models = require('./database-mysql');

const csvData = [];
// read Ingredients.csv file
fs.createReadStream('ingredients.csv')
  // feed the contents of the file to the parser and seperating each field by comma
  .pipe(parse({ delimiter: ',' }))
  .on('data', (csvrow) => {
    // console.log('crrow!!!!!!!!!!!!!!!!!!!!!!!!', csvrow);
    // push each row/column into the storage array
    csvData.push(csvrow);
  })
  // after all of the data has been parsed and pushed into csvData
  .on('end', async () => {
    // first row of csvData is the name of each of the columns in the ingredients table
    const headers = csvData[0];
    // slice off the headers row
    const rows = csvData.slice(1);
    // loop though rows
    for (let i = 0; i < rows.length; i += 1) {
      const ingredient = {};
      // loop through columns
      for (let j = 0; j < rows.length; j += 1) {
        // make a key:value pair for each field with the key being that column's header
        ingredient[headers[j]] = rows[i][j];
      }
      // use Sequelize .create method to put the ingredient object in the Ingredients table
      // eslint-disable-next-line no-await-in-loop
      await models.Ingredients.create(ingredient);
    }
  });

// run this in mysql shell to populate states table -> load data local infile '/Users/Wesley/Documents/OpSpark/sr-immersion/heirbloom-legacy/states.csv' into table states fields terminated by ',' lines terminated by '\n' ignore 1 rows (state, abbreviation, region);
// load data local infile '/Users/Wesley/Documents/OpSpark/sr-immersion/heirbloom-legacy/states.csv' into table ingredients fields terminated by ',' lines terminated by '\n' ignore 1 rows (NameRegion,Name,Region,Description,URL,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,`Dec`,createdAt,updatedAt,SearchTerm);
// to run this file (convert .csv to populated data in mySQL table): node seeder.js

// (to populate states into table) in mysql shell
// eslint-disable-next-line max-len

// load data local infile '/Users/Wesley/Documents/OpSpark/sr-immersion/heirbloom-legacy/states.csv' into table states fields terminated by ',' lines terminated by '\n' ignore 1 rows (state, abbreviation, region);

// load data local infile '/Users/Wesley/Documents/OpSpark/sr-immersion/heirbloom-legacy/ingredients.csv' into table ingredients fields terminated by ',' lines terminated by '\n' ignore 1 rows (NameRegion,Name,Region,Description,URL,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,`Dec`,createdAt,updatedAt,SearchTerm);