import React from 'react';
import { MapPin } from 'lucide-react';
import { Incidente } from '../types';

interface MapaProps {
  incidentes: Incidente[];
}

const Mapa: React.FC<MapaProps> = ({ incidentes }) => {
  return (
    <div className="relative w-full h-full bg-gray-200">
      {/* Fondo del mapa */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Marcadores de Incidentes */}
      {incidentes.map((incidente) => (
        <div
          key={incidente.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: '50%',
            left: '50%',
            marginTop: `${(incidente.id * 20)}px`,
            marginLeft: `${(incidente.id * 20)}px`
          }}
        >
          <div className="relative group">
            <MapPin
              className={`w-6 h-6 ${
                incidente.gravedad === 'alta' ? 'text-red-500' :
                incidente.gravedad === 'media' ? 'text-yellow-500' :
                'text-blue-500'
              }`}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
              <div className="bg-white rounded-lg shadow-lg p-2 text-sm w-48">
                <p className="font-semibold text-gray-900">
                  {incidente.tipo.charAt(0).toUpperCase() + incidente.tipo.slice(1)}
                </p>
                <p className="text-gray-600 text-xs">{incidente.descripcion}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {incidente.fecha.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controles del Mapa */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
          <MapPin className="w-5 h-5 text-gray-700" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
          <span className="text-gray-700 text-xl">+</span>
        </button>
        <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
          <span className="text-gray-700 text-xl">−</span>
        </button>
      </div>

      {/* Leyenda */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Leyenda</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-700">Alta Gravedad</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-700">Media Gravedad</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-700">Baja Gravedad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;