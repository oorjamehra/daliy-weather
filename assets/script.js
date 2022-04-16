var city = [];
var card = $(".weatherCardBody");

//function to call data from openweather api
function getWeather() {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c26cbe6a679e58f6c5b8bce2459323e4";
    card.empty();
    $("#forecast").empty();
    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response){
        var myDate = moment().format("dddd, MMMM Do");
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var cityName = $("<h4>").html(city + date);
        //display city name
        weatherCardBody.prepend(cityName);
        //display icon
        weatherCardBody.append($("<img>").attr("src", iconURL));
        // converts temp to farenheit
        var temperature = Math.round((response.main.temperature - 273.15) * 1.80 + 32);
       // displays humidity levels
        var humidity = response.main.humidity;
        weatherCardBody.append($("<p>").html("Humidity: " + humidity));
        //displays windspeed
        var windSpeed = response.wind.speed;
        weatherCardBody.append($("<p>").html("Wind Speed: " + windSpeed));

        var lattitude = response.coord.lat;
        var longitude = response.coord.lon;
    })
};
//creates a click function to search
$("#citySearch").click(function() {
    city = $("#city").val();
    getData();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var cityListButton = $("<a>").attr({
            class: "list-item list-item-action",
            href: "#"
        });
        cityListButton.text(city);
        $(".list").append(cityListButton);
    };
})
