// Store your OpenWeatherMap API key.

const apiKey = "YOUR_API_KEY";


// Find the HTML element where we display the weather data.

const weatherDiv = document.getElementById("weatherdata");


// Run this function when the user clicks the "Fetch data" button.
// async allows us to use await inside the function.


async function fetchWeather(cityName)
 {  console.log("fetchWeather function started");
    const city = typeof cityName === "string"? cityName
    : document.getElementById("city").value;
    console.log("Selected city:", city);

    // Display a loading message.
     weatherDiv.innerHTML = "Loading weather data...";

     
    // Try to fetch and process the weather data.
    try {  
        
        // Send a GET request to the weather API and wait for the response.
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&mode=xml&APPID=${apiKey}`;
       console.log("Request URL:", url);
        // q=Helsinki selects the city.
        // units=metric gives the temperature in Celsius.
        // mode=xml requests the data in XML format.
        // ${apiKey} inserts our API key into the URL.

        const response = await fetch(url);
        

        // Check whether the API returned a successful HTTP status.

        if (!response.ok) {
             // Create an error and jump to the catch block.
            throw new Error("HTTP error: " + response.status);
        }
        
        // Read the response body as text and wait until it is ready.
        const data = await response.text();
       
         // Display the XML as plain text on the page.
        const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(data, "text/xml");
        const temperature = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
        const humidity = xmlDoc.getElementsByTagName("humidity")[0].getAttribute("value");
        const clouds = xmlDoc.getElementsByTagName("clouds")[0].getAttribute("value");

        weatherDiv.innerHTML = `
    <p>Temperature: ${temperature} °C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Cloudiness: ${clouds}%</p>
`;


    } catch (error) {
        // Handle errors from the request or the code above.

        // Choose an error message in the page's language.
        const message = "Could not fetch weather data.";
        const details = error.message;
        
        // Display the message and details of the error.
        weatherDiv.textContent = message + " " + details;
    

    
    }

}

document.getElementById("fetchWeather").addEventListener("click", fetchWeather);
document.getElementById("city").onchange = fetchWeather;

document.getElementById("search").addEventListener("click", () => {
    const searchCity = document.getElementById("citysearch").value.trim();
    fetchWeather(searchCity);
});

        
        
        


  

        
   

        