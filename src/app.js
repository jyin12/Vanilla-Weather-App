function formatDate(timeStamp){
    let date = new Date(timeStamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timeStamp)}`;
}

function formatHours(timeStamp){
  let date = new Date(timeStamp);
    let hours = date.getHours();
    if(hours < 0){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
  return `${hours}:${minutes}`;
}

function displayWeatherInfo(response){
    //Sets unit to imperial by default
    fahrenheit.classList.add("active");
    celcius.classList.remove("active");
    //Unit conversion
    fahrenheitTemperature = response.data.main.temp;
    hiFahrenheitTemp = response.data.main.temp_max;
    loFahrenheitTemp = response.data.main.temp_min;

    //Temperature
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

    //City
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    //Weather description
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    //Humidity
    let humidityElement = document.querySelector(".humidInfo");
    humidityElement.innerHTML = response.data.main.humidity;

    //Wind speed
    let windElement = document.querySelector(".windInfo");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    //Date and time
    let dateElement = document.querySelector("#timeDay");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    //High temp
    let highTempElement = document.querySelector(".hiTemp");
    highTempElement.innerHTML = Math.round(response.data.main.temp_max);

    //Low temp
    let lowTempElement = document.querySelector(".loTemp");
    lowTempElement.innerHTML = Math.round(response.data.main.temp_min);

    //Icons
    let iconElement = document.querySelector("#icon");
    if(response.data.weather[0].icon == "01d"){
      iconElement.setAttribute("src", "img/sun.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "01n"){
      iconElement.setAttribute("src", "img/clearNight.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "02d"){
      iconElement.setAttribute("src", "img/fewClouds.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "02n"){
      iconElement.setAttribute("src", "img/fewCloudsNight.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "03d" || response.data.weather[0].icon == "03n" || response.data.weather[0].icon == "04d" || response.data.weather[0].icon == "04n"){
      iconElement.setAttribute("src", "img/cloud.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "09d" || response.data.weather[0].icon == "09n"){
      iconElement.setAttribute("src", "img/showerRain.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "10d"){
      iconElement.setAttribute("src", "img/rain.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "10n"){
      iconElement.setAttribute("src", "img/rainNight.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "11d" || response.data.weather[0].icon == "11n"){
      iconElement.setAttribute("src", "img/thunder.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "13d" || response.data.weather[0].icon == "13n"){
      iconElement.setAttribute("src", "img/snow.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
    if(response.data.weather[0].icon == "50d" || response.data.weather[0].icon == "50n" || response.data.weather[0].icon == "04d" || response.data.weather[0].icon == "04n"){
      iconElement.setAttribute("src", "img/cloud.png");
      iconElement.setAttribute("alt", response.data.weather[0].description);
    }
}

//TODO
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;  
  
  for(let i = 0; i < 4; i++){
    /*hiForecastTemp = response.data.list[i].main.temp_max;
    loForecastTemp = response.data.list[i].main.temp_min;*/
    forecast = response.data.list[i];

    forecastElement.innerHTML += `
    <div class="col-3">
      <h4 id="day1">${formatHours(forecast.dt * 1000)}</h4>
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" class="iconForecast" width="45" height="45">
      <div class="forecastTemp">
        <span class="tempForecastHi">${Math.round(forecast.main.temp_max)}</span>°
        <span class="tempForecastLo">${Math.round(forecast.main.temp_min)}</span>°
      </div>
    </div>`;
  }
}

function searchCity(event) {
  event.preventDefault();
  //Weather
  let searchInput = document.querySelector("#city-search");
  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  
  //Forecast
  forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  
  if (searchInput.value) {
    axios.get(url).then(displayWeatherInfo);
    axios.get(forecastUrl).then(displayForecast);
  }
}

//Unit conversion
function displayFahreheit(event){
    event.preventDefault();
    fahrenheit.classList.add("active");
    celcius.classList.remove("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(fahrenheitTemperature);

    let hiTempElement = document.querySelector(".hiTemp");
    hiTempElement.innerHTML = Math.round(hiFahrenheitTemp);
    let loTempElement = document.querySelector(".loTemp");
    loTempElement.innerHTML = Math.round(loFahrenheitTemp);

    /*let hiForecastElement = document.querySelector(".tempForecastHi");
    hiForecastElement.innerHTML = Math.round(hiForecastTemp);
    let loForecastElement = document.querySelector(".tempForecastLo");
    loForecastElement.innerHTML = Math.round(loForecastTemp);*/
}
function displayCelcius(event){
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    let hiTempElement = document.querySelector(".hiTemp");
    let loTempElement = document.querySelector(".loTemp");
    //let hiForecastElement = document.querySelector(".tempForecastHi");
    //let loForecastElement = document.querySelector(".tempForecastLo");
    //remove active class from fahrenheit link
    fahrenheit.classList.remove("active");
    celcius.classList.add("active");
    let celciusConversion = (fahrenheitTemperature - 32) * 5 / 9;
    let celciusHiTemp = (hiFahrenheitTemp - 32) * 5 / 9;
    let celciusLoTemp = (loFahrenheitTemp - 32) * 5 / 9;
    //let foreCastHiTemp = (hiForecastTemp - 32) * 5 / 9;
    //let forecastLoTemp = (loForecastTemp - 32) * 5 / 9;
    tempElement.innerHTML = Math.round(celciusConversion);
    hiTempElement.innerHTML = Math.round(celciusHiTemp);
    loTempElement.innerHTML = Math.round(celciusLoTemp);
    //hiForecastElement.innerHTML = Math.round(foreCastHiTemp);
    //loForecastElement.innerHTML = Math.round(forecastLoTemp);
}

//Current location info
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayWeatherInfo);
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api}&units=imperial`;
  axios.get(forecastUrl).then(displayForecast);  
}

function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector(".currLocation");
currentLocation.addEventListener("click", getCurrentPos);

//Unit conversions
let fahrenheit = document.querySelector("#f");
fahrenheit.addEventListener("click", displayFahreheit);
let celcius = document.querySelector("#c")
celcius.addEventListener("click", displayCelcius);
//let hiForecastTemp = null;
//let loForecastTemp = null;
let hiFahrenheitTemp = null;
let loFahrenheitTemp = null;
let fahrenheitTemperature = null;  //global variable

//Search engine info
let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchCity);

//Default weather placement
let cityName = "Philadelphia";
let api = "65a6ca53c94284a78ade1834db48e6ab";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`;
axios.get(apiURL).then(displayWeatherInfo);

//Default forecast
apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api}&units=imperial`;
axios.get(apiURL).then(displayForecast);