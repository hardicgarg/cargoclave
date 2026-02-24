import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractHeader = ({ contract, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Completed': 'bg-blue-100 text-blue-700 border-blue-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200',
      'Draft': 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return colors?.[status] || colors?.['Draft'];
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/contracts-management')}
            className="mt-1"
          >
            <Icon name="ArrowLeft" size="1.25rem" />
          </Button>
          
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-semibold text-slate-900">
                {contract?.contractId}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contract?.status)}`}>
                {contract?.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Icon name="Building2" size="1rem" />
                <span>{contract?.customerName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size="1rem" />
                <span>Created: {contract?.createdDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Package" size="1rem" />
                <span>{contract?.commodity}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Export contract')}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
          >
            Edit Contract
          </Button>
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractHeader;