import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const PerformanceDashboardTab = ({ customer }) => {
  const deliveryMetrics = [
    { month: 'Jan', onTime: 95, delayed: 5 },
    { month: 'Feb', onTime: 92, delayed: 8 },
    { month: 'Mar', onTime: 97, delayed: 3 },
    { month: 'Apr', onTime: 94, delayed: 6 },
    { month: 'May', onTime: 96, delayed: 4 },
    { month: 'Jun', onTime: 98, delayed: 2 }
  ];

  const satisfactionData = [
    { name: 'Excellent', value: 65, color: '#10B981' },
    { name: 'Good', value: 25, color: '#3B82F6' },
    { name: 'Average', value: 8, color: '#F59E0B' },
    { name: 'Poor', value: 2, color: '#EF4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size="1.25rem" className="text-blue-600" />
            <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">On-Time Rate</span>
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-1">{customer?.performance?.onTimeRate}%</p>
          <div className="flex items-center gap-1 text-xs text-blue-700">
            <Icon name="ArrowUp" size="0.75rem" />
            <span>+2.5% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-5 border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Star" size="1.25rem" className="text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Satisfaction</span>
          </div>
          <p className="text-3xl font-bold text-emerald-900 mb-1">{customer?.performance?.satisfaction}/5</p>
          <div className="flex items-center gap-1 text-xs text-emerald-700">
            <Icon name="ArrowUp" size="0.75rem" />
            <span>+0.3 from last quarter</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Package" size="1.25rem" className="text-purple-600" />
            <span className="text-xs font-medium text-purple-700 uppercase tracking-wide">Total Shipments</span>
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-1">{customer?.performance?.totalShipments}</p>
          <div className="flex items-center gap-1 text-xs text-purple-700">
            <Icon name="ArrowUp" size="0.75rem" />
            <span>+15% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-5 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertCircle" size="1.25rem" className="text-amber-600" />
            <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">Issues Reported</span>
          </div>
          <p className="text-3xl font-bold text-amber-900 mb-1">{customer?.performance?.issuesReported}</p>
          <div className="flex items-center gap-1 text-xs text-amber-700">
            <Icon name="ArrowDown" size="0.75rem" />
            <span>-3 from last month</span>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Delivery Performance */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="BarChart3" size="1.25rem" className="text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">Delivery Performance</h3>
          </div>
          <div className="w-full h-64" aria-label="Monthly Delivery Performance Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                <Bar dataKey="onTime" fill="#10B981" name="On Time" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" fill="#EF4444" name="Delayed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="PieChart" size="1.25rem" className="text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">Customer Satisfaction</h3>
          </div>
          <div className="w-full h-64" aria-label="Customer Satisfaction Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {satisfactionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Issues */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="AlertTriangle" size="1.25rem" className="text-amber-600" />
          <h3 className="text-lg font-semibold text-slate-900">Recent Issues & Resolutions</h3>
        </div>
        <div className="space-y-3">
          {customer?.performance?.recentIssues?.map((issue) => (
            <div
              key={issue?.id}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                issue?.resolved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                <Icon name={issue?.resolved ? 'CheckCircle' : 'AlertCircle'} size="1.25rem" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-900">{issue?.title}</h4>
                  <span className="text-xs text-slate-500">{issue?.date}</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{issue?.description}</p>
                {issue?.resolved && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700">
                    <Icon name="CheckCircle" size="0.875rem" />
                    <span>Resolved: {issue?.resolution}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboardTab;