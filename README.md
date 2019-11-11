# weather_dashboard
Displays the weather for any region user is looking for

URL: https://haylee430.github.io/weather_dashboard/

Resources:
    Open Weather API: https://openweathermap.org/api
    bootstrap: https://getbootstrap.com/docs/4.3/getting-started/introduction/

In Depth Description:
    Useing the Open Weather API and JavaScript/jQuery I have created an application in which a user can type the name of any city and get the currect weather forcast, the next 5 day forcast,
and can then save those cities as local storage. This will allow the user to go back to past searches and look at those cities again so they are not always searching for where they live, travel,or have relatives in. The current weather includes an icon representing the weather, the date, temperature, humidity, wind speed, and UV index. The Five day forcast only includes the icon, temperature, and humitity. These are all getting pulled from the object the Open Weather API is returning. The Open Weather API has three seperate API's for current forcast, 5-day forcast, and the UV index. I made each of these API's into an Ajax call function and then called all functions when the search button has been clicked on.
    