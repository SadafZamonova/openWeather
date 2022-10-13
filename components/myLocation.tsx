import weatherApi from "../axios";
import { appId } from '../appId/appId'
import { LocationProps } from "../types";
import { Map } from "leaflet";

let zeroTimeZone = 0;
const MyLocation = ({names, setData, setForecast, setMapPosition, mapRef}: LocationProps) => {


    const myLocation = async () => {
        navigator.geolocation?.getCurrentPosition(async (cds) => {
          const res = await weatherApi.get('/weather', {
            params: {
              q: names,
              lat: cds.coords.latitude,
              lon: cds.coords.longitude,
              units: 'metric',
              appid: appId,
            },
          }
          )
          const response = await weatherApi.get('/forecast?', {
            params: {
              q: names,
              lat: cds.coords.latitude,
              lon: cds.coords.longitude,
              units: 'metric',
              appid: appId,
    
            },
          }
          )
          zeroTimeZone = res.data.timezone;
          setData(res.data)
          setForecast(response.data)
          setMapPosition({ lat: res.data.coord.lat, lng: res.data.coord.lon })
          mapRef.current?.flyTo({
            lat: res.data.coord.lat,
            lng: res.data.coord.lon
          })
        }, (err) => {
          console.log("err", err)
        });
      }



      return (
        <button onClick={() => myLocation()}>геолокация</button>
        //   <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 11l19-9l-9 19l-2-8l-8-2z" onClick={() => myLocation()}
        //       /></svg>
      )
}

export default MyLocation;