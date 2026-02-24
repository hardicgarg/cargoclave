import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'created': 'FilePlus',
      'updated': 'Edit',
      'assigned': 'UserPlus',
      'status_change': 'RefreshCw',
      'comment': 'MessageSquare',
      'document': 'FileText'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'created': 'bg-blue-100 text-blue-600',
      'updated': 'bg-amber-100 text-amber-600',
      'assigned': 'bg-emerald-100 text-emerald-600',
      'status_change': 'bg-purple-100 text-purple-600',
      'comment': 'bg-indigo-100 text-indigo-600',
      'document': 'bg-slate-100 text-slate-600'
    };
    return colors?.[type] || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Activity" size="1.25rem" className="text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Activity Timeline</h3>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex space-x-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size="1rem" />
              </div>
              {index < activities?.length - 1 && (
                <div className="w-0.5 h-full bg-slate-200 my-1"></div>
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <Image
                    src={activity?.userAvatar}
                    alt={activity?.userAvatarAlt}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-slate-900">{activity?.userName}</span>
                </div>
                <span className="text-xs text-slate-500">{activity?.timestamp}</span>
              </div>
              
              <p className="text-sm text-slate-700">{activity?.description}</p>
              
              {activity?.details && (
                <div className="mt-2 text-xs text-slate-600 bg-slate-50 rounded p-2">
                  {activity?.details}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;