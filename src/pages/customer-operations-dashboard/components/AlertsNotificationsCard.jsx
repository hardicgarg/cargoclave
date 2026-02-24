import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertsNotificationsCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'satisfaction',
      severity: 'high',
      customer: 'Retail Express Co.',
      message: 'Customer satisfaction score declined by 15% in the last 30 days',
      timestamp: '2025-11-27 15:30',
      action: 'Schedule Review',
      category: 'declining-satisfaction'
    },
    {
      id: 2,
      type: 'delivery',
      severity: 'urgent',
      customer: 'TechCorp Solutions',
      message: 'Multiple delivery delays detected - 5 incidents in past 2 weeks',
      timestamp: '2025-11-27 14:15',
      action: 'Investigate Issues',
      category: 'delivery-delays'
    },
    {
      id: 3,
      type: 'renewal',
      severity: 'medium',
      customer: 'Healthcare Supplies Ltd.',
      message: 'Contract renewal due in 30 days - high upsell potential',
      timestamp: '2025-11-27 11:00',
      action: 'Prepare Proposal',
      category: 'contract-renewal'
    },
    {
      id: 4,
      type: 'communication',
      severity: 'low',
      customer: 'Global Logistics Inc.',
      message: 'No customer interaction in past 45 days',
      timestamp: '2025-11-27 09:20',
      action: 'Schedule Call',
      category: 'engagement'
    },
    {
      id: 5,
      type: 'satisfaction',
      severity: 'urgent',
      customer: 'Prime Manufacturing',
      message: 'Negative feedback submitted - immediate attention required',
      timestamp: '2025-11-26 16:45',
      action: 'Contact Customer',
      category: 'declining-satisfaction'
    },
    {
      id: 6,
      type: 'renewal',
      severity: 'high',
      customer: 'Food Distribution Group',
      message: 'Contract expires in 15 days - renewal not initiated',
      timestamp: '2025-11-26 13:30',
      action: 'Urgent Follow-up',
      category: 'contract-renewal'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Alerts', count: alerts?.length },
    { value: 'declining-satisfaction', label: 'Satisfaction Issues', count: 2 },
    { value: 'delivery-delays', label: 'Delivery Issues', count: 1 },
    { value: 'contract-renewal', label: 'Contract Renewals', count: 2 },
    { value: 'engagement', label: 'Engagement', count: 1 }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      urgent: {
        bg: 'bg-destructive/10',
        border: 'border-destructive',
        text: 'text-destructive',
        icon: 'AlertOctagon'
      },
      high: {
        bg: 'bg-warning/10',
        border: 'border-warning',
        text: 'text-warning',
        icon: 'AlertTriangle'
      },
      medium: {
        bg: 'bg-primary/10',
        border: 'border-primary',
        text: 'text-primary',
        icon: 'Info'
      },
      low: {
        bg: 'bg-muted',
        border: 'border-border',
        text: 'text-muted-foreground',
        icon: 'Bell'
      }
    };
    return configs?.[severity] || configs?.low;
  };

  const getTypeIcon = (type) => {
    const icons = {
      satisfaction: 'ThumbsDown',
      delivery: 'TruckOff',
      renewal: 'FileText',
      communication: 'MessageSquareOff'
    };
    return icons?.[type] || 'Bell';
  };

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.category === selectedCategory);

  const handleDismiss = (alertId) => {
    console.log('Dismissing alert:', alertId);
  };

  const handleAction = (alert) => {
    console.log('Taking action on alert:', alert);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Alerts & Notifications</h2>
          <p className="text-sm text-muted-foreground">Automated monitoring and opportunity tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded">
            <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-destructive">
              {alerts?.filter(a => a?.severity === 'urgent')?.length} Urgent
            </span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
              selectedCategory === category?.value
                ? 'bg-primary/10 border-primary' :'bg-background border-border hover:border-primary/50'
            }`}
          >
            <span className={`text-sm font-medium ${
              selectedCategory === category?.value ? 'text-primary' : 'text-foreground'
            }`}>
              {category?.label}
            </span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
              selectedCategory === category?.value
                ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredAlerts?.map((alert) => {
          const severityConfig = getSeverityConfig(alert?.severity);
          return (
            <div
              key={alert?.id}
              className={`${severityConfig?.bg} border ${severityConfig?.border} rounded-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-card border ${severityConfig?.border}`}>
                  <Icon name={severityConfig?.icon} size="1.125rem" className={severityConfig?.text} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={getTypeIcon(alert?.type)} size="0.875rem" className={severityConfig?.text} />
                        <span className={`text-xs font-semibold uppercase ${severityConfig?.text}`}>
                          {alert?.severity}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {alert?.customer}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDismiss(alert?.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name="X" size="1rem" />
                    </button>
                  </div>

                  <p className="text-xs text-foreground mb-3">
                    {alert?.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Clock" size="0.75rem" />
                      <span>{alert?.timestamp}</span>
                    </div>
                    <button
                      onClick={() => handleAction(alert)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                        alert?.severity === 'urgent' || alert?.severity === 'high' ?'bg-primary text-white hover:bg-primary/90' :'bg-card text-foreground border border-border hover:border-primary'
                      }`}
                    >
                      {alert?.action}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
          <Icon name="CheckCircle2" size="1rem" />
          <span className="text-sm font-medium">Mark All Read</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-lg hover:border-primary transition-all">
          <Icon name="Settings" size="1rem" />
          <span className="text-sm font-medium">Configure</span>
        </button>
      </div>
    </div>
  );
};

export default AlertsNotificationsCard;