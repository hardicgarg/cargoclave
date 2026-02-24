import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import AssignTripModal from './AssignTripModal';

const TripsTab = ({ trips, onAssignTrip, onUpdateStatus }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
      'Scheduled': 'bg-amber-100 text-amber-700 border-amber-200',
      'Delayed': 'bg-red-100 text-red-700 border-red-200',
      'Unassigned': 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return colors?.[status] || colors?.['Unassigned'];
  };

  const handleAssignClick = (trip) => {
    setSelectedTrip(trip);
    setShowAssignModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-slate-900">Associated Trips</h3>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
            {trips?.length} Total
          </span>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => console.log('Create new trip')}
        >
          Create Trip
        </Button>
      </div>
      <div className="space-y-3">
        {trips?.map((trip) => (
          <div
            key={trip?.id}
            className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="Truck" size="1.5rem" className="text-blue-600" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-base font-semibold text-slate-900">{trip?.tripId}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip?.status)}`}>
                      {trip?.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size="0.875rem" />
                      <span>{trip?.scheduledDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size="0.875rem" />
                      <span>{trip?.route}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {trip?.status === 'Unassigned' ? (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={() => handleAssignClick(trip)}
                  >
                    Assign
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => window.location.href = '/trip-details-tracking'}
                  >
                    View Details
                  </Button>
                )}
              </div>
            </div>

            {trip?.driver && trip?.vehicle ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <Image
                    src={trip?.driver?.avatar}
                    alt={trip?.driver?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs text-slate-500">Driver</div>
                    <div className="text-sm font-medium text-slate-900">{trip?.driver?.name}</div>
                    <div className="text-xs text-slate-600">{trip?.driver?.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon name="Truck" size="1.25rem" className="text-slate-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Vehicle</div>
                    <div className="text-sm font-medium text-slate-900">{trip?.vehicle?.number}</div>
                    <div className="text-xs text-slate-600">{trip?.vehicle?.model}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-sm text-amber-600">
                  <Icon name="AlertCircle" size="1rem" />
                  <span>No driver or vehicle assigned yet</span>
                </div>
              </div>
            )}

            {trip?.status === 'In Transit' && trip?.currentLocation && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Icon name="Navigation" size="1rem" className="text-blue-600" />
                    <span>Current Location: {trip?.currentLocation}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MapPin"
                    iconPosition="left"
                  >
                    Track Live
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showAssignModal && (
        <AssignTripModal
          trip={selectedTrip}
          onClose={() => setShowAssignModal(false)}
          onAssign={onAssignTrip}
        />
      )}
    </div>
  );
};

export default TripsTab;