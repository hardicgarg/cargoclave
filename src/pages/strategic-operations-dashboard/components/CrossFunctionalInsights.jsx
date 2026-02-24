import React from 'react';
import Icon from '../../../components/AppIcon';

const CrossFunctionalInsights = () => {
  const departmentInsights = [
    {
      department: 'Operations',
      icon: 'Truck',
      iconBg: 'bg-primary/10',
      status: 'excellent',
      score: 94,
      highlights: [
        'Fleet utilization at 87%',
        'On-time delivery 94.5%',
        'Driver satisfaction up 8%'
      ]
    },
    {
      department: 'Finance',
      icon: 'DollarSign',
      iconBg: 'bg-success/10',
      status: 'excellent',
      score: 91,
      highlights: [
        'EBITDA margin 28.4%',
        'Cash flow positive',
        'Cost reduction 12%'
      ]
    },
    {
      department: 'Customer Success',
      icon: 'Users',
      iconBg: 'bg-warning/10',
      status: 'good',
      score: 88,
      highlights: [
        'Retention rate 94.2%',
        'NPS score 68',
        'Satisfaction 4.7/5'
      ]
    },
    {
      department: 'Technology',
      icon: 'Zap',
      iconBg: 'bg-accent/10',
      status: 'excellent',
      score: 92,
      highlights: [
        'System uptime 99.8%',
        'API response < 200ms',
        'Zero security incidents'
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      excellent: { color: 'bg-success/10 text-success', label: 'Excellent' },
      good: { color: 'bg-primary/10 text-primary', label: 'Good' },
      warning: { color: 'bg-warning/10 text-warning', label: 'Needs Attention' }
    };
    return badges?.[status] || badges?.good;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Cross-Functional Insights</h2>
          <p className="text-sm text-muted-foreground">Department performance overview</p>
        </div>
        <button className="text-xs text-primary hover:underline">
          View Details
        </button>
      </div>

      <div className="space-y-4">
        {departmentInsights?.map((dept, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg hover:shadow-sm transition-all">
            <div className="flex items-start gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${dept?.iconBg}`}>
                <Icon name={dept?.icon} size="1.5rem" className="text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{dept?.department}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{dept?.score}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(dept?.status)?.color}`}>
                      {getStatusBadge(dept?.status)?.label}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-1">
                  {dept?.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Icon name="CheckCircle" size="0.75rem" className="text-success mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-card rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    dept?.score >= 90 ? 'bg-success' : dept?.score >= 80 ? 'bg-primary' : 'bg-warning'
                  }`}
                  style={{ width: `${dept?.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Overall Organization Health</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">91.3%</span>
            <Icon name="TrendingUp" size="1rem" className="text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossFunctionalInsights;