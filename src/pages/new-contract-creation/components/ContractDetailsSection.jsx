import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContractDetailsSection = ({ isExpanded, onToggle }) => {
  const serviceTypeOptions = [
    { value: 'standard', label: 'Standard Delivery', description: '5-7 business days' },
    { value: 'express', label: 'Express Delivery', description: '2-3 business days' },
    { value: 'priority', label: 'Priority Delivery', description: 'Next day delivery' },
    { value: 'economy', label: 'Economy Delivery', description: '10-14 business days' }
  ];

  const paymentTermsOptions = [
    { value: 'net30', label: 'Net 30 Days' },
    { value: 'net60', label: 'Net 60 Days' },
    { value: 'advance', label: 'Advance Payment' },
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'credit', label: 'Credit Terms' }
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Icon name="FileText" size="1.25rem" className="text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-900">Contract Details</h3>
            <p className="text-sm text-slate-500">Service level and payment terms</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size="1.25rem" 
          className="text-slate-400"
        />
      </button>
      {isExpanded && (
        <div className="px-6 py-6 border-t border-slate-200 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contract ID"
              type="text"
              placeholder="Auto-generated"
              disabled
              description="System will generate unique ID"
            />
            <Input
              label="Contract Date"
              type="date"
              defaultValue={new Date()?.toISOString()?.split('T')?.[0]}
              required
            />
          </div>

          <Select
            label="Service Type"
            description="Select delivery service level"
            options={serviceTypeOptions}
            placeholder="Choose service type..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expected Pickup Date"
              type="date"
              required
            />
            <Input
              label="Expected Delivery Date"
              type="date"
              required
            />
          </div>

          <Select
            label="Payment Terms"
            description="Select payment terms for this contract"
            options={paymentTermsOptions}
            placeholder="Choose payment terms..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Contract Value (USD)"
              type="number"
              placeholder="0.00"
              required
            />
            <Input
              label="Advance Payment (%)"
              type="number"
              placeholder="0"
              min="0"
              max="100"
            />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Additional Services
            </h4>
            <div className="space-y-3">
              <Checkbox
                label="Insurance Coverage"
                description="Add cargo insurance for this shipment"
              />
              <Checkbox
                label="Real-time GPS Tracking"
                description="Enable live tracking throughout journey"
              />
              <Checkbox
                label="Priority Loading"
                description="Expedited loading at origin"
              />
              <Checkbox
                label="White Glove Service"
                description="Premium handling and delivery service"
              />
            </div>
          </div>

          <Input
            label="Special Terms & Conditions"
            type="text"
            placeholder="Enter any special terms or conditions for this contract..."
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size="1.25rem" className="text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">
                  Contract Review Required
                </p>
                <p className="text-sm text-amber-700">
                  Contracts over $50,000 require manager approval before activation. Estimated processing time: 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetailsSection;