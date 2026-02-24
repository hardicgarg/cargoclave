import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerOverviewTab = ({ customer }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      inactive: 'bg-slate-100 text-slate-700 border-slate-200',
      suspended: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors?.[status] || colors?.inactive;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Company Information */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Building2" size="1.25rem" className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Company Name
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.companyName}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Status
            </label>
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer?.status)}`}>
              {customer?.status}
            </span>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Tax ID / GST Number
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.taxId}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Industry
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.industry}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Customer Since
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.customerSince}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Account Manager
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.accountManager}</p>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MapPin" size="1.25rem" className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Address
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.address}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              City
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.city}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              State
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.state}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              ZIP Code
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.zipCode}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Country
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.country}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Phone
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.phone}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Email
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.email}</p>
          </div>
        </div>
      </div>
      {/* Service Preferences */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Settings" size="1.25rem" className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Service Preferences</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Preferred Service Level
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.serviceLevel}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Payment Terms
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.paymentTerms}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Credit Limit
            </label>
            <p className="text-sm font-medium text-slate-900">${customer?.creditLimit}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
              Billing Frequency
            </label>
            <p className="text-sm font-medium text-slate-900">{customer?.billingFrequency}</p>
          </div>
        </div>
      </div>
      {/* Additional Notes */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="FileText" size="1.25rem" className="text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">Additional Notes</h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{customer?.notes}</p>
      </div>
    </div>
  );
};

export default CustomerOverviewTab;