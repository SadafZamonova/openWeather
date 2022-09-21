import { Map } from "leaflet";

export interface WeatherData {
    base: string
    clouds: {all: number}
    cod:number
    coord: {lon: number,
             lat: number}
    dt: number
    id: number
    main:{temp: number, feels_like: number, humidity:number, temp_min: number, temp_max: number, pressure: number}
    name: string
    sys:{type: number, id: number, country: string, sunrise: number, sunset: number}
    timezone: number
    visibility: number
    weather:{
        description: string, 
        icon: string,
        id: number,
        main: string,
    }[]
    wind:{speed: number, deg: number}
}


export interface Props {
    setMap: (m: Map) => void
  }