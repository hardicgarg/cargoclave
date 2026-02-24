import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const TripsOverviewChart = () => {
  const data = [
    { name: 'In Transit', value: 342, color: '#3B82F6', icon: 'Truck' },
    { name: 'Completed', value: 658, color: '#10B981', icon: 'CheckCircle2' },
    { name: 'Pending', value: 89, color: '#F59E0B', icon: 'Clock' },
    { name: 'Cancelled', value: 11, color: '#EF4444', icon: 'XCircle' }
  ];

  const total = data?.reduce((sum, item) => sum + item?.value, 0);

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Trips Overview</h3>
      <div className="w-full h-80" aria-label="Trips Overview Donut Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
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
              formatter={(value) => [`${value} trips`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${item?.color}20` }}
            >
              <Icon name={item?.icon} size="1.25rem" style={{ color: item?.color }} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item?.name}</p>
              <p className="text-lg font-semibold text-foreground">{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsOverviewChart;