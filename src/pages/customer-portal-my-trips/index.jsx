import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const CustomerPortalMyTrips = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const mockTrips = [
    {
      id: 'TRP-2025-1127',
      contractId: 'CNT-2025-0456',
      serviceProvider: 'Swift Logistics Solutions',
      providerContact: 'operations@swiftlogistics.com',
      providerPhone: '+1 (555) 234-5678',
      commodity: 'Electronics',
      driver: 'John Smith',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
      driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
      vehicle: 'TRK-001',
      origin: 'New York, NY',
      destination: 'Miami, FL',
      status: 'in-transit',
      progress: 65,
      currentCheckpoint: 3,
      totalCheckpoints: 5,
      eta: '11/28/2025 2:30 PM',
      delayMinutes: 0
    },
    {
      id: 'TRP-2025-1128',
      contractId: 'CNT-2025-0457',
      serviceProvider: 'Prime Transport Corp',
      providerContact: 'support@primetransport.com',
      providerPhone: '+1 (555) 345-6789',
      commodity: 'Automotive Parts',
      driver: 'Maria Garcia',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
      driverAvatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing company uniform',
      vehicle: 'TRK-003',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      status: 'delayed',
      progress: 45,
      currentCheckpoint: 2,
      totalCheckpoints: 4,
      eta: '11/27/2025 4:15 PM',
      delayMinutes: 35
    },
    {
      id: 'TRP-2025-1129',
      contractId: 'CNT-2025-0458',
      serviceProvider: 'Express Cargo Services',
      providerContact: 'info@expresscargo.com',
      providerPhone: '+1 (555) 456-7890',
      commodity: 'Pharmaceuticals',
      driver: 'David Chen',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8b4d412-1763296666105.png",
      driverAvatarAlt: 'Professional headshot of Asian male driver with short black hair and glasses wearing blue shirt',
      vehicle: 'TRK-005',
      origin: 'Chicago, IL',
      destination: 'Houston, TX',
      status: 'in-transit',
      progress: 80,
      currentCheckpoint: 4,
      totalCheckpoints: 5,
      eta: '11/27/2025 6:45 PM',
      delayMinutes: 0
    },
    {
      id: 'TRP-2025-1130',
      contractId: 'CNT-2025-0459',
      serviceProvider: 'Rapid Freight Solutions',
      providerContact: 'dispatch@rapidfreight.com',
      providerPhone: '+1 (555) 567-8901',
      commodity: 'Consumer Goods',
      driver: 'Sarah Johnson',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe899efa-1763299749488.png",
      driverAvatarAlt: 'Professional headshot of African American female driver with curly hair wearing red company jacket',
      vehicle: 'TRK-002',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      status: 'at-checkpoint',
      progress: 50,
      currentCheckpoint: 2,
      totalCheckpoints: 3,
      eta: '11/27/2025 8:00 PM',
      delayMinutes: 0
    },
    {
      id: 'TRP-2025-1131',
      contractId: 'CNT-2025-0460',
      serviceProvider: 'Swift Logistics Solutions',
      providerContact: 'operations@swiftlogistics.com',
      providerPhone: '+1 (555) 234-5678',
      commodity: 'Food & Beverages',
      driver: 'Michael Brown',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b82ab60e-1763296079393.png",
      driverAvatarAlt: 'Professional headshot of Caucasian male driver with beard wearing gray uniform shirt',
      vehicle: 'TRK-004',
      origin: 'Boston, MA',
      destination: 'Philadelphia, PA',
      status: 'scheduled',
      progress: 0,
      currentCheckpoint: 0,
      totalCheckpoints: 3,
      eta: '11/28/2025 10:00 AM',
      delayMinutes: 0
    },
    {
      id: 'TRP-2025-1132',
      contractId: 'CNT-2025-0461',
      serviceProvider: 'Prime Transport Corp',
      providerContact: 'support@primetransport.com',
      providerPhone: '+1 (555) 345-6789',
      commodity: 'Industrial Equipment',
      driver: 'John Smith',
      driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
      driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
      vehicle: 'TRK-001',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      status: 'completed',
      progress: 100,
      currentCheckpoint: 6,
      totalCheckpoints: 6,
      eta: '11/27/2025 12:00 PM',
      delayMinutes: 0
    }
  ];

  const filteredTrips = useMemo(() => {
    return mockTrips?.filter((trip) => {
      if (searchTerm && !trip?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
        !trip?.serviceProvider?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
        return false;
      }
      if (statusFilter?.length > 0 && !statusFilter?.includes(trip?.status)) {
        return false;
      }
      return true;
    });
  }, [searchTerm, statusFilter, mockTrips]);

  const sortedTrips = useMemo(() => {
    if (!sortConfig?.key) return filteredTrips;

    return [...filteredTrips]?.sort((a, b) => {
      if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTrips, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter((prev) => {
      if (prev?.includes(status)) {
        return prev?.filter((s) => s !== status);
      }
      return [...prev, status];
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      delayed: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
      'at-checkpoint': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
      scheduled: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' }
    };

    const config = statusConfig?.[status] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200'
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.bg} ${config?.text} ${config?.border}`}
      >
        {status?.replace('-', ' ')?.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[15rem]">
        <BreadcrumbNavigation />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/5 border-r border-border overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Status</h3>
              <div className="space-y-2">
                {['in-transit', 'delayed', 'at-checkpoint', 'scheduled', 'completed']?.map(
                  (status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={statusFilter?.includes(status)}
                        onChange={() => handleStatusFilterChange(status)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground capitalize">
                        {status?.replace('-', ' ')}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-card border-b border-border px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">My Trips</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track your shipments in real-time
                  </p>
                </div>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export trips')}
                >
                  Export
                </Button>
              </div>

              <div className="relative">
                <Icon
                  name="Search"
                  size="1.125rem"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Search by trip ID or service provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-hidden p-6">
              <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full">
                <div className="overflow-x-auto flex-1">
                  <table className="w-full">
                    <thead className="bg-muted/50 sticky top-0 z-10">
                      <tr className="border-b border-border">
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('id')}
                        >
                          <div className="flex items-center gap-1">
                            Trip ID
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
                          Driver / Vehicle
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
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Progress
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('eta')}
                        >
                          <div className="flex items-center gap-1">
                            ETA
                            <Icon name="ArrowUpDown" size="0.875rem" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTrips?.map((trip) => (
                        <tr key={trip?.id} className="border-b border-border hover:bg-muted/30">
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{trip?.id}</div>
                            <div className="text-xs text-muted-foreground">{trip?.contractId}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{trip?.serviceProvider}</div>
                            <div className="text-xs text-muted-foreground">{trip?.providerContact}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={trip?.driverAvatar}
                                alt={trip?.driverAvatarAlt}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <div className="text-sm font-medium text-foreground">{trip?.driver}</div>
                                <div className="text-xs text-muted-foreground">{trip?.vehicle}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-foreground">{trip?.origin}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="ArrowRight" size="0.75rem" />
                              {trip?.destination}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(trip?.status)}
                            {trip?.delayMinutes > 0 && (
                              <div className="text-xs text-red-600 mt-1">+{trip?.delayMinutes}m</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${trip?.progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {trip?.currentCheckpoint}/{trip?.totalCheckpoints} checkpoints
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{trip?.eta}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => navigate('/customer-portal-my-trip-details')}
                              className="text-primary hover:text-primary/80 font-medium text-sm"
                            >
                              Track
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-border px-6 py-4 bg-muted/30">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {sortedTrips?.length} of {mockTrips?.length} trips
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyTrips;