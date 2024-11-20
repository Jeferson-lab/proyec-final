import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, Bell, Shield, Clock, MapPin } from 'lucide-react';
import { Incident } from '../types';
import AlertDetailModal from './AlertDetailModal';

interface AlertsScreenProps {
  incidents: Incident[];
}

const AlertsScreen: React.FC<AlertsScreenProps> = ({ incidents }) => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const hasActiveAlert = incidents.some(incident => 
    incident.severity === 'high' && 
    new Date().getTime() - incident.timestamp.getTime() < 3600000
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((new Date().getTime() - timestamp.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      {/* Active Alert Banner */}
      {hasActiveAlert && (
        <div className="bg-red-500 text-white px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span className="font-medium">Active Security Alert</span>
            </div>
            <span className="text-xs bg-red-600 px-2 py-1 rounded-full">LIVE</span>
          </div>
        </div>
      )}

      {/* Alerts Summary */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Today's Overview</h2>
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Alerts</span>
                <AlertTriangle className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {incidents.filter(i => i.severity === 'high').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Area Status</span>
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-sm font-medium text-green-600 mt-1">Monitored</p>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Alerts</h3>
          {incidents.map((incident) => (
            <button
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={`w-full text-left bg-white rounded-lg shadow-sm p-4 border-l-4 transition-transform hover:scale-[1.02] ${getSeverityColor(incident.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className={`w-5 h-5 ${
                      incident.severity === 'high' ? 'text-red-500' :
                      incident.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <span className="font-semibold text-gray-900">
                      {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeAgo(incident.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>0.5 miles away</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AlertDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};

export default AlertsScreen;