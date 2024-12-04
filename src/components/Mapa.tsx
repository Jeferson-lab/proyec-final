import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Incidente } from "../types";

interface MapaProps {
  incidentes: Incidente[];
}

const Mapa: React.FC<MapaProps> = ({ incidentes }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDckXozY9KuMV_Lj4oEG06LYvnD0gy49-U",
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("La API de Geolocalización no está disponible en este navegador.");
    }
  }, []);

  if (!isLoaded) return <div>Cargando...</div>;
  if (!userLocation) return <div>Obteniendo ubicación actual...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={userLocation}
      zoom={12}
    >
      {incidentes.map((incidente) => (
        <Marker
          key={incidente.id}
          position={incidente.ubicacion}
          title={`${incidente.tipo}: ${incidente.descripcion}`}
          label={{
            text: incidente.tipo.charAt(0).toUpperCase(),
            color: "white",
            fontSize: "16px",
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: incidente.gravedad === 'alta' ? 'red' : 'yellow',
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "black",
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Mapa;
