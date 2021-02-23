# weather_search
Using Open Weather API, to create a search and display of weather by city.

---
## Author

Shawn Fox


| [GitHub](https://github.com/SFoxGit) | [Email](sfoxss4@gmail.com) |

---
## Project Links:

- Deployed site: [GitHub Pages](https://sfoxgit.github.io/weather_search/)
- GitHub: [SFoxGit](https://github.com/SFoxGit/weather_search)

---
## Table of Contents

- [Description](##Description)

- [Requirements](##Requirements)

- [Progress](##Progress)

- [Contributions](##Contributing)

- [Credits](##Credits)

---
## Description

    AS A traveler
    I WANT to see the weather outlook for multiple cities
    SO THAT I can plan a trip accordingly


---
## Requirements

    GIVEN a weather dashboard with form inputs
    WHEN I search for a city
    THEN I am presented with current and future conditions for that city and that city is added to the search history
    WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    WHEN I view the UV index
    THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city


---
### Must include:

Uses the OpenWeather API to retrieve weather data.


Uses localStorage to store persistent data.
    
---
## Progress
    
Step One:

*Instructions and outline*

    Html, css, javascript. 
    I'm going to use bootstrap for the html, and jquery for the javascript. 
    Form input for city name, that is variabled into the query string for the fetch api, and is also stored to local storage with a button dynamically created. 
    Display data from api in the html.
    Icon representation of weather which is in open weather (need to research)
    If statement for background of UV index.
    5 day forcast cards.

![outline](assets/images/outlineWeatherSearch.jpg)

    Above is the provided example site image, broken down into sections to make my bootstrap easier. It's color coded so each step down within the container is the same.

---
## Contributing


---
## Credits

[Open Weather](https://openweathermap.org/)
