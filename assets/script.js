$(document).ready(function () {
    var searchArray = JSON.parse(localStorage.getItem('weatherCity'));
    if (searchArray !== null) {
        if (searchArray.length > 10) {
            for (var k = 0; k < 10; k++) {
                var newButton = $('<button>');
                newButton.text(searchArray[k]);
                newButton.attr('class', 'btn col-12 btn-info previous my-1');
                newButton.attr('value', searchArray[k]);
                $('#searchButtons').append(newButton);
            }
        } else {
            for (var k = 0; k < searchArray.length; k++) {
                var newButton = $('<button>');
                newButton.text(searchArray[k]);
                newButton.attr('class', 'btn col-12 btn-info previous my-1');
                newButton.attr('value', searchArray[k]);
                $('#searchButtons').append(newButton);
            }
        }
        $("button").on('click', function () {
            if ($(this).attr("value") !== null) {
                var buttonInput = $(this).attr("value");
                getWeather(buttonInput);
            }
        });
    }
});



// fetch api
var getWeather = function (city) {
    // var city = $('#city').val();
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=75fcee501c9d242a8f19bcd9b354babd';
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
    var today = moment().format("MMMM Do, YYYY");
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var wind = data.wind.speed;
    $('#currentCont').attr('class', 'col-12 h-60 border border-3 rounded currentCont')
    $('#displayCity').text(data.name + " " + today);
    $("#currentIcon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $('#displayTemp').text('Temperature: ' + temp);
    $('#displayHumidity').text('Humidity: ' + humidity);
    $('#displayWind').text('Wind Speed: ' + wind);
    uvIndex(data.coord.lat, data.coord.lon);
};

// fetch uvindex

var uvIndex = function (lat, lon) {
    var getUV = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=75fcee501c9d242a8f19bcd9b354babd';
    var uvEl = $('#displayUV');
    fetch(getUV)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var dataInt = data.value;
                    var uvDisp = $('<div>');
                    if (data.value < 2.1) {
                        uvDisp.attr('class', ' success p-0');
                        uvDisp.css('background-color', 'green')
                    } else if (data.value < 5.5) {
                        uvDisp.attr('class', ' warning p-0');
                        uvDisp.css('background-color', 'yellow')
                        uvDisp.css('color', 'black')
                    } else {
                        uvDisp.attr('class', ' danger p-0');
                        uvDisp.css('background-color', 'red')
                    };
                    uvDisp.text(data.value);
                    uvDisp.attr('id', "uvDisplay");
                    uvEl.empty();
                    $('#displayUV').append(`<div class='mr-1'>UV Index: </div>`);
                    $('#displayUV').append(uvDisp);

                });
            }
        });
};

// fetching 5 day forecast

var fiveDay = function (city) {
    var fiveForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=75fcee501c9d242a8f19bcd9b354babd';
    fetch(fiveForecast)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayFiveDay(data);
                    $('#5dayMain').attr('class', 'col-12 h-80 mt-4 p-3 border border-dark rounded border-3 fiveDayBG')
                });
            }
        })
        .catch(function (error) { }
        );

};

// display 5 day forecast
// put this in a for loop
var displayFiveDay = function (data) {
    console.log(data.list);
    var day1 = moment().hour(12).minute(0).second(0).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day2 = moment().hour(12).minute(0).second(0).add(2, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day3 = moment().hour(12).minute(0).second(0).add(3, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day4 = moment().hour(12).minute(0).second(0).add(4, 'd').format('YYYY-MM-DD HH:mm:ss');
    var day5 = moment().hour(12).minute(0).second(0).add(5, 'd').format('YYYY-MM-DD HH:mm:ss');
    $('#5day').text("5-Day Forecast:");
    for (var i = 0; i < 40; i++) {
        if (data.list[i].dt_txt === day1) {
            $('#date1').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#date1').parent().attr('class', 'col-12 forecast m-1 border border-2 rounded');
            $('#icon1').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp1').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity1').text('Humidity: ' + data.list[i].main.humidity);

        }
        if (data.list[i].dt_txt === day2) {
            $('#date2').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#date2').parent().attr('class', 'col-12 forecast m-1 border border-2 rounded'); $('#icon2').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp2').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity2').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day3) {
            $('#date3').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#date3').parent().attr('class', 'col-12 forecast m-1 border border-2 rounded'); $('#icon3').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp3').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity3').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day4) {
            $('#date4').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#date4').parent().attr('class', 'col-12 forecast m-1 border border-2 rounded'); $('#icon4').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp4').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity4').text('Humidity: ' + data.list[i].main.humidity);
        }
        if (data.list[i].dt_txt === day5) {
            $('#date5').text(moment(data.list[i].dt_txt, "YYYY-MM-DD HH:mm:ss").format("MMM Do, hhA"));
            $('#date5').parent().attr('class', 'col-12 forecast m-1 border border-2 rounded'); $('#icon5').html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $('#temp5').text('Temperature: ' + data.list[i].main.temp);
            $('#humidity5').text('Humidity: ' + data.list[i].main.humidity);
        }
    }
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
                getWeather(city);
            } else {
                cityLocal.unshift($('#city').val());
                localStorage.setItem('weatherCity', JSON.stringify(cityLocal));
                var newButton = $('<button>');
                newButton.text($('#city').val());
                newButton.attr('class', 'btn col-12 btn-info previous m-1');
                newButton.attr('value', $('#city').val());
                $('#searchButtons').prepend(newButton);
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

$('#searchBtn').on('keyup', event => {
    event.preventDefault();
    if (event.key === 13) {
        $('#searchBtn').click();

    }
})