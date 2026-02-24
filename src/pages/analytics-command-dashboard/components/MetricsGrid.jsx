import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsGrid = ({ dateRange, selectedMetrics }) => {
  const metricsData = [
    {
      category: 'operations',
      title: 'Active Deliveries',
      value: '284',
      trend: 'up',
      trendValue: '+12%',
      icon: 'Package',
      iconBg: 'bg-primary/10',
      change: '+34 vs yesterday'
    },
    {
      category: 'operations',
      title: 'On-Time Delivery Rate',
      value: '94.5%',
      trend: 'up',
      trendValue: '+2.3%',
      icon: 'Clock',
      iconBg: 'bg-success/10',
      change: 'Above target (92%)'
    },
    {
      category: 'financial',
      title: 'Daily Revenue',
      value: '$127K',
      trend: 'up',
      trendValue: '+18.5%',
      icon: 'DollarSign',
      iconBg: 'bg-success/10',
      change: '+$19.8K vs last week avg'
    },
    {
      category: 'financial',
      title: 'Cost Per Mile',
      value: '$2.85',
      trend: 'down',
      trendValue: '-8.2%',
      icon: 'TrendingDown',
      iconBg: 'bg-primary/10',
      change: 'Efficiency improved'
    },
    {
      category: 'performance',
      title: 'Fleet Utilization',
      value: '87%',
      trend: 'up',
      trendValue: '+5.4%',
      icon: 'Truck',
      iconBg: 'bg-warning/10',
      change: '397 of 456 vehicles active'
    },
    {
      category: 'performance',
      title: 'Average Trip Duration',
      value: '4.2hrs',
      trend: 'down',
      trendValue: '-12min',
      icon: 'Timer',
      iconBg: 'bg-success/10',
      change: 'Route optimization impact'
    },
    {
      category: 'resources',
      title: 'Driver Availability',
      value: '312/342',
      trend: 'stable',
      trendValue: '91.2%',
      icon: 'Users',
      iconBg: 'bg-primary/10',
      change: '30 drivers on break'
    },
    {
      category: 'resources',
      title: 'Customer Satisfaction',
      value: '4.7/5',
      trend: 'up',
      trendValue: '+0.2',
      icon: 'Star',
      iconBg: 'bg-success/10',
      change: 'Based on 1,247 ratings'
    }
  ];

  const filteredMetrics = selectedMetrics?.includes('all')
    ? metricsData
    : metricsData?.filter(metric => selectedMetrics?.includes(metric?.category));

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {filteredMetrics?.map((metric, index) => (
        <div 
          key={index}
          className="bg-card rounded-xl border border-border p-6 hover:shadow-elevated transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${metric?.iconBg}`}>
              <Icon name={metric?.icon} size="1.5rem" className="text-primary" />
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
              metric?.trend === 'up' ?'bg-success/10 text-success' 
                : metric?.trend === 'down' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
            }`}>
              <Icon 
                name={metric?.trend === 'up' ? 'TrendingUp' : metric?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size="0.75rem" 
              />
              <span>{metric?.trendValue}</span>
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {metric?.title}
          </h3>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {metric?.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {metric?.change}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;