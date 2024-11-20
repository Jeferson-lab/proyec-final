import React from 'react';
import { MapPin, Bell, Shield, UserCircle, MessageCircle, BarChart2 } from 'lucide-react';

interface BarraNavegacionProps {
  pestanaActiva: string;
  onCambioPestana: (pestana: string) => void;
}

const BarraNavegacion: React.FC<BarraNavegacionProps> = ({ pestanaActiva, onCambioPestana }) => {
  const pestanas = [
    { id: 'mapa', icono: MapPin, etiqueta: 'Mapa' },
    { id: 'alertas', icono: Bell, etiqueta: 'Alertas' },
    { id: 'estadisticas', icono: BarChart2, etiqueta: 'Estadísticas' },
    { id: 'consejos', icono: Shield, etiqueta: 'Consejos' },
    { id: 'chat', icono: MessageCircle, etiqueta: 'Chat' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
      <div className="flex justify-around items-center h-16">
        {pestanas.map(({ id, icono: Icono, etiqueta }) => (
          <button
            key={id}
            onClick={() => onCambioPestana(id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1
              ${pestanaActiva === id ? 'text-indigo-600' : 'text-gray-600'}
              hover:text-indigo-500 transition-colors duration-200`}
          >
            <Icono className="w-6 h-6" />
            <span className="text-xs font-medium">{etiqueta}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BarraNavegacion;