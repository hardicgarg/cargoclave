import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceAllocationMap = () => {
  const regions = [
    {
      name: 'North Region',
      drivers: 87,
      vehicles: 112,
      utilization: 92,
      status: 'optimal',
      activeTrips: 78
    },
    {
      name: 'South Region',
      drivers: 94,
      vehicles: 128,
      utilization: 88,
      status: 'optimal',
      activeTrips: 89
    },
    {
      name: 'East Region',
      drivers: 78,
      vehicles: 98,
      utilization: 95,
      status: 'high',
      activeTrips: 74
    },
    {
      name: 'West Region',
      drivers: 83,
      vehicles: 118,
      utilization: 76,
      status: 'low',
      activeTrips: 63
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      optimal: 'bg-success text-success',
      high: 'bg-warning text-warning',
      low: 'bg-primary text-primary'
    };
    return colors?.[status] || colors?.optimal;
  };

  const getStatusLabel = (status) => {
    const labels = {
      optimal: 'Optimal',
      high: 'High Demand',
      low: 'Under-Utilized'
    };
    return labels?.[status] || status;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Resource Allocation</h2>
          <p className="text-sm text-muted-foreground">Regional distribution and utilization</p>
        </div>
        <button className="text-xs text-primary hover:underline">
          Optimize Resources
        </button>
      </div>

      <div className="space-y-4">
        {regions?.map((region, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size="1.25rem" className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{region?.name}</h3>
                  <p className="text-xs text-muted-foreground">{region?.activeTrips} active trips</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(region?.status)}/10`}>
                {getStatusLabel(region?.status)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Users" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Drivers</span>
                </div>
                <p className="text-lg font-bold text-foreground">{region?.drivers}</p>
              </div>
              <div className="bg-card p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Truck" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Vehicles</span>
                </div>
                <p className="text-lg font-bold text-foreground">{region?.vehicles}</p>
              </div>
              <div className="bg-card p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Activity" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Utilization</span>
                </div>
                <p className="text-lg font-bold text-foreground">{region?.utilization}%</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Capacity</span>
                <span className="text-xs font-medium text-foreground">{region?.utilization}%</span>
              </div>
              <div className="w-full bg-card rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    region?.utilization >= 90 ? 'bg-warning' : region?.utilization >= 75 ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${region?.utilization}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceAllocationMap;