import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-elevated border border-slate-200 px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CheckSquare" size="1.25rem" className="text-primary" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">
                {selectedCount} driver{selectedCount > 1 ? 's' : ''} selected
              </div>
              <button
                onClick={onClearSelection}
                className="text-xs text-primary hover:underline"
              >
                Clear selection
              </button>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              onClick={() => onBulkAction('documents')}
            >
              Request Documents
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              onClick={() => onBulkAction('schedule')}
            >
              Bulk Schedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              onClick={() => onBulkAction('notify')}
            >
              Send Notification
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onBulkAction('export')}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;