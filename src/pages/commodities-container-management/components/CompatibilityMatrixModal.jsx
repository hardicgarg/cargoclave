import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CompatibilityMatrixModal = ({ isOpen, onClose, commodity, containers, onSave }) => {
  const [selectedContainers, setSelectedContainers] = useState(
    commodity?.compatibleContainerIds || []
  );

  const handleToggleContainer = (containerId) => {
    setSelectedContainers(prev => {
      if (prev?.includes(containerId)) {
        return prev?.filter(id => id !== containerId);
      } else {
        return [...prev, containerId];
      }
    });
  };

  const handleSave = () => {
    onSave(commodity?.id, selectedContainers);
    onClose();
  };

  if (!isOpen || !commodity) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Container Compatibility</h2>
            <p className="text-sm text-slate-600 mt-1">
              Configure compatible containers for <span className="font-medium">{commodity?.name}</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
            className="h-8 w-8"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {containers?.map(container => {
              const isSelected = selectedContainers?.includes(container?.id);
              const isCompatible = commodity?.handlingType === 'Temperature Controlled' 
                ? container?.type === 'Refrigerated'
                : true;

              return (
                <div
                  key={container?.id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50' :'border-slate-200 hover:border-slate-300'
                  } ${!isCompatible ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleToggleContainer(container?.id)}
                      disabled={!isCompatible}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Package" size="1.125rem" className="text-slate-600" />
                        <h3 className="font-medium text-slate-900">{container?.name}</h3>
                      </div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Icon name="Box" size="0.875rem" />
                          <span>{container?.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Ruler" size="0.875rem" />
                          <span>{container?.dimensions}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Weight" size="0.875rem" />
                          <span>{container?.maxWeight}</span>
                        </div>
                      </div>
                      {!isCompatible && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                          <Icon name="AlertTriangle" size="0.75rem" />
                          <span>Not compatible with handling requirements</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div className="text-sm text-slate-600">
            <span className="font-medium">{selectedContainers?.length}</span> of {containers?.length} containers selected
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              iconName="Save"
              iconPosition="left"
              iconSize={16}
              onClick={handleSave}
            >
              Save Compatibility
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityMatrixModal;