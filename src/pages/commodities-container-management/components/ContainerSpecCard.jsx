import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContainerSpecCard = ({ container, onEdit, onDelete, isReadOnly }) => {
  const getTypeIcon = (type) => {
    const icons = {
      'Dry': 'Box',
      'Refrigerated': 'Snowflake',
      'Open Top': 'BoxOpen',
      'Flat Rack': 'Layers',
      'Tank': 'Droplet'
    };
    return icons?.[type] || 'Box';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Dry': 'bg-slate-100 text-slate-700',
      'Refrigerated': 'bg-blue-100 text-blue-700',
      'Open Top': 'bg-amber-100 text-amber-700',
      'Flat Rack': 'bg-emerald-100 text-emerald-700',
      'Tank': 'bg-purple-100 text-purple-700'
    };
    return colors?.[type] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(container?.type)}`}>
            <Icon name={getTypeIcon(container?.type)} size="1.5rem" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{container?.name}</h3>
            <span className="text-sm text-slate-600">{container?.type}</span>
          </div>
        </div>
        {!isReadOnly && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              iconName="Edit2"
              iconSize={16}
              onClick={() => onEdit(container)}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="Trash2"
              iconSize={16}
              onClick={() => onDelete(container)}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Ruler" size="0.875rem" className="text-slate-500" />
            <span className="text-xs text-slate-500">Dimensions</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{container?.dimensions}</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Weight" size="0.875rem" className="text-slate-500" />
            <span className="text-xs text-slate-500">Max Weight</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{container?.maxWeight}</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Maximize2" size="0.875rem" className="text-slate-500" />
            <span className="text-xs text-slate-500">Capacity</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{container?.capacity}</p>
        </div>

        <div className="bg-slate-50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Package" size="0.875rem" className="text-slate-500" />
            <span className="text-xs text-slate-500">Commodities</span>
          </div>
          <p className="text-sm font-medium text-slate-900">{container?.compatibleCommodities}</p>
        </div>
      </div>
      {container?.specialRequirements && container?.specialRequirements?.length > 0 && (
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 mb-2">
            <Icon name="AlertCircle" size="0.875rem" className="text-amber-600" />
            <span className="text-xs font-medium text-slate-700">Special Requirements</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {container?.specialRequirements?.map((req, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-amber-50 text-amber-700">
                {req}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainerSpecCard;