import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CustomerOverviewTab from './CustomerOverviewTab';
import SPOCManagementTab from './SPOCManagementTab';
import ContractHistoryTab from './ContractHistoryTab';
import CommunicationLogTab from './CommunicationLogTab';
import PerformanceDashboardTab from './PerformanceDashboardTab';

const CustomerProfilePanel = ({ customer, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-50">
        <div className="w-20 h-20 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <Icon name="Building2" size="2.5rem" className="text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 mb-1">No customer selected</p>
        <p className="text-xs text-slate-500">Select a customer from the list to view details</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'spoc', label: 'SPOC Contacts', icon: 'Users' },
    { id: 'contracts', label: 'Contract History', icon: 'FileText' },
    { id: 'communication', label: 'Communication Log', icon: 'MessageSquare' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {customer?.companyName?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{customer?.companyName}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size="0.875rem" />
                  <span>{customer?.city}, {customer?.state}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Phone" size="0.875rem" />
                  <span>{customer?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={onDelete}
            >
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="FileText" size="1rem" className="text-blue-600" />
              <span className="text-xs font-medium text-slate-600">Active Contracts</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{customer?.activeContracts}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Truck" size="1rem" className="text-emerald-600" />
              <span className="text-xs font-medium text-slate-600">Total Trips</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{customer?.totalTrips}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Star" size="1rem" className="text-amber-500" />
              <span className="text-xs font-medium text-slate-600">Rating</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{customer?.rating}.0</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="DollarSign" size="1rem" className="text-green-600" />
              <span className="text-xs font-medium text-slate-600">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">${customer?.totalRevenue}</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="flex items-center gap-1 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-150 border-b-2 ${
                activeTab === tab?.id
                  ? 'text-blue-600 border-blue-600' :'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon name={tab?.icon} size="1rem" />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'overview' && <CustomerOverviewTab customer={customer} />}
        {activeTab === 'spoc' && <SPOCManagementTab customer={customer} />}
        {activeTab === 'contracts' && <ContractHistoryTab customer={customer} />}
        {activeTab === 'communication' && <CommunicationLogTab customer={customer} />}
        {activeTab === 'performance' && <PerformanceDashboardTab customer={customer} />}
      </div>
    </div>
  );
};

export default CustomerProfilePanel;