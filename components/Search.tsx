import { FC, useState, useEffect, useDebugValue, MouseEvent } from "react";
import { WeatherData } from "../types";
import dynamic from "next/dynamic";
import axios from "axios";
// import Map from './map';


let zeroTimeZone = 0;
let zeroVisibility = 0;
const Search = (initialState: any) => {
  const [names, setNames] = useState('');
  const [data, setData] = useState<WeatherData>(initialState);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${names}&units=metric&appid=30de99d12bc5906411ce85c94ebcdae0`;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(url);
  //     ss = response.data.timezone;
  //     console.log(response, ss)
  //     setData(response.data)
  //   }
  //   fetchData()
  // }, [names]);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (cds) => {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cds.coords.latitude}&lon=${cds.coords.longitude}&units=metric&appid=30de99d12bc5906411ce85c94ebcdae0`)
      zeroTimeZone = res.data.timezone;
      zeroVisibility = res.data.visibility;
      setData(res.data)
    }, (err) => {
      console.log("err", err)
    });
  }, [])

  const addNames = async (e: MouseEvent) => {
    try {
      const res = await axios.get(url);
      zeroTimeZone = res.data.timezone;
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }

    setNames((e.target as HTMLInputElement).value)
  }


  const myLocation = async () => {
    navigator.geolocation?.getCurrentPosition(async (cds) => {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cds.coords.latitude}&lon=${cds.coords.longitude}&units=metric&appid=30de99d12bc5906411ce85c94ebcdae0`)
      zeroTimeZone = res.data.timezone;
      setData(res.data)
      console.log(res.data)

    }, (err) => {
      console.log("err", err)
    });
  }

  const visibility = zeroVisibility / 1000;
  const time = new Date();
  const timeZoneApi = zeroTimeZone / 3600;
  const hour = time.getUTCHours() + timeZoneApi
  const min = time.getMinutes()
  const day = time.getDate()
  const month = time.toLocaleString('en', { month: 'long' });
  const res = `${day} ${month} ${hour}:${min} ${timeZoneApi}UTC`;


  const MapWithNoSSR = dynamic(() => import("./map"), {
    ssr: false
  });



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
              <button onClick={() => myLocation()}>геолокация</button>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 11l19-9l-9 19l-2-8l-8-2z" onClick={() => myLocation()}
              /></svg> */}
            </div>
            <span className="text-xs bg-#ececed w-40 pt-2 mr-4 ml-4">Different Weather?</span>
            <div className="flex flex-row bg-#ececed relative">
              <div id="selected" className="absolute bg-white "></div>
              <div className="text-xs flex-1 items-center justify-center  z-10 cursor-pointer pt-2">
                Metric: °C, m/s
              </div>
              <div className="text-xs flex-1 items-center justify-center w-36 pt-2 z-10 cursor-pointer">
                Imperial: °F, mph
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className=" w-900 pt-6 pb-6  px-4   ">
          <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,5fr)] gap-4">
            <div>
              <div className="text-red-600"> {res}</div>
              <div className="text-2xl font-bold pb-8">{data?.name}</div>

              <div className="flex flex-row whitespace-nowrap">
                <img></img>
                <span className="text-4xl pb-3">{Math.round(data?.main?.temp)}°C </span>
              </div>
              <div className="font-bold">Feels like {Math.round(data?.main?.feels_like)} °C. </div>
              <ul className="flex flex-wrap  mt-1 mb-0 pl-4 pr-4 w-96 ">
                <li className="flex items-center flex-nowrap mr-16">{data?.wind?.speed}m/s WNW</li>
                <li className="flex items-center flex-nowrap  mr-16">{data?.main?.pressure}hPa</li>
                <li className="flex items-center flex-nowrap  mr-16">Humidity: {data?.main?.humidity}%</li>
                <li className="flex items-center flex-nowrap  mr-16">UV:4</li>
                <li className="flex items-center flex-nowrap  mr-16">Dew point:-2°C</li>
                <li className="flex items-center flex-nowrap  mr-16">Visibility:{visibility}km</li>
              </ul>
            </div>
            <div>
              <div className="relative">
                <MapWithNoSSR />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;

