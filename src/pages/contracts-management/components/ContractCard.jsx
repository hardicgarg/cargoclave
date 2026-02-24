import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContractCard = ({ contract, isSelected, onSelect, onQuickAction }) => {
  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-slate-100 text-slate-700 border-slate-300',
      active: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-300',
      completed: 'bg-green-100 text-green-700 border-green-300',
      cancelled: 'bg-red-100 text-red-700 border-red-300',
      'on-hold': 'bg-amber-100 text-amber-700 border-amber-300'
    };
    return colors?.[status] || 'bg-slate-100 text-slate-700 border-slate-300';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: { name: 'AlertCircle', color: 'text-red-500' },
      medium: { name: 'AlertTriangle', color: 'text-amber-500' },
      low: { name: 'Info', color: 'text-blue-500' }
    };
    return icons?.[priority] || icons?.low;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const priorityIcon = getPriorityIcon(contract?.priority);

  return (
    <div
      className={`bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-150 cursor-pointer ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
      }`}
      onClick={() => onSelect(contract?.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e?.stopPropagation();
              onSelect(contract?.id);
            }}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-foreground">
                {contract?.contractId}
              </h3>
              <Icon
                name={priorityIcon?.name}
                size="1rem"
                className={priorityIcon?.color}
              />
            </div>
            <p className="text-sm text-muted-foreground">{contract?.customer}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
              contract?.status
            )}`}
          >
            {contract?.status?.charAt(0)?.toUpperCase() + contract?.status?.slice(1)?.replace('-', ' ')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Commodity</p>
          <p className="text-sm font-medium text-foreground">{contract?.commodity}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Contract Value</p>
          <p className="text-sm font-medium text-foreground">
            {formatCurrency(contract?.value)}
          </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-xs text-muted-foreground mb-1">Route</p>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Icon name="MapPin" size="0.875rem" className="text-primary flex-shrink-0" />
          <span className="truncate">{contract?.origin}</span>
          <Icon name="ArrowRight" size="0.875rem" className="text-muted-foreground flex-shrink-0" />
          <span className="truncate">{contract?.destination}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={contract?.assignedDriver?.avatar}
              alt={contract?.assignedDriver?.avatarAlt}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-muted-foreground">
              {contract?.assignedDriver?.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {contract?.erpSynced && (
              <Icon name="Database" size="0.875rem" className="text-emerald-500" />
            )}
            {contract?.accountingSynced && (
              <Icon name="DollarSign" size="0.875rem" className="text-blue-500" />
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDate(contract?.createdDate)}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onQuickAction('view', contract?.id);
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded transition-colors duration-150"
        >
          <Icon name="Eye" size="0.875rem" />
          View
        </button>
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onQuickAction('assign', contract?.id);
          }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded transition-colors duration-150"
        >
          <Icon name="UserPlus" size="0.875rem" />
          Assign
        </button>
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onQuickAction('flag', contract?.id);
          }}
          className="flex items-center justify-center px-3 py-1.5 text-xs font-medium text-foreground bg-muted hover:bg-muted/80 rounded transition-colors duration-150"
        >
          <Icon name="Flag" size="0.875rem" />
        </button>
      </div>
    </div>
  );
};

export default ContractCard;