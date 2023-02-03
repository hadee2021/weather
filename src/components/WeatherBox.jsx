import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{Math.ceil(weather?.main.temp)}˚c</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox