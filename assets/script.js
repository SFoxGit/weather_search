console.log("test js")


// fetch api
var getWeather = function () {
    var city = $('#city').val();
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=75fcee501c9d242a8f19bcd9b354babd';
    console.log(currentWeather);
    fetch(currentWeather)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCurrent(data, city);
                    fiveDay(city);
                });
            } 
        })
        .catch(function (error) { }
        );
}


// append data to html
var displayCurrent = function (data, city) {
    console.log(data);
    var today = moment().format("MMMM Do, YYYY");
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    $('#displayCity').text(city);
    $('#displayDate').text(today);
    $('#displayTemp').text('Temperature: ' + temp);
    $('#displayHumidity').text('Humidity: ' + humidity);
    $('#displayWind').text('Wind Speed: ' + wind);
    uvIndex(data.coord.lat, data.coord.lon)
};

// fetch uvindex

var uvIndex = function (lat, lon) {
    var getUV = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=75fcee501c9d242a8f19bcd9b354babd'
    fetch(getUV)
        .then(function(response){
            if (response.ok) {
                response.json().then(function (data){
                    $('#displayUV').text('UV Index: ' + data.value)
                })
            }
        })
}

// fetching 5 day forecast

var fiveDay = function (city) {
    var fiveForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=75fcee501c9d242a8f19bcd9b354babd';
    console.log(fiveForecast);
    fetch(fiveForecast)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayFiveDay(data);
                });
            } 
        })
        .catch(function (error) { }
        );

}

// display 5 day forecast

var displayFiveDay = function(data) {
    var day1 = moment().hour(12).minute(0).second(0).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day2 = moment().hour(12).minute(0).second(0).add(2, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day3 = moment().hour(12).minute(0).second(0).add(3, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day4 = moment().hour(12).minute(0).second(0).add(4, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day5 = moment().hour(12).minute(0).second(0).add(5, 'd').format('YYYY-MM-DD HH:mm:ss');
    
    for (var i = 0; i < 40; i++) {
        if (data.list[i].dt_txt === day1) {
            $('#day1').text(data.list[i].main.temp);
        }
        if (data.list[i].dt_txt === day2) {
            $('#day2').text(data.list[i].main.temp);
        }
        if (data.list[i].dt_txt === day3) {
            $('#day3').text(data.list[i].main.temp);
        }
        if (data.list[i].dt_txt === day4) {
            $('#day4').text(data.list[i].main.temp);
        }
        if (data.list[i].dt_txt === day5) {
            $('#day5').text(data.list[i].main.temp);
        }
    }
    // var day1 = data.indexOf();
    console.log(day1)
}

// save search to local


// button function for search
$('#searchBtn').on('click', function() {
    getWeather();
})
// button function for generated cities
