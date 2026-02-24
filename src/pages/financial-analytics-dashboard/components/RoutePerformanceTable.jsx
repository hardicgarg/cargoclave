import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RoutePerformanceTable = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [sortOrder, setSortOrder] = useState('desc');

  const routes = [
    { 
      id: 'RT-001', 
      name: 'New York - Boston', 
      trips: 156, 
      revenue: 425000, 
      costs: 285000, 
      profit: 140000, 
      margin: 32.9,
      avgRevenue: 2724
    },
    { 
      id: 'RT-002', 
      name: 'Los Angeles - San Francisco', 
      trips: 203, 
      revenue: 580000, 
      costs: 375000, 
      profit: 205000, 
      margin: 35.3,
      avgRevenue: 2857
    },
    { 
      id: 'RT-003', 
      name: 'Chicago - Detroit', 
      trips: 134, 
      revenue: 320000, 
      costs: 235000, 
      profit: 85000, 
      margin: 26.6,
      avgRevenue: 2388
    },
    { 
      id: 'RT-004', 
      name: 'Houston - Dallas', 
      trips: 178, 
      revenue: 465000, 
      costs: 305000, 
      profit: 160000, 
      margin: 34.4,
      avgRevenue: 2612
    },
    { 
      id: 'RT-005', 
      name: 'Miami - Atlanta', 
      trips: 145, 
      revenue: 390000, 
      costs: 265000, 
      profit: 125000, 
      margin: 32.1,
      avgRevenue: 2690
    }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedRoutes = [...routes]?.sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return (a?.[sortBy] - b?.[sortBy]) * multiplier;
  });

  const formatCurrency = (value) => {
    return `$${(value / 1000)?.toFixed(0)}K`;
  };

  const getMarginColor = (margin) => {
    if (margin >= 35) return 'text-success';
    if (margin >= 30) return 'text-primary';
    return 'text-warning';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Route Performance Analysis</h3>
          <p className="text-sm text-muted-foreground">Financial performance by shipping route</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
          <Icon name="Filter" size="1rem" />
          <span>Filter Routes</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Route</th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('trips')}
              >
                <div className="flex items-center justify-end gap-1">
                  Trips
                  <Icon name={sortBy === 'trips' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size="0.875rem" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center justify-end gap-1">
                  Revenue
                  <Icon name={sortBy === 'revenue' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size="0.875rem" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('profit')}
              >
                <div className="flex items-center justify-end gap-1">
                  Profit
                  <Icon name={sortBy === 'profit' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size="0.875rem" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('margin')}
              >
                <div className="flex items-center justify-end gap-1">
                  Margin
                  <Icon name={sortBy === 'margin' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size="0.875rem" />
                </div>
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Avg/Trip</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoutes?.map((route, index) => (
              <tr 
                key={route?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-foreground text-sm">{route?.name}</p>
                    <p className="text-xs text-muted-foreground">{route?.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">{route?.trips}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-bold text-success">{formatCurrency(route?.revenue)}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-bold text-primary">{formatCurrency(route?.profit)}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`text-sm font-bold ${getMarginColor(route?.margin)}`}>
                    {route?.margin?.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-foreground">${route?.avgRevenue?.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Icon name="MoreVertical" size="1rem" className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {sortedRoutes?.length} routes</span>
        <button className="text-primary hover:underline">View All Routes</button>
      </div>
    </div>
  );
};

export default RoutePerformanceTable;