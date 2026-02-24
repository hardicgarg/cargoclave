import React from 'react';

const StatusChip = ({ status }) => {
  const statusConfig = {
    scheduled: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      label: 'Scheduled'
    },
    'in-transit': {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      label: 'In Transit'
    },
    'at-checkpoint': {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      label: 'At Checkpoint'
    },
    delayed: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      label: 'Delayed'
    },
    completed: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      label: 'Completed'
    },
    cancelled: {
      bg: 'bg-slate-100 dark:bg-slate-900/30',
      text: 'text-slate-700 dark:text-slate-300',
      label: 'Cancelled'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.scheduled;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
      {config?.label}
    </span>
  );
};

export default StatusChip;