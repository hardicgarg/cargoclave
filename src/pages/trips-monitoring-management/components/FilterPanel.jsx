import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const customerOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'acme-corp', label: 'Acme Corporation' },
    { value: 'global-logistics', label: 'Global Logistics Inc.' },
    { value: 'swift-transport', label: 'Swift Transport Co.' },
    { value: 'prime-shipping', label: 'Prime Shipping Ltd.' },
    { value: 'express-cargo', label: 'Express Cargo Services' }
  ];

  const driverOptions = [
    { value: 'all', label: 'All Drivers' },
    { value: 'john-smith', label: 'John Smith' },
    { value: 'maria-garcia', label: 'Maria Garcia' },
    { value: 'david-chen', label: 'David Chen' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'michael-brown', label: 'Michael Brown' }
  ];

  const vehicleOptions = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'TRK-001', label: 'TRK-001 - Volvo FH16' },
    { value: 'TRK-002', label: 'TRK-002 - Mercedes Actros' },
    { value: 'TRK-003', label: 'TRK-003 - Scania R500' },
    { value: 'TRK-004', label: 'TRK-004 - MAN TGX' },
    { value: 'TRK-005', label: 'TRK-005 - DAF XF' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', checked: filters?.status?.includes('scheduled') },
    { value: 'in-transit', label: 'In Transit', checked: filters?.status?.includes('in-transit') },
    { value: 'at-checkpoint', label: 'At Checkpoint', checked: filters?.status?.includes('at-checkpoint') },
    { value: 'delayed', label: 'Delayed', checked: filters?.status?.includes('delayed') },
    { value: 'completed', label: 'Completed', checked: filters?.status?.includes('completed') },
    { value: 'cancelled', label: 'Cancelled', checked: filters?.status?.includes('cancelled') }
  ];

  const handleStatusChange = (statusValue, checked) => {
    const newStatus = checked
      ? [...filters?.status, statusValue]
      : filters?.status?.filter(s => s !== statusValue);
    onFilterChange('status', newStatus);
  };

  return (
    <div className="bg-card border-r border-border h-full overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Icon name="Filter" size="1.25rem" className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-colors"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size="1.25rem" />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-6">
          <div>
            <Input
              label="Trip ID"
              type="text"
              placeholder="Search by Trip ID"
              value={filters?.tripId}
              onChange={(e) => onFilterChange('tripId', e?.target?.value)}
            />
          </div>

          <div>
            <Select
              label="Customer"
              options={customerOptions}
              value={filters?.customer}
              onChange={(value) => onFilterChange('customer', value)}
              searchable
            />
          </div>

          <div>
            <Select
              label="Driver"
              options={driverOptions}
              value={filters?.driver}
              onChange={(value) => onFilterChange('driver', value)}
              searchable
            />
          </div>

          <div>
            <Select
              label="Vehicle"
              options={vehicleOptions}
              value={filters?.vehicle}
              onChange={(value) => onFilterChange('vehicle', value)}
              searchable
            />
          </div>

          <div>
            <Input
              label="Start Date"
              type="date"
              value={filters?.startDate}
              onChange={(e) => onFilterChange('startDate', e?.target?.value)}
            />
          </div>

          <div>
            <Input
              label="End Date"
              type="date"
              value={filters?.endDate}
              onChange={(e) => onFilterChange('endDate', e?.target?.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions?.map((status) => (
                <Checkbox
                  key={status?.value}
                  label={status?.label}
                  checked={status?.checked}
                  onChange={(e) => handleStatusChange(status?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-2 border-t border-border">
            <Button
              variant="default"
              fullWidth
              onClick={onApplyFilters}
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={onResetFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;