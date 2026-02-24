import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemIntegrationStatus = () => {
  const integrations = [
    {
      name: "GPS Tracking",
      status: "connected",
      lastSync: "2 min ago",
      icon: "Satellite",
      color: "success"
    },
    {
      name: "ERP System",
      status: "connected",
      lastSync: "5 min ago",
      icon: "Database",
      color: "success"
    },
    {
      name: "Accounting",
      status: "syncing",
      lastSync: "Syncing...",
      icon: "DollarSign",
      color: "warning"
    },
    {
      name: "Fleet Management",
      status: "connected",
      lastSync: "1 min ago",
      icon: "Truck",
      color: "success"
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">System Integration Status</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <Icon name="RefreshCw" size="1rem" />
          <span>Refresh All</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {integrations?.map((integration, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${integration?.color}/10 flex items-center justify-center`}>
                  <Icon name={integration?.icon} size="1.25rem" className={`text-${integration?.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{integration?.name}</h4>
                  <p className="text-xs text-muted-foreground">{integration?.lastSync}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                integration?.status === 'connected' ? 'bg-success' : 'bg-warning animate-pulse'
              }`}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${
                integration?.status === 'connected' ? 'text-success' : 'text-warning'
              }`}>
                {integration?.status === 'connected' ? 'Connected' : 'Syncing'}
              </span>
              <button className="text-xs text-primary hover:underline">
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemIntegrationStatus;