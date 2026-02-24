import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractHistoryTab = ({ customer }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200'
    };
    return colors?.[status] || colors?.pending;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Contract History</h3>
          <p className="text-sm text-slate-600">View all contracts associated with this customer</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export History
        </Button>
      </div>
      <div className="space-y-4">
        {customer?.contractHistory?.map((contract) => (
          <div
            key={contract?.id}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-150"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-semibold text-slate-900">{contract?.contractId}</h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(contract?.status)}`}>
                    {contract?.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{contract?.description}</p>
              </div>
              <Button variant="ghost" size="sm" iconName="ExternalLink" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
                  Start Date
                </label>
                <p className="text-sm font-medium text-slate-900">{contract?.startDate}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
                  End Date
                </label>
                <p className="text-sm font-medium text-slate-900">{contract?.endDate}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
                  Contract Value
                </label>
                <p className="text-sm font-medium text-slate-900">${contract?.value}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
                  Trips Completed
                </label>
                <p className="text-sm font-medium text-slate-900">{contract?.tripsCompleted}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size="1rem" className="text-slate-400" />
                    <span className="text-sm text-slate-700">{contract?.commodity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size="1rem" className="text-slate-400" />
                    <span className="text-sm text-slate-700">{contract?.route}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${contract?.completionRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{contract?.completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractHistoryTab;