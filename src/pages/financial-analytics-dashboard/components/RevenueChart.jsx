import React from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueChart = ({ period }) => {
  const revenueData = [
    { month: 'Jan', revenue: 320000, projectedRevenue: 310000, costs: 210000 },
    { month: 'Feb', revenue: 345000, projectedRevenue: 335000, costs: 225000 },
    { month: 'Mar', revenue: 380000, projectedRevenue: 360000, costs: 245000 },
    { month: 'Apr', revenue: 365000, projectedRevenue: 370000, costs: 240000 },
    { month: 'May', revenue: 420000, projectedRevenue: 395000, costs: 270000 },
    { month: 'Jun', revenue: 455000, projectedRevenue: 425000, costs: 285000 },
    { month: 'Jul', revenue: 490000, projectedRevenue: 455000, costs: 295000 },
    { month: 'Aug', revenue: 475000, projectedRevenue: 470000, costs: 290000 }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Actual vs projected revenue trends</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
            <Icon name="TrendingUp" size="0.875rem" className="text-success" />
            <span className="text-sm font-medium text-success">15.3% growth</span>
          </div>
        </div>
      </div>
      
      <div className="h-[20rem]">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem"
            }} 
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            strokeWidth={2}
            name="Actual Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="costs" 
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorCosts)" 
            strokeWidth={2}
            name="Operating Costs"
          />
          <Line 
            type="monotone" 
            dataKey="projectedRevenue" 
            stroke="#6366f1" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            name="Projected Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;