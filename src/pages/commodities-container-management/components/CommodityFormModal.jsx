import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CommodityFormModal = ({ isOpen, onClose, onSubmit, commodity, containers }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    handlingType: '',
    temperatureRange: '',
    isHazmat: false,
    hazmatClass: '',
    compatibleContainers: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (commodity) {
      setFormData({
        name: commodity?.name || '',
        category: commodity?.category || '',
        handlingType: commodity?.handlingType || '',
        temperatureRange: commodity?.temperatureRange || '',
        isHazmat: commodity?.isHazmat || false,
        hazmatClass: commodity?.hazmatClass || '',
        compatibleContainers: commodity?.compatibleContainerIds || []
      });
    } else {
      setFormData({
        name: '',
        category: '',
        handlingType: '',
        temperatureRange: '',
        isHazmat: false,
        hazmatClass: '',
        compatibleContainers: []
      });
    }
    setErrors({});
  }, [commodity, isOpen]);

  const categoryOptions = [
    { value: 'General Cargo', label: 'General Cargo' },
    { value: 'Perishables', label: 'Perishables' },
    { value: 'Chemicals', label: 'Chemicals' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Machinery', label: 'Machinery' },
    { value: 'Textiles', label: 'Textiles' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Pharmaceuticals', label: 'Pharmaceuticals' }
  ];

  const handlingTypeOptions = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Fragile', label: 'Fragile' },
    { value: 'Temperature Controlled', label: 'Temperature Controlled' },
    { value: 'Hazmat', label: 'Hazmat' },
    { value: 'Heavy', label: 'Heavy' }
  ];

  const hazmatClassOptions = [
    { value: 'Class 1 - Explosives', label: 'Class 1 - Explosives' },
    { value: 'Class 2 - Gases', label: 'Class 2 - Gases' },
    { value: 'Class 3 - Flammable Liquids', label: 'Class 3 - Flammable Liquids' },
    { value: 'Class 4 - Flammable Solids', label: 'Class 4 - Flammable Solids' },
    { value: 'Class 5 - Oxidizing Substances', label: 'Class 5 - Oxidizing Substances' },
    { value: 'Class 6 - Toxic Substances', label: 'Class 6 - Toxic Substances' },
    { value: 'Class 7 - Radioactive Material', label: 'Class 7 - Radioactive Material' },
    { value: 'Class 8 - Corrosive Substances', label: 'Class 8 - Corrosive Substances' },
    { value: 'Class 9 - Miscellaneous', label: 'Class 9 - Miscellaneous' }
  ];

  const containerOptions = containers?.map(container => ({
    value: container?.id,
    label: `${container?.name} (${container?.type})`,
    description: container?.dimensions
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Commodity name is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.handlingType) {
      newErrors.handlingType = 'Handling type is required';
    }

    if (formData?.isHazmat && !formData?.hazmatClass) {
      newErrors.hazmatClass = 'Hazmat classification is required';
    }

    if (formData?.compatibleContainers?.length === 0) {
      newErrors.compatibleContainers = 'Select at least one compatible container';
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
            {commodity ? 'Edit Commodity' : 'Add New Commodity'}
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
              label="Commodity Name"
              type="text"
              placeholder="Enter commodity name"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <Select
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleChange('category', value)}
              error={errors?.category}
              required
            />

            <Select
              label="Handling Type"
              placeholder="Select handling type"
              options={handlingTypeOptions}
              value={formData?.handlingType}
              onChange={(value) => handleChange('handlingType', value)}
              error={errors?.handlingType}
              required
            />

            {(formData?.handlingType === 'Temperature Controlled' || formData?.handlingType === 'Hazmat') && (
              <Input
                label="Temperature Range"
                type="text"
                placeholder="e.g., 2°C to 8°C"
                value={formData?.temperatureRange}
                onChange={(e) => handleChange('temperatureRange', e?.target?.value)}
                description="Specify required temperature range if applicable"
              />
            )}

            <Checkbox
              label="Hazardous Material (Hazmat)"
              description="Check if this commodity requires hazmat handling"
              checked={formData?.isHazmat}
              onChange={(e) => handleChange('isHazmat', e?.target?.checked)}
            />

            {formData?.isHazmat && (
              <Select
                label="Hazmat Classification"
                placeholder="Select hazmat class"
                options={hazmatClassOptions}
                value={formData?.hazmatClass}
                onChange={(value) => handleChange('hazmatClass', value)}
                error={errors?.hazmatClass}
                required
              />
            )}

            <Select
              label="Compatible Containers"
              description="Select all container types compatible with this commodity"
              placeholder="Select containers"
              options={containerOptions}
              value={formData?.compatibleContainers}
              onChange={(value) => handleChange('compatibleContainers', value)}
              error={errors?.compatibleContainers}
              multiple
              searchable
              required
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
              {commodity ? 'Update Commodity' : 'Add Commodity'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommodityFormModal;