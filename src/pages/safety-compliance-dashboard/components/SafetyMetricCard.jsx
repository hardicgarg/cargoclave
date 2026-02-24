import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyMetricCard = ({ title, value, trend, trendValue, icon, iconBg, description }) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon name={icon} size="1.5rem" className={icon === 'AlertTriangle' ? 'text-error' : icon === 'Award' ? 'text-success' : icon === 'Shield' ? 'text-primary' : 'text-warning'} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive && title !== 'Total Incidents' ? 'bg-success/10 text-success' : 
            isNegative && title === 'Total Incidents'? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={
              (isPositive && title !== 'Total Incidents') || (isNegative && title === 'Total Incidents') 
                ? 'TrendingUp' :'TrendingDown'
            } size="0.875rem" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SafetyMetricCard;