import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetUtilization = () => {
  const budgetCategories = [
    { 
      name: 'Fuel & Energy', 
      allocated: 1200000, 
      spent: 850000, 
      remaining: 350000, 
      utilizationRate: 70.8,
      trend: 'on-track',
      icon: 'Zap'
    },
    { 
      name: 'Personnel & Labor', 
      allocated: 900000, 
      spent: 680000, 
      remaining: 220000, 
      utilizationRate: 75.6,
      trend: 'on-track',
      icon: 'Users'
    },
    { 
      name: 'Vehicle Maintenance', 
      allocated: 650000, 
      spent: 510000, 
      remaining: 140000, 
      utilizationRate: 78.5,
      trend: 'warning',
      icon: 'Wrench'
    },
    { 
      name: 'Insurance & Compliance', 
      allocated: 550000, 
      spent: 425000, 
      remaining: 125000, 
      utilizationRate: 77.3,
      trend: 'on-track',
      icon: 'Shield'
    },
    { 
      name: 'Technology & Software', 
      allocated: 400000, 
      spent: 340000, 
      remaining: 60000, 
      utilizationRate: 85.0,
      trend: 'alert',
      icon: 'Monitor'
    },
    { 
      name: 'Marketing & Sales', 
      allocated: 350000, 
      spent: 245000, 
      remaining: 105000, 
      utilizationRate: 70.0,
      trend: 'on-track',
      icon: 'TrendingUp'
    }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'on-track': return 'text-success';
      case 'warning': return 'text-warning';
      case 'alert': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendBgColor = (trend) => {
    switch(trend) {
      case 'on-track': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'alert': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'on-track': return 'CheckCircle';
      case 'warning': return 'AlertCircle';
      case 'alert': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const totalAllocated = budgetCategories?.reduce((acc, cat) => acc + cat?.allocated, 0);
  const totalSpent = budgetCategories?.reduce((acc, cat) => acc + cat?.spent, 0);
  const overallUtilization = ((totalSpent / totalAllocated) * 100)?.toFixed(1);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Budget Utilization Analysis</h3>
          <p className="text-sm text-muted-foreground">Departmental budget allocation and spending tracking</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall Utilization</p>
            <p className="text-2xl font-bold text-foreground">{overallUtilization}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Remaining Budget</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(totalAllocated - totalSpent)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {budgetCategories?.map((category, index) => (
          <div 
            key={index}
            className="p-5 bg-muted/20 rounded-lg border border-border hover:border-primary transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={category?.icon} size="1.25rem" className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{category?.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatCurrency(category?.spent)} / {formatCurrency(category?.allocated)}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendBgColor(category?.trend)}`}>
                <Icon name={getTrendIcon(category?.trend)} size="0.75rem" className={getTrendColor(category?.trend)} />
                <span className={`text-xs font-medium ${getTrendColor(category?.trend)}`}>
                  {category?.trend?.replace('-', ' ')?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Utilization Rate</span>
                <span className="font-bold text-foreground">{category?.utilizationRate}%</span>
              </div>
              
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    category?.trend === 'on-track' ? 'bg-success' :
                    category?.trend === 'warning'? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${category?.utilizationRate}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                  <p className="text-sm font-bold text-foreground">{formatCurrency(category?.remaining)}</p>
                </div>
                <button className="text-xs text-primary hover:underline font-medium">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size="1.25rem" className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-1">Budget Analysis Summary</p>
            <p className="text-xs text-muted-foreground">
              Technology & Software budget utilization is at 85% - consider reallocating funds or requesting additional budget. 
              All other departments are tracking within expected parameters for Q4 2024.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetUtilization;