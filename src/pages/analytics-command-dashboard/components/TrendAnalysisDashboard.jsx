import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrendAnalysisDashboard = ({ dateRange }) => {
  const trendData = [
    { period: 'Week 1', efficiency: 82, satisfaction: 4.5, onTime: 89 },
    { period: 'Week 2', efficiency: 85, satisfaction: 4.6, onTime: 91 },
    { period: 'Week 3', efficiency: 88, satisfaction: 4.7, onTime: 93 },
    { period: 'Week 4', efficiency: 91, satisfaction: 4.8, onTime: 94 }
  ];

  const trendIndicators = [
    {
      metric: 'Operational Efficiency',
      current: '91%',
      change: '+9%',
      trend: 'up',
      target: '90%',
      status: 'above'
    },
    {
      metric: 'Customer Satisfaction',
      current: '4.8/5',
      change: '+0.3',
      trend: 'up',
      target: '4.5',
      status: 'above'
    },
    {
      metric: 'On-Time Performance',
      current: '94%',
      change: '+5%',
      trend: 'up',
      target: '92%',
      status: 'above'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Trend Analysis</h2>
          <p className="text-sm text-muted-foreground">Performance trends over time</p>
        </div>
        <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
          <Icon name="TrendingUp" size="1rem" />
        </button>
      </div>

      <div className="h-[12.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: "0.75rem" }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: "0.75rem" }}
            stroke="#9ca3af"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem",
              fontSize: "0.75rem"
            }}
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            name="Efficiency %"
          />
          <Line 
            type="monotone" 
            dataKey="onTime" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            name="On-Time %"
          />
        </LineChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {trendIndicators?.map((indicator, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{indicator?.metric}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${indicator?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  {indicator?.change}
                </span>
                <Icon 
                  name={indicator?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size="0.875rem"
                  className={indicator?.trend === 'up' ? 'text-success' : 'text-destructive'}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">{indicator?.current}</span>
              <span className="text-xs text-muted-foreground">
                Target: {indicator?.target} • 
                <span className={`ml-1 ${indicator?.status === 'above' ? 'text-success' : 'text-destructive'}`}>
                  {indicator?.status === 'above' ? 'Above' : 'Below'} target
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendAnalysisDashboard;