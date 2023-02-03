import { useEffect } from 'react'
import './App.css'
/*
  만들어야 할 것들
  1. 앱이 실행되자마자 현재기반의 날씨가 보인다
  2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태
  3. 5개의 버튼 => 1개는 현재위치 4개는 다른도시
  4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다
  5. 현재위치 버튼을 누르면 다시 현재위치 날씨가 나온다
  6. e데이터가 로딩되는 동안 로딩스피너가 돈다
*/

import WeatherBox from './components/WeatherBox'
import WeatherButton from './components/WeatherButton' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function App() {

  const [weather, setWeather] = useState(null)
  const cities = ['paris', 'new york', 'tokyo', 'seoul']
  const [city, setCity] = useState('')
  const [loading, setLoading] =useState(false)

  const getCurrentLocation = () => {
    // 정의하기에 번거로워서 익명함수로 정의
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      console.log('현위치', lat, lon) //위치 받아오기 성공
      getWeatherByCurrentLocation(lat, lon) //위치를 API에게 전달
    })
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=007efde420794fca61f5f7535b3352f8&units=metric`
    setLoading(true)
    let response = await fetch(url) // fetch(url)로 API 호출
    let data = await response.json()
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=007efde420794fca61f5f7535b3352f8&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
    setLoading(false)
  }


  useEffect(() => {
    if(city == '') {
      getCurrentLocation()
    } else {
      getWeatherByCity()
    }
  }, [city])

  return (
    <div>
      {loading
        ? (
            <div className='container'>
              <ClipLoader color='#f88c6b' loading={loading} size={150} />
            </div>
          )
        : (
            <div className='container'>
              <WeatherBox weather={weather} />
              <WeatherButton  cities={cities} setCity={setCity} current={getCurrentLocation} />
            </div>
          )
      }
    </div>
  )
}

export default App
