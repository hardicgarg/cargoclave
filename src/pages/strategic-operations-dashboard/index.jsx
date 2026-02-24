import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import ExecutiveMetricsPanel from './components/ExecutiveMetricsPanel';
import BusinessPerformanceChart from './components/BusinessPerformanceChart';
import MarketPositionAnalysis from './components/MarketPositionAnalysis';
import CrossFunctionalInsights from './components/CrossFunctionalInsights';
import StrategicObjectivesTracker from './components/StrategicObjectivesTracker';
import KeyInitiativesPanel from './components/KeyInitiativesPanel';

const StrategicOperationsDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole] = useState('Chief Operations Officer');
  const [viewMode, setViewMode] = useState('executive');

  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      setLastRefresh(new Date());
    }, 120000);

    return () => clearInterval(autoRefreshInterval);
  }, []);

  const handleManualRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleExport = (format) => {
    console.log(`Exporting strategic report as ${format}`);
  };

  const handleShare = () => {
    console.log('Sharing strategic dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Strategic Operations Dashboard - CargoClave</title>
        <meta name="description" content="Executive strategic operations dashboard for high-level business intelligence and decision making" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
        
        <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <BreadcrumbNavigation />
          
          <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Strategic Operations Dashboard</h1>
                <p className="text-muted-foreground">
                  {userRole} • Strategic Overview • Last updated: {lastRefresh?.toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('executive')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'executive' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Executive View
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'detailed' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Detailed View
                  </button>
                </div>

                <button 
                  onClick={handleManualRefresh}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  <Icon name="RefreshCw" size="1rem" />
                  <span>Refresh</span>
                </button>

                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  <Icon name="Share2" size="1rem" />
                  <span>Share</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                    <Icon name="Download" size="1rem" />
                    <span>Export</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button 
                      onClick={() => handleExport('executive-summary')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="FileText" size="1rem" />
                      <span>Executive Summary</span>
                    </button>
                    <button 
                      onClick={() => handleExport('board-presentation')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="Presentation" size="1rem" />
                      <span>Board Presentation</span>
                    </button>
                    <button 
                      onClick={() => handleExport('strategic-report')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name="BookOpen" size="1rem" />
                      <span>Strategic Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Metrics Panel */}
            <ExecutiveMetricsPanel viewMode={viewMode} />

            {/* Business Performance Chart */}
            <div className="mb-6">
              <BusinessPerformanceChart viewMode={viewMode} />
            </div>

            {/* Market Position and Cross-Functional Insights */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <MarketPositionAnalysis />
              <CrossFunctionalInsights />
            </div>

            {/* Strategic Objectives and Key Initiatives */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <StrategicObjectivesTracker />
              </div>
              <div>
                <KeyInitiativesPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StrategicOperationsDashboard;