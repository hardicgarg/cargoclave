import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommodityConfigurationSection = ({ 
  selectedCommodity,
  onCommodityChange,
  isExpanded, 
  onToggle 
}) => {
  const [selectedContainers, setSelectedContainers] = useState([]);

  const commodityOptions = [
    { value: 'electronics', label: 'Electronics & Technology', description: 'Fragile, temperature-controlled' },
    { value: 'automotive', label: 'Automotive Parts', description: 'Heavy-duty, secure transport' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals', description: 'Temperature-controlled, certified' },
    { value: 'food', label: 'Food & Beverages', description: 'Refrigerated, time-sensitive' },
    { value: 'textiles', label: 'Textiles & Apparel', description: 'Standard, moisture-protected' },
    { value: 'chemicals', label: 'Chemicals & Hazmat', description: 'Hazmat certified, special handling' },
    { value: 'machinery', label: 'Industrial Machinery', description: 'Heavy-duty, oversized' },
    { value: 'consumer', label: 'Consumer Goods', description: 'Standard, general cargo' }
  ];

  const containerCompatibility = {
    'electronics': ['20ft-dry', '40ft-dry', '40ft-hc', '20ft-reefer'],
    'automotive': ['20ft-dry', '40ft-dry', '40ft-hc', '40ft-ot'],
    'pharmaceuticals': ['20ft-reefer', '40ft-reefer'],
    'food': ['20ft-reefer', '40ft-reefer'],
    'textiles': ['20ft-dry', '40ft-dry', '40ft-hc'],
    'chemicals': ['20ft-tank', '20ft-dry'],
    'machinery': ['40ft-ot', '40ft-hc', '20ft-ot'],
    'consumer': ['20ft-dry', '40ft-dry', '40ft-hc']
  };

  const allContainers = [
    { 
      value: '20ft-dry', 
      label: '20ft Dry Container',
      description: 'L: 5.9m × W: 2.35m × H: 2.39m | Max: 28,200 kg'
    },
    { 
      value: '40ft-dry', 
      label: '40ft Dry Container',
      description: 'L: 12.03m × W: 2.35m × H: 2.39m | Max: 26,700 kg'
    },
    { 
      value: '40ft-hc', 
      label: '40ft High Cube',
      description: 'L: 12.03m × W: 2.35m × H: 2.69m | Max: 26,500 kg'
    },
    { 
      value: '20ft-reefer', 
      label: '20ft Refrigerated',
      description: 'L: 5.44m × W: 2.29m × H: 2.27m | Temp: -25°C to +25°C'
    },
    { 
      value: '40ft-reefer', 
      label: '40ft Refrigerated',
      description: 'L: 11.56m × W: 2.29m × H: 2.50m | Temp: -25°C to +25°C'
    },
    { 
      value: '40ft-ot', 
      label: '40ft Open Top',
      description: 'L: 12.03m × W: 2.35m × H: 2.39m | Max: 26,700 kg'
    },
    { 
      value: '20ft-ot', 
      label: '20ft Open Top',
      description: 'L: 5.9m × W: 2.35m × H: 2.39m | Max: 28,200 kg'
    },
    { 
      value: '20ft-tank', 
      label: '20ft Tank Container',
      description: 'Capacity: 21,000L | For liquids & gases'
    }
  ];

  const availableContainers = selectedCommodity 
    ? allContainers?.filter(c => containerCompatibility?.[selectedCommodity]?.includes(c?.value))
    : [];

  const handleAddContainer = (containerValue) => {
    if (!selectedContainers?.find(c => c?.type === containerValue)) {
      setSelectedContainers([...selectedContainers, {
        type: containerValue,
        quantity: 1,
        weight: '',
        specialInstructions: ''
      }]);
    }
  };

  const handleRemoveContainer = (index) => {
    setSelectedContainers(selectedContainers?.filter((_, i) => i !== index));
  };

  const handleUpdateContainer = (index, field, value) => {
    const updated = [...selectedContainers];
    updated[index][field] = value;
    setSelectedContainers(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Icon name="Package" size="1.25rem" className="text-emerald-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-900">Commodity Configuration</h3>
            <p className="text-sm text-slate-500">Select cargo type and compatible containers</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size="1.25rem" 
          className="text-slate-400"
        />
      </button>
      {isExpanded && (
        <div className="px-6 py-6 border-t border-slate-200 space-y-6">
          <Select
            label="Commodity Type"
            description="Select the type of cargo to be transported"
            options={commodityOptions}
            value={selectedCommodity}
            onChange={onCommodityChange}
            searchable
            placeholder="Choose commodity type..."
            required
          />

          {selectedCommodity && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size="1.25rem" className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Compatible Containers Available
                    </p>
                    <p className="text-sm text-blue-700">
                      Based on your commodity selection, {availableContainers?.length} compatible container types are available. Select containers and specify quantities below.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-slate-900">
                    Select Containers
                  </label>
                  <Select
                    options={availableContainers}
                    value=""
                    onChange={handleAddContainer}
                    placeholder="Add container type..."
                    searchable
                  />
                </div>

                {selectedContainers?.length > 0 ? (
                  <div className="space-y-4">
                    {selectedContainers?.map((container, index) => {
                      const containerInfo = allContainers?.find(c => c?.value === container?.type);
                      return (
                        <div 
                          key={index}
                          className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                <Icon name="Container" size="1.25rem" className="text-emerald-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900">
                                  {containerInfo?.label}
                                </h4>
                                <p className="text-xs text-slate-500">
                                  {containerInfo?.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Trash2"
                              onClick={() => handleRemoveContainer(index)}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              label="Quantity"
                              type="number"
                              placeholder="0"
                              value={container?.quantity}
                              onChange={(e) => handleUpdateContainer(index, 'quantity', e?.target?.value)}
                              min="1"
                              required
                            />
                            <Input
                              label="Total Weight (kg)"
                              type="number"
                              placeholder="0"
                              value={container?.weight}
                              onChange={(e) => handleUpdateContainer(index, 'weight', e?.target?.value)}
                              required
                            />
                            <Input
                              label="Temperature (°C)"
                              type="number"
                              placeholder="Optional"
                              disabled={!container?.type?.includes('reefer')}
                            />
                          </div>
                          <div className="mt-4">
                            <Input
                              label="Special Instructions"
                              type="text"
                              placeholder="Any special handling requirements..."
                              value={container?.specialInstructions}
                              onChange={(e) => handleUpdateContainer(index, 'specialInstructions', e?.target?.value)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                    <Icon name="Package" size="2.5rem" className="text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-2">No containers added yet</p>
                    <p className="text-xs text-slate-500">
                      Use the dropdown above to add compatible containers
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommodityConfigurationSection;