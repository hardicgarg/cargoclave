import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RoutePlanningSection = ({ isExpanded, onToggle }) => {
  const [stops, setStops] = useState([]);
  const [estimatedDistance, setEstimatedDistance] = useState(null);

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'NY', label: 'New York' },
    { value: 'IL', label: 'Illinois' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'OH', label: 'Ohio' },
    { value: 'GA', label: 'Georgia' }
  ];

  const handleAddStop = () => {
    setStops([...stops, {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      contactName: '',
      contactPhone: '',
      instructions: ''
    }]);
  };

  const handleRemoveStop = (index) => {
    setStops(stops?.filter((_, i) => i !== index));
  };

  const handleUpdateStop = (index, field, value) => {
    const updated = [...stops];
    updated[index][field] = value;
    setStops(updated);
  };

  const handleCalculateRoute = () => {
    setEstimatedDistance('1,247 miles');
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Icon name="MapPin" size="1.25rem" className="text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-slate-900">Route Planning</h3>
            <p className="text-sm text-slate-500">Define pickup, delivery, and intermediate stops</p>
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
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPinned" size="1rem" className="text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Pickup Location</h4>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="Enter pickup address"
                    required
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="City"
                      type="text"
                      placeholder="City"
                      required
                    />
                    <Select
                      label="State"
                      options={stateOptions}
                      placeholder="Select state"
                      required
                    />
                    <Input
                      label="ZIP Code"
                      type="text"
                      placeholder="00000"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Contact Person"
                      type="text"
                      placeholder="Full name"
                      required
                    />
                    <Input
                      label="Contact Phone"
                      type="tel"
                      placeholder="+1 (XXX) XXX-XXXX"
                      required
                    />
                  </div>
                  <Input
                    label="Pickup Instructions"
                    type="text"
                    placeholder="Special instructions for pickup..."
                  />
                </div>
              </div>
            </div>
          </div>

          {stops?.length > 0 && (
            <div className="space-y-4">
              {stops?.map((stop, index) => (
                <div 
                  key={index}
                  className="bg-amber-50 rounded-lg p-4 border border-amber-200"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-amber-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">
                          Intermediate Stop {index + 1}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Trash2"
                          onClick={() => handleRemoveStop(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <Input
                          label="Street Address"
                          type="text"
                          placeholder="Enter stop address"
                          value={stop?.address}
                          onChange={(e) => handleUpdateStop(index, 'address', e?.target?.value)}
                          required
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            label="City"
                            type="text"
                            placeholder="City"
                            value={stop?.city}
                            onChange={(e) => handleUpdateStop(index, 'city', e?.target?.value)}
                            required
                          />
                          <Select
                            label="State"
                            options={stateOptions}
                            value={stop?.state}
                            onChange={(value) => handleUpdateStop(index, 'state', value)}
                            placeholder="Select state"
                            required
                          />
                          <Input
                            label="ZIP Code"
                            type="text"
                            placeholder="00000"
                            value={stop?.zipCode}
                            onChange={(e) => handleUpdateStop(index, 'zipCode', e?.target?.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Contact Person"
                            type="text"
                            placeholder="Full name"
                            value={stop?.contactName}
                            onChange={(e) => handleUpdateStop(index, 'contactName', e?.target?.value)}
                          />
                          <Input
                            label="Contact Phone"
                            type="tel"
                            placeholder="+1 (XXX) XXX-XXXX"
                            value={stop?.contactPhone}
                            onChange={(e) => handleUpdateStop(index, 'contactPhone', e?.target?.value)}
                          />
                        </div>
                        <Input
                          label="Stop Instructions"
                          type="text"
                          placeholder="Special instructions..."
                          value={stop?.instructions}
                          onChange={(e) => handleUpdateStop(index, 'instructions', e?.target?.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={handleAddStop}
            fullWidth
          >
            Add Intermediate Stop
          </Button>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size="1rem" className="text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Delivery Location</h4>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    type="text"
                    placeholder="Enter delivery address"
                    required
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="City"
                      type="text"
                      placeholder="City"
                      required
                    />
                    <Select
                      label="State"
                      options={stateOptions}
                      placeholder="Select state"
                      required
                    />
                    <Input
                      label="ZIP Code"
                      type="text"
                      placeholder="00000"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Contact Person"
                      type="text"
                      placeholder="Full name"
                      required
                    />
                    <Input
                      label="Contact Phone"
                      type="tel"
                      placeholder="+1 (XXX) XXX-XXXX"
                      required
                    />
                  </div>
                  <Input
                    label="Delivery Instructions"
                    type="text"
                    placeholder="Special instructions for delivery..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Route" size="1.25rem" className="text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Route Summary</p>
                  <p className="text-xs text-blue-700">
                    {estimatedDistance ? `Estimated Distance: ${estimatedDistance}` : 'Calculate route to see distance'}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={handleCalculateRoute}
              >
                Calculate Route
              </Button>
            </div>
          </div>

          <div className="w-full h-80 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Route Map Visualization"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=34.0522,-118.2437&z=10&output=embed"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePlanningSection;