import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, HelpCircle } from 'lucide-react';
import { MensajeChat } from '../types';

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const obtenerRespuestaChatGPT = async (mensaje: string): Promise<string> => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Cambia a 'gpt-3.5-turbo' si es necesario
          messages: [
            {
              role: 'system',
              content:
                'Eres un asistente experto en seguridad. Responde de forma breve, clara y concisa, solo con información relevante para el usuario.',
            },
            { role: 'user', content: mensaje },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error al conectar con la API de OpenAI:', error);
      return 'Lo siento, ocurrió un error. Intenta de nuevo.';
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

    const respuestaChatGPT = await obtenerRespuestaChatGPT(inputMensaje);

    const respuestaBot: MensajeChat = {
      id: mensajes.length + 2,
      texto: respuestaChatGPT,
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
      {/* Encabezado del Chat */}
      <div className="bg-white shadow-sm p-4 flex items-center space-x-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Asistente de Seguridad</h2>
          <p className="text-sm text-gray-500">Impulsado por inteligencia artificial</p>
        </div>
      </div>

      {/* Barra de entrada */}
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
          Presiona Enter para enviar.
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
              className={`max-w-[80%] rounded-lg p-3 ${mensaje.esUsuario
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white shadow-sm border border-gray-200'
                }`}
            >
              <p className={`${mensaje.esUsuario ? 'text-white' : 'text-gray-800'} whitespace-pre-line`}>
                {mensaje.texto}
              </p>
              <p className={`text-xs mt-1 ${mensaje.esUsuario ? 'text-indigo-200' : 'text-gray-500'
                }`}>
                {mensaje.fecha.toLocaleTimeString()}
              </p>
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
