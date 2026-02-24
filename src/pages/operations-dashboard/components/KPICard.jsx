import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, trend, trendValue, icon, iconBg, link }) => {
  const isPositive = trend === 'up';
  
  return (
    <Link 
      to={link}
      className="block bg-card rounded-xl p-6 border border-border hover:shadow-elevated transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size="1.5rem" className="text-primary" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
        }`}>
          <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size="0.875rem" />
          <span>{trendValue}</span>
        </div>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </Link>
  );
};

export default KPICard;