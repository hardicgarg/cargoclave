import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HighFrequencyRoutesMap = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = [
    {
      id: 1,
      name: "Los Angeles - San Francisco",
      frequency: 156,
      activeVehicles: 12,
      avgTime: "6h 30m",
      lat: 34.0522,
      lng: -118.2437
    },
    {
      id: 2,
      name: "New York - Boston",
      frequency: 142,
      activeVehicles: 9,
      avgTime: "4h 15m",
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 3,
      name: "Chicago - Detroit",
      frequency: 128,
      activeVehicles: 8,
      avgTime: "5h 45m",
      lat: 41.8781,
      lng: -87.6298
    },
    {
      id: 4,
      name: "Houston - Dallas",
      frequency: 119,
      activeVehicles: 7,
      avgTime: "3h 50m",
      lat: 29.7604,
      lng: -95.3698
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">High Frequency Routes</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <Icon name="Maximize2" size="1rem" />
          <span>Full Screen</span>
        </button>
      </div>
      <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="High Frequency Routes Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=39.8283,-98.5795&z=4&output=embed"
          className="border-0"
        />
        
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-elevated max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Live Tracking Active</span>
          </div>
          
          <div className="space-y-2">
            {routes?.slice(0, 2)?.map((route) => (
              <div 
                key={route?.id}
                className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                onClick={() => setSelectedRoute(route)}
              >
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size="1rem" className="text-primary" />
                  <span className="text-xs text-foreground font-medium">{route?.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{route?.activeVehicles} active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {routes?.map((route) => (
          <div 
            key={route?.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedRoute?.id === route?.id 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedRoute(route)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Route" size="1rem" className="text-primary" />
              <span className="text-xs font-medium text-foreground">{route?.name}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-semibold text-foreground">{route?.frequency}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Avg Time</span>
                <span className="font-semibold text-foreground">{route?.avgTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighFrequencyRoutesMap;