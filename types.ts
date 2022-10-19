import { ScatterDataPoint } from "chart.js";
import { Map } from "leaflet";
import { MutableRefObject } from "react";

export interface WeatherData {
    base?: string
    clouds: {all: number}
    cod?:number
    coord?: {lon: number,
             lat: number}
    dt: number
    dt_txt?: string,
    id?: number
    main:{temp: number, feels_like: number, humidity:number, temp_min: number, temp_max: number, pressure: number, grnd_level?:number, sea_level?: number, temp_kf?: number  }
    name?: string
    sys:{type?: number, id?: number, country?: string, sunrise?: number, sunset?: number}
    timezone?: number
    visibility: number
    weather:{
        description: string, 
        icon: string,
        id: number,
        main: string,
    }[]
    wind:{speed: number, deg: number, gust: number}
}

export interface Forecast {
    city: {
        coord: {
        lat: number,
        lon:number   
        } 
        country: string,
        id: number,
        name: string,
        population: number,
        sunrise: number, 
        sunset: number,
        timezone: number, }
    cnt:number,
    cod: string,
    list: WeatherData[]
    } 

export interface Hourly {
  city: {
    coord: {
    lat: number,
    lon:number   
    } 
    country: string,
    id: number,
    name: string,
    population: number,
    sunrise: number, 
    sunset: number,
    timezone: number, }
cnt:number,
cod: string,
list: WeatherData[]
} 



export interface Props {
    mapRef: MutableRefObject<Map | null>,
    position: any,
  }

  export interface Data {
    data: (number | ScatterDataPoint | null | string[]) 

  }

  export interface DegreeProps {
    names: string,
    mapPosition:{ lat: number, lng: number },
    setData:  any,
    setForecast: any,
    setHourly: any,
    setParams: any
  }

  export interface LocationProps {
    names: string,
    setData:  any,
    setForecast: any,
    setMapPosition: any,
    mapRef: any,
    setHourly: any
  }

  export interface ForecastProps {
    forecast: Forecast,
    forecastDays: string[],
    params: any
  }

  export interface HourlyProps {
    hourly : Hourly
  }

  export interface SearchProps {
    onSearchChange: any
  }