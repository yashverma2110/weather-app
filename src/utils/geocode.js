const request = require("request");
const getWeather = require("./forecast");

const geocode = (loc, callback) => {
  const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoieWFzaDIxMTAiLCJhIjoiY2p5cmRweWFnMGE2ZDNubzZ3dDVrMzB2ZCJ9.FSYomlX4aoUyqOgVIhGe1Q`;

  request({ url: geoURL, json: true }, (err, res) => {
    if (err) {
      console.log("An error occured");
    } else if (res.body.message) {
      console.log("API not accessible");
    } else if (!res.body.features[0]) {
      callback("Invalid Address");
    } else {
      const lon = res.body.features[0].center[0];
      const lat = res.body.features[0].center[1];
      getWeather(lat, lon, (res) => {
        callback(res);
      });
    }
  });
};

module.exports = geocode;
