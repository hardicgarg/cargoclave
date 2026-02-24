import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const BusinessPerformanceChart = ({ viewMode }) => {
  const performanceData = [
    { 
      quarter: 'Q1 2025', 
      revenue: 9200000, 
      costs: 6100000, 
      profit: 3100000,
      growth: 15.2
    },
    { 
      quarter: 'Q2 2025', 
      revenue: 10500000, 
      costs: 6800000, 
      profit: 3700000,
      growth: 18.5
    },
    { 
      quarter: 'Q3 2025', 
      revenue: 11800000, 
      costs: 7400000, 
      profit: 4400000,
      growth: 21.3
    },
    { 
      quarter: 'Q4 2025', 
      revenue: 12400000, 
      costs: 7900000, 
      profit: 4500000,
      growth: 24.5
    }
  ];

  const summaryCards = [
    {
      label: 'YTD Revenue',
      value: '$43.9M',
      change: '+19.6%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    {
      label: 'YTD Profit',
      value: '$15.7M',
      change: '+23.8%',
      trend: 'up',
      icon: 'DollarSign'
    },
    {
      label: 'Profit Margin',
      value: '35.8%',
      change: '+2.4%',
      trend: 'up',
      icon: 'PieChart'
    },
    {
      label: 'Growth Rate',
      value: '24.5%',
      change: '+6.3%',
      trend: 'up',
      icon: 'BarChart'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Business Performance</h2>
          <p className="text-sm text-muted-foreground">Quarterly revenue, costs, and profitability trends</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
            <Icon name="Filter" size="1rem" />
          </button>
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
            <Icon name="Download" size="1rem" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryCards?.map((card, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={card?.icon} size="1rem" className="text-primary" />
              <span className="text-xs text-muted-foreground">{card?.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{card?.value}</p>
              <span className={`text-xs font-medium ${card?.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                {card?.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[21.875rem]">
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="quarter" 
            tick={{ fontSize: "0.75rem" }}
            stroke="#9ca3af"
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: "0.75rem" }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${(value / 1000000)?.toFixed(1)}M`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: "0.75rem" }}
            stroke="#9ca3af"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem",
              fontSize: "0.75rem"
            }}
            formatter={(value, name) => {
              if (name === 'Growth Rate') return [`${value}%`, name];
              return [`$${(value / 1000000)?.toFixed(2)}M`, name];
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: "0.75rem" }}
            iconType="circle"
          />
          <Bar 
            yAxisId="left"
            dataKey="revenue" 
            fill="#3b82f6" 
            name="Revenue"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="costs" 
            fill="#ef4444" 
            name="Costs"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="profit" 
            fill="#10b981" 
            name="Profit"
            radius={[8, 8, 0, 0]}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="growth" 
            stroke="#f59e0b" 
            strokeWidth={3}
            name="Growth Rate"
            dot={{ fill: '#f59e0b', r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BusinessPerformanceChart;