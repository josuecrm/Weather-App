import axios from "axios";
import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import Loader from "./Loader";


function CardWeather() {

    const [ weather, setWeather] = useState ( null )

    const [ isKelvin, setIsKelvin ] = useState( true )
    const [ isCelsius, setIsCelsius ] = useState( false )
    const [ isFahrenheit, setIsFahrenheit ] = useState (false)

    useEffect ( () => {
        function success(pos) {
            var crd = pos.coords;
    
            axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1a97d551a7cd56b142fc8c1a7e1c3495`)
                .then ( res => setWeather(res.data) )
        };
          
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };
          
          navigator.geolocation.getCurrentPosition(success, error);

    }, [])

    let temperature = weather?.main?.temp

    const toKelvin = (e) => {
        setIsKelvin( true )
        setIsCelsius( false )
        setIsFahrenheit( false )
    }
    
    const toCelsius = (e) => {
        setIsKelvin( false )
        setIsCelsius( true )
        setIsFahrenheit( false )
        
    }
    
    const toFahrenheit = (e) => {
        setIsKelvin( false )
        setIsCelsius( false )
        setIsFahrenheit( true )
    }


    return (
        <div className="container">

            { weather === null ? (
                <Loader />) : (
                
                <div className="cardWeather">
                    <p className="temp"> <i className="fa-solid fa-temperature-full"></i>
                        {
                            isCelsius ? (
                                `${(temperature-273.15).toFixed(1)}°`
                            ) : (
                                isFahrenheit ? (
                                    `${((temperature*1.8)-459.67).toFixed(1)}°`
                                )
                                    : `${temperature}°`
                            )      
                        }
                    </p>
                
                    <div>
                        <button onClick={toKelvin} className={`button  ${isKelvin ? 'active' : null}`}>  K°  </button>
                        <button onClick={toCelsius} className={`button  ${isCelsius ? 'active' : null}`}>  C°  </button>
                        <button onClick={toFahrenheit} className={`button  ${isFahrenheit ? 'active' : null}`}>  F°  </button>
                    </div>

                    <CurrentWeather data={weather}/>
                 </div>
            )}
        </div>
    
    );
}

export default CardWeather;