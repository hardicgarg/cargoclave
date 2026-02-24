import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ContainerFormModal = ({ isOpen, onClose, onSubmit, container }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dimensions: '',
    maxWeight: '',
    capacity: '',
    specialRequirements: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (container) {
      setFormData({
        name: container?.name || '',
        type: container?.type || '',
        dimensions: container?.dimensions || '',
        maxWeight: container?.maxWeight || '',
        capacity: container?.capacity || '',
        specialRequirements: container?.specialRequirements || []
      });
    } else {
      setFormData({
        name: '',
        type: '',
        dimensions: '',
        maxWeight: '',
        capacity: '',
        specialRequirements: []
      });
    }
    setErrors({});
  }, [container, isOpen]);

  const typeOptions = [
    { value: 'Dry', label: 'Dry Container' },
    { value: 'Refrigerated', label: 'Refrigerated Container' },
    { value: 'Open Top', label: 'Open Top Container' },
    { value: 'Flat Rack', label: 'Flat Rack Container' },
    { value: 'Tank', label: 'Tank Container' }
  ];

  const requirementOptions = [
    { value: 'Temperature Control', label: 'Temperature Control' },
    { value: 'Ventilation', label: 'Ventilation' },
    { value: 'Hazmat Certified', label: 'Hazmat Certified' },
    { value: 'Food Grade', label: 'Food Grade' },
    { value: 'Insulated', label: 'Insulated' },
    { value: 'Stackable', label: 'Stackable' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Container name is required';
    }

    if (!formData?.type) {
      newErrors.type = 'Container type is required';
    }

    if (!formData?.dimensions?.trim()) {
      newErrors.dimensions = 'Dimensions are required';
    }

    if (!formData?.maxWeight?.trim()) {
      newErrors.maxWeight = 'Maximum weight is required';
    }

    if (!formData?.capacity?.trim()) {
      newErrors.capacity = 'Capacity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {container ? 'Edit Container Specification' : 'Add New Container'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            iconSize={20}
            onClick={onClose}
            className="h-8 w-8"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-4">
            <Input
              label="Container Name"
              type="text"
              placeholder="e.g., 20ft Standard Dry Container"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Select
              label="Container Type"
              placeholder="Select container type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleChange('type', value)}
              error={errors?.type}
              required
            />

            <Input
              label="Dimensions"
              type="text"
              placeholder="e.g., 20' x 8' x 8.6'"
              value={formData?.dimensions}
              onChange={(e) => handleChange('dimensions', e?.target?.value)}
              error={errors?.dimensions}
              description="Length x Width x Height"
              required
            />

            <Input
              label="Maximum Weight"
              type="text"
              placeholder="e.g., 28,000 kg"
              value={formData?.maxWeight}
              onChange={(e) => handleChange('maxWeight', e?.target?.value)}
              error={errors?.maxWeight}
              required
            />

            <Input
              label="Capacity"
              type="text"
              placeholder="e.g., 33 cubic meters"
              value={formData?.capacity}
              onChange={(e) => handleChange('capacity', e?.target?.value)}
              error={errors?.capacity}
              required
            />

            <Select
              label="Special Requirements"
              description="Select all applicable special requirements"
              placeholder="Select requirements"
              options={requirementOptions}
              value={formData?.specialRequirements}
              onChange={(value) => handleChange('specialRequirements', value)}
              multiple
              clearable
            />
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {container ? 'Update Container' : 'Add Container'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContainerFormModal;