import { Component, Input, OnInit } from '@angular/core';
import { weatherCalls} from '../common/request';
import {faCloudSunRain,faCloudMoon,faCloudMeatball,faCloudMoonRain,faThermometerHalf,faThermometerQuarter,faThermometerFull,faPercentage} from '@fortawesome/free-solid-svg-icons'


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
    weatherCalls(this.city)
      .then(res => {
        this.weather = res["weather"];
        this.url = res["url"];
        this.temp = res["temp"].toString();
        this.min = res["min"].toString();
        this.max = res["max"].toString();
        this.humidity = res["humidity"].toString();
        this.wind = res["wind"].toString();
        //console.log(this.weather,this.url,this.temp,this.min,this.max,this.humidity,this.wind);
      })
      .catch(err => console.log(err))
  }

}
