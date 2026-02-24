import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveMetricsPanel = ({ viewMode }) => {
  const executiveMetrics = [
    {
      category: 'Revenue',
      title: 'Quarterly Revenue',
      value: '$12.4M',
      trend: 'up',
      trendValue: '+24.5%',
      icon: 'DollarSign',
      iconBg: 'bg-success/10',
      target: '$11.8M',
      status: 'ahead',
      details: 'Q4 2025 vs Q3 2025'
    },
    {
      category: 'Operations',
      title: 'Market Share',
      value: '18.5%',
      trend: 'up',
      trendValue: '+2.3%',
      icon: 'PieChart',
      iconBg: 'bg-primary/10',
      target: '17%',
      status: 'ahead',
      details: 'Regional logistics sector'
    },
    {
      category: 'Efficiency',
      title: 'EBITDA Margin',
      value: '28.4%',
      trend: 'up',
      trendValue: '+3.2%',
      icon: 'TrendingUp',
      iconBg: 'bg-success/10',
      target: '26%',
      status: 'ahead',
      details: 'Operational profitability'
    },
    {
      category: 'Growth',
      title: 'Customer Retention',
      value: '94.2%',
      trend: 'up',
      trendValue: '+1.8%',
      icon: 'Users',
      iconBg: 'bg-primary/10',
      target: '92%',
      status: 'ahead',
      details: 'Annual retention rate'
    },
    {
      category: 'Financial',
      title: 'ROI',
      value: '32.8%',
      trend: 'up',
      trendValue: '+5.6%',
      icon: 'Target',
      iconBg: 'bg-success/10',
      target: '28%',
      status: 'ahead',
      details: 'Return on investment'
    },
    {
      category: 'Strategic',
      title: 'Contract Value',
      value: '$47.2M',
      trend: 'up',
      trendValue: '+18.4%',
      icon: 'FileText',
      iconBg: 'bg-warning/10',
      target: '$42M',
      status: 'ahead',
      details: 'Total active contracts'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Executive Metrics</h2>
        <span className="text-sm text-muted-foreground">Q4 2025</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {executiveMetrics?.map((metric, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-elevated transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${metric?.iconBg}`}>
                <Icon name={metric?.icon} size="1.75rem" className="text-primary" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
                metric?.trend === 'up' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
              }`}>
                <Icon 
                  name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size="0.875rem" 
                />
                <span>{metric?.trendValue}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {metric?.category}
              </span>
            </div>

            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {metric?.title}
            </h3>
            
            <div className="mb-3">
              <p className="text-4xl font-bold text-foreground mb-1">
                {metric?.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {metric?.details}
              </p>
            </div>

            {viewMode === 'detailed' && (
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target: {metric?.target}</span>
                  <span className={`font-medium ${
                    metric?.status === 'ahead' ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric?.status === 'ahead' ? '✓ On Track' : '! Behind'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveMetricsPanel;