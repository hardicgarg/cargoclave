import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentIncidentsList = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const incidents = [
    {
      id: 'INC-2025-234',
      date: '2025-11-26',
      time: '14:30',
      severity: 'minor',
      type: 'Vehicle Damage',
      driver: 'Robert Wilson',
      vehicle: 'TRK-5678',
      location: 'Highway 101, Mile 34',
      status: 'under_investigation',
      description: 'Minor dent on rear bumper during backing maneuver'
    },
    {
      id: 'INC-2025-233',
      date: '2025-11-25',
      time: '09:15',
      severity: 'major',
      type: 'Traffic Violation',
      driver: 'Jennifer Lee',
      vehicle: 'TRK-3421',
      location: 'Route 66, Junction 12',
      status: 'resolved',
      description: 'Speeding ticket - 15mph over limit'
    },
    {
      id: 'INC-2025-232',
      date: '2025-11-24',
      time: '16:45',
      severity: 'minor',
      type: 'Equipment Failure',
      driver: 'Marcus Johnson',
      vehicle: 'TRK-8901',
      location: 'Distribution Center A',
      status: 'resolved',
      description: 'Brake light malfunction detected during pre-trip inspection'
    },
    {
      id: 'INC-2025-231',
      date: '2025-11-23',
      time: '11:20',
      severity: 'critical',
      type: 'Minor Collision',
      driver: 'Amanda Torres',
      vehicle: 'TRK-1234',
      location: 'Interstate 95, Exit 42',
      status: 'under_investigation',
      description: 'Minor collision with stationary object in parking area'
    }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-error/10 text-error border-error';
      case 'major': return 'bg-warning/10 text-warning border-warning';
      case 'minor': return 'bg-primary/10 text-primary border-primary';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-success/10 text-success';
      case 'under_investigation': return 'bg-warning/10 text-warning';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredIncidents = selectedSeverity === 'all' 
    ? incidents 
    : incidents?.filter(inc => inc?.severity === selectedSeverity);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Recent Safety Incidents</h3>
          <p className="text-sm text-muted-foreground">Latest safety incidents and their current status</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e?.target?.value)}
            className="px-4 py-2 text-sm font-medium border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredIncidents?.map((incident, index) => (
          <div 
            key={incident?.id}
            className="flex gap-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-all border border-border"
          >
            <div className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center ${getSeverityColor(incident?.severity)}`}>
              <Icon name="AlertTriangle" size="1.5rem" />
              <span className="text-xs font-bold mt-1">{incident?.severity?.toUpperCase()}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-foreground">{incident?.id}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(incident?.status)}`}>
                      {incident?.status?.replace('_', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(incident?.date)?.toLocaleDateString()} • {incident?.time}
                  </p>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Icon name="MoreVertical" size="1.125rem" className="text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="User" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{incident?.driver}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Truck" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{incident?.vehicle}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Icon name="MapPin" size="0.875rem" className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{incident?.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border">
                <Icon name="FileText" size="0.875rem" className="text-muted-foreground mt-0.5" />
                <p className="text-sm text-foreground">{incident?.description}</p>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button className="px-3 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors">
                  Update Status
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors border border-border">
        Load More Incidents
      </button>
    </>
  );
};

export default RecentIncidentsList;