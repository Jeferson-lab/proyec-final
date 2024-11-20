import React from 'react';
import { MapPin, Bell, Shield, UserCircle } from 'lucide-react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'map', icon: MapPin, label: 'Map' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'tips', icon: Shield, label: 'Tips' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1
              ${activeTab === id ? 'text-indigo-600' : 'text-gray-600'}
              hover:text-indigo-500 transition-colors duration-200`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;