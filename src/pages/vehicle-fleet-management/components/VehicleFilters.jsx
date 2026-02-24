import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const VehicleFilters = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'In Service', label: 'In Service' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Maintenance', label: 'Maintenance' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Box Truck', label: 'Box Truck' },
    { value: 'Flatbed', label: 'Flatbed' },
    { value: 'Refrigerated', label: 'Refrigerated' },
    { value: 'Tanker', label: 'Tanker' }
  ];

  const fuelOptions = [
    { value: 'all', label: 'All Fuel Types' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Gasoline', label: 'Gasoline' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by VIN, License Plate..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Filter by status"
        />

        <Select
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          placeholder="Filter by type"
        />

        <Select
          options={fuelOptions}
          value={filters?.fuelType}
          onChange={(value) => onFilterChange('fuelType', value)}
          placeholder="Filter by fuel type"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filters?.resultCount}</span> vehicles
        </p>
        <Button variant="ghost" size="sm" iconName="X" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default VehicleFilters;