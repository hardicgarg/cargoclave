import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ filters, onFilterChange, onResetFilters, onSavePreset }) => {
  const [presetName, setPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  const customerOptions = [
    { value: 'acme-corp', label: 'Acme Corporation' },
    { value: 'global-logistics', label: 'Global Logistics Inc.' },
    { value: 'swift-transport', label: 'Swift Transport Co.' },
    { value: 'mega-freight', label: 'Mega Freight Solutions' },
    { value: 'prime-shipping', label: 'Prime Shipping Ltd.' }
  ];

  const commodityOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'automotive', label: 'Automotive Parts' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'machinery', label: 'Machinery' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const savedPresets = [
    { value: 'active-contracts', label: 'Active Contracts' },
    { value: 'pending-approval', label: 'Pending Approval' },
    { value: 'high-priority', label: 'High Priority' },
    { value: 'this-month', label: 'This Month' }
  ];

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName);
      setPresetName('');
      setShowSavePreset(false);
    }
  };

  return (
    <div className="h-full bg-card border-r border-border overflow-y-auto">
      <div className="p-6 border-b border-border bg-primary/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Filter" size="1.25rem" className="mr-2 text-primary" />
            Filters
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            iconName="RotateCcw"
            iconSize={16}
          >
            Reset
          </Button>
        </div>

        <Select
          label="Saved Presets"
          placeholder="Load saved filter"
          options={savedPresets}
          value={filters?.preset || ''}
          onChange={(value) => onFilterChange('preset', value)}
          className="mb-4"
        />

        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          onClick={() => setShowSavePreset(!showSavePreset)}
        >
          Save Current Filters
        </Button>

        {showSavePreset && (
          <div className="mt-3 p-3 bg-muted rounded-lg animate-fade-in">
            <Input
              type="text"
              placeholder="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e?.target?.value)}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="xs"
                onClick={handleSavePreset}
                disabled={!presetName?.trim()}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => {
                  setShowSavePreset(false);
                  setPresetName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Date Range
          </label>
          <Input
            type="date"
            label="From Date"
            value={filters?.startDate || ''}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
            className="mb-3"
          />
          <Input
            type="date"
            label="To Date"
            value={filters?.endDate || ''}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>

        <div>
          <Select
            label="Customer"
            placeholder="Select customers"
            options={customerOptions}
            value={filters?.customers || []}
            onChange={(value) => onFilterChange('customers', value)}
            multiple
            searchable
            clearable
          />
        </div>

        <div>
          <Select
            label="Commodity Type"
            placeholder="Select commodities"
            options={commodityOptions}
            value={filters?.commodities || []}
            onChange={(value) => onFilterChange('commodities', value)}
            multiple
            searchable
            clearable
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Contract Status
          </label>
          <div className="space-y-2">
            {statusOptions?.map((status) => (
              <Checkbox
                key={status?.value}
                label={status?.label}
                checked={filters?.statuses?.includes(status?.value) || false}
                onChange={(e) => {
                  const currentStatuses = filters?.statuses || [];
                  const newStatuses = e?.target?.checked
                    ? [...currentStatuses, status?.value]
                    : currentStatuses?.filter((s) => s !== status?.value);
                  onFilterChange('statuses', newStatuses);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <Input
            type="number"
            label="Min Contract Value ($)"
            placeholder="0"
            value={filters?.minValue || ''}
            onChange={(e) => onFilterChange('minValue', e?.target?.value)}
            className="mb-3"
          />
          <Input
            type="number"
            label="Max Contract Value ($)"
            placeholder="1000000"
            value={filters?.maxValue || ''}
            onChange={(e) => onFilterChange('maxValue', e?.target?.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Priority Level
          </label>
          <div className="space-y-2">
            <Checkbox
              label="High Priority"
              checked={filters?.priorities?.includes('high') || false}
              onChange={(e) => {
                const currentPriorities = filters?.priorities || [];
                const newPriorities = e?.target?.checked
                  ? [...currentPriorities, 'high']
                  : currentPriorities?.filter((p) => p !== 'high');
                onFilterChange('priorities', newPriorities);
              }}
            />
            <Checkbox
              label="Medium Priority"
              checked={filters?.priorities?.includes('medium') || false}
              onChange={(e) => {
                const currentPriorities = filters?.priorities || [];
                const newPriorities = e?.target?.checked
                  ? [...currentPriorities, 'medium']
                  : currentPriorities?.filter((p) => p !== 'medium');
                onFilterChange('priorities', newPriorities);
              }}
            />
            <Checkbox
              label="Low Priority"
              checked={filters?.priorities?.includes('low') || false}
              onChange={(e) => {
                const currentPriorities = filters?.priorities || [];
                const newPriorities = e?.target?.checked
                  ? [...currentPriorities, 'low']
                  : currentPriorities?.filter((p) => p !== 'low');
                onFilterChange('priorities', newPriorities);
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Integration Status
          </label>
          <div className="space-y-2">
            <Checkbox
              label="ERP Synced"
              checked={filters?.erpSynced || false}
              onChange={(e) => onFilterChange('erpSynced', e?.target?.checked)}
            />
            <Checkbox
              label="Accounting Synced"
              checked={filters?.accountingSynced || false}
              onChange={(e) => onFilterChange('accountingSynced', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;