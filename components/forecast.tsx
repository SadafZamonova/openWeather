import { ForecastProps } from "../types";

const Forecasts = ({forecast, forecastDays}:ForecastProps) => {


    return (
        <>
            {forecast?.list?.splice(0, 7).map((item, id) => (
                <>
                    <li className="flex justify-between items-center">
                        <div key={id}>{forecastDays[id]}</div>
                        <div className="flex justify-between items-center basis-4/6">
                            <div className="flex justify-start items-center" >
                                <img src={`icons/${item.weather[0].icon}.png`} alt="weather" className="w-12" />
                                <span>{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</span>
                            </div>
                            <div>{item.weather[0].description}</div>
                        </div>
                    </li>
                </>
            ))}
        </>

    )
}

export default Forecasts;