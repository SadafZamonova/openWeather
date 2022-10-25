import { ForecastProps } from "../types";

const Forecasts = ({forecast,  forecastDays, params}:ForecastProps) => {


    return (
        <>
            {forecast?.list?.splice(0, 7).map((item, id) => (
                <div key={id}>
                    <li className="flex justify-between items-center" >
                        <div >{forecastDays[id]}</div>
                        <div className="flex justify-between items-center basis-4/6">
                            <div className="flex justify-start items-center" >
                                <img src={`icons/${item?.weather[0].icon}.png`} alt="weather" className="w-12" />
                                <span>{Math.round(item?.main.temp_max)}{params?.units === 'metric' ? '°C' : 'F'} /{Math.round(item?.main.temp_min)}{params?.units === 'metric' ? '°C' : 'F'}</span>
                            </div>
                            <div>{item?.weather[0]?.description}</div>
                        </div>
                    </li>
                </div>
            ))}
        </>

    )
}

export default Forecasts;