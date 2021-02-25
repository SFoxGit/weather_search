console.log("test js");

$(document).ready(function () {
    var searchArray = JSON.parse(localStorage.getItem('weatherCity'));
    console.log(searchArray.length);
    if (searchArray !== null) {
        var searchButtons = $('#searchButtons');
        console.log(searchArray.length);
        if (searchArray.length > 8) {
            console.log('test buttons2');
            for (var k = 0; k < 8; k++) {
                var newButton = $('<button>');
                newButton.text(searchArray[k]);
                newButton.attr('class', 'btn col-12 previous');
                newButton.attr('value', searchArray[k]);
                $('#searchButtons').append(newButton);
            }
        } else {
            for (var k = 0; k < searchArray.length; k++) {
                console.log(searchArray[k]);
                var newButton = $('<button>');
                newButton.text(searchArray[k]);
                newButton.attr('class', 'btn col-12 btn-info previous');
                $('#searchButtons').append(newButton);
            }
        }
        $("button").on('click', function () {
            if ($(this).attr("value") !== null) {
                var buttonInput = $(this).attr("value");
                console.log('testnewbutton');
                getWeather(buttonInput);
            }
        });
    }
});



// fetch api
var getWeather = function (city) {
    // var city = $('#city').val();
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
};


// append data to html
var displayCurrent = function (data, city) {
    console.log(data);
    var today = moment().format("MMMM Do, YYYY");
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    $('#displayCity').text(data.name + " " + today);
    $("#currentIcon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $('#displayTemp').text('Temperature: ' + temp);
    $('#displayHumidity').text('Humidity: ' + humidity);
    $('#displayWind').text('Wind Speed: ' + wind);
    uvIndex(data.coord.lat, data.coord.lon);
};

// fetch uvindex

var uvIndex = function (lat, lon) {
    var getUV = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=75fcee501c9d242a8f19bcd9b354babd';
    var uvEl = $('#displayUV');
    fetch(getUV)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var dataInt = data.value;
                    var uvDisp = $('<div>');
                    if (data.value < 2.1) {
                        uvDisp.attr('class', 'col-12 success p-0');
                        uvDisp.css('background-color', 'green')
                    } else if (data.value < 5.5) {
                        uvDisp.attr('class', 'col-12 warning p-0');
                        uvDisp.css('background-color', 'yellow')
                    } else {
                        uvDisp.attr('class', 'col-12 danger p-0');
                        uvDisp.css('background-color', 'red')
                    };
                    uvDisp.text('UV Index: ' + data.value);
                    uvDisp.attr('id', "uvDisplay");
                    uvEl.empty();
                        $('#displayUV').append(uvDisp);
                   
                });
            }
        });
};

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

};

// display 5 day forecast
// put this in a for loop
var displayFiveDay = function (data) {
    var day1 = moment().hour(12).minute(0).second(0).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day2 = moment().hour(12).minute(0).second(0).add(2, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day3 = moment().hour(12).minute(0).second(0).add(3, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day4 = moment().hour(12).minute(0).second(0).add(4, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day5 = moment().hour(12).minute(0).second(0).add(5, 'd').format('YYYY-MM-DD HH:mm:ss');
    $('#5day').text("5-Day Forecast:");
    for (var i = 0; i < 40; i++) {
        if (data.list[i].dt_txt === day1) {
            $('#date1').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#icon1').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp1').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity1').text('Humidity: ' + data.list[i].main.humidity);

        }
        if (data.list[i].dt_txt === day2) {
            $('#date2').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#icon2').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp2').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity2').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day3) {
            $('#date3').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#icon3').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp3').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity3').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day4) {
            $('#date4').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#icon4').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp4').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity4').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day5) {
            $('#date5').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#icon5').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp5').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity5').text('Humidity: ' + data.list[i].main.humidity);
        }
    }
    console.log(day1);
};

// save search to local


// button function for search
// add upperCase validation later
$('#searchBtn').on('click', function () {
    var city = $('#city').val();
    if ($('#city').val() !== "") {
        if (localStorage.getItem('weatherCity') !== null) {
            var cityLocal = JSON.parse(localStorage.getItem('weatherCity'));
            if (cityLocal.includes($('#city').val())) {
                getWeather();
            } else {
                cityLocal.unshift($('#city').val());
                localStorage.setItem('weatherCity', JSON.stringify(cityLocal));
            }
        } else {
            var cityLocal = [];
            cityLocal.push($('#city').val());
            localStorage.setItem('weatherCity', JSON.stringify(cityLocal));
        }
        getWeather(city);
    }
});
// button function for generated cities
// had to move inside function
