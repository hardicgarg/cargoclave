import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AddVehicleModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    type: '',
    capacity: '',
    fuelType: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  const typeOptions = [
    { value: 'Box Truck', label: 'Box Truck' },
    { value: 'Flatbed', label: 'Flatbed' },
    { value: 'Refrigerated', label: 'Refrigerated' },
    { value: 'Tanker', label: 'Tanker' }
  ];

  const fuelOptions = [
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Gasoline', label: 'Gasoline' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.make?.trim()) newErrors.make = 'Make is required';
    if (!formData?.model?.trim()) newErrors.model = 'Model is required';
    if (!formData?.year) newErrors.year = 'Year is required';
    if (!formData?.vin?.trim()) newErrors.vin = 'VIN is required';
    if (!formData?.licensePlate?.trim()) newErrors.licensePlate = 'License plate is required';
    if (!formData?.type) newErrors.type = 'Vehicle type is required';
    if (!formData?.capacity?.trim()) newErrors.capacity = 'Capacity is required';
    if (!formData?.fuelType) newErrors.fuelType = 'Fuel type is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
        type: '',
        capacity: '',
        fuelType: '',
        status: 'Active'
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Truck" size="1.25rem" className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Add New Vehicle</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <Icon name="X" size="1.25rem" className="text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Make"
                type="text"
                placeholder="e.g., Ford"
                value={formData?.make}
                onChange={(e) => handleChange('make', e?.target?.value)}
                error={errors?.make}
                required
              />
              <Input
                label="Model"
                type="text"
                placeholder="e.g., F-150"
                value={formData?.model}
                onChange={(e) => handleChange('model', e?.target?.value)}
                error={errors?.model}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                type="number"
                placeholder="e.g., 2023"
                value={formData?.year}
                onChange={(e) => handleChange('year', e?.target?.value)}
                error={errors?.year}
                required
              />
              <Input
                label="License Plate"
                type="text"
                placeholder="e.g., ABC-1234"
                value={formData?.licensePlate}
                onChange={(e) => handleChange('licensePlate', e?.target?.value)}
                error={errors?.licensePlate}
                required
              />
            </div>

            <Input
              label="VIN Number"
              type="text"
              placeholder="17-character VIN"
              value={formData?.vin}
              onChange={(e) => handleChange('vin', e?.target?.value)}
              error={errors?.vin}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Vehicle Type"
                options={typeOptions}
                value={formData?.type}
                onChange={(value) => handleChange('type', value)}
                error={errors?.type}
                required
                placeholder="Select vehicle type"
              />
              <Input
                label="Capacity"
                type="text"
                placeholder="e.g., 10,000 lbs"
                value={formData?.capacity}
                onChange={(e) => handleChange('capacity', e?.target?.value)}
                error={errors?.capacity}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Fuel Type"
                options={fuelOptions}
                value={formData?.fuelType}
                onChange={(value) => handleChange('fuelType', value)}
                error={errors?.fuelType}
                required
                placeholder="Select fuel type"
              />
              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleChange('status', value)}
                placeholder="Select status"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" iconName="Check">
              Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;