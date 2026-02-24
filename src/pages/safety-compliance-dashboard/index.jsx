import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import SafetyMetricCard from './components/SafetyMetricCard';
import IncidentTrendChart from './components/IncidentTrendChart';
import ComplianceScoreGauge from './components/ComplianceScoreGauge';
import IncidentCategoryBreakdown from './components/IncidentCategoryBreakdown';
import DriverSafetyRanking from './components/DriverSafetyRanking';
import VehicleInspectionStatus from './components/VehicleInspectionStatus';
import TrainingCompletionTracker from './components/TrainingCompletionTracker';
import RecentIncidentsList from './components/RecentIncidentsList';

const SafetyComplianceDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Safety Manager');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

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
    console.log(`Exporting safety compliance report as ${format}`);
  };

  const safetyMetrics = [
    {
      title: "Total Incidents",
      value: "23",
      trend: "down",
      trendValue: "-18.2%",
      icon: "AlertTriangle",
      iconBg: "bg-error/10",
      description: "vs last month"
    },
    {
      title: "Days Without Accident",
      value: "47",
      trend: "up",
      trendValue: "+12 days",
      icon: "Award",
      iconBg: "bg-success/10",
      description: "Current streak"
    },
    {
      title: "Compliance Score",
      value: "94.5%",
      trend: "up",
      trendValue: "+2.3%",
      icon: "Shield",
      iconBg: "bg-primary/10",
      description: "Overall rating"
    },
    {
      title: "Training Completion",
      value: "87%",
      trend: "up",
      trendValue: "+5.1%",
      icon: "BookOpen",
      iconBg: "bg-warning/10",
      description: "Required courses"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Safety & Compliance Dashboard - CargoClave</title>
        <meta name="description" content="Comprehensive safety monitoring and compliance tracking for fleet operations" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Safety & Compliance Dashboard</h1>
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
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="1year">Last Year</option>
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
                      <span>Safety Report (PDF)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('csv')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Table" size="1rem" />
                      <span>Incident Data (CSV)</span>
                    </button>
                    <button 
                      onClick={() => handleExport('compliance')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="CheckCircle" size="1rem" />
                      <span>Compliance Audit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              {safetyMetrics?.map((metric, index) => (
                <SafetyMetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <IncidentTrendChart period={selectedPeriod} />
              </div>
              <div>
                <ComplianceScoreGauge />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <IncidentCategoryBreakdown />
              <TrainingCompletionTracker />
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <VehicleInspectionStatus />
              </div>
              <div>
                <DriverSafetyRanking />
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <RecentIncidentsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SafetyComplianceDashboard;