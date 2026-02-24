import React from 'react';
import Icon from '../../../components/AppIcon';

const FleetOverviewCards = () => {
  const fleetStats = [
    {
      category: 'Operational Status',
      metrics: [
        { label: 'Active', value: 389, percentage: 85.3, color: 'success', icon: 'CheckCircle2' },
        { label: 'Maintenance', value: 23, percentage: 5.0, color: 'warning', icon: 'Wrench' },
        { label: 'Idle', value: 32, percentage: 7.0, color: 'muted', icon: 'PauseCircle' },
        { label: 'Out of Service', value: 12, percentage: 2.6, color: 'destructive', icon: 'XCircle' }
      ]
    },
    {
      category: 'Vehicle Condition',
      metrics: [
        { label: 'Excellent', value: 245, percentage: 53.7, color: 'success', icon: 'Star' },
        { label: 'Good', value: 158, percentage: 34.6, color: 'primary', icon: 'ThumbsUp' },
        { label: 'Fair', value: 42, percentage: 9.2, color: 'warning', icon: 'AlertTriangle' },
        { label: 'Poor', value: 11, percentage: 2.4, color: 'destructive', icon: 'AlertOctagon' }
      ]
    },
    {
      category: 'Age Distribution',
      metrics: [
        { label: '0-2 Years', value: 156, percentage: 34.2, color: 'success', icon: 'Sparkles' },
        { label: '3-5 Years', value: 189, percentage: 41.4, color: 'primary', icon: 'TrendingUp' },
        { label: '6-8 Years', value: 87, percentage: 19.1, color: 'warning', icon: 'Calendar' },
        { label: '9+ Years', value: 24, percentage: 5.3, color: 'muted', icon: 'Clock' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const classes = {
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      primary: 'bg-primary/10 text-primary border-primary/20',
      destructive: 'bg-destructive/10 text-destructive border-destructive/20',
      muted: 'bg-muted text-muted-foreground border-border'
    };
    return classes?.[color] || classes?.muted;
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {fleetStats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{stat?.category}</h3>
          <div className="space-y-4">
            {stat?.metrics?.map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name={metric?.icon} size="1rem" className={`text-${metric?.color}`} />
                    <span className="text-sm font-medium text-foreground">{metric?.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{metric?.value}</span>
                    <span className="text-xs text-muted-foreground">({metric?.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`bg-${metric?.color} h-2 rounded-full transition-all`}
                    style={{ width: `${metric?.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FleetOverviewCards;