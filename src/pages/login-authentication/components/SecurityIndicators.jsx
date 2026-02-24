import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const lastLogin = new Date(Date.now() - 86400000)?.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const securityFeatures = [
    { icon: 'Shield', text: 'SSL Encrypted', color: 'text-green-600' },
    { icon: 'Lock', text: '2FA Available', color: 'text-blue-600' },
    { icon: 'Clock', text: `Last login: ${lastLogin}`, color: 'text-gray-600' }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Icon name={feature?.icon} size="0.875rem" className={feature?.color} />
            <span className="text-gray-600">{feature?.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityIndicators;