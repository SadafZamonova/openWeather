
import { useEffect, useState } from "react";

interface weatherData {
    base: string
    clouds: {all: number}
    cod:number
    coord: {lon: -0.1257, lat: 51.5085}
    dt:1662983100
    id:2643743
    main:{temp: 297.36, feels_like: 297.46, temp_min: 295.85, temp_max: 298.99, pressure: 1011, …}
    name:"London"
    sys:{type: 2, id: 2075535, country: 'GB', sunrise: 1662960626, sunset: 1663007014}
    timezone:3600
    visibility:10000
    weather:[{…}]
    wind:{speed: 3.09, deg: 210}
}

const Search = ({ }) => {
const [data, setData] = useState();

useEffect (() => {
  const fetchData = async () =>  {
const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=30de99d12bc5906411ce85c94ebcdae0")
const data: weatherData = await res.json();

setData(data)
console.log(data)
  }
  fetchData()
}, [])




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
          // onChange={filterInfoChange}
        />
        <button className="bg-black text-searchbg rounded-r-md w-20">Search</button>
      </div>  
    </div>
    <div className="flex flex-row justify-end">
    <div className=" flex items-center justify-center cursor-pointer ml-24 p-2 bg-#ececed">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 11l19-9l-9 19l-2-8l-8-2z"/></svg>
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
        {(data) !== undefined ?
        // <div key={id} className="text-red-600"> Sep 9, 10:31am</div>
      <div id={`${data.id}`} className="text-2xl font-bold pb-8">{data.name}</div>
      : ''}
      
      <div className="flex flex-row whitespace-nowrap"> 
        <img></img>
        <span className="text-4xl pb-3">26°C</span>
      </div>
      <div className="font-bold">Feels like 25°C. Few clouds. Light breeze</div>
      <ul className="flex flex-wrap  mt-1 mb-0 pl-4 pr-4 w-96 ">
        <li className="flex items-center flex-nowrap mr-16">3.1m/s NW</li>
        <li className="flex items-center flex-nowrap  mr-16">1018hPa</li>
        <li className="flex items-center flex-nowrap  mr-16">Humidity:22%</li>
        <li className="flex items-center flex-nowrap  mr-16">UV:4</li>
        <li className="flex items-center flex-nowrap  mr-16">Dew point:-2°C</li>
        <li className="flex items-center flex-nowrap  mr-16">Visibility:7.0km</li>
      </ul>
    </div>
    <div>
      <div className="relative"></div>  
    </div> 
    </div>
  </div>
  </div>
  </div>
)
}

export default Search;