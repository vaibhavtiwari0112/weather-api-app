let weather = {
    apiKey: "a2a25ece5e26536ed8dc566f5a89b8be",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    fetchWeatherByCoords: function(lat, lon) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "&lon=" +
                lon +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".weather").innerHTML = `
            <h2 class="city">Weather in ${name}</h2>
            <img class="icon" src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <p class="description">${description}</p>
            <p class="temp">${temp}°C</p>
            <p class="humidity">Humidity: ${humidity}%</p>
            <p class="wind">Wind speed: ${speed} km/h</p>
        `;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        const searchTerm = document.querySelector(".search-bar").value;
        if (searchTerm) {
            document.querySelector(".weather").classList.add("loading");
            this.fetchWeather(searchTerm);
        } else {
            alert("Please enter a city name.");
        }
    },
    toggleUnit: function() {
        const tempElement = document.querySelector(".temp");
        const currentTemp = parseFloat(tempElement.innerText);


        if (tempElement.innerText.includes("°C")) {

            const tempFahrenheit = (currentTemp * 9) / 5 + 32;
            tempElement.innerText = tempFahrenheit.toFixed(2) + "°F";
        } else {

            tempElement.innerText = currentTemp.toFixed(2) + "°C";
        }
    },
};

document.querySelector(".search-button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".location-icon").addEventListener("click", function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.querySelector(".weather").classList.add("loading");
            weather.fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert("Geolocation is not available in your browser.");
    }
});

document.querySelector(".unit-toggle").addEventListener("click", function() {
    weather.toggleUnit();
});

weather.fetchWeather("Ghaziabad");