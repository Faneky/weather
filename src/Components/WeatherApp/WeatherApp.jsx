import {React, useState, useEffect} from "react";
import './WeatherApp.css';

import search_icon from '../Assets/search_icon.svg';
import clear from '../Assets/clear.svg';
import cloud from '../Assets/cloudy.svg';
import drizzly from '../Assets/drizzly.svg';
import humidity from '../Assets/humidity.png';
import rain from '../Assets/rain.svg';
import snow from '../Assets/snow.svg';
import wind from '../Assets/wind.png';
import moon from '../Assets/moon.svg';
import tempmax from '../Assets/temp_max.png'
import tempmin from '../Assets/temp_min.png'

const translations = {
   ru: {
   languageButton: 'RU',
   placeholder: 'Поиск',
   humidity: 'Влажность',
   windSpeed: 'Скорость ветра',
   alert: 'Город(Старана) не найден(а)',
   mintemp: 'Мин.',
   maxtemp: 'Макс.'
   },
   ro: {
   languageButton: 'RO',
   placeholder: 'Căutare',
   humidity: 'Umiditate',
   windSpeed: 'Viteză vânt',
   alert: 'Orașul (Țara) nu a fost găsit(ă)',
   mintemp: 'Min',
   maxtemp: 'Max'
   },
   en: {
   languageButton: 'EN',
   placeholder: 'Search',
   humidity: 'Humidity',
   windSpeed: 'Wind Speed',
   alert: 'City (Country) not found',
   mintemp: 'Min',
   maxtemp: 'Max'
   },
};

const WeatherApp = () => {

   let api_key ='cd0dbcc1cba34de4d64e7f3bdd90310a';

   const [wicon, setWicon] = useState()
   const [lang, setLang] = useState('ru')
   const [city, setCity] = useState('Moldova')

   const changeLang = () => {
      if(lang === 'ru') {
         setLang('ro');
      } else if (lang === 'ro') {
         setLang('en');
      } else {
         setLang('ru');
      }
      search()
   }

   useEffect(() => {
      search();
   }, [])
   
   const handlePress = (event) => {
      if(event.key === 'Enter') {
         search();
      }
   }

   const search = async () => {
      if(city === ''){
         return 0;
      }

      
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&lang=${lang}&appid=${api_key}`

      //В случае ошибки выходит alert
      let resposnse = await fetch(url);
      if (resposnse.status !== 200){
         alert(translations[lang].alert)
         return
      }
      let data = await resposnse.json();


      const humidity = document.getElementsByClassName('humidity-percent')
      const wind = document.getElementsByClassName('wind-rate')
      const temperature = document.getElementsByClassName('weather-temp')
      const location = document.getElementsByClassName('weather-location')

      const mintemp = document.getElementsByClassName('weather-mintemp')
      const maxtemp = document.getElementsByClassName('weather-maxtemp')

      setCity(data.name)
      
      //Берем показатели с api базы
      humidity[0].innerHTML = data.main.humidity + ' %';
      wind[0].innerHTML = Math.round(data.wind.speed) + ' km';
      temperature[0].innerHTML = Math.round(data.main.temp) + '℃';
      location[0].innerHTML = data.name;

      mintemp[0].innerHTML = Math.round(data.main.temp_min) + ' ℃'
      maxtemp[0].innerHTML = Math.round(data.main.temp_max) + ' ℃'

      function addDay(){
         document.body.classList.add('day')
         document.body.classList.remove('night')
      }

      function addNight(){
         document.body.classList.add('night')
         document.body.classList.remove('day')
      }

      //Изменение картинки 
      if(data.weather[0].icon === '01d'){
         setWicon(clear);
         addDay()
      } else if (data.weather[0].icon === '01n') {
         addNight()
         setWicon(moon);
      } else if (data.weather[0].icon === '02d') {
         setWicon(cloud);
         addDay()
      } else if (data.weather[0].icon === '02n') {
         setWicon(cloud);
         addNight()
      }  else if (data.weather[0].icon === '03d') {
         setWicon(drizzly);
         addDay()
      } else if (data.weather[0].icon === '03n') {
         setWicon(drizzly);
         addNight()
      } else if (data.weather[0].icon === '04d') {
         setWicon(drizzly);
         addDay()
      } else if (data.weather[0].icon === '04n') {
         setWicon(drizzly);
         addNight()
      } else if (data.weather[0].icon === '09d') {
         setWicon(rain);
         addDay()
      } else if (data.weather[0].icon === '09n') {
         setWicon(rain);
         addNight()
      } else if (data.weather[0].icon === '10d') {
         setWicon(rain);
         addDay()
      } else if (data.weather[0].icon === '10n') {
         setWicon(rain);
         addNight()
      } else if (data.weather[0].icon === '13d') {
         setWicon(snow);
         addDay()
      } else if (data.weather[0].icon === '13n') {
         setWicon(snow);
         addNight();
      }
       else {
         setWicon(clear)
      }
   }


   return (
      <div className='time'>
         <div className="container">
            <div className="top-bar">
            <div className="language-button">
               <button onClick={changeLang} className="lang-btn">{lang}
               </button>
               </div>
               <input type="text" className="cityInput" placeholder={translations[lang].placeholder}   onChange={(e) => setCity(e.target.value)} value={city} onKeyPress={handlePress}/>
               <div className="search-icon">
                  <img onClick={()=> {search()}} className="search-img" src={search_icon} alt="" />
               </div>
            </div>
            <div className="weather-image">
               <img className="weather-img" src={wicon} alt="" />
            </div>
            <div className="weather-temp"></div>
            <div className="weather-location"></div>
            <div className="data-container data-container-temp">
               <div className="element elem-temp">
               <img src={tempmin} alt="" className="icon" />
                  <div className="data data-temp">
                     <div className="weather-mintemp"></div>
                     <div className="text">{translations[lang].mintemp}</div>
                  </div>
               </div>
               <div className="element elem-temp">
               <img src={tempmax} alt="" className="icon arrow-up" />
                  <div className="data data-temp max-temp">
                     <div className="weather-maxtemp"></div>
                     <div className="text">{translations[lang].maxtemp}</div>
                  </div>
               </div>
            </div>
            <div className="data-container">
               <div className="element">
                  <img src={humidity} alt="" className="icon" />
                  <div className="data">
                     <div className="humidity-percent"></div>
                     <div className="text">{translations[lang].humidity}</div>
                  </div>
               </div>
               <div className="element">
                  <img src={wind} alt="" className="icon" />
                  <div className="data">
                     <div className="wind-rate"></div>
                     <div className="text">{translations[lang].windSpeed}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default WeatherApp