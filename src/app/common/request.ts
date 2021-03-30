export function weatherCalls(name:String){
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+name+'&appid=d83af30e2eeeb0d119f157404eba0fb9'
    return fetch(url)
    .then(res => res.json())
    .then(response => {
        let data = response;
        return {
            weather: data.weather[0].description,
            url: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
            temp: parseInt(data.main.temp) - 273,
            min: parseInt(data.main.temp_min) - 273,
            max: parseInt(data.main.temp_max) - 273,
            humidity: parseInt(data.main.humidity),
            wind: data.wind.speed
        }
    })
    .catch(err => console.log(err));  
}

export function setData(d1:String,t1:String,tmin:String,tmax:String,hum:String,wind:String){
    return [d1,t1,tmin,tmax,hum,wind];
}