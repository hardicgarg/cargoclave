import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VehicleDetailsPanel = ({ vehicle, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!vehicle) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
        <div className="text-center">
          <Icon name="Truck" size="3rem" className="text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Select a vehicle to view details</p>
          <p className="text-sm text-slate-500 mt-1">Choose from the list on the left</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'trips', label: 'Trip History', icon: 'Route' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Truck" size="2rem" className="text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{vehicle?.make} {vehicle?.model}</h2>
              <p className="text-slate-600">{vehicle?.year} • {vehicle?.licensePlate}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Edit" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" iconName="Trash2" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>

        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon name={tab?.icon} size="1rem" />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && <OverviewTab vehicle={vehicle} />}
        {activeTab === 'maintenance' && <MaintenanceTab vehicle={vehicle} />}
        {activeTab === 'trips' && <TripHistoryTab vehicle={vehicle} />}
        {activeTab === 'documents' && <DocumentsTab vehicle={vehicle} />}
      </div>
    </div>
  );
};

const OverviewTab = ({ vehicle }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'In Service': 'bg-amber-100 text-amber-700 border-amber-200',
      'Inactive': 'bg-slate-100 text-slate-700 border-slate-200',
      'Maintenance': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size="1.125rem" className="text-slate-600" />
            <span className="text-sm text-slate-600">Status</span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium border ${getStatusColor(vehicle?.status)}`}>
            {vehicle?.status}
          </span>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size="1.125rem" className="text-slate-600" />
            <span className="text-sm text-slate-600">Utilization Rate</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{vehicle?.utilizationRate}%</p>
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Vehicle Specifications</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">VIN Number</span>
            <span className="font-mono text-sm text-slate-900">{vehicle?.vin}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">License Plate</span>
            <span className="font-medium text-slate-900">{vehicle?.licensePlate}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Vehicle Type</span>
            <span className="font-medium text-slate-900">{vehicle?.type}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Capacity</span>
            <span className="font-medium text-slate-900">{vehicle?.capacity}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-600">Fuel Type</span>
            <span className="font-medium text-slate-900">{vehicle?.fuelType}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Total Mileage</span>
            <span className="font-medium text-slate-900">{vehicle?.totalMileage?.toLocaleString()} miles</span>
          </div>
        </div>
      </div>
      {vehicle?.assignedDriver && (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Current Assignment</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <Image
                src={vehicle?.assignedDriver?.avatar}
                alt={vehicle?.assignedDriver?.avatarAlt}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{vehicle?.assignedDriver?.name}</h4>
                <p className="text-sm text-slate-600">{vehicle?.assignedDriver?.phone}</p>
                <p className="text-sm text-slate-600">{vehicle?.assignedDriver?.email}</p>
              </div>
              <Button variant="outline" size="sm" iconName="UserX">
                Unassign
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Performance Metrics</h3>
        </div>
        <div className="p-4 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <Icon name="Gauge" size="1.5rem" className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{vehicle?.avgSpeed}</p>
            <p className="text-sm text-slate-600">Avg Speed (mph)</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <Icon name="Fuel" size="1.5rem" className="text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{vehicle?.fuelEfficiency}</p>
            <p className="text-sm text-slate-600">MPG</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <Icon name="Route" size="1.5rem" className="text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{vehicle?.totalTrips}</p>
            <p className="text-sm text-slate-600">Total Trips</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaintenanceTab = ({ vehicle }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size="1.125rem" className="text-emerald-600" />
            <span className="text-sm text-emerald-700 font-medium">Last Service</span>
          </div>
          <p className="text-lg font-bold text-emerald-900">{vehicle?.maintenance?.lastService}</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size="1.125rem" className="text-amber-600" />
            <span className="text-sm text-amber-700 font-medium">Next Service</span>
          </div>
          <p className="text-lg font-bold text-amber-900">{vehicle?.maintenance?.nextService}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size="1.125rem" className="text-slate-600" />
            <span className="text-sm text-slate-600 font-medium">Total Cost</span>
          </div>
          <p className="text-lg font-bold text-slate-900">${vehicle?.maintenance?.totalCost?.toLocaleString()}</p>
        </div>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Maintenance History</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {vehicle?.maintenance?.history?.map((record, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    record?.type === 'Service' ? 'bg-emerald-100' :
                    record?.type === 'Repair' ? 'bg-amber-100' : 'bg-slate-100'
                  }`}>
                    <Icon
                      name={record?.type === 'Service' ? 'Wrench' : record?.type === 'Repair' ? 'AlertTriangle' : 'CheckCircle'}
                      size="1.25rem"
                      className={
                        record?.type === 'Service' ? 'text-emerald-600' :
                        record?.type === 'Repair' ? 'text-amber-600' : 'text-slate-600'
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{record?.description}</h4>
                    <p className="text-sm text-slate-600 mt-1">{record?.details}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-slate-500 flex items-center">
                        <Icon name="Calendar" size="0.875rem" className="mr-1" />
                        {record?.date}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Icon name="MapPin" size="0.875rem" className="mr-1" />
                        {record?.mileage?.toLocaleString()} miles
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">${record?.cost?.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                    record?.type === 'Service' ? 'bg-emerald-100 text-emerald-700' :
                    record?.type === 'Repair' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {record?.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertCircle" size="1.25rem" className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Upcoming Maintenance</h4>
            <p className="text-sm text-amber-700">Next service due in 15 days or 500 miles. Schedule maintenance to avoid downtime.</p>
            <Button variant="warning" size="sm" className="mt-3" iconName="Calendar">
              Schedule Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripHistoryTab = ({ vehicle }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Recent Trips</h3>
        <Button variant="outline" size="sm" iconName="Download">
          Export History
        </Button>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Trip ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Route</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Driver</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Distance</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vehicle?.tripHistory?.map((trip) => (
                <tr key={trip?.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-primary">{trip?.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">{trip?.origin}</p>
                      <p className="text-slate-600 flex items-center mt-1">
                        <Icon name="ArrowDown" size="0.75rem" className="mr-1" />
                        {trip?.destination}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={trip?.driver?.avatar}
                        alt={trip?.driver?.avatarAlt}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-slate-900">{trip?.driver?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{trip?.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{trip?.distance} miles</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      trip?.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      trip?.status === 'In Progress'? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {trip?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DocumentsTab = ({ vehicle }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Vehicle Documents</h3>
        <Button variant="default" size="sm" iconName="Upload">
          Upload Document
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {vehicle?.documents?.map((doc, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  doc?.status === 'Valid' ? 'bg-emerald-100' :
                  doc?.status === 'Expiring Soon' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  <Icon
                    name="FileText"
                    size="1.5rem"
                    className={
                      doc?.status === 'Valid' ? 'text-emerald-600' :
                      doc?.status === 'Expiring Soon' ? 'text-amber-600' : 'text-red-600'
                    }
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{doc?.name}</h4>
                  <p className="text-xs text-slate-600">{doc?.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                doc?.status === 'Valid' ? 'bg-emerald-100 text-emerald-700' :
                doc?.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              }`}>
                {doc?.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Issue Date:</span>
                <span className="font-medium text-slate-900">{doc?.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expiry Date:</span>
                <span className="font-medium text-slate-900">{doc?.expiryDate}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" fullWidth iconName="Eye">
                View
              </Button>
              <Button variant="outline" size="sm" fullWidth iconName="Download">
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetailsPanel;