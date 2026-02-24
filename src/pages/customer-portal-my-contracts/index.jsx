import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CustomerPortalMyContracts = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [sortConfig, setSortConfig] = useState({ column: 'createdDate', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const mockContracts = [
    {
      id: 'c1',
      contractId: 'CNT-2025-001',
      serviceProvider: 'Swift Logistics Solutions',
      providerContact: 'operations@swiftlogistics.com',
      providerPhone: '+1 (555) 234-5678',
      commodity: 'Electronics',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      status: 'active',
      value: 125000,
      priority: 'high',
      createdDate: '2025-01-15',
      assignedDriver: {
        name: 'John Mitchell',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
        avatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform'
      },
      providerRating: 4.8
    },
    {
      id: 'c2',
      contractId: 'CNT-2025-002',
      serviceProvider: 'Prime Transport Corp',
      providerContact: 'support@primetransport.com',
      providerPhone: '+1 (555) 345-6789',
      commodity: 'Automotive Parts',
      origin: 'Detroit, MI',
      destination: 'Houston, TX',
      status: 'in-progress',
      value: 89500,
      priority: 'medium',
      createdDate: '2025-01-18',
      assignedDriver: {
        name: 'Sarah Johnson',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_138d182b8-1763297744003.png",
        avatarAlt: 'Professional headshot of African American female driver with long black hair in professional attire'
      },
      providerRating: 4.6
    },
    {
      id: 'c3',
      contractId: 'CNT-2025-003',
      serviceProvider: 'Express Cargo Services',
      providerContact: 'info@expresscargo.com',
      providerPhone: '+1 (555) 456-7890',
      commodity: 'Pharmaceuticals',
      origin: 'Boston, MA',
      destination: 'Miami, FL',
      status: 'active',
      value: 156000,
      priority: 'high',
      createdDate: '2025-01-20',
      assignedDriver: {
        name: 'Michael Chen',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151f60f91-1763299385526.png",
        avatarAlt: 'Professional headshot of Asian male driver with short black hair wearing company uniform'
      },
      providerRating: 4.9
    },
    {
      id: 'c4',
      contractId: 'CNT-2025-004',
      serviceProvider: 'Rapid Freight Solutions',
      providerContact: 'dispatch@rapidfreight.com',
      providerPhone: '+1 (555) 567-8901',
      commodity: 'Food & Beverage',
      origin: 'Chicago, IL',
      destination: 'Seattle, WA',
      status: 'completed',
      value: 67800,
      priority: 'low',
      createdDate: '2025-01-10',
      assignedDriver: {
        name: 'Emily Rodriguez',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129aa8ebc-1763299616245.png",
        avatarAlt: 'Professional headshot of Hispanic female driver with brown hair in ponytail wearing safety vest'
      },
      providerRating: 4.5
    },
    {
      id: 'c5',
      contractId: 'CNT-2025-005',
      serviceProvider: 'Swift Logistics Solutions',
      providerContact: 'operations@swiftlogistics.com',
      providerPhone: '+1 (555) 234-5678',
      commodity: 'Textiles',
      origin: 'Atlanta, GA',
      destination: 'Denver, CO',
      status: 'active',
      value: 45200,
      priority: 'medium',
      createdDate: '2025-01-22',
      assignedDriver: {
        name: 'David Thompson',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b31fca0a-1763292840548.png",
        avatarAlt: 'Professional headshot of Caucasian male driver with blonde hair wearing casual work attire'
      },
      providerRating: 4.8
    }
  ];

  const [filteredContracts, setFilteredContracts] = useState(mockContracts);

  useEffect(() => {
    let result = [...mockContracts];

    if (searchTerm) {
      result = result?.filter(
        (contract) =>
          contract?.contractId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          contract?.serviceProvider?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result?.filter((contract) => contract?.status === statusFilter);
    }

    result?.sort((a, b) => {
      const aValue = a?.[sortConfig?.column];
      const bValue = b?.[sortConfig?.column];

      if (sortConfig?.column === 'createdDate') {
        return sortConfig?.direction === 'asc'
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }

      if (sortConfig?.column === 'value') {
        return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc'
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      return 0;
    });

    setFilteredContracts(result);
  }, [searchTerm, statusFilter, sortConfig]);

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev?.column === column && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      'on-hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          statusColors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {status?.replace('-', ' ')?.toUpperCase()}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };

    return (
      <span className={`text-sm font-medium ${priorityColors?.[priority] || 'text-gray-600'}`}>
        {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <BreadcrumbNavigation />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Contracts</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  View and track your logistics contracts with service providers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size="1.125rem"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Search by contract ID or service provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e?.target?.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded transition-all duration-150 ${
                    viewMode === 'table' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Table" size="1.125rem" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded transition-all duration-150 ${
                    viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="LayoutGrid" size="1.125rem" />
                </button>
              </div>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={18}
                onClick={() => console.log('Export contracts')}
              >
                Export
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {viewMode === 'table' ? (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 sticky top-0 z-10">
                    <tr className="border-b border-border">
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('contractId')}
                      >
                        <div className="flex items-center gap-1">
                          Contract ID
                          <Icon name="ArrowUpDown" size="0.875rem" />
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('serviceProvider')}
                      >
                        <div className="flex items-center gap-1">
                          Service Provider
                          <Icon name="ArrowUpDown" size="0.875rem" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Commodity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Route
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-1">
                          Status
                          <Icon name="ArrowUpDown" size="0.875rem" />
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                        onClick={() => handleSort('value')}
                      >
                        <div className="flex items-center gap-1">
                          Value
                          <Icon name="ArrowUpDown" size="0.875rem" />
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts?.map((contract) => (
                      <tr key={contract?.id} className="border-b border-border hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{contract?.contractId}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(contract?.createdDate)?.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">
                            {contract?.serviceProvider}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Icon name="Star" size="0.75rem" className="text-yellow-500 fill-yellow-500" />
                            <span>{contract?.providerRating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{contract?.commodity}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-foreground">{contract?.origin}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="ArrowRight" size="0.75rem" />
                            {contract?.destination}
                          </div>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(contract?.status)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          ${contract?.value?.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">{getPriorityBadge(contract?.priority)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate('/customer-portal-my-contract-details')}
                            className="text-primary hover:text-primary/80 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredContracts?.map((contract) => (
                  <div
                    key={contract?.id}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{contract?.contractId}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(contract?.createdDate)?.toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(contract?.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <Icon name="Building2" size="1rem" className="text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {contract?.serviceProvider}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Icon name="Star" size="0.75rem" className="text-yellow-500 fill-yellow-500" />
                            <span>{contract?.providerRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Package" size="1rem" className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{contract?.commodity}</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" size="1rem" className="text-muted-foreground mt-0.5" />
                        <div className="flex-1 text-sm">
                          <p className="text-foreground">{contract?.origin}</p>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="ArrowRight" size="0.75rem" />
                            <span>{contract?.destination}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Value: </span>
                        <span className="font-semibold text-foreground">
                          ${contract?.value?.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/customer-portal-my-contract-details')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredContracts?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon name="FileX" size="4rem" className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No contracts found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyContracts;