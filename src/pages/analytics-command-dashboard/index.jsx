import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import MetricsGrid from './components/MetricsGrid';
import OperationalInsightsPanel from './components/OperationalInsightsPanel';
import RevenuePerformanceChart from './components/RevenuePerformanceChart';
import ResourceAllocationMap from './components/ResourceAllocationMap';
import TrendAnalysisDashboard from './components/TrendAnalysisDashboard';
import AlertsInsightsPanel from './components/AlertsInsightsPanel';

const AnalyticsCommandDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Analytics Manager');
  const [dateRange, setDateRange] = useState('last7days');
  const [selectedMetrics, setSelectedMetrics] = useState(['all']);

  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      setLastRefresh(new Date());
    }, 60000);

    return () => clearInterval(autoRefreshInterval);
  }, []);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleExport = (format) => {
    console.log(`Exporting analytics report as ${format}`);
  };

  const handleMetricToggle = (metric) => {
    if (metric === 'all') {
      setSelectedMetrics(['all']);
    } else {
      const newMetrics = selectedMetrics?.includes('all') 
        ? [metric]
        : selectedMetrics?.includes(metric)
          ? selectedMetrics?.filter(m => m !== metric)
          : [...selectedMetrics, metric];
      setSelectedMetrics(newMetrics?.length ? newMetrics : ['all']);
    }
  };

  const metricCategories = [
    { id: 'all', label: 'All Metrics', icon: 'Grid' },
    { id: 'operations', label: 'Operations', icon: 'Truck' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'resources', label: 'Resources', icon: 'Users' }
  ];

  return (
    <>
      <Helmet>
        <title>Analytics Command Dashboard - CargoClave</title>
        <meta name="description" content="Comprehensive analytics and insights command center for logistics operations" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Command Dashboard</h1>
                <p className="text-muted-foreground">
                  {userRole} • Live Analytics • Last updated: {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e?.target?.value)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="today">Today</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="thisQuarter">This Quarter</option>
                  <option value="custom">Custom Range</option>
                </select>

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
                  
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => handleExport('pdf')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Analytics Report (PDF)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('excel')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Table" size="1rem" />
                      <span>Data Export (Excel)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('presentation')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Presentation" size="1rem" />
                      <span>Executive Summary (PPT)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Category Filter */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              {metricCategories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => handleMetricToggle(category?.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all whitespace-nowrap ${
                    selectedMetrics?.includes(category?.id) || selectedMetrics?.includes('all')
                      ? 'bg-primary text-white border-primary' :'bg-card text-foreground border-border hover:bg-muted'
                  }`}
                >
                  <Icon name={category?.icon} size="1rem" />
                  <span>{category?.label}</span>
                </button>
              ))}
            </div>

            {/* Metrics Grid */}
            <MetricsGrid 
              dateRange={dateRange} 
              selectedMetrics={selectedMetrics}
            />

            {/* Operational Insights and Revenue Performance */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <RevenuePerformanceChart dateRange={dateRange} />
              </div>
              <div>
                <OperationalInsightsPanel />
              </div>
            </div>

            {/* Resource Allocation and Trend Analysis */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <ResourceAllocationMap />
              <TrendAnalysisDashboard dateRange={dateRange} />
            </div>

            {/* Alerts and Insights Panel */}
            <AlertsInsightsPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsCommandDashboard;