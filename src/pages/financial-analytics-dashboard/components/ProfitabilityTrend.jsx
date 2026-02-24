import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProfitabilityTrend = () => {
  const profitData = [
    { quarter: 'Q1 2024', revenue: 945000, costs: 675000, profit: 270000, margin: 28.6 },
    { quarter: 'Q2 2024', revenue: 1120000, costs: 780000, profit: 340000, margin: 30.4 },
    { quarter: 'Q3 2024', revenue: 1240000, costs: 825000, profit: 415000, margin: 33.5 },
    { quarter: 'Q4 2024', revenue: 1420000, costs: 920000, profit: 500000, margin: 35.2 }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  const avgMargin = (profitData?.reduce((acc, q) => acc + q?.margin, 0) / profitData?.length)?.toFixed(1);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Quarterly Profitability Trend</h3>
          <p className="text-sm text-muted-foreground">Revenue, costs, and profit margin analysis</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
          <Icon name="Percent" size="0.875rem" className="text-success" />
          <span className="text-sm font-bold text-success">{avgMargin}% Avg Margin</span>
        </div>
      </div>

      <div className="h-[17.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={profitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="quarter" stroke="#6b7280" />
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
          <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
          <Bar dataKey="costs" fill="#ef4444" name="Costs" />
          <Bar dataKey="profit" fill="#6366f1" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-lg font-bold text-success">
            {formatCurrency(profitData?.reduce((acc, q) => acc + q?.revenue, 0))}
          </p>
        </div>
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Total Costs</p>
          <p className="text-lg font-bold text-error">
            {formatCurrency(profitData?.reduce((acc, q) => acc + q?.costs, 0))}
          </p>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(profitData?.reduce((acc, q) => acc + q?.profit, 0))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityTrend;