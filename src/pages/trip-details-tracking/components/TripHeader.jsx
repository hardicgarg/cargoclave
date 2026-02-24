import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripHeader = ({ tripData, onEmergencyAction, onReassign, onModifyRoute }) => {
  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'bg-blue-100 text-blue-800 border-blue-200',
      'Delayed': 'bg-amber-100 text-amber-800 border-amber-200',
      'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200',
      'Scheduled': 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-amber-100 text-amber-800 border-amber-200',
      'Low': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors?.[priority] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-slate-900">
              {tripData?.tripId}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tripData?.status)}`}>
              {tripData?.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(tripData?.priority)}`}>
              {tripData?.priority} Priority
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Icon name="Building2" size="1rem" />
              <span>{tripData?.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Package" size="1rem" />
              <span>{tripData?.commodityName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size="1rem" />
              <span>{tripData?.scheduledDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size="1rem" />
              <span>{tripData?.distance} km</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={onEmergencyAction}
          >
            Emergency
          </Button>
          <Button
            variant="outline"
            iconName="UserCog"
            iconPosition="left"
            onClick={onReassign}
          >
            Reassign
          </Button>
          <Button
            variant="outline"
            iconName="Route"
            iconPosition="left"
            onClick={onModifyRoute}
          >
            Modify Route
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripHeader;