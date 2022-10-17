import { useRouter } from 'next/router'
import { useState, useEffect, useRef, MouseEvent, } from 'react';
import dynamic from "next/dynamic";
import weatherApi from '../axios';
import { WeatherData, Forecast, Hourly } from '../types';
import { appId } from '../appId/appId';
import { Map } from "leaflet";
import MyLocation from '../components/myLocation';
import Degree from '../components/changeDegree';
import Charts from '../components/chart';
import Forecasts from '../components/forecast';

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false
});
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export default function Page(initialState: any) {
  const router = useRouter()
  const id = router.query.id as string;
  const [data, setData] = useState<WeatherData>(initialState);
  const [names, setNames] = useState('');
  const [forecast, setForecast] = useState<Forecast>(initialState)
  const [hourly, setHourly] = useState<Hourly>(initialState)
  const [mapPosition, setMapPosition] = useState<{ lat: number, lng: number }>({
    lat: 0,
    lng: 0
  });
  const mapRef = useRef<Map | null>(null);
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  const weather = data?.weather?.length ? data.weather[0] : null;


  useEffect(() => {
    const getData = async () => {
      const res = await weatherApi.get('/weather', {
        params: {
          id, appId,
          units: 'metric',
        }
      })
      const resp = await weatherApi.get('/forecast?', {
        params: {
          id, appId,
          units: 'metric',
        }
      })
      const reshour = await weatherApi.get('forecast?', {
        params: {
          id, appId,
          units: 'metric',
          exclude: 'hourly'
        }
      })
      console.log(res)
      setData(res.data)
      setForecast(resp.data)
      setHourly(reshour.data)
    }
    if (id) {
      getData()
    }
  }, [id])

  const addNames = async (e: MouseEvent) => {
    try {
      const res = await weatherApi.get('/weather', {
        params: {
          q: names,
          units: 'metric',
          appid: appId,
        },
      })
      const response = await weatherApi.get('/forecast?', {
        params: {
          q: names,
          units: 'metric',
          appid: appId,
        },
      })
      const reshour = await weatherApi.get('/forecast?', {
        params: {
          q: names,
          units: 'metric',
          appid: appId,
          exclude: 'hourly'
        },
      }
      )
      setData(res.data)
      setForecast(response.data)
      setHourly(reshour.data)
      setMapPosition({ lat: res.data.coord.lat, lng: res.data.coord.lon })
      mapRef.current?.flyTo({
        lat: res.data.coord.lat,
        lng: res.data.coord.lon
      })
    } catch (error) {
      console.log(error)
    }
    setNames((e.target as HTMLInputElement).value)
  }



  return (
    <div>
      <div className="  h-full px-4 pt-5  w-full pb-5 bg-searchbg flex justify-center" >
        <div className="  h-full px-4 pt-5  pb-5  w-900 flex justify-center">
          <div className=" h-full w-full ">
            <div className="input-group relative flex items-stretch w-full ">
              <input
                type="search"
                className="form-control relative flex-auto w-full min-w-0 block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search city"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={(e) => setNames(e.target.value)}
                value={names}
              />
              <button className="bg-black text-searchbg rounded-r-md w-20" onClick={(e) => addNames(e)} >Search</button>

            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className=" flex items-center justify-center cursor-pointer ml-24 p-2 bg-#ececed">
              <MyLocation names={names} setMapPosition={setMapPosition} setData={setData} setForecast={setForecast} mapRef={mapRef} setHourly={setHourly} />
            </div>
            <span className="text-xs bg-#ececed w-40 pt-2 mr-4 pl-6 ml-4">Different Weather?</span>
            <div className="flex flex-row bg-#ececed relative">
              <div id="selected" className="absolute bg-white "></div>
              <Degree names={names} mapPosition={mapPosition} setData={setData} setForecast={setForecast} setHourly={setHourly} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className=" w-900 pt-6 pb-6  px-4   ">
          <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,5fr)] gap-4">
            <div>
              {/* <div className="text-red-600"> {res}</div> */}
              <div className="text-2xl font-bold pb-8">{data?.name}</div>
              <div className="flex flex-row whitespace-nowrap">
                {weather ? <img className="w-12" src={`icons/${data?.weather[0].icon}.png`}></img> : null}
                <span className="text-4xl pb-3">{Math.round(data?.main?.temp)}°C </span>
              </div>
              <div className="font-bold flex ">Feels like {Math.round(data?.main?.feels_like)} °C. {weather ? <div className="font-normal"> {weather.description}  </div> : null} </div>

              <ul className="flex flex-wrap  mt-1 mb-0 pl-4 pr-4 w-96 ">
                <li className="flex items-center flex-nowrap mr-16">{data?.wind?.speed}m/s WNW</li>
                <li className="flex items-center flex-nowrap  mr-16">{data?.main?.pressure}hPa</li>
                <li className="flex items-center flex-nowrap  mr-16">Humidity: {data?.main?.humidity}%</li>
                <li className="flex items-center flex-nowrap  mr-16">UV:4</li>
                <li className="flex items-center flex-nowrap  mr-16">Dew point:-2°C</li>
                {/* <li className="flex items-center flex-nowrap  mr-16">Visibility:{visibility}km</li> */}
              </ul>
            </div>
            <div>
              <div className="relative">
                <MapWithNoSSR mapRef={mapRef} position={mapPosition} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,4fr)] gap-4 mt-4">
            <div>
              <div className='text-xl font-bold'>Hourly forecast</div>
              <Charts hourly={hourly} />
            </div>
            <div>
              <div className='text-xl font-bold'>8-day forecast</div>
              <ul>
                <Forecasts forecast={forecast} forecastDays={forecastDays} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}