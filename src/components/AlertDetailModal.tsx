import React from 'react';
import { X, AlertTriangle, Shield, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Incident } from '../types';

interface AlertDetailModalProps {
  incident: Incident | null;
  onClose: () => void;
}

const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ incident, onClose }) => {
  if (!incident) return null;

  const getSafetyTips = (type: string) => {
    switch (type) {
      case 'theft':
        return [
          'Keep valuables out of sight',
          'Stay in well-lit areas',
          'Travel in groups when possible',
          'Be aware of your surroundings'
        ];
      case 'suspicious':
        return [
          'Maintain a safe distance',
          'Contact local authorities',
          'Document any unusual behavior',
          'Alert nearby businesses or neighbors'
        ];
      default:
        return [
          'Stay alert and aware',
          'Report any suspicious activity',
          'Keep emergency contacts handy',
          'Follow official guidance'
        ];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <AlertTriangle className={`w-5 h-5 ${
              incident.severity === 'high' ? 'text-red-500' :
              incident.severity === 'medium' ? 'text-yellow-500' :
              'text-blue-500'
            }`} />
            <h2 className="text-lg font-semibold text-gray-900">
              {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Alert
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Incident Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{incident.timestamp.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>0.5 miles away</span>
              </div>
            </div>
            <p className="text-gray-700">{incident.description}</p>
          </div>

          {/* Safety Recommendations */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span>Safety Recommendations</span>
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-3">
                {getSafetyTips(incident.type).map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Share Alert
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailModal;