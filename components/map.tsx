import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = () => {
  return (
    <MapContainer
      center={[40.8054, 69.0241]}
      // center={[lat, leng]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "200px", width: "500px" }}
    >
      <TileLayer
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[40.8054, 69.0241]} draggable={true} >
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;