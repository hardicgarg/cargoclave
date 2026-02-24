import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const OnTimeDeliveryChart = () => {
  const data = [
    { name: 'On Time', value: 847, color: '#10B981' },
    { name: 'Delayed', value: 123, color: '#F59E0B' },
    { name: 'Critical', value: 30, color: '#EF4444' }
  ];

  const total = data?.reduce((sum, item) => sum + item?.value, 0);
  const onTimePercentage = ((data?.[0]?.value / total) * 100)?.toFixed(1);

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">On-Time Delivery Rate</h3>
      <div className="w-full h-80 relative" aria-label="On-Time Delivery Donut Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: "0.5rem",
                color: 'var(--color-foreground)'
              }}
              formatter={(value) => [`${value} deliveries`, '']}
            />
            <Legend 
              verticalAlign="bottom" 
              height="2.25rem"
              formatter={(value, entry) => `${value}: ${entry?.payload?.value}`}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold text-foreground">{onTimePercentage}%</p>
          <p className="text-xs text-muted-foreground">On Time</p>
        </div>
      </div>
    </div>
  );
};

export default OnTimeDeliveryChart;