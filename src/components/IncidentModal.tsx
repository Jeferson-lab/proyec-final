import React, { useState } from 'react';
import { X, Camera, MapPin, AlertTriangle, Car, Fingerprint, Shield, HelpCircle } from 'lucide-react';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INCIDENT_TYPES = [
  { id: 'theft', label: 'Theft', icon: Fingerprint, color: 'text-red-500' },
  { id: 'suspicious', label: 'Suspicious Activity', icon: AlertTriangle, color: 'text-yellow-500' },
  { id: 'vandalism', label: 'Vandalism', icon: Shield, color: 'text-orange-500' },
  { id: 'accident', label: 'Accident', icon: Car, color: 'text-blue-500' },
  { id: 'other', label: 'Other', icon: HelpCircle, color: 'text-gray-500' },
];

const IncidentModal: React.FC<IncidentModalProps> = ({ isOpen, onClose }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const isFormValid = incidentType && description && (location || useCurrentLocation);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto close after success message
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setIncidentType('');
      setDescription('');
      setLocation('');
      setUseCurrentLocation(false);
    }, 2000);
  };

  const handleCurrentLocation = () => {
    setUseCurrentLocation(true);
    setLocation('Using current location');
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md p-6 transform scale-100 opacity-100 transition-all duration-300">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Submitted!</h3>
            <p className="text-sm text-gray-500">Thank you for helping keep our community safe.</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Report Incident</h2>
            <p className="text-sm text-gray-500">Help keep our community safe</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Incident Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What type of incident are you reporting?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {INCIDENT_TYPES.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setIncidentType(id)}
                  className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    incidentType === id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${color}`} />
                  <span className="text-sm font-medium text-gray-900">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
              placeholder="Please provide details about what you observed..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {description.length}/280 characters
            </p>
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={useCurrentLocation}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                placeholder="Enter location or use current"
              />
              <button
                onClick={handleCurrentLocation}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                  ${useCurrentLocation ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MapPin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photos or Video (Optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload media
                </span>
                <input type="file" className="hidden" accept="image/*,video/*" multiple />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200
              ${isFormValid
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
              } ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentModal;