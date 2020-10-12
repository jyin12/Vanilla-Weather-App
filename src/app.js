function formatDate(timeStamp){
    let date = new Date(timeStamp);
    let hours = date.getHours();
    if(hours < 0){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayWeatherInfo(response){
    console.log(response.data);
    console.log(response.data.main.humidity);
    //Temperature
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

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

    //Icon: finish later
    let iconElement = document.querySelector("#icon");

}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;

  if (searchInput.value) {
    axios.get(url).then(displayWeatherInfo);
  }
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayWeatherInfo);
}

function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector(".currLocation");
currentLocation.addEventListener("click", getCurrentPos);

let searchCity = document.querySelector("#searchForm");
searchCity.addEventListener("click", displayCity);

let cityName = "Philadelphia";
let api = "65a6ca53c94284a78ade1834db48e6ab";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=imperial`;

axios.get(apiURL).then(displayWeatherInfo);