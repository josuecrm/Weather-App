
const CurrentWeather = ( {data} ) => {
    return (
        <div className="currentWeather">
            <div>
                <p className="name"> {data?.name} </p>
                <p className="name"> {data?.sys?.country} </p>

            </div>

            <div>
                <img src={ `http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`} alt="icon"/>
            </div>
            <div>
                <p className="other-info"> <i className="fa-solid fa-wind"></i> Wind: { data?.wind?.speed } M/S  </p>
                <p className="other-info"> <i className="fa-solid fa-droplet"></i> Humidity: { data?.main?.humidity } %  </p>
            </div>
        </div>
    );
};

export default CurrentWeather;