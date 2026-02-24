import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const systemHealth = {
    status: 'operational',
    message: 'All systems operational',
    lastChecked: new Date()?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle2" size="1rem" className="text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {systemHealth?.message}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Last checked: {systemHealth?.lastChecked}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;