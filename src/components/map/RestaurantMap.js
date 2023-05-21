import "leaflet/dist/leaflet.css"
import { MapContainer,TileLayer } from "react-leaflet"
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import  './RestaurantMap.css'
import L from "leaflet"
import LeafletGeocoder from "./LeafletGeocoder"

const RestaurantMap = ({ onValueChange }) => {
  const position = [31.6258257, -7.9891608];

  const handleChange = (value) => {
    onValueChange(value);
  };

  const DefaultIcon = L.icon({
    iconUrl:
      'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletGeocoder onLocationSelect={handleChange} />
      
    </MapContainer>
  );
};

export default RestaurantMap;