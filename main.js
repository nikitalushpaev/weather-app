const api ={
    key:"d866936d934cc6f76ae44920a12ebd4a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const notification = document.querySelector('.notification');

const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress', setQuerty);

function setQuerty(e)
{
    if(e.keyCode == 13){
        getWetherByCity(searchbox.value);
    }
}

 async function getWetherByCity(city)
{
    try{
        const qwery = `${api.base}weather?q=${city}&units=metric&appid=${api.key}`;
        const res = await fetch(qwery);
        console.log("res", res);
        const weather = await res.json();
        console.log("weather", weather);
        displayResult(weather);
    }
    catch(err){
        showError(err);
    }
}

function displayResult(weather)
{
    const city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    const now = new Date();
    const date = document.querySelector('location .date');
    data.innerText = dataBuilder(now);

    const temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp)}<span>°c</span>`;

    const weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    const hilow = document.querySelector('.hi-low');

    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${weather.main.temp_max}°c`;
}

function dataBuilder(d)
{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDay();
    const month = months[d.getMonth()];

    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p>${error.message}</p>`;
    setTimeout(() =>{
        notification.style.display = "none";
    }, 5000);
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else{
        notification.style.display = "block";
        notification.innerHTML = "<p>Browser dosen`t Support Geolocation</p>";
    }
}

function setPosition(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWetherByGeo(latitude, longitude);
}
async function getWetherByGeo(latitude,longitude){
    const qwery = `${api.base}/weather?lat=${latitude}&lon=${longitude}&units+metric&appid=${api.key}`;
    const res = await fetch(qwery);
    const weather = await res.json();
    displayResult(weather);
}