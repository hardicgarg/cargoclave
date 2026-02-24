import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import CustomerPerformanceGrid from './components/CustomerPerformanceGrid';
import DeliveryTrendsChart from './components/DeliveryTrendsChart';
import SatisfactionMetricsPanel from './components/SatisfactionMetricsPanel';
import PerformanceComparisonChart from './components/PerformanceComparisonChart';
import CustomerHealthScoreCard from './components/CustomerHealthScoreCard';
import RecentInteractionsPanel from './components/RecentInteractionsPanel';
import AlertsNotificationsCard from './components/AlertsNotificationsCard';

const CustomerOperationsDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Account Manager');
  const [selectedCustomerSegment, setSelectedCustomerSegment] = useState('all');
  const [selectedServiceLevel, setSelectedServiceLevel] = useState('all');
  const [selectedPerformanceThreshold, setSelectedPerformanceThreshold] = useState('all');

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
    console.log(`Exporting customer operations data as ${format}`);
  };

  const kpiData = [
    {
      title: "Total Customers",
      value: "847",
      trend: "up",
      trendValue: "+15.3%",
      icon: "Building2",
      iconBg: "bg-primary/10"
    },
    {
      title: "Avg Satisfaction",
      value: "4.6/5.0",
      trend: "up",
      trendValue: "+0.3",
      icon: "Star",
      iconBg: "bg-success/10"
    },
    {
      title: "On-Time Delivery",
      value: "94.7%",
      trend: "up",
      trendValue: "+2.1%",
      icon: "Clock",
      iconBg: "bg-warning/10"
    },
    {
      title: "Active Contracts",
      value: "1,247",
      trend: "up",
      trendValue: "+8.5%",
      icon: "FileText",
      iconBg: "bg-accent/10"
    }
  ];

  const customerSegments = [
    { value: 'all', label: 'All Customers' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'mid-market', label: 'Mid-Market' },
    { value: 'small-business', label: 'Small Business' }
  ];

  const serviceLevels = [
    { value: 'all', label: 'All Service Levels' },
    { value: 'premium', label: 'Premium' },
    { value: 'standard', label: 'Standard' },
    { value: 'basic', label: 'Basic' }
  ];

  const performanceThresholds = [
    { value: 'all', label: 'All Performance' },
    { value: 'excellent', label: 'Excellent (>95%)' },
    { value: 'good', label: 'Good (85-95%)' },
    { value: 'needs-attention', label: 'Needs Attention (<85%)' }
  ];

  return (
    <>
      <Helmet>
        <title>Customer Operations Dashboard - CargoClave</title>
        <meta name="description" content="Customer-focused analytics dashboard for delivery performance and satisfaction monitoring" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Customer Operations Dashboard</h1>
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
                      onClick={() => handleExport('customer-performance')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Customer Performance</span>
                    </button>
                    <button 
                      onClick={() => handleExport('satisfaction-analytics')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="TrendingUp" size="1rem" />
                      <span>Satisfaction Analytics</span>
                    </button>
                    <button 
                      onClick={() => handleExport('account-summary')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="BarChart3" size="1rem" />
                      <span>Account Summary</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Customer Segment</label>
                  <select 
                    value={selectedCustomerSegment}
                    onChange={(e) => setSelectedCustomerSegment(e?.target?.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {customerSegments?.map((segment) => (
                      <option key={segment?.value} value={segment?.value}>
                        {segment?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Service Level</label>
                  <select 
                    value={selectedServiceLevel}
                    onChange={(e) => setSelectedServiceLevel(e?.target?.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {serviceLevels?.map((level) => (
                      <option key={level?.value} value={level?.value}>
                        {level?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Performance Threshold</label>
                  <select 
                    value={selectedPerformanceThreshold}
                    onChange={(e) => setSelectedPerformanceThreshold(e?.target?.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {performanceThresholds?.map((threshold) => (
                      <option key={threshold?.value} value={threshold?.value}>
                        {threshold?.label}
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-5 gap-6 mb-6">
              {/* Customer Performance Grid - 40% width */}
              <div className="col-span-2">
                <CustomerPerformanceGrid />
              </div>
              
              {/* Analytics Panel - 60% width */}
              <div className="col-span-3 space-y-6">
                <DeliveryTrendsChart />
                <PerformanceComparisonChart />
              </div>
            </div>

            {/* Satisfaction Metrics Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <SatisfactionMetricsPanel />
              <CustomerHealthScoreCard />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6">
              <RecentInteractionsPanel />
              <AlertsNotificationsCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOperationsDashboard;