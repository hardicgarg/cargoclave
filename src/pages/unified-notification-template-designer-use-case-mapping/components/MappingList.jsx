import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MappingList = ({ mappings, isLoading, onEdit, onDelete, onToggleActive }) => {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5]?.map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (mappings?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <Icon name="Link" size="4rem" className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Mappings Found
          </h3>
          <p className="text-sm text-gray-500 max-w-md">
            Create your first notification mapping to link templates with business events
          </p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'Email':
        return 'Mail';
      case 'SMS':
        return 'MessageSquare';
      case 'WhatsApp':
        return 'MessageCircle';
      case 'In-App':
        return 'Bell';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="p-4 space-y-3 overflow-y-auto h-full">
      {mappings?.map((mapping) => (
        <motion.div
          key={mapping?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
        >
          <div className="p-4">
            {/* Header Row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {mapping?.useCase}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded border ${getPriorityColor(
                      mapping?.priority
                    )}`}
                  >
                    {mapping?.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Icon name="FileText" size="0.875rem" />
                  {mapping?.templateName}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleActive(mapping?.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mapping?.active ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  title={mapping?.active ? 'Active' : 'Inactive'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mapping?.active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button
                  onClick={() => onEdit(mapping)}
                  className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Mapping"
                >
                  <Icon name="Edit3" size="1rem" className="text-blue-600" />
                </button>
                <button
                  onClick={() => onDelete(mapping?.id)}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Mapping"
                >
                  <Icon name="Trash2" size="1rem" className="text-red-600" />
                </button>
              </div>
            </div>

            {/* Details Row */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              {/* Channels */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Channels:</span>
                <div className="flex gap-1">
                  {mapping?.channels?.map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      title={channel}
                    >
                      <Icon name={getChannelIcon(channel)} size="0.75rem" />
                      {channel}
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div className="flex items-center gap-2">
                <Icon name="Clock" size="0.875rem" className="text-gray-400" />
                <span className="text-xs text-gray-600">{mapping?.frequency}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MappingList;