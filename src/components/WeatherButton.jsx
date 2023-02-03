import React from 'react'
import { Button } from 'react-bootstrap'

const WeatherButton = ({cities, setCity, current}) => {
  return (
    <div className='weather-button-container'>
      <Button variant="warning" onClick={current}>Current Location</Button>
      {cities.map((item, index) => (
        <Button 
          variant="warning" 
          key={index}
          onClick={() => setCity(item)}
          >
            {item}
        </Button>
      ))}

    </div>
  )
}

export default WeatherButton