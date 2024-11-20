import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, Bell, Shield, Clock, MapPin, Share2, Facebook, Twitter, MessageCircle, Link2 } from 'lucide-react';
import { Incidente } from '../types';

interface PantallaAlertasProps {
  incidentes: Incidente[];
}

interface DetalleAlertaProps {
  incidente: Incidente;
  onClose: () => void;
}

const DetalleAlerta: React.FC<DetalleAlertaProps> = ({ incidente, onClose }) => {
  const compartirEnRedes = (red: string) => {
    const mensaje = `Alerta de seguridad: ${incidente.tipo} - ${incidente.descripcion}`;
    const url = window.location.href;

    switch (red) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${mensaje}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${mensaje}&url=${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${mensaje} ${url}`, '_blank');
        break;
      case 'copiar':
        navigator.clipboard.writeText(`${mensaje} ${url}`);
        // Mostrar feedback al usuario
        alert('Enlace copiado al portapapeles');
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Detalles del Incidente</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-6 h-6 ${
                incidente.gravedad === 'alta' ? 'text-red-500' :
                incidente.gravedad === 'media' ? 'text-yellow-500' :
                'text-blue-500'
              }`} />
              <span className="font-semibold text-lg">
                {incidente.tipo.charAt(0).toUpperCase() + incidente.tipo.slice(1)}
              </span>
            </div>

            <p className="text-gray-700">{incidente.descripcion}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{incidente.fecha.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>0.5 km de distancia</span>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Compartir Alerta</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => compartirEnRedes('facebook')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => compartirEnRedes('twitter')}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-500"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => compartirEnRedes('whatsapp')}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button
                  onClick={() => compartirEnRedes('copiar')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
                >
                  <Link2 className="w-5 h-5" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PantallaAlertas: React.FC<PantallaAlertasProps> = ({ incidentes }) => {
  const [incidenteSeleccionado, setIncidenteSeleccionado] = useState<Incidente | null>(null);

  const hasActiveAlert = incidentes.some(incidente => 
    incidente.gravedad === 'alta' && 
    new Date().getTime() - incidente.fecha.getTime() < 3600000
  );

  const getGravedadColor = (gravedad: string) => {
    switch (gravedad) {
      case 'alta': return 'border-red-500 bg-red-50';
      case 'media': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getTimeAgo = (fecha: Date) => {
    const minutes = Math.floor((new Date().getTime() - fecha.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    return `${Math.floor(hours / 24)}d atrás`;
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      {hasActiveAlert && (
        <div className="bg-red-500 text-white px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-medium">Alerta de Seguridad Activa</span>
            </div>
            <span className="text-xs bg-red-600 px-2 py-1 rounded-full">EN VIVO</span>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Resumen del Día</h2>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Alertas Activas</span>
                <AlertTriangle className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {incidentes.filter(i => i.gravedad === 'alta').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estado del Área</span>
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-600 mt-1">Monitoreado</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Alertas Recientes</h3>
          {incidentes.map((incidente) => (
            <button
              key={incidente.id}
              onClick={() => setIncidenteSeleccionado(incidente)}
              className={`w-full text-left bg-white rounded-lg shadow-sm p-4 border-l-4 transition-transform hover:scale-[1.02] ${getGravedadColor(incidente.gravedad)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className={`w-5 h-5 ${
                      incidente.gravedad === 'alta' ? 'text-red-500' :
                      incidente.gravedad === 'media' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <span className="font-semibold text-gray-900">
                      {incidente.tipo.charAt(0).toUpperCase() + incidente.tipo.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incidente.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(incidente.fecha)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>0.5 km de distancia</span>
                      </div>
                    </div>
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {incidenteSeleccionado && (
        <DetalleAlerta
          incidente={incidenteSeleccionado}
          onClose={() => setIncidenteSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default PantallaAlertas;