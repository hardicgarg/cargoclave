import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SPOCManagementTab = ({ customer }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const getRoleColor = (role) => {
    const colors = {
      primary: 'bg-blue-100 text-blue-700 border-blue-200',
      secondary: 'bg-slate-100 text-slate-700 border-slate-200',
      billing: 'bg-green-100 text-green-700 border-green-200',
      operations: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors?.[role] || colors?.secondary;
  };

  const getAvailabilityColor = (availability) => {
    const colors = {
      available: 'bg-emerald-100 text-emerald-700',
      busy: 'bg-amber-100 text-amber-700',
      offline: 'bg-slate-100 text-slate-700'
    };
    return colors?.[availability] || colors?.offline;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">SPOC Contacts</h3>
          <p className="text-sm text-slate-600">Manage single points of contact for this customer</p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
        >
          Add Contact
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {customer?.spocContacts?.map((contact) => (
          <div
            key={contact?.id}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-all duration-150"
          >
            <div className="flex items-start gap-4">
              <Image
                src={contact?.avatar}
                alt={contact?.avatarAlt}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-semibold text-slate-900">{contact?.name}</h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getRoleColor(contact?.role)}`}>
                        {contact?.role}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{contact?.designation}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(contact?.availability)}`}>
                      {contact?.availability}
                    </span>
                    <Button variant="ghost" size="sm" iconName="Edit" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size="1rem" className="text-slate-400" />
                    <span className="text-sm text-slate-700">{contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size="1rem" className="text-slate-400" />
                    <span className="text-sm text-slate-700">{contact?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size="1rem" className="text-slate-400" />
                    <span className="text-sm text-slate-700">{contact?.location}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Communication Preferences
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {contact?.communicationPreferences?.map((pref, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">
                        Availability Schedule
                      </span>
                      <p className="text-sm text-slate-700">{contact?.availabilitySchedule}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">
                        Last Contact
                      </span>
                      <p className="text-sm text-slate-700">{contact?.lastContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SPOCManagementTab;