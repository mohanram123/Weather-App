import {noop, Observable} from 'rxjs';

// export function weatherCalls(name:String){
//     let url = 'http://api.openweathermap.org/data/2.5/weather?q='+name+'&appid=d83af30e2eeeb0d119f157404eba0fb9'
    
//     return fetch(url)
//     .then(res => res.json())
//     .then(response => {
//         let data = response;
//         return {
//             weather: data.weather[0].description,
//             url: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
//             temp: parseInt(data.main.temp) - 273,
//             min: parseInt(data.main.temp_min) - 273,
//             max: parseInt(data.main.temp_max) - 273,
//             humidity: parseInt(data.main.humidity),
//             wind: data.wind.speed
//         }
//     })
//     .catch(err => console.log(err));  
// }

export function usingObserver(city: String){
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=d83af30e2eeeb0d119f157404eba0fb9'
    return Observable.create(observer => {
        fetch(url)
        .then(res => {
            return res.json()
        })
        .then(body => {
            observer.next(body);
            observer.complete();
        })
        .catch(err => {
            observer.error(err)
        })
})
}

