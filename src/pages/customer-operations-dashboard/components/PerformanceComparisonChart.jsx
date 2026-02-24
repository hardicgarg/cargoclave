import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceComparisonChart = () => {
  const [comparisonType, setComparisonType] = useState('segment');

  const segmentData = [
    { name: 'Enterprise', onTime: 97.2, satisfaction: 4.8, incidents: 1.2 },
    { name: 'Mid-Market', onTime: 94.5, satisfaction: 4.6, incidents: 2.8 },
    { name: 'Small Business', onTime: 92.1, satisfaction: 4.4, incidents: 4.1 }
  ];

  const serviceLevelData = [
    { name: 'Premium', onTime: 98.5, satisfaction: 4.9, incidents: 0.8 },
    { name: 'Standard', onTime: 94.2, satisfaction: 4.6, incidents: 2.5 },
    { name: 'Basic', onTime: 89.7, satisfaction: 4.2, incidents: 5.3 }
  ];

  const regionData = [
    { name: 'North', onTime: 96.3, satisfaction: 4.7, incidents: 1.8 },
    { name: 'South', onTime: 93.8, satisfaction: 4.5, incidents: 3.2 },
    { name: 'East', onTime: 95.1, satisfaction: 4.6, incidents: 2.4 },
    { name: 'West', onTime: 94.5, satisfaction: 4.6, incidents: 2.9 }
  ];

  const getChartData = () => {
    switch (comparisonType) {
      case 'segment':
        return segmentData;
      case 'service':
        return serviceLevelData;
      case 'region':
        return regionData;
      default:
        return segmentData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs mb-1">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-semibold text-foreground">
                {entry?.dataKey === 'satisfaction' ? `${entry?.value}/5.0` : `${entry?.value}%`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Performance Comparison</h2>
          <p className="text-sm text-muted-foreground">Comparative benchmarking across different dimensions</p>
        </div>
        
        <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
          <button
            onClick={() => setComparisonType('segment')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              comparisonType === 'segment' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Users" size="0.875rem" className="inline mr-1" />
            Segment
          </button>
          <button
            onClick={() => setComparisonType('service')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              comparisonType === 'service' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Award" size="0.875rem" className="inline mr-1" />
            Service
          </button>
          <button
            onClick={() => setComparisonType('region')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              comparisonType === 'region' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="MapPin" size="0.875rem" className="inline mr-1" />
            Region
          </button>
        </div>
      </div>

      <div className="h-[17.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={getChartData()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "0.75rem" }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "0.75rem" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }} />
          <Legend 
            wrapperStyle={{ fontSize: "0.75rem" }}
            iconType="circle"
          />
          <Bar 
            dataKey="onTime" 
            fill="hsl(var(--success))" 
            radius={[6, 6, 0, 0]}
            name="On-Time Rate (%)"
          />
          <Bar 
            dataKey="satisfaction" 
            fill="hsl(var(--primary))" 
            radius={[6, 6, 0, 0]}
            name="Satisfaction"
          />
        </BarChart>
      </ResponsiveContainer>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Trophy" size="1.125rem" className="text-warning" />
            <p className="text-xs text-muted-foreground">Top Performer</p>
          </div>
          <p className="text-base font-bold text-foreground">
            {comparisonType === 'segment' ? 'Enterprise' : comparisonType === 'service' ? 'Premium' : 'North'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Activity" size="1.125rem" className="text-primary" />
            <p className="text-xs text-muted-foreground">Avg On-Time</p>
          </div>
          <p className="text-base font-bold text-foreground">
            {(getChartData()?.reduce((sum, item) => sum + item?.onTime, 0) / getChartData()?.length)?.toFixed(1)}%
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Target" size="1.125rem" className="text-accent" />
            <p className="text-xs text-muted-foreground">Improvement Area</p>
          </div>
          <p className="text-base font-bold text-foreground">
            {comparisonType === 'segment' ? 'Small Business' : comparisonType === 'service' ? 'Basic' : 'South'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparisonChart;