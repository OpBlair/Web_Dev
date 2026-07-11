'use strict';

async function getWeatherData() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw Data Received:", data);

        const firstTime = data.hourly.time[0];
        const firstTemp = data.hourly.temperature_2m[0];
        console.log(`At ${firstTime}, the temperature will be ${firstTemp}`);
    } catch(error){
        console.error("couldn't fetch the weather data", error);
    }
}

getWeatherData();