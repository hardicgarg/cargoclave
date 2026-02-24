import React from 'react';
import Icon from '../../../components/AppIcon';

const VehicleInspectionStatus = () => {
  const inspectionStats = {
    total: 456,
    compliant: 423,
    dueThisWeek: 18,
    overdue: 15
  };

  const recentInspections = [
    { 
      vehicleId: 'TRK-1234', 
      type: 'Annual Safety Inspection', 
      status: 'passed',
      date: '2025-11-25',
      inspector: 'Mike Roberts'
    },
    { 
      vehicleId: 'TRK-5678', 
      type: 'DOT Compliance Check', 
      status: 'passed',
      date: '2025-11-24',
      inspector: 'Sarah Kim'
    },
    { 
      vehicleId: 'TRK-9012', 
      type: 'Brake System Inspection', 
      status: 'warning',
      date: '2025-11-23',
      inspector: 'John Davis'
    },
    { 
      vehicleId: 'TRK-3456', 
      type: 'Emissions Test', 
      status: 'failed',
      date: '2025-11-22',
      inspector: 'Emily Chen'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'passed': return 'bg-success/10 text-success';
      case 'warning': return 'bg-warning/10 text-warning';
      case 'failed': return 'bg-error/10 text-error';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'passed': return 'CheckCircle';
      case 'warning': return 'AlertCircle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Vehicle Inspection Status</h3>
        <p className="text-sm text-muted-foreground">Fleet inspection compliance tracking</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{inspectionStats?.total}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Vehicles</p>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-2xl font-bold text-success">{inspectionStats?.compliant}</p>
          <p className="text-xs text-muted-foreground mt-1">Compliant</p>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <p className="text-2xl font-bold text-warning">{inspectionStats?.dueThisWeek}</p>
          <p className="text-xs text-muted-foreground mt-1">Due This Week</p>
        </div>
        <div className="text-center p-3 bg-error/10 rounded-lg">
          <p className="text-2xl font-bold text-error">{inspectionStats?.overdue}</p>
          <p className="text-xs text-muted-foreground mt-1">Overdue</p>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground mb-3">Recent Inspections</h4>
        {recentInspections?.map((inspection, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getStatusColor(inspection?.status)}`}>
              <Icon name={getStatusIcon(inspection?.status)} size="1.125rem" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground text-sm">{inspection?.vehicleId}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getStatusColor(inspection?.status)}`}>
                  {inspection?.status?.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{inspection?.type}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(inspection?.date)?.toLocaleDateString()} • {inspection?.inspector}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
        View All Inspections
      </button>
    </div>
  );
};

export default VehicleInspectionStatus;