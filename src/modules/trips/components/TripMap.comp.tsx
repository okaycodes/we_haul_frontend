import { LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EldLog } from "../trips.types";

interface TripMapProps {
  logs: EldLog[];
  coordinates: LatLng[];
}
export default function TripMap({ logs, coordinates }: TripMapProps) {
  if (!logs) return null;

  return (
    <section className="mx-auto w-4/5 max-w-200 aspect-video">
      <MapContainer
        center={[37.729998, -122.394396]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ minHeight: "100%", minWidth: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.length > 0 && (
          <Polyline positions={coordinates} color="blue" />
        )}

        {logs
          .filter((l) =>
            ["PRE CHECK", "PICKUP", "BREAK", "FUEL_STOP", "DROP OFF"].includes(
              l.action
            )
          )
          .map((log) => (
            <Marker key={log.id} position={log.coordinates}>
              <Popup>{log.action}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
}
