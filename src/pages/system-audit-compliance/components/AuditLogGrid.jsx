import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuditLogGrid = ({ logs, onExport, onViewDetails }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[severity] || colors?.low;
  };

  const getActionIcon = (action) => {
    const icons = {
      create: 'Plus',
      read: 'Eye',
      update: 'Edit',
      delete: 'Trash2',
      login: 'LogIn',
      logout: 'LogOut',
      export: 'Download',
      config: 'Settings'
    };
    return icons?.[action] || 'Activity';
  };

  const getActionColor = (action) => {
    const colors = {
      create: 'text-green-600',
      read: 'text-blue-600',
      update: 'text-amber-600',
      delete: 'text-red-600',
      login: 'text-purple-600',
      logout: 'text-slate-600',
      export: 'text-indigo-600',
      config: 'text-orange-600'
    };
    return colors?.[action] || 'text-slate-600';
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedLogs = [...logs]?.sort((a, b) => {
    if (sortConfig?.key === 'timestamp') {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
      return sortConfig?.direction === 'asc' ? -1 : 1;
    }
    if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
      return sortConfig?.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Audit Log</h2>
            <p className="text-sm text-slate-600 mt-1">
              {sortedLogs?.length} {sortedLogs?.length === 1 ? 'entry' : 'entries'} found
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => onExport('csv')}
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              onClick={() => onExport('pdf')}
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center gap-2">
                  Timestamp
                  <Icon
                    name={sortConfig?.key === 'timestamp' && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                    size="1rem"
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Affected Records
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedLogs?.map((log) => (
              <tr key={log?.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{log?.date}</div>
                  <div className="text-xs text-slate-500">{log?.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={log?.userAvatar}
                      alt={log?.userAvatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900">{log?.userName}</div>
                      <div className="text-xs text-slate-500">{log?.userRole}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={getActionIcon(log?.action)}
                      size="1rem"
                      className={getActionColor(log?.action)}
                    />
                    <span className="text-sm text-slate-900 capitalize">{log?.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-900 capitalize">{log?.module}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900">{log?.affectedRecord}</div>
                  <div className="text-xs text-slate-500">{log?.recordId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(log?.severity)}`}>
                    {log?.severity?.charAt(0)?.toUpperCase() + log?.severity?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600 font-mono">{log?.ipAddress}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onViewDetails(log)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogGrid;