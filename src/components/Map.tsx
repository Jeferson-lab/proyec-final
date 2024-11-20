import React from 'react';
import { MapPin } from 'lucide-react';
import { Incident } from '../types';

interface MapProps {
  incidents: Incident[];
}

const Map: React.FC<MapProps> = ({ incidents }) => {
  return (
    <div className="relative w-full h-full bg-gray-200">
      {/* Placeholder for actual map implementation */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Incident Markers */}
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: '50%',
            left: '50%',
            marginTop: `${(incident.id * 20)}px`,
            marginLeft: `${(incident.id * 20)}px`
          }}
        >
          <div className="relative group">
            <MapPin
              className={`w-6 h-6 ${
                incident.severity === 'high' ? 'text-red-500' :
                incident.severity === 'medium' ? 'text-yellow-500' :
                'text-blue-500'
              }`}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
              <div className="bg-white rounded-lg shadow-lg p-2 text-sm w-48">
                <p className="font-semibold text-gray-900">
                  {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                </p>
                <p className="text-gray-600 text-xs">{incident.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {incident.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Map;