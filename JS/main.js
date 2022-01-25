const api ={
    key: "8d003ef4f030ff1c30968560fd841a96",
    url:"http://api.openweathermap.org/data/2.5/weather"
}
//variables 
const city = document.getElementById("city");
const date = document.getElementById("date");
const tempImg = document.getElementById("temp-Img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const range = document.getElementById("range");

function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = `img/rain.png`;
    if (temp > 26) {
        src = `img/sol.png`;
    } else if (temp < 20) {
        src = `img/nublado.png`;
    }
    tempImg.src = src;

}

async function search(query){
    try{
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelsius(data.main.temp);
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c `;//grados
        updateImages(data);//se carga imagen dependiendo los grados
    }catch(err) {
        console.log(err);
        alert("Error");
    }
}
//para pasar los grados 
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
//Busqueda de ciudades
function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
}
const form = document.getElementById("searchForm");
const searchbox = document.getElementById("searchbox");

form.addEventListener("submit", onSubmit, true);
