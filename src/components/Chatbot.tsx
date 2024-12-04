import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { MensajeChat } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot: React.FC = () => {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: 1,
      texto: "¡Hola! Soy tu asistente de seguridad impulsado por inteligencia artificial. ¿En qué puedo ayudarte?",
      esUsuario: false,
      fecha: new Date(),
    },
  ]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const mensajesFinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // Configuración de Google Generative AI
  const genAI = new GoogleGenerativeAI("AIzaSyB7mGHhkpbTPhVC9wTMUgpGgM3ZRNru1E8"); // Usa tu clave API

  const limpiarTexto = (texto: string): string => {
    // Elimina asteriscos y caracteres innecesarios
    return texto.replace(/\**\**/g, '').trim();
  };

  const obtenerRespuestaGemini = async (mensaje: string): Promise<string> => {
    try {
      // Crear el modelo generativo
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Generar contenido a partir del mensaje del usuario
      const result = await model.generateContent(mensaje);
      const response = await result.response;
      const text = await response.text();

      // Limpia el texto antes de devolverlo
      return limpiarTexto(text) || 'Lo siento, no entendí tu mensaje. Por favor, intenta de nuevo.';
    } catch (error) {
      console.error('Error al conectar con la API de Google Gemini:', error);
      return 'Lo siento, ocurrió un error. Por favor, intenta de nuevo más tarde.';
    }
  };

  const enviarMensaje = async () => {
    if (!inputMensaje.trim()) return;

    const nuevoMensajeUsuario: MensajeChat = {
      id: mensajes.length + 1,
      texto: inputMensaje,
      esUsuario: true,
      fecha: new Date(),
    };

    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setInputMensaje('');
    setEscribiendo(true);

    const respuestaGemini = await obtenerRespuestaGemini(inputMensaje);

    const respuestaBot: MensajeChat = {
      id: mensajes.length + 2,
      texto: respuestaGemini,
      esUsuario: false,
      fecha: new Date(),
    };

    setMensajes((prev) => [...prev, respuestaBot]);
    setEscribiendo(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Encabezado */}
      <div className="bg-white shadow-sm p-4 flex items-center space-x-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Asistente de Seguridad</h2>
          <p className="text-sm text-gray-500">Impulsado por Gemini AI</p>
        </div>
      </div>

      {/* Barra de entrada */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex space-x-2">
          <input
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
        <p className="text-xs text-gray-500 mt-2">Presiona Enter para enviar.</p>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`flex ${mensaje.esUsuario ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                mensaje.esUsuario ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm border border-gray-200'
              }`}
            >
              <p>{mensaje.texto}</p>
              <p className="text-xs mt-1 text-gray-500">{mensaje.fecha.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        {escribiendo && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Bot className="w-5 h-5" />
            <span>Escribiendo...</span>
          </div>
        )}
        <div ref={mensajesFinRef} />
      </div>
    </div>
  );
};

export default Chatbot;