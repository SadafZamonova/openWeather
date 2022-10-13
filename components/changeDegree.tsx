import weatherApi from "../axios";
import { appId } from '../appId/appId'
import { MouseEvent } from "react";
import { DegreeProps } from "../types";


const Degree = ({ names, mapPosition, setData, setForecast }: DegreeProps) => {

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="text-xs flex-1 items-center justify-center  z-10 cursor-pointer pt-2" onClick={(e) => changeDegreesC(e)}>
        Metric: °C, m/s
      </div>
      <div className="text-xs flex-1 items-center justify-center w-36 pt-2 z-10 cursor-pointer" onClick={(e) => changeDegreesF(e)}>
        Imperial: °F, mph
      </div></>
  )
}

export default Degree;

