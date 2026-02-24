import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import FinancialMetricCard from './components/FinancialMetricCard';
import RevenueChart from './components/RevenueChart';
import CostBreakdownChart from './components/CostBreakdownChart';
import ProfitabilityTrend from './components/ProfitabilityTrend';
import RoutePerformanceTable from './components/RoutePerformanceTable';
import CustomerRevenueRanking from './components/CustomerRevenueRanking';
import MonthlyComparison from './components/MonthlyComparison';
import BudgetUtilization from './components/BudgetUtilization';

const FinancialAnalyticsDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Finance Manager');
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');

  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      setLastRefresh(new Date());
    }, 300000);

    return () => clearInterval(autoRefreshInterval);
  }, []);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleExport = (format) => {
    console.log(`Exporting financial report as ${format}`);
  };

  const financialMetrics = [
    {
      title: "Total Revenue",
      value: "$4.2M",
      trend: "up",
      trendValue: "+15.3%",
      icon: "DollarSign",
      iconBg: "bg-success/10",
      description: "vs last quarter"
    },
    {
      title: "Operating Costs",
      value: "$2.8M",
      trend: "down",
      trendValue: "-5.2%",
      icon: "TrendingDown",
      iconBg: "bg-primary/10",
      description: "Reduced expenses"
    },
    {
      title: "Net Profit",
      value: "$1.4M",
      trend: "up",
      trendValue: "+22.8%",
      icon: "TrendingUp",
      iconBg: "bg-success/10",
      description: "Profit margin: 33%"
    },
    {
      title: "Revenue Per Trip",
      value: "$845",
      trend: "up",
      trendValue: "+8.7%",
      icon: "Package",
      iconBg: "bg-warning/10",
      description: "Average earnings"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Financial Analytics Dashboard - CargoClave</title>
        <meta name="description" content="Comprehensive financial performance and profitability analytics for logistics operations" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Financial Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  {userRole} • Last updated: {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e?.target?.value)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="monthly">Monthly View</option>
                  <option value="quarterly">Quarterly View</option>
                  <option value="yearly">Yearly View</option>
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
                    <span>Export Report</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => handleExport('pdf')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Financial Report (PDF)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('excel')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Table" size="1rem" />
                      <span>Detailed Analysis (Excel)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('csv')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Database" size="1rem" />
                      <span>Raw Data (CSV)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              {financialMetrics?.map((metric, index) => (
                <FinancialMetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <RevenueChart period={selectedPeriod} />
              </div>
              <div>
                <CostBreakdownChart />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <ProfitabilityTrend />
              <MonthlyComparison />
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <RoutePerformanceTable />
              </div>
              <div>
                <CustomerRevenueRanking />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <BudgetUtilization />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialAnalyticsDashboard;