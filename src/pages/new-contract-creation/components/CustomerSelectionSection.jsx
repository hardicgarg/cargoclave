import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomerSelectionSection = ({ 
  selectedCustomer, 
  onCustomerChange, 
  isExpanded, 
  onToggle 
}) => {
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);

  const recentCustomers = [
    { 
      value: 'CUST001', 
      label: 'Global Logistics Inc.',
      description: 'Last contract: 11/20/2025'
    },
    { 
      value: 'CUST002', 
      label: 'Pacific Freight Solutions',
      description: 'Last contract: 11/18/2025'
    },
    { 
      value: 'CUST003', 
      label: 'TransContinental Shipping Co.',
      description: 'Last contract: 11/15/2025'
    },
    { 
      value: 'CUST004', 
      label: 'Metro Distribution Services',
      description: 'Last contract: 11/12/2025'
    },
    { 
      value: 'CUST005', 
      label: 'Eastern Cargo Handlers',
      description: 'Last contract: 11/10/2025'
    },
    { 
      value: 'CUST006', 
      label: 'Western Transport Group',
      description: 'Last contract: 11/08/2025'
    },
    { 
      value: 'CUST007', 
      label: 'National Supply Chain Partners',
      description: 'Last contract: 11/05/2025'
    },
    { 
      value: 'CUST008', 
      label: 'Coastal Shipping Alliance',
      description: 'Last contract: 11/02/2025'
    }
  ];

  const customerDetails = {
    'CUST001': {
      company: 'Global Logistics Inc.',
      address: '1250 Harbor Boulevard, Los Angeles, CA 90021',
      phone: '+1 (213) 555-0123',
      email: 'contracts@globallogistics.com',
      spocs: [
        { name: 'Sarah Mitchell', role: 'Operations Manager', phone: '+1 (213) 555-0124', email: 'sarah.mitchell@globallogistics.com' },
        { name: 'David Chen', role: 'Logistics Coordinator', phone: '+1 (213) 555-0125', email: 'david.chen@globallogistics.com' }
      ]
    },
    'CUST002': {
      company: 'Pacific Freight Solutions',
      address: '3400 Ocean Drive, San Francisco, CA 94102',
      phone: '+1 (415) 555-0234',
      email: 'operations@pacificfreight.com',
      spocs: [
        { name: 'Jennifer Wong', role: 'Contract Manager', phone: '+1 (415) 555-0235', email: 'jennifer.wong@pacificfreight.com' }
      ]
    },
    'CUST003': {
      company: 'TransContinental Shipping Co.',
      address: '7800 Industrial Parkway, Chicago, IL 60601',
      phone: '+1 (312) 555-0345',
      email: 'shipping@transcontinental.com',
      spocs: [
        { name: 'Robert Johnson', role: 'Supply Chain Director', phone: '+1 (312) 555-0346', email: 'robert.johnson@transcontinental.com' },
        { name: 'Maria Garcia', role: 'Logistics Supervisor', phone: '+1 (312) 555-0347', email: 'maria.garcia@transcontinental.com' }
      ]
    }
  };

  const handleCustomerSelect = (value) => {
    onCustomerChange(value);
    setShowNewCustomerForm(false);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Icon name="Building2" size="1.25rem" className="text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-900">Customer Selection</h3>
            <p className="text-sm text-slate-500">Choose customer and contact details</p>
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
          {!showNewCustomerForm ? (
            <>
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Select
                    label="Select Customer"
                    description="Search from existing customers or add new"
                    options={recentCustomers}
                    value={selectedCustomer}
                    onChange={handleCustomerSelect}
                    searchable
                    clearable
                    placeholder="Search by customer name..."
                    required
                  />
                </div>
                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setShowNewCustomerForm(true)}
                >
                  Add New
                </Button>
              </div>

              {selectedCustomer && customerDetails?.[selectedCustomer] && (
                <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {customerDetails?.[selectedCustomer]?.company}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {customerDetails?.[selectedCustomer]?.address}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Edit2">
                      Edit
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size="1rem" className="text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {customerDetails?.[selectedCustomer]?.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size="1rem" className="text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {customerDetails?.[selectedCustomer]?.email}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h5 className="text-sm font-semibold text-slate-900 mb-3">
                      Single Point of Contact (SPOC)
                    </h5>
                    <div className="space-y-3">
                      {customerDetails?.[selectedCustomer]?.spocs?.map((spoc, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Icon name="User" size="1.125rem" className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{spoc?.name}</p>
                              <p className="text-xs text-slate-500">{spoc?.role}</p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-slate-700">{spoc?.phone}</p>
                            <p className="text-slate-500">{spoc?.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-900">Add New Customer</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowNewCustomerForm(false)}
                >
                  Cancel
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Enter company name"
                  required
                />
                <Input
                  label="Customer ID"
                  type="text"
                  placeholder="Auto-generated"
                  disabled
                />
              </div>

              <Input
                label="Address"
                type="text"
                placeholder="Enter complete address"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (XXX) XXX-XXXX"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="company@example.com"
                  required
                />
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h5 className="text-sm font-semibold text-slate-900 mb-3">
                  Primary Contact Person
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    type="text"
                    placeholder="Full name"
                    required
                  />
                  <Input
                    label="Role/Designation"
                    type="text"
                    placeholder="e.g., Operations Manager"
                    required
                  />
                  <Input
                    label="Contact Phone"
                    type="tel"
                    placeholder="+1 (XXX) XXX-XXXX"
                    required
                  />
                  <Input
                    label="Contact Email"
                    type="email"
                    placeholder="contact@example.com"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNewCustomerForm(false)}
                >
                  Cancel
                </Button>
                <Button variant="default" iconName="Save">
                  Save Customer
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerSelectionSection;