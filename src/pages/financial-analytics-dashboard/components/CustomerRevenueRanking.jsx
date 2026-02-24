import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerRevenueRanking = () => {
  const topCustomers = [
    { id: 1, name: 'GlobalTech Corp', revenue: 485000, growth: 18.5, contracts: 12, badge: 'platinum' },
    { id: 2, name: 'MegaRetail Inc', revenue: 425000, growth: 15.2, contracts: 9, badge: 'gold' },
    { id: 3, name: 'FastShip Logistics', revenue: 380000, growth: 12.8, contracts: 8, badge: 'gold' },
    { id: 4, name: 'TechManufacturing Ltd', revenue: 345000, growth: 22.3, contracts: 7, badge: 'silver' },
    { id: 5, name: 'AutoParts Distribution', revenue: 298000, growth: -3.2, contracts: 6, badge: 'silver' }
  ];

  const getBadgeIcon = (badge) => {
    switch(badge) {
      case 'platinum': return { icon: 'Crown', color: 'text-purple-500' };
      case 'gold': return { icon: 'Award', color: 'text-yellow-500' };
      case 'silver': return { icon: 'Award', color: 'text-gray-400' };
      default: return null;
    }
  };

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Top Revenue Customers</h3>
        <p className="text-sm text-muted-foreground">Highest earning clients by revenue</p>
      </div>

      <div className="space-y-3">
        {topCustomers?.map((customer, index) => {
          const badge = getBadgeIcon(customer?.badge);
          const isGrowthPositive = customer?.growth > 0;
          
          return (
            <div 
              key={customer?.id}
              className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                #{index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground text-sm">{customer?.name}</span>
                  {badge && (
                    <Icon name={badge?.icon} size="0.875rem" className={badge?.color} />
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{customer?.contracts} active contracts</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-success">{formatCurrency(customer?.revenue)}</span>
                  
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    isGrowthPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  }`}>
                    <Icon name={isGrowthPositive ? 'TrendingUp' : 'TrendingDown'} size="0.75rem" />
                    <span>{Math.abs(customer?.growth)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
        View All Customers
      </button>
    </div>
  );
};

export default CustomerRevenueRanking;