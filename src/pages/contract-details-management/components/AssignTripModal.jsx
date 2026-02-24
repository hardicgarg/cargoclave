import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const AssignTripModal = ({ trip, onClose, onAssign }) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const availableDrivers = [
  {
    value: 'D001',
    label: 'John Mitchell',
    description: 'License: DL-2024-001 | Rating: 4.8/5',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e48bbba3-1763296151273.png",
    avatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing blue uniform shirt'
  },
  {
    value: 'D002',
    label: 'Sarah Johnson',
    description: 'License: DL-2024-002 | Rating: 4.9/5',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_169d718ff-1763301649656.png",
    avatarAlt: 'Professional headshot of African American female driver with curly black hair wearing blue uniform shirt'
  },
  {
    value: 'D003',
    label: 'Michael Chen',
    description: 'License: DL-2024-003 | Rating: 4.7/5',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151f60f91-1763299385526.png",
    avatarAlt: 'Professional headshot of Asian male driver with short black hair wearing blue uniform shirt'
  }];


  const availableVehicles = [
  {
    value: 'V001',
    label: 'TRK-2024-001',
    description: 'Freightliner Cascadia | 20ft Container | Available'
  },
  {
    value: 'V002',
    label: 'TRK-2024-002',
    description: 'Volvo VNL 760 | 40ft Container | Available'
  },
  {
    value: 'V003',
    label: 'TRK-2024-003',
    description: 'Kenworth T680 | 20ft Container | Available'
  }];


  const handleAssign = () => {
    if (selectedDriver && selectedVehicle) {
      onAssign({
        tripId: trip?.tripId,
        driverId: selectedDriver,
        vehicleId: selectedVehicle
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Assign Trip</h2>
            <p className="text-sm text-slate-600 mt-1">Trip ID: {trip?.tripId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">

            <Icon name="X" size="1.25rem" className="text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size="1.25rem" className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Trip Details</p>
                <p>Route: {trip?.route}</p>
                <p>Scheduled: {trip?.scheduledDate}</p>
              </div>
            </div>
          </div>

          <div>
            <Select
              label="Select Driver"
              description="Choose an available driver for this trip"
              placeholder="Select a driver..."
              searchable
              required
              options={availableDrivers}
              value={selectedDriver}
              onChange={setSelectedDriver} />

            
            {selectedDriver &&
            <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                {availableDrivers?.map((driver) => {
                if (driver?.value === selectedDriver) {
                  return (
                    <div key={driver?.value} className="flex items-center space-x-3">
                        <Image
                        src={driver?.avatar}
                        alt={driver?.avatarAlt}
                        className="w-12 h-12 rounded-full object-cover" />

                        <div>
                          <div className="font-medium text-slate-900">{driver?.label}</div>
                          <div className="text-xs text-slate-600">{driver?.description}</div>
                        </div>
                      </div>);

                }
                return null;
              })}
              </div>
            }
          </div>

          <div>
            <Select
              label="Select Vehicle"
              description="Choose an available vehicle for this trip"
              placeholder="Select a vehicle..."
              searchable
              required
              options={availableVehicles}
              value={selectedVehicle}
              onChange={setSelectedVehicle} />

          </div>

          {selectedDriver && selectedVehicle &&
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size="1.25rem" className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-900">
                  <p className="font-medium">Ready to Assign</p>
                  <p className="mt-1">Driver and vehicle are compatible with this trip requirements.</p>
                </div>
              </div>
            </div>
          }
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}>

            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Check"
            iconPosition="left"
            disabled={!selectedDriver || !selectedVehicle}
            onClick={handleAssign}>

            Assign Trip
          </Button>
        </div>
      </div>
    </div>);

};

export default AssignTripModal;