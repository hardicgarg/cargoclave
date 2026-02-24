import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const DriverCard = ({ driver, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'On Trip': 'bg-blue-100 text-blue-700 border-blue-200',
      'Off Duty': 'bg-slate-100 text-slate-700 border-slate-200',
      'On Leave': 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getLicenseStatusColor = (status) => {
    const colors = {
      'Valid': 'text-emerald-600',
      'Expiring Soon': 'text-amber-600',
      'Expired': 'text-red-600'
    };
    return colors?.[status] || 'text-slate-600';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-150 hover:shadow-md ${
        isSelected
          ? 'bg-primary/5 border-primary shadow-sm'
          : 'bg-white border-slate-200 hover:border-primary/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <Image
            src={driver?.avatar}
            alt={driver?.avatarAlt}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              driver?.availability === 'Available' ?'bg-emerald-500'
                : driver?.availability === 'On Trip' ?'bg-blue-500' :'bg-slate-400'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 truncate">
              {driver?.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Icon name="Star" size="0.875rem" className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                {driver?.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-600">{driver?.licenseNumber}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className={`text-xs font-medium ${getLicenseStatusColor(driver?.licenseStatus)}`}>
              {driver?.licenseStatus}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Icon name="Truck" size="0.875rem" className="text-slate-400" />
            <span className="text-xs text-slate-600 truncate">
              {driver?.currentAssignment || 'No active assignment'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                driver?.availability
              )}`}
            >
              {driver?.availability}
            </span>
            <span className="text-xs text-slate-500">
              {driver?.totalTrips} trips
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;