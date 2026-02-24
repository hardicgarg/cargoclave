import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ selectedCount, onClearSelection }) => {
  const [showDriverReassign, setShowDriverReassign] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  const driverOptions = [
    { value: 'john-smith', label: 'John Smith' },
    { value: 'maria-garcia', label: 'Maria Garcia' },
    { value: 'david-chen', label: 'David Chen' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleBulkReassign = () => {
    setShowDriverReassign(true);
  };

  const handleBulkStatusUpdate = () => {
    setShowStatusUpdate(true);
  };

  const handleExport = () => {
    console.log('Exporting selected trips');
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size="1.25rem" className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} trip{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            onClick={onClearSelection}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center gap-2">
          {showDriverReassign && (
            <div className="flex items-center gap-2">
              <Select
                options={driverOptions}
                placeholder="Select driver"
                className="w-48"
              />
              <Button variant="default" size="sm">
                Reassign
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDriverReassign(false)}
              >
                Cancel
              </Button>
            </div>
          )}

          {showStatusUpdate && (
            <div className="flex items-center gap-2">
              <Select
                options={statusOptions}
                placeholder="Select status"
                className="w-48"
              />
              <Button variant="default" size="sm">
                Update
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStatusUpdate(false)}
              >
                Cancel
              </Button>
            </div>
          )}

          {!showDriverReassign && !showStatusUpdate && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Users"
                iconPosition="left"
                onClick={handleBulkReassign}
              >
                Reassign Driver
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleBulkStatusUpdate}
              >
                Update Status
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
              >
                Export
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;