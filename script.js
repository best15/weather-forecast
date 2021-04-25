var cityname = document.querySelector("#cityname");
var temp = document.querySelector("#temp");
var windspeed = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uv_index = document.querySelector("#uv");
var fiveday_forecast = document.querySelector("#fiveday_forecast");
var search_city = document.querySelector("#searchcity");
var searchBtn = document.querySelector("#searchBtn");
var recentdiv = document.querySelector("#recentsearch");

var searchedlocation = new Array();

let place = "Perth";
let appid = "d168d3a7571fda5f948e93fcef34e556";


let date = moment().format("M/D/Y");



getweather(place);

if (JSON.parse(localStorage.getItem("recentsearch")) != null)
{
  searchedlocation = JSON.parse(localStorage.getItem("recentsearch"));
  
  for (let i = searchedlocation.length; i > 0 ; i--)
  {
  var recent = document.createElement("button");
    recent.setAttribute("class", "btn btn-secondary  col-12 mb-3")
    recentdiv.append(recent);
    recent.innerHTML = searchedlocation[i-1];
  }
}

searchBtn.addEventListener("click" , weatherforecast);

function weatherforecast(event) {

  var address = search_city.value;

  getweather(address);

  var check = searchedlocation.includes(address) ;

  if (address!= null && !check){

    if(searchedlocation.length == 8){
      searchedlocation =  searchedlocation.slice(1);
 
    }
    searchedlocation.push(address);
    localStorage.setItem("recentsearch", JSON.stringify(searchedlocation));
  }

  searchedlocation = JSON.parse(localStorage.getItem("recentsearch"));
  recentdiv.innerHTML = '';
  
  for (let i = searchedlocation.length; i > 0 ; i--)
  { 
  
    var  recent = document.createElement("button");
    recent.setAttribute("class", "btn btn-secondary  col-12 mb-3")
    recent.innerHTML = searchedlocation[i-1];
    recentdiv.append(recent);
    
  }

}



function getweather(place) {
  
  fiveday_forecast.innerHTML = '';
 

  let longlatUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${appid}`;

  fetch(longlatUrl)
  .then(function (response) {
   
    if(response.status != 200){
     alert("Incorrect City Name");
     return "Incorrect";
    }
    else{
    return response.json();
  }
  })
  .then(function (data) {

  if(data!="Incorrect")
  {     
  let  latitude =  data.coord.lat;
  let  longitude = data.coord.lon;
  let  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=imperial&appid=${appid}`;
  
   fetch(url)
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {
 
     cityname.innerHTML = data.timezone + ' (' + date + ') ';
     temp.innerHTML = "Temp: " + data.current.temp + "°F";
     windspeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
     humidity.innerHTML = "Humidity: " + data.current.humidity + "%";
     uv_index.innerHTML = "UV Index: " + data.current.uvi;
     
    
     for (let i=0; i<data.daily.length-3; i++)
     {
     
     var days = document.createElement("div");
     days.setAttribute("class", "card col-sm-10 col-md-5 col-lg-2  mr-3 mb-2 ");
     fiveday_forecast.append(days);  
 
     
     var next_day = document.createElement("h5");
     next_day.setAttribute("class", "text-white mb-3 mt-2");
     next_day.innerHTML = moment(date).add(i+1, 'd').format("M/D/Y")
    
 
     var temperature = document.createElement("h5");
     temperature.setAttribute("class", "text-white mb-3");
     temperature.innerHTML = "Temp: " + data.daily[i].temp.day + "°F";
 
     var wind = document.createElement("h5");
     wind.setAttribute("class", "text-white  mb-3");
     wind.innerHTML = "Wind: " + data.daily[i].wind_speed  + " MPH";
 
     var humid = document.createElement("h5");
     humid.setAttribute("class", "text-white  mb-3");
     humid.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
 
 
     days.append(next_day,temperature,wind,humid);
 
     }
 
 
   });  

  }
  });



}
  

