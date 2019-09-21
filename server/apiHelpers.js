const axios = require('axios');
require('dotenv').config();

const { FOOD2FORKKEY } = process.env;
// does a GET request to the USDA API for local farmers markets
const getMarketsInfo = (zip) => axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zip}`)
  .then((res) => res.data.results.map(async (market) => {
    const details = await axios.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${market.id}`);
    // first API call gets the market name
    // second call gets the market info
    // spread operator allows you to combine objects... ES6 is cool
    // combine return of first API call (has marketName) with second API call
    const updatedMarketInfo = { ...market, ...details.data.marketdetails };
    return updatedMarketInfo;
  }))
  .then((promArray) => Promise.all(promArray))
  .catch((err) => console.error(err));

// this GET request is for the user's location based off of their zip code
const getUserCoordinates = (zip) => axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zip}`)
  .then((res) => {
    const cityData = res.data.records[0].fields;
    // geoPoint is an array of the zip's coordinates
    const { city, state, geopoint } = cityData;
    const cityObj = {};
    cityObj.city = city;
    cityObj.state = state;
    cityObj.geopoint = geopoint;
    return cityObj;
  })
  .catch((err) => console.error(err));

// a GET request to the Food2Fork API for all recipes containing a given ingredient
/* Originally we had planned to give users the ability to select up to 3 ingredients at a time. 
*We decided against that functionality
*but have left the framework here in case legacy wants to build that out.
*/
const getRecipes = (ingredientsArray) => {
  let ingredientsStr = '';
  ingredientsArray.forEach((ingredient, index) => {
    ingredientsStr += ingredient.split(' ').join('%20').toLowerCase();
    if (ingredientsArray.length > 1 && index < ingredientsArray.length - 1) {
      ingredientsStr += ',';
    }
  });
  return axios.get(`https://www.food2fork.com/api/search?key=${FOOD2FORKKEY}&q=${ingredientsStr}`)
    .then((recipes) => {
      return recipes;
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getMarketsInfo,
  getUserCoordinates,
  getRecipes,
};
