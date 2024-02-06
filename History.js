let historytemp = JSON.parse(localStorage.getItem("historytemp")) || [];
// console.log(historytemp);
let historyWeather = JSON.parse(localStorage.getItem("historyWeather")) || [];
// console.log("Current Data:", historyWeather);
let HistoryCity = JSON.parse(localStorage.getItem("HistoryCity")) || [];
// console.log("Current Data:", HistoryCity);
let dateTime = JSON.parse(localStorage.getItem("dateTime")) || [];
// console.log("Current Data:", dateTime);


// Create a new <div> element

// Iterate over historyCity array and create <h1> elements
for (let i = HistoryCity.length; i >= 0; i--) {
    if(HistoryCity[i]!=undefined){
    let newDataDiv = document.createElement("div");
    newDataDiv.setAttribute('id', 'cont');
    let cityHeading = document.createElement("h1");
    cityHeading.textContent = "History City: " + HistoryCity[i];
    newDataDiv.appendChild(cityHeading);
    let tempHeading = document.createElement("h2");
    tempHeading.textContent = "History Temperature: " + historytemp[i];
    newDataDiv.appendChild(tempHeading);
    let weatherHeading = document.createElement("h2");
    weatherHeading.textContent = "History Weather: " + historyWeather[i];
    newDataDiv.appendChild(weatherHeading);
    let timeHeading = document.createElement("h3");
    timeHeading.textContent = "Date and Time: " + dateTime[i];
    newDataDiv.appendChild(timeHeading);
    document.getElementById("History").appendChild(newDataDiv);
}
}



