import React from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CustomerListPanel = ({ 
  customers, 
  selectedCustomer, 
  onSelectCustomer, 
  searchQuery, 
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onAddCustomer,
  onBulkExport
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Company Name' },
    { value: 'contracts', label: 'Active Contracts' },
    { value: 'rating', label: 'Performance Rating' },
    { value: 'recent', label: 'Recently Added' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      inactive: 'bg-slate-100 text-slate-700 border-slate-200',
      suspended: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors?.[status] || colors?.inactive;
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'Star'}
        size="0.875rem"
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Customers</h2>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onAddCustomer}
          >
            Add Customer
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search by company name or contact..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Filter by status"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Customer List */}
      <div className="flex-1 overflow-y-auto">
        {customers?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Icon name="Building2" size="2rem" className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 mb-1">No customers found</p>
            <p className="text-xs text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {customers?.map((customer) => (
              <div
                key={customer?.id}
                onClick={() => onSelectCustomer(customer)}
                className={`p-4 cursor-pointer transition-all duration-150 hover:bg-slate-50 ${
                  selectedCustomer?.id === customer?.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                      {customer?.companyName?.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-900 truncate">
                        {customer?.companyName}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(customer?.status)}`}>
                        {customer?.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Icon name="User" size="0.75rem" className="text-slate-400" />
                      <p className="text-xs text-slate-600 truncate">{customer?.primaryContact}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Icon name="FileText" size="0.875rem" className="text-slate-400" />
                          <span className="text-xs font-medium text-slate-700">{customer?.activeContracts}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {getRatingStars(customer?.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
          <span>{customers?.length} customers</span>
          <button
            onClick={onBulkExport}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <Icon name="Download" size="0.875rem" />
            Export List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerListPanel;