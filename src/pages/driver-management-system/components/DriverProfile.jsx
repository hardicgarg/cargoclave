import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DriverProfile = ({ driver, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'trips', label: 'Trip History', icon: 'Truck' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Valid': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Expiring Soon': 'bg-amber-100 text-amber-700 border-amber-200',
      'Expired': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Driver Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        <div className="flex items-start gap-4">
          <Image
            src={driver?.avatar}
            alt={driver?.avatarAlt}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {driver?.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
              <span>{driver?.licenseNumber}</span>
              <span className="text-slate-400">•</span>
              <span>{driver?.licenseType}</span>
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1">
                <Icon name="Star" size="0.875rem" className="text-amber-500 fill-amber-500" />
                <span className="font-medium">{driver?.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                  driver?.licenseStatus
                )}`}
              >
                License: {driver?.licenseStatus}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-blue-100 text-blue-700 border-blue-200">
                {driver?.availability}
              </span>
            </div>
          </div>
          <Button
            variant={isEditing ? 'outline' : 'default'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? 'X' : 'Edit'}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-1 -mb-px">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon name={tab?.icon} size="1rem" />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <OverviewTab driver={driver} isEditing={isEditing} />
        )}
        {activeTab === 'documents' && <DocumentsTab driver={driver} />}
        {activeTab === 'performance' && <PerformanceTab driver={driver} />}
        {activeTab === 'schedule' && <ScheduleTab driver={driver} />}
        {activeTab === 'trips' && <TripHistoryTab driver={driver} />}
      </div>
    </div>
  );
};

const OverviewTab = ({ driver, isEditing }) => {
  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="User" size="1rem" className="text-primary" />
          Personal Information
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={driver?.name}
            disabled={!isEditing}
          />
          <Input
            label="Date of Birth"
            type="date"
            value={driver?.dateOfBirth}
            disabled={!isEditing}
          />
          <Select
            label="Blood Group"
            options={bloodGroupOptions}
            value={driver?.bloodGroup}
            disabled={!isEditing}
          />
          <Input
            label="Phone Number"
            type="tel"
            value={driver?.phone}
            disabled={!isEditing}
          />
          <Input
            label="Email Address"
            type="email"
            value={driver?.email}
            disabled={!isEditing}
            className="col-span-2"
          />
          <Input
            label="Address"
            value={driver?.address}
            disabled={!isEditing}
            className="col-span-2"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="CreditCard" size="1rem" className="text-primary" />
          License Information
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="License Number"
            value={driver?.licenseNumber}
            disabled={!isEditing}
          />
          <Input
            label="License Type"
            value={driver?.licenseType}
            disabled={!isEditing}
          />
          <Input
            label="Issue Date"
            type="date"
            value={driver?.licenseIssueDate}
            disabled={!isEditing}
          />
          <Input
            label="Expiry Date"
            type="date"
            value={driver?.licenseExpiryDate}
            disabled={!isEditing}
          />
          <Input
            label="Issuing Authority"
            value={driver?.licenseAuthority}
            disabled={!isEditing}
            className="col-span-2"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="Briefcase" size="1rem" className="text-primary" />
          Employment Details
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Employee ID"
            value={driver?.employeeId}
            disabled
          />
          <Input
            label="Join Date"
            type="date"
            value={driver?.joinDate}
            disabled={!isEditing}
          />
          <Input
            label="Experience (Years)"
            type="number"
            value={driver?.experience}
            disabled={!isEditing}
          />
          <Input
            label="Total Trips"
            type="number"
            value={driver?.totalTrips}
            disabled
          />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="Phone" size="1rem" className="text-primary" />
          Emergency Contact
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contact Name"
            value={driver?.emergencyContactName}
            disabled={!isEditing}
          />
          <Input
            label="Relationship"
            value={driver?.emergencyContactRelation}
            disabled={!isEditing}
          />
          <Input
            label="Phone Number"
            type="tel"
            value={driver?.emergencyContactPhone}
            disabled={!isEditing}
            className="col-span-2"
          />
        </div>
      </div>
    </div>
  );
};

const DocumentsTab = ({ driver }) => {
  const documents = [
    {
      id: 1,
      name: 'Driving License',
      type: 'License',
      status: 'Valid',
      uploadDate: '2024-01-15',
      expiryDate: '2026-01-15',
      fileUrl: driver?.licenseDocument
    },
    {
      id: 2,
      name: 'Medical Certificate',
      type: 'Medical',
      status: 'Valid',
      uploadDate: '2024-06-20',
      expiryDate: '2025-06-20',
      fileUrl: driver?.medicalCertificate
    },
    {
      id: 3,
      name: 'Background Check',
      type: 'Verification',
      status: 'Valid',
      uploadDate: '2024-01-10',
      expiryDate: 'N/A',
      fileUrl: driver?.backgroundCheck
    },
    {
      id: 4,
      name: 'Hazmat Certification',
      type: 'Training',
      status: 'Expiring Soon',
      uploadDate: '2023-11-05',
      expiryDate: '2025-11-05',
      fileUrl: driver?.hazmatCert
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Valid': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Expiring Soon': 'bg-amber-100 text-amber-700 border-amber-200',
      'Expired': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-900">
          Document Management
        </h4>
        <Button variant="default" size="sm" iconName="Upload">
          Upload Document
        </Button>
      </div>
      {documents?.map((doc) => (
        <div
          key={doc?.id}
          className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size="1.25rem" className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-slate-900 mb-1">{doc?.name}</h5>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                  <span>{doc?.type}</span>
                  <span className="text-slate-400">•</span>
                  <span>Uploaded: {doc?.uploadDate}</span>
                  {doc?.expiryDate !== 'N/A' && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span>Expires: {doc?.expiryDate}</span>
                    </>
                  )}
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                    doc?.status
                  )}`}
                >
                  {doc?.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" iconName="Download" />
              <Button variant="ghost" size="icon" iconName="Eye" />
              <Button variant="ghost" size="icon" iconName="Trash2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PerformanceTab = ({ driver }) => {
  const metrics = [
    {
      label: 'On-Time Delivery',
      value: '96%',
      trend: '+2%',
      icon: 'Clock',
      color: 'text-emerald-600'
    },
    {
      label: 'Customer Rating',
      value: driver?.rating,
      trend: '+0.2',
      icon: 'Star',
      color: 'text-amber-600'
    },
    {
      label: 'Fuel Efficiency',
      value: '8.2 MPG',
      trend: '+0.5',
      icon: 'Fuel',
      color: 'text-blue-600'
    },
    {
      label: 'Safety Score',
      value: '98%',
      trend: '+1%',
      icon: 'Shield',
      color: 'text-purple-600'
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      date: '2024-10-15',
      type: 'Minor Delay',
      description: 'Traffic congestion on Route 66',
      severity: 'Low',
      status: 'Resolved'
    },
    {
      id: 2,
      date: '2024-09-22',
      type: 'Customer Complaint',
      description: 'Late delivery notification',
      severity: 'Medium',
      status: 'Resolved'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {metrics?.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center ${metric?.color}`}>
                <Icon name={metric?.icon} size="1.25rem" />
              </div>
              <span className="text-xs font-medium text-emerald-600">
                {metric?.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {metric?.value}
            </div>
            <div className="text-sm text-slate-600">{metric?.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Icon name="AlertTriangle" size="1rem" className="text-primary" />
          Recent Incidents
        </h4>
        <div className="space-y-3">
          {recentIncidents?.map((incident) => (
            <div
              key={incident?.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertCircle" size="1rem" className="text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-medium text-slate-900 text-sm">
                    {incident?.type}
                  </h5>
                  <span className="text-xs text-slate-500">{incident?.date}</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  {incident?.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200">
                    {incident?.severity}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-emerald-100 text-emerald-700 border-emerald-200">
                    {incident?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScheduleTab = ({ driver }) => {
  const schedule = [
    {
      date: '2024-11-27',
      status: 'On Trip',
      tripId: 'TRP-2024-1156',
      route: 'Los Angeles, CA → Phoenix, AZ',
      startTime: '06:00 AM',
      endTime: '02:00 PM'
    },
    {
      date: '2024-11-28',
      status: 'Scheduled',
      tripId: 'TRP-2024-1189',
      route: 'Phoenix, AZ → Albuquerque, NM',
      startTime: '07:00 AM',
      endTime: '03:00 PM'
    },
    {
      date: '2024-11-29',
      status: 'Available',
      tripId: null,
      route: 'Rest Day',
      startTime: null,
      endTime: null
    },
    {
      date: '2024-11-30',
      status: 'Scheduled',
      tripId: 'TRP-2024-1201',
      route: 'Albuquerque, NM → Dallas, TX',
      startTime: '05:00 AM',
      endTime: '04:00 PM'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'On Trip': 'bg-blue-100 text-blue-700 border-blue-200',
      'Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
      'Available': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-900">
          Weekly Schedule
        </h4>
        <Button variant="default" size="sm" iconName="Plus">
          Assign Trip
        </Button>
      </div>
      {schedule?.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-slate-200 p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-medium text-slate-900 mb-1">
                {new Date(day.date)?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                  day?.status
                )}`}
              >
                {day?.status}
              </span>
            </div>
            {day?.tripId && (
              <span className="text-sm font-medium text-primary">
                {day?.tripId}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="MapPin" size="1rem" className="text-slate-400" />
            <span>{day?.route}</span>
          </div>

          {day?.startTime && (
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size="1rem" className="text-slate-400" />
                <span>{day?.startTime}</span>
              </div>
              <span className="text-slate-400">→</span>
              <span>{day?.endTime}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const TripHistoryTab = ({ driver }) => {
  const trips = [
    {
      id: 'TRP-2024-1089',
      date: '2024-11-20',
      route: 'Los Angeles, CA → San Francisco, CA',
      distance: '382 miles',
      duration: '6h 15m',
      status: 'Completed',
      rating: 4.8,
      onTime: true
    },
    {
      id: 'TRP-2024-1045',
      date: '2024-11-18',
      route: 'San Diego, CA → Phoenix, AZ',
      distance: '355 miles',
      duration: '5h 45m',
      status: 'Completed',
      rating: 4.9,
      onTime: true
    },
    {
      id: 'TRP-2024-0998',
      date: '2024-11-15',
      route: 'Phoenix, AZ → Las Vegas, NV',
      distance: '297 miles',
      duration: '4h 30m',
      status: 'Completed',
      rating: 4.7,
      onTime: false
    },
    {
      id: 'TRP-2024-0956',
      date: '2024-11-12',
      route: 'Las Vegas, NV → Salt Lake City, UT',
      distance: '420 miles',
      duration: '6h 45m',
      status: 'Completed',
      rating: 5.0,
      onTime: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-900">
          Recent Trips ({driver?.totalTrips} total)
        </h4>
        <Button variant="outline" size="sm" iconName="Download">
          Export History
        </Button>
      </div>
      {trips?.map((trip) => (
        <div
          key={trip?.id}
          className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-primary">{trip?.id}</span>
                <span className="text-xs text-slate-500">{trip?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Icon name="MapPin" size="0.875rem" className="text-slate-400" />
                <span>{trip?.route}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size="0.875rem" className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-slate-700">
                {trip?.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <Icon name="Route" size="0.875rem" className="text-slate-400" />
                <span>{trip?.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size="0.875rem" className="text-slate-400" />
                <span>{trip?.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {trip?.onTime && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-emerald-100 text-emerald-700 border-emerald-200">
                  On Time
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-slate-100 text-slate-700 border-slate-200">
                {trip?.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriverProfile;