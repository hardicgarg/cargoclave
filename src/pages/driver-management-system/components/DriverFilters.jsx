import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DriverFilters = ({ filters, onFilterChange, onReset }) => {
  const licenseTypeOptions = [
    { value: 'all', label: 'All License Types' },
    { value: 'Class A', label: 'Class A' },
    { value: 'Class B', label: 'Class B' },
    { value: 'Class C', label: 'Class C' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Available', label: 'Available' },
    { value: 'On Trip', label: 'On Trip' },
    { value: 'Off Duty', label: 'Off Duty' },
    { value: 'On Leave', label: 'On Leave' }
  ];

  const certificationOptions = [
    { value: 'all', label: 'All Certifications' },
    { value: 'Valid', label: 'Valid' },
    { value: 'Expiring Soon', label: 'Expiring Soon' },
    { value: 'Expired', label: 'Expired' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5+', label: '4.5+ Stars' },
    { value: '4.0+', label: '4.0+ Stars' },
    { value: '3.5+', label: '3.5+ Stars' },
    { value: '<3.5', label: 'Below 3.5 Stars' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          type="search"
          placeholder="Search by name or license..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          options={licenseTypeOptions}
          value={filters?.licenseType}
          onChange={(value) => onFilterChange('licenseType', value)}
          placeholder="License Type"
        />

        <Select
          options={availabilityOptions}
          value={filters?.availability}
          onChange={(value) => onFilterChange('availability', value)}
          placeholder="Availability"
        />

        <Select
          options={certificationOptions}
          value={filters?.certification}
          onChange={(value) => onFilterChange('certification', value)}
          placeholder="Certification"
        />

        <Select
          options={performanceOptions}
          value={filters?.performance}
          onChange={(value) => onFilterChange('performance', value)}
          placeholder="Performance"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
        <span className="text-sm text-slate-600">
          Showing {filters?.resultCount} drivers
        </span>
        <Button variant="ghost" size="sm" onClick={onReset} iconName="X">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default DriverFilters;