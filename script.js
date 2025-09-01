const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
// const apiKey = '31453b7846ccbec6a67e5c2ba5204093'; old key which is deleted
const apiKey = WEATHER_API_ENVIRONMENT_VARIABLE ;
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherImage = document.getElementById('weatherIcon');
const updates = document.querySelector('.content');
const errore = document.querySelector('.error');

async function checkWeather(city) {
    const responce = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`)
    var data = await responce.json();

    if (data.cod == '404') {
        updates.style.display = 'none'
        errore.style.display = 'initial'
    } else {
        updates.style.display = 'initial'
        errore.style.display = 'none'
    }

    // console.clear() 
    // console.log(data)

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    //to update weather image as per weather condition 

    if (data.weather[0].main == 'Drizzle') {
        weatherImage.src = 'images/drizzle.png'
    } else if (data.weather[0].main == 'Clouds') {
        weatherImage.src = 'images/clouds.png'
    } else if (data.weather[0].main == 'Rain') {
        weatherImage.src = 'images/rain.png'
    }
    else if (data.weather[0].main == 'Snow') {
        weatherImage.src = 'images/snow.png'
    }
    else if (data.weather[0].main == 'Mist') {
        weatherImage.src = 'images/mist.png'
    }
    else if (data.weather[0].main == 'Clear') {
        weatherImage.src = 'images/clear.png'
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);

})