import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    user: '',
    actionType: [],
    module: '',
    severity: '',
    ipAddress: '',
    savedPreset: ''
  });

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'john.doe@cargoclave.com', label: 'John Doe (Operations Manager)' },
    { value: 'sarah.smith@cargoclave.com', label: 'Sarah Smith (Dispatcher)' },
    { value: 'mike.johnson@cargoclave.com', label: 'Mike Johnson (Fleet Coordinator)' },
    { value: 'emily.davis@cargoclave.com', label: 'Emily Davis (Compliance Officer)' },
    { value: 'admin@cargoclave.com', label: 'System Administrator' }
  ];

  const actionTypeOptions = [
    { value: 'create', label: 'Create' },
    { value: 'read', label: 'Read' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
    { value: 'export', label: 'Data Export' },
    { value: 'config', label: 'Configuration Change' }
  ];

  const moduleOptions = [
    { value: 'all', label: 'All Modules' },
    { value: 'contracts', label: 'Contracts' },
    { value: 'trips', label: 'Trips' },
    { value: 'drivers', label: 'Drivers' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'customers', label: 'Customers' },
    { value: 'commodities', label: 'Commodities' },
    { value: 'auth', label: 'Authentication' },
    { value: 'system', label: 'System Settings' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severity Levels' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const savedPresetOptions = [
    { value: '', label: 'No Preset Selected' },
    { value: 'compliance_monthly', label: 'Monthly Compliance Report' },
    { value: 'security_alerts', label: 'Security Alerts' },
    { value: 'user_activity', label: 'User Activity Summary' },
    { value: 'data_exports', label: 'Data Export Tracking' },
    { value: 'config_changes', label: 'Configuration Changes' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateFrom: '',
      dateTo: '',
      user: '',
      actionType: [],
      module: '',
      severity: '',
      ipAddress: '',
      savedPreset: ''
    };
    setFilters(resetFilters);
    onResetFilters();
  };

  const handleLoadPreset = (presetValue) => {
    if (!presetValue) return;

    const presets = {
      compliance_monthly: {
        dateFrom: '2025-11-01',
        dateTo: '2025-11-30',
        actionType: ['create', 'update', 'delete'],
        module: 'all',
        severity: 'all'
      },
      security_alerts: {
        dateFrom: '2025-11-20',
        dateTo: '2025-11-27',
        actionType: ['login', 'logout', 'export'],
        severity: 'high'
      },
      user_activity: {
        dateFrom: '2025-11-01',
        dateTo: '2025-11-27',
        actionType: ['create', 'read', 'update', 'delete']
      },
      data_exports: {
        dateFrom: '2025-11-01',
        dateTo: '2025-11-27',
        actionType: ['export'],
        module: 'all'
      },
      config_changes: {
        dateFrom: '2025-11-01',
        dateTo: '2025-11-27',
        actionType: ['config'],
        severity: 'medium'
      }
    };

    const preset = presets?.[presetValue];
    if (preset) {
      setFilters(prev => ({
        ...prev,
        ...preset,
        savedPreset: presetValue
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        <Icon name="Filter" size="1.25rem" className="text-slate-500" />
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Saved Presets</h3>
          <Select
            options={savedPresetOptions}
            value={filters?.savedPreset}
            onChange={(value) => {
              handleFilterChange('savedPreset', value);
              handleLoadPreset(value);
            }}
            placeholder="Load saved filter preset"
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Date Range</h3>
          <div className="space-y-3">
            <Input
              type="date"
              label="From Date"
              value={filters?.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              max="2025-11-27"
            />
            <Input
              type="date"
              label="To Date"
              value={filters?.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              max="2025-11-27"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">User & Access</h3>
          <div className="space-y-3">
            <Select
              label="User"
              options={userOptions}
              value={filters?.user}
              onChange={(value) => handleFilterChange('user', value)}
              placeholder="Select user"
              searchable
            />
            <Input
              type="text"
              label="IP Address"
              placeholder="e.g., 192.168.1.1"
              value={filters?.ipAddress}
              onChange={(e) => handleFilterChange('ipAddress', e?.target?.value)}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Activity Type</h3>
          <Select
            label="Action Type"
            options={actionTypeOptions}
            value={filters?.actionType}
            onChange={(value) => handleFilterChange('actionType', value)}
            placeholder="Select action types"
            multiple
            searchable
          />
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Module & Severity</h3>
          <div className="space-y-3">
            <Select
              label="Module"
              options={moduleOptions}
              value={filters?.module}
              onChange={(value) => handleFilterChange('module', value)}
              placeholder="Select module"
            />
            <Select
              label="Severity Level"
              options={severityOptions}
              value={filters?.severity}
              onChange={(value) => handleFilterChange('severity', value)}
              placeholder="Select severity"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex gap-3">
          <Button
            variant="default"
            fullWidth
            iconName="Search"
            iconPosition="left"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;