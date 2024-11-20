import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, AlertTriangle, Shield, MapPin, HelpCircle } from 'lucide-react';
import { MensajeChat } from '../types';

const Chatbot: React.FC = () => {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: 1,
      texto: "¡Hola! Soy tu asistente de seguridad. ¿En qué puedo ayudarte?",
      esUsuario: false,
      fecha: new Date()
    }
  ]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const mensajesFinRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const respuestasAutomaticas: { [key: string]: string } = {
    emergencia: "🚨 Por favor, marca inmediatamente al número de emergencias 911. Mantén la calma y proporciona tu ubicación exacta.",
    ayuda: "Puedo ayudarte con:\n- Reportar incidentes\n- Información sobre seguridad\n- Consejos de prevención\n- Estado de alertas\n¿Qué necesitas?",
    ubicacion: "📍 Para compartir tu ubicación actual, puedes usar el botón de ubicación en el mapa principal. ¿Necesitas ayuda para reportar un incidente?",
    reporte: "Para reportar un incidente:\n1. Usa el botón rojo '+' en la pantalla principal\n2. Selecciona el tipo de incidente\n3. Describe lo que observaste\n4. Añade la ubicación\n¿Quieres que te guíe en el proceso?",
    alerta: "🚨 Para ver las alertas activas en tu zona, ve a la sección 'Alertas' en el menú inferior. ¿Quieres que te muestre las alertas más recientes?",
    consejos: "🛡️ Algunos consejos de seguridad básicos:\n- Mantén contactos de emergencia a mano\n- Evita zonas poco iluminadas\n- Reporta actividades sospechosas\n¿Quieres consejos más específicos?",
    default: "Entiendo tu consulta. Para ayudarte mejor, ¿podrías especificar si necesitas información sobre:\n1. Reportar un incidente\n2. Ver alertas activas\n3. Consejos de seguridad\n4. Contactos de emergencia"
  };

  const obtenerRespuestaBot = (mensaje: string): string => {
    const mensajeLower = mensaje.toLowerCase();
    
    if (mensajeLower.includes('emergencia')) return respuestasAutomaticas.emergencia;
    if (mensajeLower.includes('ayuda')) return respuestasAutomaticas.ayuda;
    if (mensajeLower.includes('ubicación') || mensajeLower.includes('ubicacion')) return respuestasAutomaticas.ubicacion;
    if (mensajeLower.includes('reportar') || mensajeLower.includes('reporte')) return respuestasAutomaticas.reporte;
    if (mensajeLower.includes('alerta')) return respuestasAutomaticas.alerta;
    if (mensajeLower.includes('consejo') || mensajeLower.includes('tip')) return respuestasAutomaticas.consejos;
    
    return respuestasAutomaticas.default;
  };

  const enviarMensaje = async () => {
    if (!inputMensaje.trim()) return;

    const nuevoMensajeUsuario: MensajeChat = {
      id: mensajes.length + 1,
      texto: inputMensaje,
      esUsuario: true,
      fecha: new Date()
    };

    setMensajes(prev => [...prev, nuevoMensajeUsuario]);
    setInputMensaje('');
    setEscribiendo(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const respuestaBot: MensajeChat = {
      id: mensajes.length + 2,
      texto: obtenerRespuestaBot(inputMensaje),
      esUsuario: false,
      fecha: new Date()
    };

    setMensajes(prev => [...prev, respuestaBot]);
    setEscribiendo(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const renderIconoAyuda = (texto: string) => {
    if (texto.includes('emergencia')) return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (texto.includes('consejo')) return <Shield className="w-5 h-5 text-green-500" />;
    if (texto.includes('ubicación')) return <MapPin className="w-5 h-5 text-blue-500" />;
    return <HelpCircle className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Asistente de Seguridad</h2>
          <p className="text-sm text-gray-500">Siempre disponible para ayudarte</p>
        </div>
      </div>

      {/* Barra de Entrada (Movida arriba) */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={enviarMensaje}
            disabled={!inputMensaje.trim() || escribiendo}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Presiona Enter para enviar • Escribe "ayuda" para ver las opciones disponibles
        </p>
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`flex ${mensaje.esUsuario ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                mensaje.esUsuario
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white shadow-sm border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                {!mensaje.esUsuario && renderIconoAyuda(mensaje.texto)}
                <div>
                  <p className={`${mensaje.esUsuario ? 'text-white' : 'text-gray-800'} whitespace-pre-line`}>
                    {mensaje.texto}
                  </p>
                  <p className={`text-xs mt-1 ${
                    mensaje.esUsuario ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {mensaje.fecha.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {escribiendo && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Bot className="w-5 h-5" />
            <span className="text-sm">Escribiendo...</span>
          </div>
        )}
        <div ref={mensajesFinRef} />
      </div>
    </div>
  );
};

export default Chatbot;