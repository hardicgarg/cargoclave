import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyDashboard3 = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cards?.forEach((index) => {
      setTimeout(() => {
        setAnimatedCards(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  const metrics = {
    primary: {
      activeContracts: 5,
      activeTrips: 3,
      completedDeliveries: 142,
      onTimeRate: 94.5
    },
    secondary: {
      totalValue: 487300,
      pendingDeliveries: 3,
      avgDeliveryTime: 3.2,
      satisfaction: 4.7
    },
    charts: {
      deliveryTrend: [65, 72, 68, 85, 90, 94],
      monthlyShipments: [12, 15, 18, 22, 25, 28]
    }
  };

  const trips = [
    {
      id: 'TRP-2025-1127',
      provider: 'Swift Logistics',
      route: 'NY → Miami',
      status: 'in-transit',
      progress: 65,
      eta: '11/28/2025'
    },
    {
      id: 'TRP-2025-1128',
      provider: 'Prime Transport',
      route: 'LA → Phoenix',
      status: 'delayed',
      progress: 45,
      eta: '11/27/2025'
    },
    {
      id: 'TRP-2025-1129',
      provider: 'Express Cargo',
      route: 'Chicago → Houston',
      status: 'in-transit',
      progress: 80,
      eta: '11/27/2025'
    }
  ];

  const providers = [
    { name: 'Swift Logistics', performance: 96, shipments: 2, rating: 4.8 },
    { name: 'Prime Transport', performance: 92, shipments: 1, rating: 4.6 },
    { name: 'Express Cargo', performance: 98, shipments: 1, rating: 4.9 }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[15rem]">
        <BreadcrumbNavigation />

        <div className="flex-1 overflow-y-auto">
          {/* Animated Header */}
          <div className={`relative overflow-hidden transition-all duration-1000 ${animatedCards?.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            <div className="relative px-6 py-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2 animate-pulse">My Dashboard 3</h1>
                  <p className="text-purple-100 text-lg">Split-Screen Layout - Interactive analytics view</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
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
            {/* Split Screen Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Metrics with bounce animation */}
              <div className="space-y-6">
                <div className={`bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-purple-500 transition-all duration-700 ${animatedCards?.includes(1) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}>
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Icon name="TrendingUp" size="1.5rem" className="text-purple-600" />
                    Key Performance Metrics
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Active Contracts', value: metrics?.primary?.activeContracts, icon: 'FileText', color: 'purple' },
                      { label: 'Active Trips', value: metrics?.primary?.activeTrips, icon: 'Truck', color: 'blue' },
                      { label: 'Completed', value: metrics?.primary?.completedDeliveries, icon: 'CheckCircle', color: 'green' },
                      { label: 'On-Time Rate', value: `${metrics?.primary?.onTimeRate}%`, icon: 'Clock', color: 'yellow' }
                    ]?.map((metric, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br from-${metric?.color}-50 to-${metric?.color}-100 rounded-xl p-4 hover:scale-105 transition-transform duration-300 cursor-pointer`}
                      >
                        <div className={`h-12 w-12 rounded-full bg-${metric?.color}-500 flex items-center justify-center mb-3 animate-bounce`}>
                          <Icon name={metric?.icon} size="1.25rem" className="text-white" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{metric?.label}</p>
                        <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className={`bg-white rounded-2xl shadow-2xl p-6 transition-all duration-700 ${animatedCards?.includes(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="BarChart3" size="1.25rem" className="text-blue-600" />
                    Delivery Performance Trend
                  </h3>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {metrics?.charts?.deliveryTrend?.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-1000 hover:from-purple-600 hover:to-pink-600"
                          style={{
                            height: `${value}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                        <span className="text-xs text-muted-foreground">M{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Provider Performance */}
                <div className={`bg-white rounded-2xl shadow-2xl p-6 transition-all duration-700 ${animatedCards?.includes(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Award" size="1.25rem" className="text-yellow-600" />
                    Top Service Providers
                  </h3>
                  <div className="space-y-3">
                    {providers?.map((provider, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <Icon name="Building2" size="1.125rem" className="text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{provider?.name}</p>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size="0.75rem" className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-muted-foreground">{provider?.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{provider?.shipments} active</p>
                            <p className={`text-sm font-bold ${provider?.performance >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                              {provider?.performance}%
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                            style={{ width: `${provider?.performance}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Trips with interactive effects */}
              <div className="space-y-6">
                <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ${animatedCards?.includes(4) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                          <Icon name="MapPin" size="1.5rem" />
                          Active Shipments
                        </h2>
                        <p className="text-sm text-purple-100">Real-time tracking</p>
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
                    {trips?.map((trip, index) => (
                      <div
                        key={trip?.id}
                        className={`p-6 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-500 ${animatedCards?.includes(5 + index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                                <Icon name="Truck" size="1.25rem" className="text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground text-lg">{trip?.id}</p>
                                <p className="text-sm text-muted-foreground">{trip?.provider}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${trip?.status === 'in-transit' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {trip?.status?.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="MapPin" size="1rem" className="text-purple-600" />
                            <span className="font-medium">{trip?.route}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-bold text-foreground">{trip?.progress}%</span>
                            </div>
                            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 animate-pulse"
                                style={{ width: `${trip?.progress}%` }}
                              />
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Clock" size="0.875rem" className="text-muted-foreground" />
                              <span className="text-muted-foreground">ETA:</span>
                              <span className="font-semibold text-foreground">{trip?.eta}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
                            onClick={() => navigate('/customer-portal-my-trip-details')}
                          >
                            Track Shipment
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions with gradient */}
                <div className={`grid grid-cols-1 gap-4 transition-all duration-700 ${animatedCards?.includes(8) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}>
                  {[
                    { icon: 'FileText', title: 'Contracts', path: '/customer-portal-my-contracts', gradient: 'from-purple-500 to-pink-500' },
                    { icon: 'MessageCircle', title: 'Support', path: '#', gradient: 'from-blue-500 to-purple-500' }
                  ]?.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => action?.path !== '#' && navigate(action?.path)}
                      className={`relative overflow-hidden bg-gradient-to-r ${action?.gradient} text-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group`}
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                          <Icon name={action?.icon} size="1.5rem" className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold">{action?.title}</h3>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyDashboard3;