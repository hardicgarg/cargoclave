import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LiveTrackingCard = () => {
  const [activeTrips, setActiveTrips] = useState(342);
  const [emergencyAlerts, setEmergencyAlerts] = useState(2);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Active Trips",
      value: activeTrips,
      icon: "Truck",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Emergency Alerts",
      value: emergencyAlerts,
      icon: "AlertTriangle",
      color: "text-error",
      bgColor: "bg-error/10"
    },
    {
      label: "Delayed",
      value: 23,
      icon: "Clock",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      label: "On Schedule",
      value: 319,
      icon: "CheckCircle2",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "emergency",
      message: "Vehicle breakdown reported - Route LA-SF",
      time: "2 min ago",
      tripId: "TRP-2024-1156"
    },
    {
      id: 2,
      type: "delay",
      message: "Traffic delay expected - Route NY-BOS",
      time: "15 min ago",
      tripId: "TRP-2024-1142"
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Tracking</h3>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdate?.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Link 
          to="/trips-monitoring-management"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
        >
          <Icon name="MapPin" size="1rem" />
          <span>View Map</span>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats?.map((stat, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center mb-3`}>
              <Icon name={stat?.icon} size="1.25rem" className={stat?.color} />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
            <p className="text-xs text-muted-foreground">{stat?.label}</p>
          </div>
        ))}
      </div>
      {emergencyAlerts > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Bell" size="1rem" className="text-error" />
            <h4 className="text-sm font-semibold text-foreground">Recent Alerts</h4>
          </div>
          
          {recentAlerts?.map((alert) => (
            <div 
              key={alert?.id}
              className={`p-4 rounded-lg border ${
                alert?.type === 'emergency' ?'border-error/50 bg-error/5' :'border-warning/50 bg-warning/5'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={alert?.type === 'emergency' ? 'AlertTriangle' : 'Clock'} 
                    size="1rem" 
                    className={alert?.type === 'emergency' ? 'text-error' : 'text-warning'}
                  />
                  <span className="text-sm font-medium text-foreground">{alert?.message}</span>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{alert?.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Trip ID: {alert?.tripId}</span>
                <Link 
                  to="/trip-details-tracking"
                  className="text-xs text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveTrackingCard;