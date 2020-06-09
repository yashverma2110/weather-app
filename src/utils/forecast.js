const request = require("request");

const getWeather = (lat = "", lon = "", callback) => {
  const url = `http://api.weatherstack.com/current?access_key=29dcd5fa463feb995dccd7a03e5e36bb&query=${lat},${lon}&units=m`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      console.log("Unable to connect");
    } else if (res.body.error) {
      console.log(res.body.error.info);
    } else {
      const data = res.body.current;

      callback(
        `${data.weather_descriptions[0]}. The current temperature is ${data.temperature}*C`
      );
    }
  });
};

module.exports = getWeather;
