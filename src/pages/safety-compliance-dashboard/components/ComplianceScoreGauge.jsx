import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComplianceScoreGauge = () => {
  const score = 94.5;
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];
  
  const COLORS = ['#10b981', '#e5e7eb'];

  const getScoreStatus = (score) => {
    if (score >= 95) return { status: 'Excellent', color: 'text-success', icon: 'CheckCircle' };
    if (score >= 85) return { status: 'Good', color: 'text-primary', icon: 'CheckCircle' };
    if (score >= 75) return { status: 'Fair', color: 'text-warning', icon: 'AlertCircle' };
    return { status: 'Needs Improvement', color: 'text-error', icon: 'AlertTriangle' };
  };

  const scoreStatus = getScoreStatus(score);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Overall Compliance Score</h3>
        <p className="text-sm text-muted-foreground">Current safety & regulatory compliance rating</p>
      </div>
      <div className="relative">
        <div className="h-[12.5rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
          <p className="text-4xl font-bold text-foreground">{score}%</p>
          <div className={`flex items-center justify-center gap-1 mt-2 ${scoreStatus?.color}`}>
            <Icon name={scoreStatus?.icon} size="1rem" />
            <span className="text-sm font-medium">{scoreStatus?.status}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Vehicle Inspections</span>
          <span className="font-medium text-foreground">98%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Driver Certifications</span>
          <span className="font-medium text-foreground">96%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Safety Training</span>
          <span className="font-medium text-foreground">87%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Regulatory Compliance</span>
          <span className="font-medium text-foreground">97%</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScoreGauge;