
// API KEY NEEDED TO RETREIVE DATA //
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// CALLING CURRENT WEATHER API //

function getCurrentWeather(city){

    console.log(city);

    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&units=imperial&appid=" + APIKey;

$.ajax({
    url: queryURLcurrent,
    method: "GET"
})
    .then(function (response) {
        
// SHOWS WE ARE CONNECTING AND GETTING DATA BACK  //       
        console.log(queryURLcurrent);
        console.log(response);
      
// DISPLAYING CURRENT WEATHER (not including UX index) - City, date, icon image, temp, humidity, wind speed //
        var today = moment().format("MMM Do YY");
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        $(".city-name").html(response.name);
        $(".todays-date").html(today);
        $(".icon-image").html(response.weather.icon);
        $(".todays-temp").html("Current Temperature:" + response.main.temp);
        $(".todays-humidity").html("Humidity:" + response.main.humidity + "%");
        $(".todays-wind-speed").html("Wind Speed:" + response.wind.speed);
        getUv (lon, lat);
    })
}


// CALLING UX INDEX WEATHER API //
function getUv (index1, index2){
var queryURLindex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + index1 + "&lon=" + index2;     

$.ajax({
    url: queryURLindex,
    method: "GET"
})
    .then(function (response) {
        
// SHOWS WE ARE CONNECTING AND GETTING DATA BACK  //  
     
        console.log(queryURLindex);
        console.log(response);

// DISPLAYING CURRENT WEATHER - Ux index //
        $(".todays-uv-index").html("UV Index:" + response.value);
    })
}

// DISPLAYING 5 DAY FORCAST WEATHER - date, icon image, temp, humidity //

// URL FOR 5 DAY WEATHER FORCAST API //
function fiveDay(city){
var queryURLfive = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURLfive,
        method: "GET"
    })
        .then(function (response) {

            console.log(queryURLfive);
            console.log(response);  

    for (var i=0; i<response.list.length; i++)

    if (response.list[i].dt_txt )
        $(".day-one").html();
        $(".day-two").html();
        $(".day-three").html();
        $(".day-four").html();
        $(".day-five").html();
    })



    $(".btn").on("click", function() { 
        var searchTerm = $("#user-search").val();
        getCurrentWeather(searchTerm);
        fiveDay(searchTerm);
    })