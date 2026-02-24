import React from 'react';
import Icon from '../../../components/AppIcon';

const StrategicObjectivesTracker = () => {
  const strategicObjectives = [
    {
      title: 'Revenue Growth',
      target: '$50M',
      current: '$43.9M',
      progress: 87.8,
      status: 'on-track',
      deadline: 'Q4 2025',
      owner: 'CFO',
      milestones: [
        { label: 'Q1 Target', completed: true },
        { label: 'Q2 Target', completed: true },
        { label: 'Q3 Target', completed: true },
        { label: 'Q4 Target', completed: false }
      ]
    },
    {
      title: 'Market Expansion',
      target: '5 New Regions',
      current: '4 Regions',
      progress: 80,
      status: 'on-track',
      deadline: 'Dec 2025',
      owner: 'COO',
      milestones: [
        { label: 'Northeast', completed: true },
        { label: 'Southeast', completed: true },
        { label: 'Midwest', completed: true },
        { label: 'Southwest', completed: true },
        { label: 'Northwest', completed: false }
      ]
    },
    {
      title: 'Fleet Modernization',
      target: '150 New Vehicles',
      current: '127 Vehicles',
      progress: 84.7,
      status: 'on-track',
      deadline: 'Nov 2025',
      owner: 'VP Operations',
      milestones: [
        { label: 'Phase 1', completed: true },
        { label: 'Phase 2', completed: true },
        { label: 'Phase 3', completed: false }
      ]
    },
    {
      title: 'Technology Upgrade',
      target: 'Platform 2.0 Launch',
      current: '78% Complete',
      progress: 78,
      status: 'at-risk',
      deadline: 'Oct 2025',
      owner: 'CTO',
      milestones: [
        { label: 'Backend', completed: true },
        { label: 'Frontend', completed: false },
        { label: 'Testing', completed: false }
      ]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'on-track': 'bg-success text-success',
      'at-risk': 'bg-warning text-warning',
      'behind': 'bg-destructive text-destructive'
    };
    return colors?.[status] || colors?.['on-track'];
  };

  const getStatusLabel = (status) => {
    const labels = {
      'on-track': 'On Track',
      'at-risk': 'At Risk',
      'behind': 'Behind Schedule'
    };
    return labels?.[status] || status;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Strategic Objectives</h2>
          <p className="text-sm text-muted-foreground">2025 annual objectives tracking</p>
        </div>
        <button className="text-xs text-primary hover:underline">
          View Roadmap
        </button>
      </div>

      <div className="space-y-4">
        {strategicObjectives?.map((objective, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{objective?.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective?.status)}/10`}>
                    {getStatusLabel(objective?.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Target" size="0.75rem" />
                    Target: {objective?.target}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size="0.75rem" />
                    Due: {objective?.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="User" size="0.75rem" />
                    Owner: {objective?.owner}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{objective?.progress}%</p>
                <p className="text-xs text-muted-foreground">{objective?.current}</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="w-full bg-card rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    objective?.progress >= 85 
                      ? 'bg-success' 
                      : objective?.progress >= 70 
                        ? 'bg-primary' :'bg-warning'
                  }`}
                  style={{ width: `${objective?.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {objective?.milestones?.map((milestone, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 p-2 rounded text-center text-xs ${
                    milestone?.completed 
                      ? 'bg-success/10 text-success' :'bg-card text-muted-foreground'
                  }`}
                >
                  {milestone?.completed && <Icon name="Check" size="0.75rem" className="inline mr-1" />}
                  {milestone?.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategicObjectivesTracker;