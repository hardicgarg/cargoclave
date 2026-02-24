import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertsInsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  const alerts = [
    {
      severity: 'high',
      icon: 'AlertCircle',
      title: 'Vehicle Maintenance Overdue',
      description: '3 vehicles require immediate maintenance inspection',
      action: 'Schedule Now',
      timestamp: '15 min ago'
    },
    {
      severity: 'medium',
      icon: 'AlertTriangle',
      title: 'Driver Hours Approaching Limit',
      description: '12 drivers nearing daily hour limits in next 2 hours',
      action: 'Review Schedule',
      timestamp: '1 hour ago'
    },
    {
      severity: 'low',
      icon: 'Info',
      title: 'Route Optimization Available',
      description: 'New route suggestions can save 45 miles daily',
      action: 'View Routes',
      timestamp: '3 hours ago'
    }
  ];

  const insights = [
    {
      type: 'optimization',
      icon: 'Lightbulb',
      title: 'Cost Savings Opportunity',
      description: 'Consolidating routes in South region could reduce costs by $12K monthly',
      impact: 'High Impact',
      action: 'Analyze'
    },
    {
      type: 'performance',
      icon: 'TrendingUp',
      title: 'Peak Performance Window',
      description: 'Deliveries between 9AM-2PM show 18% higher efficiency',
      impact: 'Medium Impact',
      action: 'Optimize'
    },
    {
      type: 'resource',
      icon: 'Users',
      title: 'Resource Reallocation',
      description: 'East region has 15% excess capacity, consider redistribution',
      impact: 'Medium Impact',
      action: 'Review'
    }
  ];

  const getSeverityStyles = (severity) => {
    const styles = {
      high: 'border-destructive bg-destructive/5',
      medium: 'border-warning bg-warning/5',
      low: 'border-primary bg-primary/5'
    };
    return styles?.[severity] || styles?.low;
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      high: 'bg-destructive/10 text-destructive',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-primary/10 text-primary'
    };
    return badges?.[severity] || badges?.low;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Alerts & Insights</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'alerts' ?'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Alerts ({alerts?.length})
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'insights' ?'bg-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Insights ({insights?.length})
          </button>
        </div>
      </div>

      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {alerts?.map((alert, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 ${getSeverityStyles(alert?.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getSeverityBadge(alert?.severity)}`}>
                  <Icon name={alert?.icon} size="1.25rem" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{alert?.title}</h3>
                    <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert?.description}</p>
                  <button className="text-sm text-primary font-medium hover:underline">
                    {alert?.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights?.map((insight, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border bg-muted hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Icon name={insight?.icon} size="1.25rem" className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{insight?.title}</h3>
                    <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full font-medium">
                      {insight?.impact}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight?.description}</p>
                  <button className="text-sm text-primary font-medium hover:underline">
                    {insight?.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsInsightsPanel;