import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceDashboard = () => {
  const complianceMetrics = [
    {
      id: 1,
      title: 'GDPR Compliance',
      status: 'compliant',
      percentage: 98,
      lastAudit: '2025-11-15',
      nextAudit: '2025-12-15',
      icon: 'Shield',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      title: 'Data Retention',
      status: 'compliant',
      percentage: 100,
      lastAudit: '2025-11-20',
      nextAudit: '2025-12-20',
      icon: 'Database',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      title: 'Access Control',
      status: 'warning',
      percentage: 85,
      lastAudit: '2025-11-10',
      nextAudit: '2025-12-10',
      icon: 'Lock',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 4,
      title: 'Audit Trail',
      status: 'compliant',
      percentage: 100,
      lastAudit: '2025-11-25',
      nextAudit: '2025-12-25',
      icon: 'FileText',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'security',
      message: 'Multiple failed login attempts detected from IP 192.168.1.105',
      timestamp: '2025-11-27 11:45 AM',
      severity: 'high',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      type: 'compliance',
      message: 'Data retention policy review required for archived contracts',
      timestamp: '2025-11-27 09:30 AM',
      severity: 'medium',
      icon: 'Info'
    },
    {
      id: 3,
      type: 'access',
      message: 'Unusual data export activity detected for user john.doe@cargoclave.com',
      timestamp: '2025-11-26 04:15 PM',
      severity: 'high',
      icon: 'AlertCircle'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      compliant: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || colors?.compliant;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'border-l-blue-500',
      medium: 'border-l-amber-500',
      high: 'border-l-red-500'
    };
    return colors?.[severity] || colors?.low;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {complianceMetrics?.map((metric) => (
          <div key={metric?.id} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size="1.5rem" className={metric?.color} />
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(metric?.status)}`}>
                {metric?.status === 'compliant' ? 'Compliant' : 'Warning'}
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-900 mb-2">{metric?.title}</h3>
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600">Compliance Rate</span>
                <span className="font-semibold text-slate-900">{metric?.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${metric?.status === 'compliant' ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${metric?.percentage}%` }}
                />
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Last Audit:</span>
                <span className="font-medium">{metric?.lastAudit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Audit:</span>
                <span className="font-medium">{metric?.nextAudit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Recent Security Alerts</h3>
          <span className="text-sm text-slate-600">{recentAlerts?.length} active alerts</span>
        </div>
        <div className="space-y-3">
          {recentAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`bg-slate-50 rounded-lg p-4 border-l-4 ${getSeverityColor(alert?.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon name={alert?.icon} size="1.25rem" className="text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900 mb-1">{alert?.message}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size="0.75rem" />
                      {alert?.timestamp}
                    </span>
                    <span className="capitalize">{alert?.type}</span>
                    <span className={`font-medium ${alert?.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;