import React from 'react';
import Icon from '../../../components/AppIcon';

const DriverSafetyRanking = () => {
  const topSafeDrivers = [
    { id: 1, name: 'Michael Chen', safetyScore: 98, incidentFree: 245, badge: 'gold' },
    { id: 2, name: 'Sarah Johnson', safetyScore: 96, incidentFree: 198, badge: 'silver' },
    { id: 3, name: 'David Martinez', safetyScore: 94, incidentFree: 167, badge: 'bronze' },
    { id: 4, name: 'Emily Wilson', safetyScore: 92, incidentFree: 145 },
    { id: 5, name: 'James Anderson', safetyScore: 90, incidentFree: 132 }
  ];

  const getBadgeIcon = (badge) => {
    switch(badge) {
      case 'gold': return { icon: 'Award', color: 'text-yellow-500' };
      case 'silver': return { icon: 'Award', color: 'text-gray-400' };
      case 'bronze': return { icon: 'Award', color: 'text-orange-600' };
      default: return null;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Top Safety Performers</h3>
        <p className="text-sm text-muted-foreground">Drivers with highest safety scores</p>
      </div>

      <div className="space-y-3">
        {topSafeDrivers?.map((driver, index) => {
          const badge = getBadgeIcon(driver?.badge);
          return (
            <div 
              key={driver?.id}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{driver?.name}</span>
                  {badge && (
                    <Icon name={badge?.icon} size="1rem" className={badge?.color} />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{driver?.incidentFree} days incident-free</p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 px-3 py-1 bg-success/10 rounded-full">
                  <Icon name="Shield" size="0.875rem" className="text-success" />
                  <span className="text-sm font-bold text-success">{driver?.safetyScore}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
        View Full Safety Rankings
      </button>
    </div>
  );
};

export default DriverSafetyRanking;