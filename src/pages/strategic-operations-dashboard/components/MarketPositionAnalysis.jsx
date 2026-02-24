import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const MarketPositionAnalysis = () => {
  const marketShareData = [
    { name: 'CargoClave', value: 18.5, color: '#3b82f6' },
    { name: 'Competitor A', value: 22.3, color: '#ef4444' },
    { name: 'Competitor B', value: 15.8, color: '#f59e0b' },
    { name: 'Competitor C', value: 12.4, color: '#10b981' },
    { name: 'Others', value: 31.0, color: '#9ca3af' }
  ];

  const competitiveAdvantages = [
    {
      area: 'Technology',
      score: 92,
      trend: 'up',
      icon: 'Zap'
    },
    {
      area: 'Customer Service',
      score: 88,
      trend: 'up',
      icon: 'Users'
    },
    {
      area: 'Pricing',
      score: 85,
      trend: 'stable',
      icon: 'DollarSign'
    },
    {
      area: 'Coverage',
      score: 78,
      trend: 'up',
      icon: 'Map'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Market Position</h2>
          <p className="text-sm text-muted-foreground">Industry share and competitive analysis</p>
        </div>
        <button className="p-2 rounded-lg border border-border hover:bg-muted transition-all">
          <Icon name="ExternalLink" size="1rem" />
        </button>
      </div>

      <div className="h-[12.5rem]">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={marketShareData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {marketShareData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: "0.5rem",
              fontSize: "0.75rem"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Market Share</p>
            <p className="text-3xl font-bold text-foreground">18.5%</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-success font-medium">+2.3% YoY</span>
            <p className="text-xs text-muted-foreground mt-1">#2 Position</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-bold text-foreground mb-3">Competitive Advantages</h3>
        <div className="space-y-3">
          {competitiveAdvantages?.map((advantage, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name={advantage?.icon} size="1rem" className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{advantage?.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{advantage?.score}/100</span>
                  {advantage?.trend === 'up' && (
                    <Icon name="TrendingUp" size="0.875rem" className="text-success" />
                  )}
                  {advantage?.trend === 'stable' && (
                    <Icon name="Minus" size="0.875rem" className="text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="w-full bg-card rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    advantage?.score >= 90 ? 'bg-success' : advantage?.score >= 80 ? 'bg-primary' : 'bg-warning'
                  }`}
                  style={{ width: `${advantage?.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPositionAnalysis;