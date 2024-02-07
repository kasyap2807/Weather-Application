async function changeBodyImage() {
    // result = {
    //     "coord": {
    //       "lon": 80.8837,
    //       "lat": 17.7731
    //     },
    //     "weather": [
    //       {
    //         "id": 800,
    //         "main": "Clear",
    //         "description": "clear sky",
    //         "icon": "01n"
    //       }
    //     ],
    //     "base": "stations",
    //     "main": {
    //       "temp": 74.95,
    //       "feels_like": 75.76,
    //       "temp_min": 74.95,
    //       "temp_max": 74.95,
    //       "pressure": 1018,
    //       "humidity": 77,
    //       "sea_level": 1018,
    //       "grnd_level": 1011
    //     },
    //     "visibility": 10000,
    //     "wind": {
    //       "speed": 6.04,
    //       "deg": 167,
    //       "gust": 17.81
    //     },
    //     "clouds": {
    //       "all": 0
    //     },
    //     "dt": 1707065135,
    //     "sys": {
    //       "country": "IN",
    //       "sunrise": 1707008902,
    //       "sunset": 1707049932
    //     },
    //     "timezone": 19800,
    //     "id": 1276328,
    //     "name": "Narsapuram",
    //     "cod": 200
    //   }
    result = "";
    if (navigator.geolocation && localStorage.getItem("def")!="true") {
        navigator.geolocation.getCurrentPosition(async function(position) {
         localStorage.setItem("x",position.coords.latitude);
         localStorage.setItem("y",position.coords.longitude);
        localStorage.setItem("defcity","true");  
    });
    }
    if(localStorage.getItem("def")=="true" && localStorage.getItem("detection")==""){
        localStorage.setItem("x",localStorage.getItem("deflat"));
        localStorage.setItem("y",localStorage.getItem("deflon"));
        document.getElementById("popups").innerHTML=`Using Default Loaction ${localStorage.getItem("defcity")}`
        var popup = document.getElementById("popup");
        popup.style.display = "block";
       setTimeout(function() {
           popup.style.display = "none";
        }, 3000);
    }
    const url = `https://open-weather13.p.rapidapi.com/city/latlon/${localStorage.getItem("x")}/${localStorage.getItem("y")}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c9de2abecamsh1fd71b3e2ecc1c3p151e46jsna31375986770',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
	    const response = await fetch(url, options);
	    result =  await response.json();
        // console.log(localStorage.getItem("x"))
	    // console.log(result.weather[0].main);
        weather = result.weather[0].main;   
        
        if(localStorage.getItem("defcity")=="true"){
            let text = `Saving locaion as ${result.name}`;
            if (confirm(text) == true) {
                localStorage.setItem("defcity",result.name);
                localStorage.setItem("deflat",localStorage.getItem("x"));
                localStorage.setItem("deflon",localStorage.getItem("y"));
                localStorage.setItem("def","true");
            }   
        } 
        localStorage.setItem("city",result.name)
    } catch (error) {
        weather = "offline";
        console.log(error);
    }
    if(weather === "Clouds"){
        document.body.style.backgroundImage = 'url("./Cloudy2.jpg")';
        document.getElementById("Weather").innerHTML="Mostly Cloudy";
        document.getElementById("WeatherImage").style.backgroundImage = 'url("./Cloudpng.png")';
    }
    else if(weather === "Clear"){
        document.body.style.backgroundImage = 'url("./Sunny.jpg")';
        document.getElementById("Weather").innerHTML="Clear Sky";
        document.getElementById("WeatherImage").style.backgroundImage =  'url("./sunpng.png")';
    }
    else if(weather === "Rain"){
        document.body.style.backgroundImage = 'url("./Rain.jpg")';
        document.getElementById("Weather").innerHTML="Mostly Rainy";
        document.getElementById("WeatherImage").style.backgroundImage = 'url("./Rainpng.png")';
    }
    else{
        document.body.style.backgroundImage = 'url("./Offline2.jpg")';
        document.getElementById("Weather").innerHTML="Sorry You are Offline"
        const newButton = document.createElement('button');
        newButton.innerText = 'Show Offline data';
        newButton.setAttribute('onclick', 'offlineData()');
        newButton.setAttribute('id', 'button');
        document.getElementById("buttons").appendChild(newButton);
        document.getElementById("cont2").innerHTML="";
        document.getElementById("Footer").style.display="none";
    }
    res = (result.main);
    // console.log(res);
    if(res){
        document.getElementById("Location").innerHTML=localStorage.getItem("city");
        document.getElementById("changeloaction").innerHTML="Change in Location ?";
        if(localStorage.getItem("cel")==1){
            document.getElementById("Temps").innerHTML="🔅temperature :"+ Math.round((result.main.temp- 273.15))+"℃";
            document.getElementById("feels like").innerHTML="But feels like :"+ Math.round((result.main.feels_like- 273.15) )+"℃";
            document.getElementById("Minmax Temp").innerHTML= Math.round((result.main.feels_like-273.15))+"℃/"+ Math.round((result.main.temp_max-273.15) )+"℃";
        }
        else{
            document.getElementById("Temps").innerHTML="🔅temperature :"+((result.main.temp - 273.15) * 9/5 + 32)+"℉";
            document.getElementById("feels like").innerHTML="But feels like :"+((result.main.feels_like - 273.15) * 9/5 + 32)+"℉";
            document.getElementById("Minmax Temp").innerHTML=((result.main.temp_min - 273.15) * 9/5 + 32)+"/"+((result.main.temp_max - 273.15) * 9/5 + 32)+"℉";
        }
        document.getElementById("pressure").innerHTML=result.main.pressure;
        document.getElementById("humidity").innerHTML=result.main.humidity;
        document.getElementById("wind").innerHTML=result.wind.speed;
    }
    save(result);
}
changeBodyImage();

// Get the checkbox element by its ID
var checkbox = document.getElementById("checkbox");
if(localStorage.getItem("cel")==1){
    checkbox.checked = true; // or false if you want it to be unchecked by default

}
// Set the checkbox to be checked by default

function changeloc(){
    var popup = document.getElementById("popup2");
    popup.style.display = "block";
}


async function Detectloc(){
    navigator.geolocation.getCurrentPosition(async function(position) {
        localStorage.setItem("x",position.coords.latitude);
        localStorage.setItem("y",position.coords.longitude);
        console.log(localStorage.getItem("x"));
        localStorage.setItem("detection","true");
        await changeBodyImage();
        popup = document.getElementById("popup2");
        popup.style.display = "none";
        localStorage.setItem("detection","")

    });
}


function Enterloc(){
    popup = document.getElementById("popup2");
    popup.style.display = "none";
    popup = document.getElementById("popup3");
    popup.style.display = "block";

}

async function Submit(){
    town = document.getElementById("input").value;
    await nametolatlon(town);
    localStorage.setItem("detection","true");
    await changeBodyImage();
    popup = document.getElementById("popup3");
    popup.style.display = "none";
    localStorage.setItem("detection","")

    
}


async function nametolatlon(value){

    var test = value;
    test = test.replace(",","%2c");
    test = test.replace(" ","%20");
 const url = `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=${test}`;
const options = {
 method: 'GET',
 headers: {
     'X-RapidAPI-Key': 'c9de2abecamsh1fd71b3e2ecc1c3p151e46jsna31375986770',
     'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
 }
};

try {
 const responselat = await fetch(url, options);
 // const responselat= {"Results":[{"Relevance":0.9577,"longitude":81.692624977647,"latitude":16.433574998022,"address":"Narasapuram, West Godavari, Andhra Pradesh, 534275, India","street":"Narasapuram","city":"Narasapuram","subregion":"West Godavari","country":"India","postalcode":"534275"},{"Relevance":0.9549,"longitude":81.6992,"latitude":16.44988,"address":"Narasapuram, West Godavari, Andhra Pradesh, India","city":"Narasapuram","subregion":"West Godavari","country":"India"},{"Relevance":0.9549,"longitude":81.07651,"latitude":17.1016,"address":"Narasāpuram, West Godāvari, Andhra Pradesh, India","subregion":"West Godāvari","country":"India"},{"Relevance":0.8962,"longitude":81.52136,"latitude":16.54493,"address":"Narsapur, Annavaram, Bhimavaram, West Godavari, Andhra Pradesh, India","city":"Bhimavaram","region":"Narsapur","subregion":"West Godavari","country":"India"},{"Relevance":0.8765999999999999,"longitude":81.69845,"latitude":16.43425,"address":"Narasapuram, Godāvari, Andhra Pradesh, India","city":"Narasapur","subregion":"Godāvari","country":"India"},{"Relevance":0.8765999999999999,"longitude":81.86803,"latitude":17.53708,"address":"Narasāpuram, Godāvari, Andhra Pradesh, India","subregion":"Godāvari","country":"India"},{"Relevance":0.8765999999999999,"longitude":81.81981,"latitude":17.34333,"address":"Narasāpuram, Godāvari, Andhra Pradesh, India","subregion":"Godāvari","country":"India"},{"Relevance":0.8181999999999999,"longitude":81.10437,"latitude":16.71311,"address":"West Godāvari, Andhra Pradesh, India","city":"Ellore","subregion":"West Godāvari","country":"India"},{"Relevance":0.8181999999999999,"longitude":81.585617572,"latitude":16.747941759,"address":"West Godavari, Andhra Pradesh, India","subregion":"West Godavari","country":"India"},{"Relevance":0.8181999999999999,"longitude":81.16667,"latitude":17,"address":"West Godāvari, Andhra Pradesh, India","subregion":"West Godāvari","country":"India"},{"Relevance":0.8147,"longitude":81.68715,"latitude":16.43379,"address":"Ongc Narsapuram, Narasapuram, West Godavari, Andhra Pradesh, 534275, India","city":"Narasapuram","subregion":"West Godavari","country":"India","postalcode":"534275"}]}
 const resultlat = await responselat.json();
 localStorage.setItem("x",resultlat.Results[0].latitude);
 localStorage.setItem("y",resultlat.Results[0].longitude);

} catch (error) {
 console.error(error);
}
}

function ftoc(){
    var checkbox = document.getElementById("checkbox");

        var checkbox = document.getElementById("checkbox");
        if (checkbox.checked) {
            localStorage.setItem("cel",1)
            document.getElementById("Temps").innerHTML="🔅temperature :"+ Math.round((result.main.temp- 273.15))+"℃";
            document.getElementById("feels like").innerHTML="But feels like :"+ Math.round((result.main.feels_like- 273.15) )+"℃";
            document.getElementById("Minmax Temp").innerHTML= Math.round((result.main.feels_like-273.15))+"℃/"+ Math.round((result.main.temp_max-273.15) )+"℃";
        } else {
            // Checkbox is unchecked (false)
            localStorage.setItem("cel",0)
            document.getElementById("Temps").innerHTML="🔅temperature :"+((result.main.temp - 273.15) * 9/5 + 32)+"℉";
            document.getElementById("feels like").innerHTML="But feels like :"+((result.main.feels_like - 273.15) * 9/5 + 32)+"℉";
            document.getElementById("Minmax Temp").innerHTML=((result.main.temp_min - 273.15) * 9/5 + 32)+"/"+((result.main.temp_max - 273.15) * 9/5 + 32)+"℉";
        
        }
}


function defchange(){
    localStorage.setItem("def","false");
    changeBodyImage();
}


function offlineData(){
    window.location.href = './History.html';
}


function save(){
    if(result.main.temp!=undefined){
    let historytemp = JSON.parse(localStorage.getItem("historytemp")) || [];
        // console.log("Current Data:", historytemp);
        let newElement = result.main.temp;
        historytemp.push(newElement);
        localStorage.setItem("historytemp", JSON.stringify(historytemp));
        // console.log("Updated Data:", historytemp);
        let historyWeather = JSON.parse(localStorage.getItem("historyWeather")) || [];
        // console.log("Current Data:", historyWeather);
        newElement = result.weather[0].main;
        historyWeather.push(newElement);
        localStorage.setItem("historyWeather", JSON.stringify(historyWeather));
        // console.log("Updated Data:", historyWeather);
        let HistoryCity = JSON.parse(localStorage.getItem("HistoryCity")) || [];
        // console.log("Current Data:", HistoryCity);
        newElement = result.name;
        HistoryCity.push(newElement);
        localStorage.setItem("HistoryCity", JSON.stringify(HistoryCity));
        // console.log("Updated Data:", HistoryCity);
        var now = new Date();
        var day = now.getDate().toString().padStart(2, '0');
        var month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        var year = now.getFullYear();
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var dateTimeString = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
        let dateTime = JSON.parse(localStorage.getItem("dateTime")) || [];
        // console.log("Current Data:", dateTime);
        newElement = dateTimeString;
        dateTime.push(newElement);
        localStorage.setItem("dateTime", JSON.stringify(dateTime));
        // console.log("Updated Data:", dateTime);
    }
}

function clearhist(){
    localStorage.setItem("dateTime", JSON.stringify([]));
    localStorage.setItem("historyWeather", JSON.stringify([]));
    localStorage.setItem("historytemp", JSON.stringify([]));
    localStorage.setItem("HistoryCity", JSON.stringify([]));
    window.alert("History cleared successfully!!!")
}






