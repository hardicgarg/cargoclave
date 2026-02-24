import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const IncidentTrendChart = ({ period }) => {
  const incidentData = [
    { month: 'Jan', minor: 4, major: 2, critical: 0 },
    { month: 'Feb', minor: 3, major: 1, critical: 1 },
    { month: 'Mar', minor: 5, major: 2, critical: 0 },
    { month: 'Apr', minor: 2, major: 1, critical: 0 },
    { month: 'May', minor: 3, major: 2, critical: 1 },
    { month: 'Jun', minor: 4, major: 1, critical: 0 },
    { month: 'Jul', minor: 2, major: 1, critical: 0 },
    { month: 'Aug', minor: 3, major: 0, critical: 0 }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Incident Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">Safety incidents categorized by severity</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="TrendingDown" size="1rem" className="text-success" />
          <span className="text-success font-medium">18% decrease</span>
        </div>
      </div>
      
      <div className="h-[18.75rem]">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={incidentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem"
            }} 
          />
          <Legend />
          <Line type="monotone" dataKey="minor" stroke="#fbbf24" strokeWidth={2} name="Minor" />
          <Line type="monotone" dataKey="major" stroke="#f97316" strokeWidth={2} name="Major" />
          <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentTrendChart;