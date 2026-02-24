import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';

import PermissionGrid from './PermissionGrid';

const RoleCreatorTab = () => {
  const [formData, setFormData] = useState({
    roleName: '',
    description: ''
  });

  const [permissions, setPermissions] = useState({
    dashboards: { read: false, write: false, invite: false, delete: false },
    contracts: { read: false, write: false, invite: false, delete: false },
    trips: { read: false, write: false, invite: false, delete: false },
    masters: { read: false, write: false, invite: false, delete: false },
    systemAudit: { read: false, write: false, invite: false, delete: false },
    customerPortal: { read: false, write: false, invite: false, delete: false },
    usersRoles: { read: false, write: false, invite: false, delete: false }
  });

  const [savedRoles, setSavedRoles] = useState([
    {
      id: 1,
      name: 'Operations Manager',
      description: 'Full access to operations and fleet management',
      createdAt: '2025-11-20',
      userCount: 12
    },
    {
      id: 2,
      name: 'Fleet Coordinator',
      description: 'Manage vehicles and driver assignments',
      createdAt: '2025-11-18',
      userCount: 8
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (module, permission) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev?.[module],
        [permission]: !prev?.[module]?.[permission]
      }
    }));
  };

  const handleSelectAll = (module) => {
    const allSelected = Object?.values(permissions?.[module])?.every(val => val);
    setPermissions(prev => ({
      ...prev,
      [module]: {
        read: !allSelected,
        write: !allSelected,
        invite: !allSelected,
        delete: !allSelected
      }
    }));
  };

  const handleSaveRole = () => {
    if (!formData?.roleName?.trim()) {
      alert('Please enter a role name');
      return;
    }

    const newRole = {
      id: savedRoles?.length + 1,
      name: formData?.roleName,
      description: formData?.description,
      createdAt: new Date()?.toISOString()?.split('T')?.[0],
      userCount: 0,
      permissions: { ...permissions }
    };

    setSavedRoles(prev => [newRole, ...prev]);
    
    // Reset form
    setFormData({ roleName: '', description: '' });
    setPermissions({
      dashboards: { read: false, write: false, invite: false, delete: false },
      contracts: { read: false, write: false, invite: false, delete: false },
      trips: { read: false, write: false, invite: false, delete: false },
      masters: { read: false, write: false, invite: false, delete: false },
      systemAudit: { read: false, write: false, invite: false, delete: false },
      customerPortal: { read: false, write: false, invite: false, delete: false },
      usersRoles: { read: false, write: false, invite: false, delete: false }
    });
  };

  const handleDeleteRole = (roleId) => {
    if (window?.confirm('Are you sure you want to delete this role?')) {
      setSavedRoles(prev => prev?.filter(role => role?.id !== roleId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Creation Form */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Plus" size="1.25rem" className="text-primary" />
            Create New Role
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Define role details and configure permission settings
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role Name <span className="text-destructive">*</span>
              </label>
              <Input
                name="roleName"
                value={formData?.roleName}
                onChange={handleInputChange}
                placeholder="e.g., Operations Manager"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <Input
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                placeholder="Brief description of role responsibilities"
                className="w-full"
              />
            </div>
          </div>

          {/* Permission Grid */}
          <PermissionGrid
            permissions={permissions}
            onPermissionChange={handlePermissionChange}
            onSelectAll={handleSelectAll}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setFormData({ roleName: '', description: '' });
                setPermissions({
                  dashboards: { read: false, write: false, invite: false, delete: false },
                  contracts: { read: false, write: false, invite: false, delete: false },
                  trips: { read: false, write: false, invite: false, delete: false },
                  masters: { read: false, write: false, invite: false, delete: false },
                  systemAudit: { read: false, write: false, invite: false, delete: false },
                  customerPortal: { read: false, write: false, invite: false, delete: false },
                  usersRoles: { read: false, write: false, invite: false, delete: false }
                });
              }}
            >
              <Icon name="X" size="1rem" className="mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveRole}>
              <Icon name="Save" size="1rem" className="mr-2" />
              Save Role
            </Button>
          </div>
        </div>
      </div>

      {/* Saved Roles List */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="List" size="1.25rem" className="text-primary" />
            Existing Roles ({savedRoles?.length})
          </h2>
        </div>

        <div className="divide-y divide-border">
          {savedRoles?.map((role) => (
            <div key={role?.id} className="p-6 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {role?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role?.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size="0.875rem" />
                      Created: {role?.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size="0.875rem" />
                      {role?.userCount} users assigned
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                    <Icon name="Edit" size="1rem" className="text-primary" />
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role?.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Icon name="Trash2" size="1rem" className="text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleCreatorTab;