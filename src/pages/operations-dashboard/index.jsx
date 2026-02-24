import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import KPICard from './components/KPICard';
import VehicleUtilizationChart from './components/VehicleUtilizationChart';
import OnTimeDeliveryChart from './components/OnTimeDeliveryChart';
import TripsOverviewChart from './components/TripsOverviewChart';
import HighFrequencyRoutesMap from './components/HighFrequencyRoutesMap';
import TripsByRegionChart from './components/TripsByRegionChart';
import TopPerformingDrivers from './components/TopPerformingDrivers';
import LiveTrackingCard from './components/LiveTrackingCard';
import SystemIntegrationStatus from './components/SystemIntegrationStatus';

const OperationsDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Operations Manager');

  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);

    return () => clearInterval(autoRefreshInterval);
  }, []);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleExport = (format) => {
    console.log(`Exporting dashboard data as ${format}`);
  };

  const kpiData = [
    {
      title: "Total Contracts",
      value: "1,247",
      trend: "up",
      trendValue: "+12.5%",
      icon: "FileText",
      iconBg: "bg-primary/10",
      link: "/contracts-management"
    },
    {
      title: "Active Drivers",
      value: "342",
      trend: "up",
      trendValue: "+8.3%",
      icon: "Users",
      iconBg: "bg-success/10",
      link: "/driver-management-system"
    },
    {
      title: "Fleet Vehicles",
      value: "456",
      trend: "up",
      trendValue: "+5.2%",
      icon: "Truck",
      iconBg: "bg-warning/10",
      link: "/vehicle-fleet-management"
    },
    {
      title: "Total Containers",
      value: "2,891",
      trend: "down",
      trendValue: "-2.1%",
      icon: "Package",
      iconBg: "bg-accent/10",
      link: "/commodities-container-management"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Operations Dashboard - CargoClave</title>
        <meta name="description" content="Executive command center for logistics operations management" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Operations Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {userRole} • Last updated: {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleManualRefresh}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  <Icon name="RefreshCw" size="1rem" />
                  <span>Refresh</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                    <Icon name="Download" size="1rem" />
                    <span>Export</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => handleExport('pdf')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Export as PDF</span>
                    </button>
                    <button 
                      onClick={() => handleExport('csv')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Table" size="1rem" />
                      <span>Export as CSV</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              {kpiData?.map((kpi, index) => (
                <KPICard key={index} {...kpi} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <VehicleUtilizationChart />
              </div>
              <div>
                <OnTimeDeliveryChart />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <TripsOverviewChart />
              </div>
              <div className="col-span-2">
                <HighFrequencyRoutesMap />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <TripsByRegionChart />
              </div>
              <div>
                <TopPerformingDrivers />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <LiveTrackingCard />
              <SystemIntegrationStatus />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationsDashboard;