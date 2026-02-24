import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const CostBreakdownChart = () => {
  const costCategories = [
    { name: 'Fuel', value: 850000, color: '#ef4444', percentage: 30 },
    { name: 'Labor', value: 680000, color: '#f97316', percentage: 24 },
    { name: 'Maintenance', value: 510000, color: '#fbbf24', percentage: 18 },
    { name: 'Insurance', value: 425000, color: '#8b5cf6', percentage: 15 },
    { name: 'Overhead', value: 340000, color: '#6366f1', percentage: 13 }
  ];

  const totalCosts = costCategories?.reduce((acc, cat) => acc + cat?.value, 0);

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Cost Structure Breakdown</h3>
        <p className="text-sm text-muted-foreground">Operating expense distribution</p>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Total Operating Costs</p>
        <p className="text-2xl font-bold text-foreground">{formatCurrency(totalCosts)}</p>
      </div>

      <div className="h-[12.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={costCategories}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ percentage }) => `${percentage}%`}
          >
            {costCategories?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
        </PieChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {costCategories?.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category?.color }}
              />
              <span className="text-sm font-medium text-foreground">{category?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">{formatCurrency(category?.value)}</p>
              <p className="text-xs text-muted-foreground">{category?.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostBreakdownChart;