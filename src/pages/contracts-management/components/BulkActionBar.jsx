import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const driverOptions = [
    { value: 'driver-1', label: 'John Mitchell' },
    { value: 'driver-2', label: 'Sarah Johnson' },
    { value: 'driver-3', label: 'Michael Chen' },
    { value: 'driver-4', label: 'Emily Rodriguez' }
  ];

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size="1.25rem" className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {selectedCount} contract{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            onClick={onClearSelection}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Select
            placeholder="Update status"
            options={statusOptions}
            onChange={(value) => onBulkAction('updateStatus', value)}
            className="w-48"
          />

          <Select
            placeholder="Assign driver"
            options={driverOptions}
            onChange={(value) => onBulkAction('assignDriver', value)}
            className="w-48"
          />

          <Button
            variant="outline"
            size="sm"
            iconName="Flag"
            iconPosition="left"
            iconSize={16}
            onClick={() => onBulkAction('flagPriority')}
          >
            Flag Priority
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            onClick={() => onBulkAction('export')}
          >
            Export
          </Button>

          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
            onClick={() => onBulkAction('delete')}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;