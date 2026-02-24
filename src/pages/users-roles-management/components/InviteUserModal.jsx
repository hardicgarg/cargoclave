import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';

const InviteUserModal = ({ availableRoles, onClose, onInvite }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: availableRoles?.[0] || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData?.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object?.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onInvite(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="UserPlus" size="1.5rem" className="text-primary" />
            Invite New User
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size="1.25rem" className="text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="w-full"
            />
            {errors?.name && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <Icon name="AlertCircle" size="0.75rem" />
                {errors?.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="user@cargoclave.com"
              className="w-full"
            />
            {errors?.email && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <Icon name="AlertCircle" size="0.75rem" />
                {errors?.email}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Assign Role <span className="text-destructive">*</span>
            </label>
            <Select
              name="role"
              value={formData?.role}
              onChange={handleInputChange}
              className="w-full"
            >
              <option value="">Select a role</option>
              {availableRoles?.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>
            {errors?.role && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <Icon name="AlertCircle" size="0.75rem" />
                {errors?.role}
              </p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="Info" size="1.125rem" className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900">
                <p className="font-medium mb-1">Invitation Process</p>
                <p>An email invitation will be sent to the user with instructions to set up their account and access the system.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Icon name="Send" size="1rem" className="mr-2" />
              Send Invitation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUserModal;