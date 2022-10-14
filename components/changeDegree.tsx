import weatherApi from "../axios";
import { appId } from '../appId/appId'
import { MouseEvent, useState } from "react";
import { DegreeProps } from "../types";


const Degree = ({ names, mapPosition, setData, setForecast }: DegreeProps) => {
  const [active, setActive] = useState(1)
  const [ d , setD] = useState(false)

  const changeDegreesF = async (e: MouseEvent) => {
    try {
      const res = await weatherApi.get('/weather', {
        params: {
          q: names,
          lat: `${mapPosition.lat}`,
          lon: `${mapPosition.lng}`,
          units: 'imperial',
          appid: appId,
        },
      })
      const response = await weatherApi.get('/forecast?', {
        params: {
          q: names,
          lat: `${mapPosition.lat}`,
          lon: `${mapPosition.lng}`,
          units: 'imperial',
          appid: appId,
        },
      }
      )
      setData(res.data)
      setForecast(response.data)
      setActive(2)
    } catch (error) {
      console.log(error)
    }
  }

  const changeDegreesC = async (e: MouseEvent) => {
    try {
      const res = await weatherApi.get('/weather', {
        params: {
          q: names,
          lat: `${mapPosition.lat}`,
          lon: `${mapPosition.lng}`,
          units: 'metric',
          appid: appId,
        },
      })
      const response = await weatherApi.get('/forecast?', {
        params: {
          q: names,
          lat: `${mapPosition.lat}`,
          lon: `${mapPosition.lng}`,
          units: 'metric',
          appid: appId,
        },
      }
      )
      setData(res.data)
      setForecast(response.data)  
      setActive(1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <div className={`text-xs flex-1 items-center justify-center  z-10 cursor-pointer pt-2 ${active === 1 ? 'bg-white' : ''}`}  onClick={(e) => changeDegreesC(e)}>
        Metric: °C, m/s
      </div>
      <div className={`text-xs flex-1 items-center justify-center w-36 pt-2 z-10 cursor-pointer ${active === 2 ? 'bg-white transform' : ''}`} onClick={(e) => changeDegreesF(e)}>
        Imperial: °F, mph
      </div>
      </>
  )
}

export default Degree;

