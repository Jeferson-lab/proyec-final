import React, { useState } from 'react';
import { MapPin, Bell, Shield, UserCircle, Plus, AlertTriangle, Navigation } from 'lucide-react';
import Mapa from './components/Mapa';
import PantallaAlertas from './components/PantallaAlertas';
import ModalIncidente from './components/ModalIncidente';
import BarraNavegacion from './components/BarraNavegacion';
import Chatbot from './components/Chatbot';
import EstadisticasIncidentes from './components/EstadisticasIncidentes';
import { Incidente } from './types';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('mapa');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [incidentes] = useState<Incidente[]>([
    {
      id: 1,
      tipo: 'robo',
      ubicacion: { lat: 40.7128, lng: -74.0060 },
      descripcion: 'Actividad sospechosa reportada cerca del parque',
      fecha: new Date('2024-03-10T15:30:00'),
      gravedad: 'media'
    },
    {
      id: 2,
      tipo: 'sospechoso',
      ubicacion: { lat: 40.7580, lng: -73.9855 },
      descripcion: 'Intento de robo en edificio residencial',
      fecha: new Date('2024-03-10T14:15:00'),
      gravedad: 'alta'
    }
  ]);

  const renderContenido = () => {
    switch (pestanaActiva) {
      case 'mapa':
        return <Mapa incidentes={incidentes} />;
      case 'alertas':
        return <PantallaAlertas incidentes={incidentes} />;
      case 'estadisticas':
        return <EstadisticasIncidentes />;
      case 'consejos':
        return (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Consejos de Seguridad</h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <p className="text-gray-700">Mantente alerta de tu entorno en todo momento</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <p className="text-gray-700">Ten tus contactos de emergencia a mano</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <p className="text-gray-700">Reporta actividades sospechosas inmediatamente</p>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'chat':
        return <Chatbot />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col relative">
      {/* Barra de Estado */}
      <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4" />
          <span className="text-sm font-medium">VigilanteApp</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-indigo-500 px-2 py-1 rounded-full">
            En vivo
          </span>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 relative overflow-hidden">
        {renderContenido()}

        {/* Botón Reportar Incidente */}
        <button
          onClick={() => setModalAbierto(true)}
          className="absolute bottom-20 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      </main>

      {/* Barra de Navegación */}
      <BarraNavegacion pestanaActiva={pestanaActiva} onCambioPestana={setPestanaActiva} />

      {/* Modal de Reporte de Incidente */}
      <ModalIncidente abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} />
    </div>
  );
}

export default App;