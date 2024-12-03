import React from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Mapa: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDckXozY9KuMV_Lj4oEG06LYvnD0gy49-U",
  });

  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%", }}
      center={{ lat: -34.603722, lng: -58.381592 }}
      zoom={10}
    />
  );
};

export default Mapa;
