import React from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenuePerformanceChart = ({ dateRange }) => {
  const chartData = [
    { date: 'Mon', revenue: 98000, target: 95000, trips: 145 },
    { date: 'Tue', revenue: 112000, target: 95000, trips: 168 },
    { date: 'Wed', revenue: 105000, target: 95000, trips: 156 },
    { date: 'Thu', revenue: 128000, target: 95000, trips: 189 },
    { date: 'Fri', revenue: 135000, target: 95000, trips: 201 },
    { date: 'Sat', revenue: 118000, target: 95000, trips: 172 },
    { date: 'Sun', revenue: 92000, target: 95000, trips: 134 }
  ];

  const summaryStats = [
    { label: 'Total Revenue', value: '$788K', change: '+18.5%', trend: 'up' },
    { label: 'Avg Daily', value: '$112.6K', change: '+12.3%', trend: 'up' },
    { label: 'Total Trips', value: '1,165', change: '+15.2%', trend: 'up' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Revenue Performance</h2>
          <p className="text-sm text-muted-foreground">Daily revenue vs target analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
            <Icon name="BarChart" size="1rem" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
            <Icon name="Download" size="1rem" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {summaryStats?.map((stat, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{stat?.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <span className={`text-xs font-medium ${stat?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                {stat?.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[18.75rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: "0.75rem" }}
              stroke="#9ca3af"
            />
            <YAxis
              tick={{ fontSize: "0.75rem" }}
              stroke="#9ca3af"
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: "0.5rem",
                fontSize: "0.75rem"
              }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem" }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenuePerformanceChart;