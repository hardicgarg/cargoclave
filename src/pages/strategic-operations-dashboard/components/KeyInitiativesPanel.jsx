import React from 'react';
import Icon from '../../../components/AppIcon';

const KeyInitiativesPanel = () => {
  const initiatives = [
    {
      title: 'AI Route Optimization',
      priority: 'high',
      status: 'in-progress',
      progress: 65,
      team: 'Technology',
      impact: 'High',
      deadline: 'Nov 2025'
    },
    {
      title: 'Customer Portal V2',
      priority: 'high',
      status: 'in-progress',
      progress: 82,
      team: 'Product',
      impact: 'High',
      deadline: 'Oct 2025'
    },
    {
      title: 'Sustainability Program',
      priority: 'medium',
      status: 'planning',
      progress: 25,
      team: 'Operations',
      impact: 'Medium',
      deadline: 'Dec 2025'
    },
    {
      title: 'Driver Training Platform',
      priority: 'medium',
      status: 'in-progress',
      progress: 45,
      team: 'HR & Operations',
      impact: 'Medium',
      deadline: 'Nov 2025'
    },
    {
      title: 'Partnership Expansion',
      priority: 'high',
      status: 'active',
      progress: 90,
      team: 'Business Dev',
      impact: 'High',
      deadline: 'Oct 2025'
    }
  ];

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-destructive/10 text-destructive',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-primary/10 text-primary'
    };
    return badges?.[priority] || badges?.medium;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'in-progress': 'Clock',
      'planning': 'FileText',
      'active': 'CheckCircle',
      'completed': 'Check'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Key Initiatives</h2>
          <p className="text-sm text-muted-foreground">Active strategic projects</p>
        </div>
        <button className="text-xs text-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {initiatives?.map((initiative, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {initiative?.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityBadge(initiative?.priority)}`}>
                    {initiative?.priority?.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {initiative?.team}
                  </span>
                </div>
              </div>
              <Icon 
                name={getStatusIcon(initiative?.status)} 
                size="1rem" 
                className="text-primary"
              />
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-medium text-foreground">{initiative?.progress}%</span>
              </div>
              <div className="w-full bg-card rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${initiative?.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                <Icon name="Target" size="0.625rem" className="inline mr-1" />
                Impact: {initiative?.impact}
              </span>
              <span className="text-muted-foreground">
                <Icon name="Calendar" size="0.625rem" className="inline mr-1" />
                {initiative?.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
        View Initiative Roadmap
      </button>
    </div>
  );
};

export default KeyInitiativesPanel;