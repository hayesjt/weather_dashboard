// API KEY NEEDED TO RETREIVE DATA //
var APIKey = "166a433c57516f51dfab1f7edaed8413";

var currentCities = [];

function addToStorage(city) {
    console.log(city);
    currentCities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];
    if (currentCities.indexOf(city) === -1) {
        console.log("push City")
        currentCities.push(city);
        console.log("X" + JSON.stringify(currentCities));
        localStorage.setItem("cities", JSON.stringify(currentCities));


    }
}

function populateCityDiv() {
    currentCities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];

    for (var i = 0; i < currentCities.length; i++) {
        var oldCityBtn = $('<button>');
        oldCityBtn.addClass("oldCityClass");
        oldCityBtn.attr("data-value", currentCities[i]);
        oldCityBtn.html(currentCities[i]);
        $(".old-cities-div").prepend("<br>");
        $(".old-cities-div").prepend(oldCityBtn);
    }

};
// CALLING CURRENT WEATHER API //
function getCurrentWeather(city) {

    console.log(city);

    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + encodeURI(city) + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURLcurrent,
        method: "GET"
    })
        .done(function (response) {

            // SHOWS WE ARE CONNECTING AND GETTING DATA BACK  //       
            console.log(queryURLcurrent);
            console.log(response);

            // DISPLAYING CURRENT WEATHER (not including UX index) - City, date, icon image, temp, humidity, wind speed //
            var today = moment().format("MMM Do YY");
            var lon = response.coord.lon;
            var lat = response.coord.lat;

            $(".city-name").html(response.name);
            $(".todays-date").html(today);
            $(".icon-image").attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon);
            $(".todays-temp").html("Current Temperature:" + response.main.temp + "°");
            $(".todays-humidity").html("Humidity:" + response.main.humidity + "%");
            $(".todays-wind-speed").html("Wind Speed:" + response.wind.speed + "mph");
            setTimeout(function () {
                getUv(lon, lat);
            }, 100)

        })
}

// CALLING UX INDEX WEATHER API //
function getUv(index1, index2) {
    //console.log(":" + index1 + ":");

    //console.log(":" + index2 + ":");
    var queryURLindex = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lon=" + index1 + "&lat=" + index2;

    $.ajax({
        url: queryURLindex,
        method: "GET"
    })
        .done(function (response) {

            // SHOWS WE ARE CONNECTING AND GETTING DATA BACK  //  

            //console.log(queryURLindex);
            //console.log(response);

            // DISPLAYING CURRENT WEATHER - Ux index //
            $(".todays-uv-index").html("UV Index:" + response.value);
        })
}

// DISPLAYING 5 DAY FORCAST WEATHER - date, icon image, temp, humidity //

// URL FOR 5 DAY WEATHER FORCAST API //

function fiveDay(city) {
    var queryURLfive = "https://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + city + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURLfive,
        method: "GET"
    })
        .done(function (response) {

            $(".current-5-day-forcast").html("");

            //console.log(queryURLfive);
            console.log(response);
            for (var i = 0; i < response.list.length; i++) {
                //console.log(response.list[i].dt_txt)
                if (response.list[i].dt_txt.indexOf("09:00:00") !== -1) {
                    var data = response.list[i];
                    var dayDiv = $('<div>').addClass('card');
                    var dayBody = $('<div>').addClass('card-body');
                    var dayWeather = $('<img>').attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon);
                    //console.log(dayDiv);
                    var time = $('<h5>').addClass('card-title').text(new Date(data.dt_txt).toLocaleDateString())
                    var temp = $('<p>').addClass('card-text').text("Temp: " + data.main.temp + "°");
                    var humidity = $('<p>').addClass('card-text').text("Humidity: " + data.main.humidity + "%");
                    $(dayBody).append(time, temp, humidity);
                    $(dayBody).append(dayWeather);
                    //console.log(dayBody);
                    $(dayDiv).append(dayBody);
                    $(".current-5-day-forcast").append(dayDiv);
                }
            }
        })
}

$(document).on("click", ".oldCityClass", function () {
    cityValue = $(this).attr("data-value");
    var searchTerm = cityValue;
    getCurrentWeather(searchTerm);
    fiveDay(searchTerm);
    // addToStorage(searchTerm);
})
$(".btn-search").on("click", function () {
    var searchTerm = $("#user-search").val().trim().toLowerCase();
    getCurrentWeather(searchTerm);
    fiveDay(searchTerm);
    addToStorage(searchTerm);
})

populateCityDiv();