import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VehicleUtilizationChart = () => {
  const data = [
    { month: 'Jan', utilization: 78 },
    { month: 'Feb', utilization: 82 },
    { month: 'Mar', utilization: 75 },
    { month: 'Apr', utilization: 88 },
    { month: 'May', utilization: 91 },
    { month: 'Jun', utilization: 85 },
    { month: 'Jul', utilization: 89 },
    { month: 'Aug', utilization: 93 },
    { month: 'Sep', utilization: 87 },
    { month: 'Oct', utilization: 90 },
    { month: 'Nov', utilization: 94 },
    { month: 'Dec', utilization: 88 }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Monthly Vehicle Utilization Rate</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          <span>Utilization %</span>
        </div>
      </div>
      
      <div className="w-full h-80" aria-label="Monthly Vehicle Utilization Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "0.75rem" }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: "0.5rem",
                color: 'var(--color-foreground)'
              }}
              formatter={(value) => [`${value}%`, 'Utilization']}
            />
            <Bar 
              dataKey="utilization" 
              fill="var(--color-primary)" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VehicleUtilizationChart;