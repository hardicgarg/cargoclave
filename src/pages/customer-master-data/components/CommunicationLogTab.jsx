import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationLogTab = ({ customer }) => {
  const getTypeIcon = (type) => {
    const icons = {
      email: 'Mail',
      call: 'Phone',
      meeting: 'Users',
      service_request: 'AlertCircle'
    };
    return icons?.[type] || 'MessageSquare';
  };

  const getTypeColor = (type) => {
    const colors = {
      email: 'bg-blue-100 text-blue-700',
      call: 'bg-green-100 text-green-700',
      meeting: 'bg-purple-100 text-purple-700',
      service_request: 'bg-amber-100 text-amber-700'
    };
    return colors?.[type] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Communication Log</h3>
          <p className="text-sm text-slate-600">Track all interactions with this customer</p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          Log Communication
        </Button>
      </div>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {customer?.communicationLog?.map((log, index) => (
            <div key={log?.id} className="relative pl-16">
              {/* Timeline Dot */}
              <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white ${getTypeColor(log?.type)}`} />

              <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-all duration-150">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${getTypeColor(log?.type)} flex items-center justify-center`}>
                      <Icon name={getTypeIcon(log?.type)} size="1.25rem" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-1">{log?.subject}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span>{log?.date}</span>
                        <span>•</span>
                        <span>{log?.time}</span>
                        <span>•</span>
                        <span className="font-medium">{log?.contactPerson}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(log?.type)}`}>
                    {log?.type?.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-3">{log?.notes}</p>

                {log?.attachments && log?.attachments?.length > 0 && (
                  <div className="border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {log?.attachments?.map((attachment, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Icon name="Paperclip" size="0.875rem" className="text-slate-400" />
                          <span className="text-xs font-medium text-slate-700">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon name="User" size="0.875rem" />
                    <span>Logged by {log?.loggedBy}</span>
                  </div>
                  {log?.followUpRequired && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium">
                      <Icon name="Clock" size="0.875rem" />
                      Follow-up: {log?.followUpDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunicationLogTab;