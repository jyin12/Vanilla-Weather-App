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
}

let api = "65a6ca53c94284a78ade1834db48e6ab";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=${api}&units=imperial`;

axios.get(apiURL).then(displayWeatherInfo);