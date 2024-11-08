

const request = require("request");
const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const API_KEY = "308b095564c0479bb1e92257240111";


function getWeatherData(country) {
  
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${country}&aqi=no`;


  request({ url, json: true }, (error, response) => {
    if (error) {
    
      console.log("Network Error: Unable to connect to the WeatherAPI.");
    } else if (response.body.error) {
      
      console.log(`Error: ${response.body.error.message}`);
    } else {
      
      const data = response.body;
      const city = data.location.name;
      const countryName = data.location.country;
      const temperature = data.current.temp_c;
      const latitude = data.location.lat;
      const longitude = data.location.lon;
      const condition = data.current.condition.text;

     
      console.log("\nWeather Information:");
      console.log(`Location: ${city}, ${countryName}`);
      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);
      console.log(`Temperature: ${temperature}°C`);
      console.log(`Condition: ${condition}`);
    }

    
    rl.close();
  });
}


rl.question("Enter the name of a country or city: ", (country) => {
  getWeatherData(country.trim());
});


