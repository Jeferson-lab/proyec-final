import React, { useState } from 'react';
import { X, Camera, MapPin, AlertTriangle, Car, Fingerprint, Shield, HelpCircle } from 'lucide-react';

interface ModalIncidenteProps {
  abierto: boolean;
  onCerrar: () => void;
}

const TIPOS_INCIDENTE = [
  { id: 'robo', etiqueta: 'Robo', icono: Fingerprint, color: 'text-red-500' },
  { id: 'sospechoso', etiqueta: 'Actividad Sospechosa', icono: AlertTriangle, color: 'text-yellow-500' },
  { id: 'vandalismo', etiqueta: 'Vandalismo', icono: Shield, color: 'text-orange-500' },
  { id: 'accidente', etiqueta: 'Accidente', icono: Car, color: 'text-blue-500' },
  { id: 'otro', etiqueta: 'Otro', icono: HelpCircle, color: 'text-gray-500' },
];

const ModalIncidente: React.FC<ModalIncidenteProps> = ({ abierto, onCerrar }) => {
  const [tipoIncidente, setTipoIncidente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [usarUbicacionActual, setUsarUbicacionActual] = useState(false);

  const formularioValido = tipoIncidente && descripcion && (ubicacion || usarUbicacionActual);

  const manejarEnvio = async () => {
    if (!formularioValido) return;

    setEnviando(true);
    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEnviando(false);
    setMostrarExito(true);

    // Cerrar automáticamente después del mensaje de éxito
    setTimeout(() => {
      setMostrarExito(false);
      onCerrar();
      // Resetear formulario
      setTipoIncidente('');
      setDescripcion('');
      setUbicacion('');
      setUsarUbicacionActual(false);
    }, 2000);
  };

  const usarUbicacion = () => {
    setUsarUbicacionActual(true);
    setUbicacion('Usando ubicación actual');
  };

  if (!abierto) return null;

  if (mostrarExito) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md p-6 transform scale-100 opacity-100 transition-all duration-300">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¡Reporte Enviado!</h3>
            <p className="text-sm text-gray-500">Gracias por ayudar a mantener segura nuestra comunidad.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Reportar Incidente</h2>
            <p className="text-sm text-gray-500">Ayuda a mantener segura nuestra comunidad</p>
          </div>
          <button
            onClick={onCerrar}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Selección de Tipo de Incidente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué tipo de incidente estás reportando?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {TIPOS_INCIDENTE.map(({ id, etiqueta, icono: Icono, color }) => (
                <button
                  key={id}
                  onClick={() => setTipoIncidente(id)}
                  className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    tipoIncidente === id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Icono className={`w-5 h-5 mr-2 ${color}`} />
                  <span className="text-sm font-medium text-gray-900">{etiqueta}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Campo de Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
              placeholder="Por favor, proporciona detalles sobre lo que observaste..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {descripcion.length}/280 caracteres
            </p>
          </div>

          {/* Campo de Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <div className="relative">
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                disabled={usarUbicacionActual}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                placeholder="Ingresa ubicación o usa la actual"
              />
              <button
                onClick={usarUbicacion}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                  ${usarUbicacionActual ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subida de Multimedia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agregar Fotos o Video (Opcional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Haz clic para subir archivos
                </span>
                <input type="file" className="hidden" accept="image/*,video/*" multiple />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={onCerrar}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={manejarEnvio}
            disabled={!formularioValido || enviando}
            className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200
              ${formularioValido
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
              } ${enviando ? 'opacity-75 cursor-wait' : ''}`}
          >
            {enviando ? 'Enviando...' : 'Enviar Reporte'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIncidente;