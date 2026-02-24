import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentInteractionsPanel = () => {
  const [filterType, setFilterType] = useState('all');

  const interactions = [
    {
      id: 1,
      type: 'email',
      customer: 'Global Logistics Inc.',
      subject: 'Contract Renewal Discussion',
      timestamp: '2025-11-27 14:30',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'call',
      customer: 'TechCorp Solutions',
      subject: 'Delivery Delay Inquiry',
      timestamp: '2025-11-27 13:15',
      status: 'completed',
      priority: 'urgent',
      assignedTo: 'Michael Chen'
    },
    {
      id: 3,
      type: 'meeting',
      customer: 'Prime Manufacturing',
      subject: 'Quarterly Business Review',
      timestamp: '2025-11-27 11:00',
      status: 'scheduled',
      priority: 'medium',
      assignedTo: 'Emily Davis'
    },
    {
      id: 4,
      type: 'feedback',
      customer: 'Healthcare Supplies Ltd.',
      subject: 'Service Quality Rating',
      timestamp: '2025-11-27 09:45',
      status: 'pending',
      priority: 'low',
      assignedTo: 'David Wilson'
    },
    {
      id: 5,
      type: 'ticket',
      customer: 'Retail Express Co.',
      subject: 'Damaged Shipment Report',
      timestamp: '2025-11-26 16:20',
      status: 'in-progress',
      priority: 'urgent',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 6,
      type: 'email',
      customer: 'Food Distribution Group',
      subject: 'New Service Inquiry',
      timestamp: '2025-11-26 14:10',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Michael Chen'
    }
  ];

  const getTypeIcon = (type) => {
    const icons = {
      email: 'Mail',
      call: 'Phone',
      meeting: 'Calendar',
      feedback: 'MessageSquare',
      ticket: 'AlertCircle'
    };
    return icons?.[type] || 'FileText';
  };

  const getTypeColor = (type) => {
    const colors = {
      email: 'bg-primary/10 text-primary',
      call: 'bg-success/10 text-success',
      meeting: 'bg-accent/10 text-accent',
      feedback: 'bg-warning/10 text-warning',
      ticket: 'bg-destructive/10 text-destructive'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-success/10 text-success border-success/20',
      'in-progress': 'bg-warning/10 text-warning border-warning/20',
      scheduled: 'bg-primary/10 text-primary border-primary/20',
      pending: 'bg-muted text-muted-foreground border-border'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'text-destructive',
      high: 'text-warning',
      medium: 'text-primary',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const filteredInteractions = filterType === 'all' 
    ? interactions 
    : interactions?.filter(i => i?.type === filterType);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Recent Interactions</h2>
          <p className="text-sm text-muted-foreground">Customer communication and service request tracking</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">
          <Icon name="Plus" size="0.875rem" />
          <span>New</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'email', 'call', 'meeting', 'feedback', 'ticket']?.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
              filterType === type
                ? 'bg-primary text-white' :'bg-background text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
          </button>
        ))}
      </div>

      {/* Interactions List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredInteractions?.map((interaction) => (
          <div
            key={interaction?.id}
            className="bg-background border border-border rounded-lg p-4 hover:border-primary hover:shadow-elevated transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={`${getTypeColor(interaction?.type)} p-2 rounded-lg`}>
                <Icon name={getTypeIcon(interaction?.type)} size="1.125rem" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground mb-1 truncate">
                      {interaction?.subject}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {interaction?.customer}
                    </p>
                  </div>
                  <Icon 
                    name="Flag" 
                    size="1rem" 
                    className={`${getPriorityColor(interaction?.priority)} ml-2`}
                    fill={interaction?.priority === 'urgent' || interaction?.priority === 'high' ? 'currentColor' : 'none'}
                  />
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(interaction?.status)}`}>
                    {interaction?.status?.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Clock" size="0.75rem" />
                    <span>{interaction?.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="User" size="0.75rem" />
                    <span>{interaction?.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Today</p>
          <p className="text-lg font-bold text-foreground">24</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">This Week</p>
          <p className="text-lg font-bold text-foreground">87</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-lg font-bold text-warning">12</p>
        </div>
      </div>
    </div>
  );
};

export default RecentInteractionsPanel;