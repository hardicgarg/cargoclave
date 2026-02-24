import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const MonthlyComparison = () => {
  const comparisonData = [
    { month: 'Jan', current: 320000, previous: 285000 },
    { month: 'Feb', current: 345000, previous: 310000 },
    { month: 'Mar', current: 380000, previous: 325000 },
    { month: 'Apr', current: 365000, previous: 340000 },
    { month: 'May', current: 420000, previous: 365000 },
    { month: 'Jun', current: 455000, previous: 390000 },
    { month: 'Jul', current: 490000, previous: 425000 },
    { month: 'Aug', current: 475000, previous: 445000 }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  const totalCurrent = comparisonData?.reduce((acc, month) => acc + month?.current, 0);
  const totalPrevious = comparisonData?.reduce((acc, month) => acc + month?.previous, 0);
  const growthPercentage = ((totalCurrent - totalPrevious) / totalPrevious * 100)?.toFixed(1);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Year-over-Year Comparison</h3>
          <p className="text-sm text-muted-foreground">Current vs previous year monthly revenue</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
          <Icon name="TrendingUp" size="0.875rem" className="text-success" />
          <span className="text-sm font-bold text-success">+{growthPercentage}%</span>
        </div>
      </div>

      <div className="h-[17.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={comparisonData}>
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
          <Bar dataKey="previous" fill="#94a3b8" name="Previous Year" radius={[4, 4, 0, 0]} />
          <Bar dataKey="current" fill="#10b981" name="Current Year" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted/20 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Year Total</p>
          <p className="text-xl font-bold text-success">{formatCurrency(totalCurrent)}</p>
        </div>
        <div className="p-4 bg-muted/20 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Previous Year Total</p>
          <p className="text-xl font-bold text-muted-foreground">{formatCurrency(totalPrevious)}</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyComparison;