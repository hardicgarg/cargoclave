import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import FleetOverviewCards from './components/FleetOverviewCards';
import VehicleStatusGrid from './components/VehicleStatusGrid';
import MaintenanceSchedulePanel from './components/MaintenanceSchedulePanel';
import FuelConsumptionChart from './components/FuelConsumptionChart';
import UtilizationAnalyticsChart from './components/UtilizationAnalyticsChart';
import DriverPerformanceGrid from './components/DriverPerformanceGrid';
import AlertsMaintenanceCard from './components/AlertsMaintenanceCard';

const FleetManagementDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Fleet Manager');
  const [selectedFleetSegment, setSelectedFleetSegment] = useState('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');

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
    console.log(`Exporting fleet management data as ${format}`);
  };

  const kpiData = [
    {
      title: "Total Vehicles",
      value: "456",
      trend: "up",
      trendValue: "+5.2%",
      icon: "Truck",
      iconBg: "bg-primary/10"
    },
    {
      title: "Active Fleet",
      value: "389",
      trend: "up",
      trendValue: "+3.8%",
      icon: "Activity",
      iconBg: "bg-success/10"
    },
    {
      title: "Maintenance Due",
      value: "23",
      trend: "down",
      trendValue: "-12.3%",
      icon: "Wrench",
      iconBg: "bg-warning/10"
    },
    {
      title: "Avg Utilization",
      value: "87.4%",
      trend: "up",
      trendValue: "+2.1%",
      icon: "TrendingUp",
      iconBg: "bg-accent/10"
    }
  ];

  const fleetSegments = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'heavy-duty', label: 'Heavy Duty Trucks' },
    { value: 'light-commercial', label: 'Light Commercial' },
    { value: 'specialized', label: 'Specialized Vehicles' }
  ];

  const vehicleTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'box-truck', label: 'Box Trucks' },
    { value: 'flatbed', label: 'Flatbeds' },
    { value: 'refrigerated', label: 'Refrigerated' },
    { value: 'tanker', label: 'Tankers' }
  ];

  return (
    <>
      <Helmet>
        <title>Fleet Management Dashboard - CargoClave</title>
        <meta name="description" content="Comprehensive fleet operations dashboard for vehicle tracking, maintenance, and utilization analysis" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Fleet Management Dashboard</h1>
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
                    <span>Export Report</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => handleExport('fleet-overview')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Fleet Overview</span>
                    </button>
                    <button 
                      onClick={() => handleExport('maintenance-schedule')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Wrench" size="1rem" />
                      <span>Maintenance Schedule</span>
                    </button>
                    <button 
                      onClick={() => handleExport('utilization-report')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="BarChart3" size="1rem" />
                      <span>Utilization Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fleet Segment</label>
                  <select 
                    value={selectedFleetSegment}
                    onChange={(e) => setSelectedFleetSegment(e?.target?.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {fleetSegments?.map((segment) => (
                      <option key={segment?.value} value={segment?.value}>
                        {segment?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vehicle Type</label>
                  <select 
                    value={selectedVehicleType}
                    onChange={(e) => setSelectedVehicleType(e?.target?.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {vehicleTypes?.map((type) => (
                      <option key={type?.value} value={type?.value}>
                        {type?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {kpiData?.map((kpi, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${kpi?.iconBg} p-3 rounded-lg`}>
                      <Icon name={kpi?.icon} size="1.5rem" className="text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${kpi?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      <Icon name={kpi?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size="1rem" />
                      <span>{kpi?.trendValue}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{kpi?.value}</h3>
                  <p className="text-sm text-muted-foreground">{kpi?.title}</p>
                </div>
              ))}
            </div>

            {/* Fleet Overview Section */}
            <div className="mb-6">
              <FleetOverviewCards />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <VehicleStatusGrid />
              </div>
              <div>
                <MaintenanceSchedulePanel />
              </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <FuelConsumptionChart />
              <UtilizationAnalyticsChart />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6">
              <DriverPerformanceGrid />
              <AlertsMaintenanceCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FleetManagementDashboard;