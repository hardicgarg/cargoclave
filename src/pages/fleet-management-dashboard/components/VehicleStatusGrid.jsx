import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const VehicleStatusGrid = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const vehicles = [
    {
      id: 'VEH-001',
      plateNumber: 'CA-2847-XY',
      type: 'Box Truck',
      model: 'Freightliner M2',
      year: 2023,
      status: 'active',
      location: 'Los Angeles, CA',
      driver: 'John Martinez',
      mileage: 45234,
      fuelLevel: 78,
      condition: 'excellent',
      lastMaintenance: '2025-11-15',
      nextMaintenance: '2025-12-15',
      utilizationRate: 92.5
    },
    {
      id: 'VEH-002',
      plateNumber: 'TX-9123-AB',
      type: 'Refrigerated',
      model: 'Kenworth T680',
      year: 2022,
      status: 'active',
      location: 'Houston, TX',
      driver: 'Sarah Johnson',
      mileage: 67891,
      fuelLevel: 45,
      condition: 'good',
      lastMaintenance: '2025-11-10',
      nextMaintenance: '2025-12-10',
      utilizationRate: 88.3
    },
    {
      id: 'VEH-003',
      plateNumber: 'NY-4567-CD',
      type: 'Flatbed',
      model: 'Peterbilt 579',
      year: 2021,
      status: 'maintenance',
      location: 'Maintenance Bay 3',
      driver: null,
      mileage: 89234,
      fuelLevel: 65,
      condition: 'fair',
      lastMaintenance: '2025-11-26',
      nextMaintenance: '2026-01-26',
      utilizationRate: 0
    },
    {
      id: 'VEH-004',
      plateNumber: 'FL-7890-EF',
      type: 'Tanker',
      model: 'Mack Anthem',
      year: 2024,
      status: 'active',
      location: 'Miami, FL',
      driver: 'Michael Chen',
      mileage: 23456,
      fuelLevel: 91,
      condition: 'excellent',
      lastMaintenance: '2025-11-20',
      nextMaintenance: '2025-12-20',
      utilizationRate: 95.7
    },
    {
      id: 'VEH-005',
      plateNumber: 'IL-3456-GH',
      type: 'Box Truck',
      model: 'International Durastar',
      year: 2020,
      status: 'idle',
      location: 'Chicago Depot',
      driver: null,
      mileage: 112345,
      fuelLevel: 34,
      condition: 'good',
      lastMaintenance: '2025-11-05',
      nextMaintenance: '2025-12-05',
      utilizationRate: 0
    },
    {
      id: 'VEH-006',
      plateNumber: 'WA-8901-IJ',
      type: 'Refrigerated',
      model: 'Volvo VNL',
      year: 2019,
      status: 'out-of-service',
      location: 'Seattle Service Center',
      driver: null,
      mileage: 145678,
      fuelLevel: 12,
      condition: 'poor',
      lastMaintenance: '2025-11-25',
      nextMaintenance: '2026-02-25',
      utilizationRate: 0
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      active: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', label: 'Active' },
      maintenance: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', label: 'Maintenance' },
      idle: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border', label: 'Idle' },
      'out-of-service': { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20', label: 'Out of Service' }
    };
    return configs?.[status] || configs?.idle;
  };

  const getConditionConfig = (condition) => {
    const configs = {
      excellent: { color: 'text-success', icon: 'Star' },
      good: { color: 'text-primary', icon: 'ThumbsUp' },
      fair: { color: 'text-warning', icon: 'AlertTriangle' },
      poor: { color: 'text-destructive', icon: 'AlertOctagon' }
    };
    return configs?.[condition] || configs?.good;
  };

  const getFuelLevelColor = (level) => {
    if (level >= 70) return 'text-success';
    if (level >= 30) return 'text-warning';
    return 'text-destructive';
  };

  const filteredVehicles = vehicles?.filter(vehicle => {
    const matchesSearch = vehicle?.plateNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         vehicle?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         vehicle?.type?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicle-fleet-management?vehicleId=${vehicleId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Vehicle Status Grid</h2>
        <div className="flex items-center gap-2">
          <Icon name="Truck" size="1.25rem" className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{filteredVehicles?.length} Vehicles</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size="1.125rem" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by plate number, ID, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
          {['all', 'active', 'maintenance', 'idle', 'out-of-service']?.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                statusFilter === status
                  ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredVehicles?.map((vehicle) => {
          const statusConfig = getStatusConfig(vehicle?.status);
          const conditionConfig = getConditionConfig(vehicle?.condition);
          
          return (
            <div
              key={vehicle?.id}
              onClick={() => handleVehicleClick(vehicle?.id)}
              className="bg-background border border-border rounded-lg p-4 hover:border-primary hover:shadow-elevated transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{vehicle?.plateNumber}</h3>
                    <Icon name={conditionConfig?.icon} size="1rem" className={conditionConfig?.color} />
                  </div>
                  <p className="text-xs text-muted-foreground">{vehicle?.id} • {vehicle?.type}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${statusConfig?.bg} ${statusConfig?.text} ${statusConfig?.border}`}>
                  {statusConfig?.label}
                </span>
              </div>

              {/* Vehicle Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Model</p>
                  <p className="text-sm font-medium text-foreground">{vehicle?.model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Year</p>
                  <p className="text-sm font-medium text-foreground">{vehicle?.year}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mileage</p>
                  <p className="text-sm font-medium text-foreground">{vehicle?.mileage?.toLocaleString()} mi</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Utilization</p>
                  <p className="text-sm font-medium text-foreground">{vehicle?.utilizationRate}%</p>
                </div>
              </div>

              {/* Fuel Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Fuel" size="0.875rem" className={getFuelLevelColor(vehicle?.fuelLevel)} />
                    <span className="text-xs text-muted-foreground">Fuel Level</span>
                  </div>
                  <span className={`text-xs font-semibold ${getFuelLevelColor(vehicle?.fuelLevel)}`}>
                    {vehicle?.fuelLevel}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      vehicle?.fuelLevel >= 70 ? 'bg-success' :
                      vehicle?.fuelLevel >= 30 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${vehicle?.fuelLevel}%` }}
                  />
                </div>
              </div>

              {/* Location and Driver */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="MapPin" size="0.75rem" className="text-muted-foreground" />
                  <span className="text-muted-foreground">{vehicle?.location}</span>
                </div>
                {vehicle?.driver && (
                  <div className="flex items-center gap-2 text-xs">
                    <Icon name="User" size="0.75rem" className="text-muted-foreground" />
                    <span className="text-muted-foreground">{vehicle?.driver}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  <Icon name="Calendar" size="0.75rem" className="text-muted-foreground" />
                  <span className="text-muted-foreground">Next Service: {vehicle?.nextMaintenance}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleStatusGrid;