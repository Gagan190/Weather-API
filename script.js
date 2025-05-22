document.addEventListener("DOMContentLoaded",()=>{
    const cityInput=document.getElementById("city-input");
    const getwhetherbtn=document.getElementById("get-weather-btn");
    const Whetherinfo=document.getElementById("weather-info");
    const cityNameDisplay=document.getElementById("city-name");
    const TemperatureDisplay=document.getElementById("temperature");
    const DescriptionDisplay=document.getElementById("description");
    const ErrorMessage=document.getElementById("error-message");

    const API_KEY="0fecae6eb784152887b47d26e1108649";

    getwhetherbtn.addEventListener("click",async()=>{
        const city=cityInput.value.trim()
        if(!city) return;

        //Whenever we are making the web-request we need to remember two things
        //It may throw an Error
        //Server/Database is always in another continent (we need to wait its not always the immediate response)
        try {
            const WhetherData=await fetchWeatherData(city);
            DisplayWhetherData(WhetherData);
        } catch (error) {
            ShowError()
        }

    })


    async function fetchWeatherData(city){
        //gets the data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        //Making a request
        const response=await fetch(url);
        console.log(typeof(response));
        console.log(response);

        if(!response.ok){
            throw new Error("City-Not-Found");
        }

        //Make sure to convert to object JSON it will also takes some time
        const data=await response.json()

        return data
    }

    function DisplayWhetherData(data){
        //Display Data
        console.log(data);
        const name = data.name;
        const main = data.main;
        const weather = data.weather;

        cityNameDisplay.textContent=name;
        TemperatureDisplay.textContent=`Temperature:${main.temp}`;
        DescriptionDisplay.textContent=`Weather:${weather[0].description}`
        //unlock the display
        Whetherinfo.classList.remove("hidden");
        ErrorMessage.classList.add("hidden");

    }

    function ShowError(){
        Whetherinfo.classList.add("hidden");
        ErrorMessage.classList.remove("hidden");
    }
})



// Sure! Here's the simple version:

// When you use fetch(), it talks to a website (like the weather API) and gives you a response — kind of like a sealed envelope.

// Inside that envelope is a message (the weather info), but it’s in JSON format, which is just text.

// To open the envelope and turn that text into a JavaScript object, you use:
//So we need to use: const data=await response.json()