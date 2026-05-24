// script.js

const cityInput =
document.getElementById("city-input");

const searchBtn =
document.getElementById("search-btn");

const cityName =
document.getElementById("city-name");

const temperature =
document.getElementById("temperature");

const condition =
document.getElementById("condition");

const humidity =
document.getElementById("humidity");

const windSpeed =
document.getElementById("wind-speed");

const feelsLike =
document.getElementById("feels-like");

const weatherIcon =
document.getElementById("weather-icon");

const dateElement =
document.getElementById("date");

const loading =
document.getElementById("loading");

const errorMessage =
document.getElementById("error-message");

const themeToggle =
document.getElementById("theme-toggle");

/* Fetch Weather */

async function getWeather(city){

    loading.style.display =
    "block";

    errorMessage.textContent =
    "";

    try{

        /* STEP 1 → SEARCH CITY */

        const geoResponse =
        await fetch(

`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

        );

        const geoData =
        await geoResponse.json();

        if(!geoData.results){

            throw new Error(
                "City not found"
            );

        }

        const place =
        geoData.results[0];

        const lat =
        place.latitude;

        const lon =
        place.longitude;

        /* STEP 2 → WEATHER */

        const weatherResponse =
        await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`

        );

        const weatherData =
        await weatherResponse.json();

        displayWeather(
            weatherData,
            place
        );

    }

    catch(error){

        errorMessage.textContent =
        error.message;

    }

    finally{

        loading.style.display =
        "none";

    }

}

/* Display Weather */

function displayWeather(data,place){

    cityName.textContent =
    `${place.name}, ${place.country}`;

    temperature.textContent =
    `${Math.round(data.current.temperature_2m)}°C`;

    humidity.textContent =
    `${data.current.relative_humidity_2m}%`;

    windSpeed.textContent =
    `${data.current.wind_speed_10m} km/h`;

    feelsLike.textContent =
    `${Math.round(data.current.apparent_temperature)}°C`;

    dateElement.textContent =
    new Date().toDateString();

    const code =
    data.current.weather_code;

    /* Weather Condition */

    if(code === 0){

        condition.textContent =
        "Clear Sky";

        weatherIcon.className =
        "fa-solid fa-sun";

    }

    else if(code <= 3){

        condition.textContent =
        "Cloudy";

        weatherIcon.className =
        "fa-solid fa-cloud";

    }

    else if(code <= 67){

        condition.textContent =
        "Rainy";

        weatherIcon.className =
        "fa-solid fa-cloud-rain";

    }

    else{

        condition.textContent =
        "Weather Updated";

        weatherIcon.className =
        "fa-solid fa-cloud";

    }

}

/* Search */

searchBtn.addEventListener(
    "click",
    () => {

        const city =
        cityInput.value.trim();

        if(city === ""){

            errorMessage.textContent =
            "Please enter city name";

            return;

        }

        getWeather(city);

    }
);

/* Enter Key */

cityInput.addEventListener(
    "keypress",
    (e) => {

        if(e.key === "Enter"){

            searchBtn.click();

        }

    }
);

/* Theme Toggle */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-theme"
        );

    }
);

/* Default City */

getWeather("Hyderabad");