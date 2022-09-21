import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Props } from "../types";






const LeafletMap: React.FC<Props> = ({mapRef, position} ) => {

  
  return (
    <MapContainer
      center={[40.8054, 69.0241]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "25vh", width: "500px" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} draggable={true} >
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;