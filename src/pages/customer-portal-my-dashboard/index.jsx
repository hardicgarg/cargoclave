import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    activeContracts: 5,
    activeTrips: 3,
    completedDeliveries: 142,
    onTimeDeliveryRate: 94.5,
    totalShipmentValue: 487300,
    pendingDeliveries: 3
  };

  const recentTrips = [
    {
      id: 'TRP-2025-1127',
      contractId: 'CNT-2025-001',
      serviceProvider: 'Swift Logistics Solutions',
      origin: 'New York, NY',
      destination: 'Miami, FL',
      status: 'in-transit',
      progress: 65,
      eta: '11/28/2025 2:30 PM'
    },
    {
      id: 'TRP-2025-1128',
      contractId: 'CNT-2025-002',
      serviceProvider: 'Prime Transport Corp',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      status: 'delayed',
      progress: 45,
      eta: '11/27/2025 4:15 PM'
    },
    {
      id: 'TRP-2025-1129',
      contractId: 'CNT-2025-003',
      serviceProvider: 'Express Cargo Services',
      origin: 'Chicago, IL',
      destination: 'Houston, TX',
      status: 'in-transit',
      progress: 80,
      eta: '11/27/2025 6:45 PM'
    }
  ];

  const serviceProviderPerformance = [
    {
      provider: 'Swift Logistics Solutions',
      rating: 4.8,
      activeShipments: 2,
      onTimeRate: 96,
      totalDeliveries: 45
    },
    {
      provider: 'Prime Transport Corp',
      rating: 4.6,
      activeShipments: 1,
      onTimeRate: 92,
      totalDeliveries: 38
    },
    {
      provider: 'Express Cargo Services',
      rating: 4.9,
      activeShipments: 1,
      onTimeRate: 98,
      totalDeliveries: 35
    }
  ];

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

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-card border-b border-border px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Overview of your shipments and service providers
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={18}
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={18}
                  onClick={() => console.log('Export dashboard')}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Active Contracts
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {dashboardMetrics?.activeContracts}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon name="FileText" size="1.5rem" className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Active Trips
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {dashboardMetrics?.activeTrips}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Icon name="Truck" size="1.5rem" className="text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Completed Deliveries
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {dashboardMetrics?.completedDeliveries}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="CheckCircle" size="1.5rem" className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      On-Time Rate
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {dashboardMetrics?.onTimeDeliveryRate}%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="Clock" size="1.5rem" className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Shipment Value
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ${(dashboardMetrics?.totalShipmentValue / 1000)?.toFixed(0)}K
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Icon name="DollarSign" size="1.5rem" className="text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Pending Deliveries
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {dashboardMetrics?.pendingDeliveries}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon name="Package" size="1.5rem" className="text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Trips Section */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Recent Trips</h2>
                  <p className="text-sm text-muted-foreground">Track your active shipments</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/customer-portal-my-trips')}
                >
                  View All
                </Button>
              </div>
              <div className="divide-y divide-border">
                {recentTrips?.map((trip) => (
                  <div key={trip?.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-foreground">{trip?.id}</p>
                            <p className="text-xs text-muted-foreground">{trip?.contractId}</p>
                          </div>
                          {getStatusBadge(trip?.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Icon name="Building2" size="0.875rem" className="text-muted-foreground" />
                            <span className="text-foreground">{trip?.serviceProvider}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Icon name="MapPin" size="0.875rem" className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {trip?.origin} → {trip?.destination}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{trip?.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${trip?.progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">ETA: </span>
                            <span className="text-foreground font-medium">{trip?.eta}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/customer-portal-my-trip-details')}
                      >
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Provider Performance */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Service Provider Performance
                </h2>
                <p className="text-sm text-muted-foreground">
                  Performance metrics of your logistics partners
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Service Provider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Active Shipments
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        On-Time Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Total Deliveries
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {serviceProviderPerformance?.map((provider, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon name="Building2" size="1.25rem" className="text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{provider?.provider}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size="1rem" className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium text-foreground">
                              {provider?.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground">{provider?.activeShipments}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[100px]">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${provider?.onTimeRate >= 95
                                      ? 'bg-green-500'
                                      : provider?.onTimeRate >= 90
                                        ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                  style={{ width: `${provider?.onTimeRate}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {provider?.onTimeRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-foreground">{provider?.totalDeliveries}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/customer-portal-my-contracts')}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="FileText" size="1.5rem" className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">View Contracts</h3>
                    <p className="text-sm text-muted-foreground">Manage your active contracts</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/customer-portal-my-trips')}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="MapPin" size="1.5rem" className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Track Shipments</h3>
                    <p className="text-sm text-muted-foreground">Real-time trip tracking</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => console.log('Contact support')}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="MessageCircle" size="1.5rem" className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Contact Support</h3>
                    <p className="text-sm text-muted-foreground">Get help from our team</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyDashboard;