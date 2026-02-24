import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuditDetailModal = ({ log, onClose }) => {
  if (!log) return null;

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Audit Log Details</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Icon name="X" size="1.5rem" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={getActionIcon(log?.action)} size="1.5rem" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 capitalize">{log?.action} Action</h3>
                    <p className="text-sm text-slate-600">{log?.date} at {log?.time}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(log?.severity)}`}>
                  {log?.severity?.charAt(0)?.toUpperCase() + log?.severity?.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">User Information</h4>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={log?.userAvatar}
                      alt={log?.userAvatarAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900">{log?.userName}</div>
                      <div className="text-xs text-slate-500">{log?.userRole}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Icon name="Mail" size="0.875rem" />
                      <span>{log?.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Icon name="Globe" size="0.875rem" />
                      <span className="font-mono">{log?.ipAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Module & Record</h4>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-slate-500">Module:</span>
                      <span className="ml-2 font-medium text-slate-900 capitalize">{log?.module}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Affected Record:</span>
                      <span className="ml-2 font-medium text-slate-900">{log?.affectedRecord}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Record ID:</span>
                      <span className="ml-2 font-mono text-slate-900">{log?.recordId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Change Details</h4>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-700 leading-relaxed">{log?.changeDetails}</p>
              </div>
            </div>

            {log?.changes && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-3">Field Changes</h4>
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 uppercase">Field</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 uppercase">Old Value</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 uppercase">New Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {log?.changes?.map((change, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{change?.field}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            <span className="bg-red-50 text-red-700 px-2 py-1 rounded">{change?.oldValue}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">{change?.newValue}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Additional Information</h4>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Session ID:</span>
                    <span className="ml-2 font-mono text-slate-900">{log?.sessionId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Request ID:</span>
                    <span className="ml-2 font-mono text-slate-900">{log?.requestId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">User Agent:</span>
                    <span className="ml-2 text-slate-900">{log?.userAgent}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">API Endpoint:</span>
                    <span className="ml-2 font-mono text-slate-900">{log?.apiEndpoint}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Export Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditDetailModal;