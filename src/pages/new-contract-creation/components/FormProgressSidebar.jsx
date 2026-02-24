import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormProgressSidebar = ({ 
  completedSections, 
  totalSections,
  lastSaved,
  onSaveDraft,
  onLoadTemplate 
}) => {
  const progressPercentage = (completedSections / totalSections) * 100;

  const recentTemplates = [
    { 
      id: 'TPL001', 
      name: 'Standard Electronics Shipment',
      customer: 'Global Logistics Inc.',
      lastUsed: '11/20/2025'
    },
    { 
      id: 'TPL002', 
      name: 'Automotive Parts - West Coast',
      customer: 'Pacific Freight Solutions',
      lastUsed: '11/18/2025'
    },
    { 
      id: 'TPL003', 
      name: 'Pharmaceutical Cold Chain',
      customer: 'TransContinental Shipping',
      lastUsed: '11/15/2025'
    }
  ];

  return (
    <div className="w-80 bg-white border-l border-slate-200 p-6 space-y-6 overflow-y-auto">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Form Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Completion</span>
            <span className="font-semibold text-slate-900">
              {completedSections}/{totalSections} sections
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            {progressPercentage === 100 
              ? 'All sections completed! Ready to submit.' 
              : `${Math.round(progressPercentage)}% complete`}
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-900">Draft Status</h4>
          {lastSaved && (
            <span className="text-xs text-slate-500">
              Saved {lastSaved}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          iconName="Save"
          iconPosition="left"
          onClick={onSaveDraft}
          fullWidth
        >
          Save Draft
        </Button>
        <p className="text-xs text-slate-500 mt-2">
          Auto-save enabled. Last saved 2 minutes ago.
        </p>
      </div>
      <div className="border-t border-slate-200 pt-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          Recent Templates
        </h4>
        <div className="space-y-2">
          {recentTemplates?.map((template) => (
            <button
              key={template?.id}
              onClick={() => onLoadTemplate(template?.id)}
              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600">
                    {template?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {template?.customer}
                  </p>
                </div>
                <Icon 
                  name="Copy" 
                  size="1rem" 
                  className="text-slate-400 group-hover:text-blue-600 flex-shrink-0 ml-2"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Used {template?.lastUsed}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 pt-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <Button
            variant="ghost"
            iconName="Upload"
            iconPosition="left"
            fullWidth
            size="sm"
          >
            Import from CSV
          </Button>
          <Button
            variant="ghost"
            iconName="Copy"
            iconPosition="left"
            fullWidth
            size="sm"
          >
            Duplicate Contract
          </Button>
          <Button
            variant="ghost"
            iconName="FileText"
            iconPosition="left"
            fullWidth
            size="sm"
          >
            View Guidelines
          </Button>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size="1.25rem" className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Pro Tip</p>
            <p className="text-xs text-blue-700">
              Save time by creating templates for frequently used contract configurations. Templates can be managed in Settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgressSidebar;