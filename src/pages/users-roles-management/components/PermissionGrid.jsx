import React from 'react';
import Icon from 'components/AppIcon';
import { Checkbox } from 'components/ui/Checkbox';

const PermissionGrid = ({ permissions, onPermissionChange, onSelectAll }) => {
  const modules = [
    { key: 'dashboards', label: 'Dashboards', icon: 'LayoutDashboard' },
    { key: 'contracts', label: 'Contracts', icon: 'FileText' },
    { key: 'trips', label: 'Trips', icon: 'MapPin' },
    { key: 'masters', label: 'Masters', icon: 'Database' },
    { key: 'systemAudit', label: 'System Audit', icon: 'FileSearch' },
    { key: 'customerPortal', label: 'Customer Portal', icon: 'UserCheck' },
    { key: 'usersRoles', label: 'Users & Roles', icon: 'ShieldCheck' }
  ];

  const permissionTypes = [
    { key: 'read', label: 'Read', color: 'text-blue-600' },
    { key: 'write', label: 'Write', color: 'text-green-600' },
    { key: 'invite', label: 'Invite', color: 'text-purple-600' },
    { key: 'delete', label: 'Delete', color: 'text-red-600' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Module Permissions <span className="text-destructive">*</span>
        </label>
        <span className="text-xs text-muted-foreground">
          Select permissions for each module
        </span>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-4 bg-muted p-4 border-b border-border">
          <div className="col-span-2 text-sm font-semibold text-foreground">
            Module
          </div>
          {permissionTypes?.map((permission) => (
            <div key={permission?.key} className="text-sm font-semibold text-center">
              <span className={permission?.color}>{permission?.label}</span>
            </div>
          ))}
        </div>

        {/* Permission Rows */}
        <div className="divide-y divide-border">
          {modules?.map((module) => {
            const allSelected = Object?.values(permissions?.[module?.key])?.every(val => val);
            const someSelected = Object?.values(permissions?.[module?.key])?.some(val => val) && !allSelected;

            return (
              <div 
                key={module?.key}
                className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <button
                    onClick={() => onSelectAll(module?.key)}
                    className={`
                      p-1 rounded transition-colors
                      ${allSelected ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}
                      ${someSelected ? 'bg-primary/50' : ''}
                    `}
                  >
                    <Icon 
                      name={allSelected ? 'CheckSquare' : someSelected ? 'MinusSquare' : 'Square'} 
                      size="1rem" 
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <Icon name={module?.icon} size="1.125rem" className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {module?.label}
                    </span>
                  </div>
                </div>

                {permissionTypes?.map((permission) => (
                  <div key={permission?.key} className="flex justify-center items-center">
                    <Checkbox
                      checked={permissions?.[module?.key]?.[permission?.key]}
                      onChange={() => onPermissionChange(module?.key, permission?.key)}
                      className="h-5 w-5"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Permission Legend */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-start gap-2">
          <Icon name="Info" size="1rem" className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground mb-2">Permission Types:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {permissionTypes?.map((permission) => (
                <div key={permission?.key} className="text-xs">
                  <span className={`font-semibold ${permission?.color}`}>
                    {permission?.label}:
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {permission?.key === 'read' && 'View data'}
                    {permission?.key === 'write' && 'Create/Edit'}
                    {permission?.key === 'invite' && 'Share access'}
                    {permission?.key === 'delete' && 'Remove data'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionGrid;