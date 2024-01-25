function getWeather() {
    const apiKey = 'faac688e175041daac538a0b1c0cb2b4'; // Replace with your Weatherbit API key
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const dateInfoDiv = document.getElementById('dateInfo');
    const dayInfoDiv = document.getElementById('dayInfo');

    if (!cityInput) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${cityInput}&units=metric`;
    const now = new Date();

    // Get the current date and time as a string
    const currentDateTime = now.toLocaleString();
    
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = now.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Display the name of the day along with the date
    const dateInfo = `${days[dayOfWeek]}, ${currentDateTime}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                const weatherDescription = data.data[0].weather.description;
                const temperature = data.data[0].temp;

                const weatherInfo = `Temperature: ${temperature} °C<br>
                                     Description: ${weatherDescription} <br>`;


                weatherInfoDiv.innerHTML = weatherInfo;
                dateInfoDiv.innerHTML = dateInfo;
            } else {
                weatherInfoDiv.innerHTML = 'No data available for the entered city.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = 'An error occurred while fetching weather data.';
        });
}
