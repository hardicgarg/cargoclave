import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyDashboard2 = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const showItem = (index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 150);
    };

    for (let i = 0; i < 15; i++) {
      showItem(i);
    }
  }, []);

  const dashboardData = {
    summary: {
      activeContracts: 5,
      activeTrips: 3,
      completedDeliveries: 142,
      onTimeDeliveryRate: 94.5,
      totalShipmentValue: 487300,
      pendingDeliveries: 3,
      averageDeliveryTime: 3.2,
      customerSatisfaction: 4.7
    },
    timeline: [
      {
        id: 1,
        type: 'delivery',
        title: 'Delivery Completed',
        description: 'Shipment TRP-2025-1126 delivered to Houston, TX',
        time: '2 hours ago',
        icon: 'CheckCircle',
        color: 'green'
      },
      {
        id: 2,
        type: 'trip',
        title: 'Trip In Progress',
        description: 'TRP-2025-1127 is 65% complete to Miami, FL',
        time: '4 hours ago',
        icon: 'Truck',
        color: 'blue'
      },
      {
        id: 3,
        type: 'alert',
        title: 'Delay Alert',
        description: 'TRP-2025-1128 delayed by 2 hours due to weather',
        time: '6 hours ago',
        icon: 'AlertCircle',
        color: 'red'
      },
      {
        id: 4,
        type: 'contract',
        title: 'Contract Signed',
        description: 'New contract CNT-2025-004 with Prime Transport',
        time: '1 day ago',
        icon: 'FileText',
        color: 'purple'
      },
      {
        id: 5,
        type: 'checkpoint',
        title: 'Checkpoint Reached',
        description: 'TRP-2025-1129 reached Dallas checkpoint',
        time: '1 day ago',
        icon: 'MapPin',
        color: 'yellow'
      }
    ],
    recentTrips: [
      {
        id: 'TRP-2025-1127',
        serviceProvider: 'Swift Logistics Solutions',
        origin: 'New York, NY',
        destination: 'Miami, FL',
        status: 'in-transit',
        progress: 65,
        eta: '11/28/2025 2:30 PM'
      },
      {
        id: 'TRP-2025-1128',
        serviceProvider: 'Prime Transport Corp',
        origin: 'Los Angeles, CA',
        destination: 'Phoenix, AZ',
        status: 'delayed',
        progress: 45,
        eta: '11/27/2025 4:15 PM'
      },
      {
        id: 'TRP-2025-1129',
        serviceProvider: 'Express Cargo Services',
        origin: 'Chicago, IL',
        destination: 'Houston, TX',
        status: 'in-transit',
        progress: 80,
        eta: '11/27/2025 6:45 PM'
      }
    ],
    providers: [
      { name: 'Swift Logistics', rating: 4.8, shipments: 2, onTime: 96 },
      { name: 'Prime Transport', rating: 4.6, shipments: 1, onTime: 92 },
      { name: 'Express Cargo', rating: 4.9, shipments: 1, onTime: 98 }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      'in-transit': 'blue',
      delayed: 'red',
      completed: 'green',
      scheduled: 'purple'
    };
    return colors?.[status] || 'gray';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[15rem]">
        <BreadcrumbNavigation />

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className={`bg-white border-b-4 border-blue-500 px-6 py-6 shadow-md transition-all duration-700 ${visibleItems?.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-1">My Dashboard 2</h1>
                <p className="text-muted-foreground">Timeline Layout - Activity feed view</p>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={18}
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Metrics */}
              <div className="lg:col-span-1 space-y-6">
                {/* Summary Cards sliding from left */}
                {[
                  { label: 'Active Contracts', value: dashboardData?.summary?.activeContracts, icon: 'FileText', color: 'blue', index: 1 },
                  { label: 'Active Trips', value: dashboardData?.summary?.activeTrips, icon: 'Truck', color: 'purple', index: 2 },
                  { label: 'Completed', value: dashboardData?.summary?.completedDeliveries, icon: 'CheckCircle', color: 'green', index: 3 },
                  { label: 'On-Time Rate', value: `${dashboardData?.summary?.onTimeDeliveryRate}%`, icon: 'Clock', color: 'yellow', index: 4 }
                ]?.map((metric) => (
                  <div
                    key={metric?.index}
                    className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${metric?.color}-500 transition-all duration-700 hover:shadow-xl ${visibleItems?.includes(metric?.index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">{metric?.label}</p>
                        <p className="text-3xl font-bold text-foreground">{metric?.value}</p>
                      </div>
                      <div className={`h-14 w-14 rounded-full bg-${metric?.color}-100 flex items-center justify-center`}>
                        <Icon name={metric?.icon} size="1.5rem" className={`text-${metric?.color}-600`} />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Service Providers sliding from left */}
                <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 ${visibleItems?.includes(5) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                  }`}>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Building2" size="1.25rem" />
                    Service Providers
                  </h3>
                  <div className="space-y-4">
                    {dashboardData?.providers?.map((provider, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon name="Building2" size="1.125rem" className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{provider?.name}</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size="0.75rem" className="text-yellow-500 fill-yellow-500" />
                              <span className="text-xs text-muted-foreground">{provider?.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{provider?.shipments} active</p>
                          <p className="text-xs font-semibold text-green-600">{provider?.onTime}% on-time</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column - Timeline */}
              <div className="lg:col-span-2 space-y-6">
                {/* Activity Timeline sliding from right */}
                <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-700 ${visibleItems?.includes(6) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}>
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Icon name="Activity" size="1.5rem" />
                    Activity Timeline
                  </h2>
                  <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
                    <div className="space-y-6">
                      {dashboardData?.timeline?.map((item, index) => (
                        <div
                          key={item?.id}
                          className={`relative pl-12 transition-all duration-700 ${visibleItems?.includes(7 + index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                            }`}
                        >
                          <div className={`absolute left-0 h-10 w-10 rounded-full bg-${item?.color}-100 border-4 border-white shadow-md flex items-center justify-center`}>
                            <Icon name={item?.icon} size="1.125rem" className={`text-${item?.color}-600`} />
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-foreground">{item?.title}</h3>
                              <span className="text-xs text-muted-foreground">{item?.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item?.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Trips sliding from right */}
                <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 ${visibleItems?.includes(12) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                  }`}>
                  <div className="px-6 py-4 bg-blue-500 text-white flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Recent Shipments</h2>
                      <p className="text-sm text-blue-100">Track your deliveries</p>
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
                  <div className="divide-y divide-border">
                    {dashboardData?.recentTrips?.map((trip, index) => (
                      <div
                        key={trip?.id}
                        className={`px-6 py-4 hover:bg-gray-50 transition-all duration-500 ${visibleItems?.includes(13 + index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-foreground">{trip?.id}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(trip?.status)}-100 text-${getStatusColor(trip?.status)}-800`}>
                                {trip?.status?.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="Building2" size="0.875rem" />
                              <span>{trip?.serviceProvider}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="MapPin" size="0.875rem" className="text-blue-600" />
                              <span className="font-medium">{trip?.origin}</span>
                              <Icon name="ArrowRight" size="0.875rem" />
                              <Icon name="MapPin" size="0.875rem" className="text-green-600" />
                              <span className="font-medium">{trip?.destination}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-semibold">{trip?.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`bg-${getStatusColor(trip?.status)}-500 h-2 rounded-full transition-all duration-1000`}
                                  style={{ width: `${trip?.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/customer-portal-my-trip-details')}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
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

export default CustomerPortalMyDashboard2;