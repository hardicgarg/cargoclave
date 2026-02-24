import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const DeliveryTrendsChart = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [chartType, setChartType] = useState('line');

  const deliveryData = [
    { month: 'Jun', deliveries: 1247, onTime: 1185, delayed: 62, satisfaction: 4.6 },
    { month: 'Jul', deliveries: 1389, onTime: 1320, delayed: 69, satisfaction: 4.7 },
    { month: 'Aug', deliveries: 1523, onTime: 1448, delayed: 75, satisfaction: 4.5 },
    { month: 'Sep', deliveries: 1456, onTime: 1387, delayed: 69, satisfaction: 4.8 },
    { month: 'Oct', deliveries: 1678, onTime: 1595, delayed: 83, satisfaction: 4.6 },
    { month: 'Nov', deliveries: 1734, onTime: 1651, delayed: 83, satisfaction: 4.9 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-semibold text-foreground mb-2">{payload?.[0]?.payload?.month}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-semibold text-foreground">{entry?.value}</span>
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
          <h2 className="text-xl font-semibold text-foreground mb-1">Delivery Trends</h2>
          <p className="text-sm text-muted-foreground">Monthly delivery completion analysis</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                chartType === 'line' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                chartType === 'area' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Area
            </button>
          </div>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
          </select>
        </div>
      </div>

      <div className="h-[18.75rem]">
        <ResponsiveContainer width="100%" height="100%">
        {chartType === 'line' ? (
          <LineChart data={deliveryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: "0.75rem" }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="deliveries" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Total Deliveries"
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="onTime" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              name="On-Time"
              dot={{ fill: 'hsl(var(--success))', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="delayed" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Delayed"
              dot={{ fill: 'hsl(var(--destructive))', r: 4 }}
            />
          </LineChart>
        ) : (
          <AreaChart data={deliveryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "0.75rem" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: "0.75rem" }}
              iconType="circle"
            />
            <Area 
              type="monotone" 
              dataKey="onTime" 
              stackId="1"
              stroke="hsl(var(--success))" 
              fill="hsl(var(--success))"
              fillOpacity={0.6}
              name="On-Time"
            />
            <Area 
              type="monotone" 
              dataKey="delayed" 
              stackId="1"
              stroke="hsl(var(--destructive))" 
              fill="hsl(var(--destructive))"
              fillOpacity={0.6}
              name="Delayed"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="TrendingUp" size="1rem" className="text-success" />
            <p className="text-xs text-muted-foreground">Total Growth</p>
          </div>
          <p className="text-lg font-bold text-foreground">+39.1%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="CheckCircle2" size="1rem" className="text-success" />
            <p className="text-xs text-muted-foreground">Avg On-Time</p>
          </div>
          <p className="text-lg font-bold text-foreground">95.1%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="AlertCircle" size="1rem" className="text-warning" />
            <p className="text-xs text-muted-foreground">Avg Delayed</p>
          </div>
          <p className="text-lg font-bold text-foreground">4.9%</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="Star" size="1rem" className="text-primary" />
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
          <p className="text-lg font-bold text-foreground">4.7/5.0</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrendsChart;