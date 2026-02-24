import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const IncidentCategoryBreakdown = () => {
  const incidentCategories = [
    { name: 'Vehicle Damage', value: 35, color: '#f97316' },
    { name: 'Traffic Violations', value: 25, color: '#ef4444' },
    { name: 'Minor Collisions', value: 20, color: '#fbbf24' },
    { name: 'Equipment Failure', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 8, color: '#6b7280' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Incident Category Breakdown</h3>
          <p className="text-sm text-muted-foreground">Distribution of incidents by type</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-error/10 rounded-full">
          <Icon name="AlertCircle" size="0.875rem" className="text-error" />
          <span className="text-xs font-medium text-error">23 Total</span>
        </div>
      </div>
      <div className="h-[15.625rem]">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={incidentCategories}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ percent }) => `${(percent * 100)?.toFixed(0)}%`}
          >
            {incidentCategories?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {incidentCategories?.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category?.color }}
              />
              <span className="text-sm text-foreground">{category?.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground">{category?.value} incidents</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentCategoryBreakdown;