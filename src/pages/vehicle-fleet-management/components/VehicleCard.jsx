import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VehicleCard = ({ vehicle, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'In Service': 'bg-amber-100 text-amber-700 border-amber-200',
      'Inactive': 'bg-slate-100 text-slate-700 border-slate-200',
      'Maintenance': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 80) return 'text-emerald-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-slate-200 bg-white hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Truck" size="1.5rem" className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{vehicle?.make} {vehicle?.model}</h3>
            <p className="text-sm text-slate-600">{vehicle?.year}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(vehicle?.status)}`}>
          {vehicle?.status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">License Plate:</span>
          <span className="font-medium text-slate-900">{vehicle?.licensePlate}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">VIN:</span>
          <span className="font-mono text-xs text-slate-900">{vehicle?.vin}</span>
        </div>
        {vehicle?.assignedDriver && (
          <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
            <span className="text-slate-600">Assigned Driver:</span>
            <div className="flex items-center space-x-2">
              <Image
                src={vehicle?.assignedDriver?.avatar}
                alt={vehicle?.assignedDriver?.avatarAlt}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-slate-900">{vehicle?.assignedDriver?.name}</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between text-sm pt-2">
          <span className="text-slate-600">Utilization:</span>
          <span className={`font-semibold ${getUtilizationColor(vehicle?.utilizationRate)}`}>
            {vehicle?.utilizationRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;