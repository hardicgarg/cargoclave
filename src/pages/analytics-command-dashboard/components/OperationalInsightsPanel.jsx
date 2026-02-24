import React from 'react';
import Icon from '../../../components/AppIcon';

const OperationalInsightsPanel = () => {
  const insights = [
    {
      type: 'success',
      icon: 'TrendingUp',
      title: 'Peak Performance',
      description: 'West region showing 23% increase in delivery efficiency',
      timestamp: '2 hours ago'
    },
    {
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Route Congestion',
      description: 'Highway 101 experiencing delays, 12 trips affected',
      timestamp: '45 minutes ago'
    },
    {
      type: 'info',
      icon: 'Info',
      title: 'Fleet Maintenance',
      description: '8 vehicles scheduled for service this week',
      timestamp: '3 hours ago'
    },
    {
      type: 'success',
      icon: 'CheckCircle',
      title: 'Cost Optimization',
      description: 'Fuel consumption reduced by 15% through route planning',
      timestamp: 'Today'
    }
  ];

  const getInsightStyles = (type) => {
    const styles = {
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      info: 'bg-primary/10 text-primary border-primary/20'
    };
    return styles?.[type] || styles?.info;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Operational Insights</h2>
        <button className="text-xs text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {insights?.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${getInsightStyles(insight?.type)} transition-all hover:shadow-sm`}
          >
            <div className="flex items-start gap-3">
              <Icon name={insight?.icon} size="1.25rem" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">{insight?.title}</h3>
                <p className="text-xs opacity-90 mb-2">{insight?.description}</p>
                <p className="text-xs opacity-70">{insight?.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 px-4 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-all">
        Generate Insights Report
      </button>
    </div>
  );
};

export default OperationalInsightsPanel;