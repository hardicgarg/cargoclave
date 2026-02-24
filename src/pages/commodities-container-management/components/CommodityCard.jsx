import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommodityCard = ({ commodity, onEdit, onDelete, onViewContainers, isReadOnly }) => {
  const getHandlingIcon = (type) => {
    const icons = {
      'Fragile': 'AlertTriangle',
      'Temperature Controlled': 'Thermometer',
      'Hazmat': 'AlertOctagon',
      'Heavy': 'Weight',
      'Standard': 'Package'
    };
    return icons?.[type] || 'Package';
  };

  const getHandlingColor = (type) => {
    const colors = {
      'Fragile': 'text-amber-600',
      'Temperature Controlled': 'text-blue-600',
      'Hazmat': 'text-red-600',
      'Heavy': 'text-slate-600',
      'Standard': 'text-emerald-600'
    };
    return colors?.[type] || 'text-slate-600';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900 mb-1">{commodity?.name}</h3>
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
            {commodity?.category}
          </span>
        </div>
        {!isReadOnly && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              iconName="Edit2"
              iconSize={16}
              onClick={() => onEdit(commodity)}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="Trash2"
              iconSize={16}
              onClick={() => onDelete(commodity)}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>
        )}
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Icon name={getHandlingIcon(commodity?.handlingType)} size="1rem" className={getHandlingColor(commodity?.handlingType)} />
          <span className="text-sm text-slate-600">{commodity?.handlingType}</span>
        </div>

        {commodity?.temperatureRange && (
          <div className="flex items-center gap-2">
            <Icon name="Thermometer" size="1rem" className="text-blue-600" />
            <span className="text-sm text-slate-600">{commodity?.temperatureRange}</span>
          </div>
        )}

        {commodity?.isHazmat && (
          <div className="flex items-center gap-2">
            <Icon name="AlertOctagon" size="1rem" className="text-red-600" />
            <span className="text-sm text-red-600 font-medium">Hazmat Classification: {commodity?.hazmatClass}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">
          {commodity?.compatibleContainers} compatible containers
        </span>
        <Button
          variant="outline"
          size="sm"
          iconName="Package"
          iconPosition="left"
          iconSize={14}
          onClick={() => onViewContainers(commodity)}
        >
          View Containers
        </Button>
      </div>
    </div>
  );
};

export default CommodityCard;