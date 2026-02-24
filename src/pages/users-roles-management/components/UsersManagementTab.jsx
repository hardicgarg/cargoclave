import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import InviteUserModal from './InviteUserModal';

const UsersManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@cargoclave.com',
      role: 'Operations Manager',
      status: 'Active',
      invitedDate: '2025-11-15',
      lastLogin: '2025-11-28 09:30 AM'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@cargoclave.com',
      role: 'Fleet Coordinator',
      status: 'Active',
      invitedDate: '2025-11-20',
      lastLogin: '2025-11-27 02:15 PM'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@cargoclave.com',
      role: 'Operations Manager',
      status: 'Pending',
      invitedDate: '2025-11-25',
      lastLogin: null
    }
  ]);

  const availableRoles = [
    'Operations Manager',
    'Fleet Coordinator',
    'Safety Supervisor',
    'Analytics Manager'
  ];

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev?.map(user => 
      user?.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusToggle = (userId) => {
    setUsers(prev => prev?.map(user => 
      user?.id === userId 
        ? { ...user, status: user?.status === 'Active' ? 'Inactive' : 'Active' } 
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window?.confirm('Are you sure you want to remove this user?')) {
      setUsers(prev => prev?.filter(user => user?.id !== userId));
    }
  };

  const handleResendInvite = (userId) => {
    alert('Invitation email resent successfully!');
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user?.status?.toLowerCase() === statusFilter?.toLowerCase();
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Icon 
                name="Search" 
                size="1.125rem" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                placeholder="Search by name or email..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e?.target?.value)}
              className="w-full md:w-32"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Select>

            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e?.target?.value)}
              className="w-full md:w-40"
            >
              <option value="all">All Roles</option>
              {availableRoles?.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>

            <Button onClick={() => setIsInviteModalOpen(true)}>
              <Icon name="UserPlus" size="1rem" className="mr-2" />
              Invite User
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Users" size="1.25rem" className="text-primary" />
            Administrative Users ({filteredUsers?.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-foreground">User</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Role</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Last Login</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Invited</th>
                <th className="text-center p-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Select
                      value={user?.role}
                      onChange={(e) => handleRoleChange(user?.id, e?.target?.value)}
                      className="text-sm"
                    >
                      {availableRoles?.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </Select>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${user?.status === 'Active' ? 'bg-green-600' : user?.status === 'Pending' ? 'bg-yellow-600' : 'bg-gray-600'}`} />
                      {user?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">
                      {user?.lastLogin || '-'}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground">{user?.invitedDate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {user?.status === 'Pending' && (
                        <button
                          onClick={() => handleResendInvite(user?.id)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Resend Invitation"
                        >
                          <Icon name="Mail" size="1rem" className="text-blue-600" />
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusToggle(user?.id)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        title={user?.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        <Icon 
                          name={user?.status === 'Active' ? 'UserX' : 'UserCheck'} 
                          size="1rem" 
                          className="text-primary" 
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user?.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        title="Remove User"
                      >
                        <Icon name="Trash2" size="1rem" className="text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="Users" size="3rem" className="mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No users found matching your filters</p>
          </div>
        )}
      </div>

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <InviteUserModal
          availableRoles={availableRoles}
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={(newUser) => {
            setUsers(prev => [...prev, { 
              ...newUser, 
              id: prev?.length + 1,
              status: 'Pending',
              invitedDate: new Date()?.toISOString()?.split('T')?.[0],
              lastLogin: null
            }]);
            setIsInviteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UsersManagementTab;