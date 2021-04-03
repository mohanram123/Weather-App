import { Component, Input, OnInit } from '@angular/core';
import {usingObserver} from '../common/request';
import {faCloudSunRain,faCloudMoon,faCloudMeatball,faCloudMoonRain,faThermometerHalf,faThermometerQuarter,faThermometerFull,faPercentage} from '@fortawesome/free-solid-svg-icons'
import { noop } from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  faCloudSunRain = faCloudSunRain;
  faCloudMoon = faCloudMoon;
  faCloudMeatball = faCloudMeatball;
  faCloudMoonRain = faCloudMoonRain;
  faThermometerHalf = faThermometerHalf;
  faThermometerQuarter = faThermometerQuarter;
  faThermometerFull = faThermometerFull;
  faPercentage=faPercentage;
  
  @Input() cityName: string;
  city = ''; 
  weather = '';
  url = ''; 
  temp = '';
  min = '';
  max = '';
  humidity = '';
  wind = '';

  constructor() { }

  ngOnInit(): void {
    this.city = this.cityName; 
    // weatherCalls(this.city)
    //   .then(res => {
    //     this.weather = res["weather"];
    //     this.url = res["url"];
    //     this.temp = res["temp"].toString();
    //     this.min = res["min"].toString();
    //     this.max = res["max"].toString();
    //     this.humidity = res["humidity"].toString();
    //     this.wind = res["wind"].toString();
    //     console.log(this.weather,this.url,this.temp,this.min,this.max,this.humidity,this.wind);
    //   })
    //   .catch(err => console.log(err))
      
      const http$ = usingObserver(this.city);

      // main weather details
      const weather$ = http$
        .pipe(
          map(res=>Object.values(res["main"]))
        );
      
      // wind speed
      const wind$ = http$
          .pipe(
            map(res=>Object.values(res["wind"]))
          );

      // image icon with description
      const icon$ = http$
            .pipe(
              map(res => Object.values(res["weather"])[0])
            )
  

      weather$.subscribe(  
        weather => {
          this.temp = (parseInt(weather[0]) - 273).toString();
          this.min = (parseInt(weather[2]) - 273).toString() ;
          this.max = (parseInt(weather[3]) - 273).toString();
          this.humidity = weather[5];
        },
        noop,
        ()=>console.log('completed')       
      );

      wind$.subscribe(
        w => {
          this.wind = w[0];
        },
        noop,
        ()=>console.log('completed wind')
      );

      icon$.subscribe(
        icons => {
         this.weather = icons.description;
         this.url = "http://openweathermap.org/img/w/" + icons.icon + ".png";
        },
        noop,
        ()=>console.log('icons done')
      );   
  }

}
