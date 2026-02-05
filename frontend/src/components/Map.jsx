import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
});

export default function Map({ data, selectedId, onSelect }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: 400, marginTop: 20 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude]}
          icon={icon}
          eventHandlers={{
            click: () => onSelect(item.id),
          }}
        >
          <Popup>
            <strong>{item.projectName}</strong>
            <br />
            Status: {item.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
