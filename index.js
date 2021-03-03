//Select elements from html
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notifcationElement = document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
  unit : "celsius"
};

//App const and Car
const Kevlin = 273;
//API
const key = "4b0c14e2b8786f34480092553882c27c";


  //check for geo supporting browser
  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition (setPosition, showError);
  }else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
  }

  //Setting user location
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
 }
//function to show the error with geo services
 function showError(error){
   notificationElement.style.display = "block";
   notificationElement.innerHTML = `<p> ${error.message} </p>`;
 }
 


 //GET WEATHER FROM API
 function getWeather(latitude, longitude){
   let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
   
   //debug api return to ensure it's working
   //console.log(api); 

   fetch(api)
   
   .then(function(response){
     let data = response.json(); //parsing response from api
    return data; //data is now a returned object for us to create parameters with
   })
   .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - Kevlin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
   })
   .then(function(){
     displayWeather();
   });
 }



//Functions for weather display
function displayWeather(){

  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;//Returns icon based on weather

tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`; //Returns temp value plus celcius

descElement.innerHTML = weather.description;//returns description whether its clear sky or rainy

locationElement.innerHTML = `${weather.city}, ${weather.country}`; // location
};

function celsiusToFahrenheit(temperature){ //mathamatical conversion for celsius to farenheit

  return (temperature * 9/5) + 32;
}


// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "celsius"){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
      
      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius"
  }
});



