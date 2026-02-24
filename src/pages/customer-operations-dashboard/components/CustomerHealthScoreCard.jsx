import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CustomerHealthScoreCard = () => {
  const healthDistribution = [
    { name: 'Excellent', value: 412, color: 'hsl(var(--success))', percentage: 48.6 },
    { name: 'Good', value: 289, color: 'hsl(var(--primary))', percentage: 34.1 },
    { name: 'At Risk', value: 104, color: 'hsl(var(--warning))', percentage: 12.3 },
    { name: 'Critical', value: 42, color: 'hsl(var(--destructive))', percentage: 5.0 }
  ];

  const engagementMetrics = [
    { label: 'High Engagement', value: 573, icon: 'TrendingUp', color: 'text-success' },
    { label: 'Medium Engagement', value: 198, icon: 'Minus', color: 'text-warning' },
    { label: 'Low Engagement', value: 76, icon: 'TrendingDown', color: 'text-destructive' }
  ];

  const upsellOpportunities = [
    { customer: 'Global Logistics Inc.', score: 92, revenue: '$340K', icon: 'ArrowUpRight' },
    { customer: 'Prime Manufacturing', score: 88, revenue: '$285K', icon: 'ArrowUpRight' },
    { customer: 'Healthcare Supplies Ltd.', score: 85, revenue: '$210K', icon: 'ArrowUpRight' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-semibold text-foreground mb-1">{data?.name}</p>
          <p className="text-xs text-muted-foreground">Customers: {data?.value}</p>
          <p className="text-xs text-muted-foreground">Percentage: {data?.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Customer Health Score</h2>
          <p className="text-sm text-muted-foreground">Relationship management and engagement tracking</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">
          <Icon name="RefreshCw" size="0.875rem" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Health Distribution Chart */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="h-[11.25rem]">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={healthDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {healthDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
      </div>
        </div>

        <div className="flex flex-col justify-center space-y-3">
          {healthDistribution?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-foreground">{item?.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">{item?.value}</span>
                <span className="text-xs text-muted-foreground ml-2">({item?.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Engagement Tracking</h3>
        <div className="space-y-3">
          {engagementMetrics?.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name={metric?.icon} size="1.125rem" className={metric?.color} />
                <span className="text-sm font-medium text-foreground">{metric?.label}</span>
              </div>
              <span className="text-sm font-bold text-foreground">{metric?.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upselling Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Top Upselling Opportunities</h3>
          <Icon name="TrendingUp" size="1rem" className="text-success" />
        </div>
        <div className="space-y-2">
          {upsellOpportunities?.map((opportunity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate mb-1">
                  {opportunity?.customer}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Health Score:</span>
                  <span className="text-xs font-semibold text-success">{opportunity?.score}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-foreground">{opportunity?.revenue}</span>
                <Icon name={opportunity?.icon} size="1rem" className="text-success" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
        <Icon name="Eye" size="1rem" />
        <span>View All Opportunities</span>
      </button>
    </div>
  );
};

export default CustomerHealthScoreCard;