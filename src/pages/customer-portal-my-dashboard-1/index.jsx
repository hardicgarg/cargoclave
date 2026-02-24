import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyDashboard1 = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 100);
    const timer2 = setTimeout(() => setAnimationStage(2), 300);
    const timer3 = setTimeout(() => setAnimationStage(3), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const dashboardMetrics = {
    activeContracts: 5,
    activeTrips: 3,
    completedDeliveries: 142,
    onTimeDeliveryRate: 94.5,
    totalShipmentValue: 487300,
    pendingDeliveries: 3,
    averageDeliveryTime: 3.2,
    customerSatisfaction: 4.7
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
      eta: '11/28/2025 2:30 PM',
      distance: '1,280 miles'
    },
    {
      id: 'TRP-2025-1128',
      contractId: 'CNT-2025-002',
      serviceProvider: 'Prime Transport Corp',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      status: 'delayed',
      progress: 45,
      eta: '11/27/2025 4:15 PM',
      distance: '373 miles'
    },
    {
      id: 'TRP-2025-1129',
      contractId: 'CNT-2025-003',
      serviceProvider: 'Express Cargo Services',
      origin: 'Chicago, IL',
      destination: 'Houston, TX',
      status: 'in-transit',
      progress: 80,
      eta: '11/27/2025 6:45 PM',
      distance: '1,082 miles'
    }
  ];

  const serviceProviders = [
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
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${config?.bg} ${config?.text} ${config?.border}`}
      >
        {status?.replace('-', ' ')?.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[15rem]">
        <BreadcrumbNavigation />

        <div className="flex-1 overflow-y-auto">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8 shadow-lg">
            <div className={`transition-all duration-700 ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Dashboard 1</h1>
                  <p className="text-blue-100">
                    Grid Layout - Your shipment metrics at a glance
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={18}
                    onClick={() => window.location?.reload()}
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Key Metrics Grid with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Active Contracts', value: dashboardMetrics?.activeContracts, icon: 'FileText', color: 'blue', delay: 0 },
                { label: 'Active Trips', value: dashboardMetrics?.activeTrips, icon: 'Truck', color: 'purple', delay: 100 },
                { label: 'Completed Deliveries', value: dashboardMetrics?.completedDeliveries, icon: 'CheckCircle', color: 'green', delay: 200 },
                { label: 'On-Time Rate', value: `${dashboardMetrics?.onTimeDeliveryRate}%`, icon: 'Clock', color: 'yellow', delay: 300 },
                { label: 'Shipment Value', value: `$${(dashboardMetrics?.totalShipmentValue / 1000)?.toFixed(0)}K`, icon: 'DollarSign', color: 'emerald', delay: 400 },
                { label: 'Pending Deliveries', value: dashboardMetrics?.pendingDeliveries, icon: 'Package', color: 'orange', delay: 500 },
                { label: 'Avg Delivery Time', value: `${dashboardMetrics?.averageDeliveryTime} days`, icon: 'Timer', color: 'indigo', delay: 600 },
                { label: 'Satisfaction Score', value: `${dashboardMetrics?.customerSatisfaction}/5`, icon: 'Star', color: 'pink', delay: 700 }
              ]?.map((metric, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${metric?.color}-500 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{ transitionDelay: `${metric?.delay}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-14 w-14 rounded-full bg-${metric?.color}-100 flex items-center justify-center transform transition-transform hover:rotate-12`}>
                      <Icon name={metric?.icon} size="1.75rem" className={`text-${metric?.color}-600`} />
                    </div>
                    <div className={`text-xs font-semibold px-3 py-1 rounded-full bg-${metric?.color}-100 text-${metric?.color}-700`}>
                      LIVE
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                    {metric?.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{metric?.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Trips with hover effects */}
            <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Recent Shipments</h2>
                    <p className="text-sm text-blue-100">Track your active deliveries</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => navigate('/customer-portal-my-trips')}
                  >
                    View All
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {recentTrips?.map((trip, index) => (
                  <div
                    key={trip?.id}
                    className="px-6 py-5 hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Icon name="Truck" size="1.25rem" className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-bold text-foreground text-lg">{trip?.id}</p>
                              <p className="text-xs text-muted-foreground">{trip?.contractId}</p>
                            </div>
                          </div>
                          {getStatusBadge(trip?.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Icon name="Building2" size="1rem" className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{trip?.serviceProvider}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Navigation" size="1rem" className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{trip?.distance}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size="1rem" className="text-blue-600" />
                          <span className="text-sm font-medium text-foreground">
                            {trip?.origin}
                          </span>
                          <Icon name="ArrowRight" size="1rem" className="text-muted-foreground" />
                          <Icon name="MapPin" size="1rem" className="text-green-600" />
                          <span className="text-sm font-medium text-foreground">
                            {trip?.destination}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold text-foreground">{trip?.progress}%</span>
                          </div>
                          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${trip?.progress}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="Clock" size="0.875rem" className="text-muted-foreground" />
                            <span className="text-muted-foreground">ETA: </span>
                            <span className="font-semibold text-foreground">{trip?.eta}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => navigate('/customer-portal-my-trip-details')}
                      >
                        Track
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Provider Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              {serviceProviders?.map((provider, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Icon name="Building2" size="1.5rem" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{provider?.provider}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="Star" size="0.875rem" className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-foreground">{provider?.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Shipments</span>
                      <span className="text-sm font-bold text-foreground">{provider?.activeShipments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">On-Time Rate</span>
                      <span className={`text-sm font-bold ${provider?.onTimeRate >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {provider?.onTimeRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Deliveries</span>
                      <span className="text-sm font-bold text-foreground">{provider?.totalDeliveries}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${animationStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
              {[
                { icon: 'FileText', title: 'View Contracts', desc: 'Manage your agreements', path: '/customer-portal-my-contracts', color: 'blue' },
                { icon: 'MapPin', title: 'Track Shipments', desc: 'Real-time tracking', path: '/customer-portal-my-trips', color: 'purple' },
                { icon: 'MessageCircle', title: 'Contact Support', desc: 'Get assistance', path: '#', color: 'green' }
              ]?.map((action, index) => (
                <button
                  key={index}
                  onClick={() => action?.path !== '#' && navigate(action?.path)}
                  className={`bg-gradient-to-br from-${action?.color}-50 to-${action?.color}-100 border-2 border-${action?.color}-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-left group transform hover:scale-105`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-16 w-16 rounded-full bg-${action?.color}-500 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      <Icon name={action?.icon} size="1.75rem" className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{action?.title}</h3>
                      <p className="text-sm text-muted-foreground">{action?.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyDashboard1;