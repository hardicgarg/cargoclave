import React from 'react';
import Icon from '../../../components/AppIcon';

const RelatedContracts = ({ contracts }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Completed': 'bg-blue-100 text-blue-700 border-blue-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Link" size="1.25rem" className="text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Related Contracts</h3>
      </div>
      <div className="space-y-3">
        {contracts?.map((contract, index) => (
          <div
            key={index}
            className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => console.log('Navigate to', contract?.contractId)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-slate-900">{contract?.contractId}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(contract?.status)}`}>
                  {contract?.status}
                </span>
              </div>
              <Icon name="ExternalLink" size="0.875rem" className="text-slate-400" />
            </div>
            
            <div className="text-xs text-slate-600 mb-1">{contract?.customerName}</div>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <Icon name="Package" size="0.75rem" />
                <span>{contract?.commodity}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size="0.75rem" />
                <span>{contract?.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedContracts;