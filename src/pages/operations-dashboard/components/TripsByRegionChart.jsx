import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TripsByRegionChart = () => {
  const data = [
    { region: 'West', completed: 245, inTransit: 89, pending: 34 },
    { region: 'East', completed: 198, inTransit: 76, pending: 28 },
    { region: 'North', completed: 156, inTransit: 98, pending: 19 },
    { region: 'South', completed: 189, inTransit: 79, pending: 23 },
    { region: 'Central', completed: 167, inTransit: 65, pending: 31 }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Trips by Region</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-success"></span>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">In Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-warning"></span>
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-80" aria-label="Trips by Region Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="region" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "0.75rem" }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: "0.75rem" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: "0.5rem",
                color: 'var(--color-foreground)'
              }}
            />
            <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inTransit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TripsByRegionChart;