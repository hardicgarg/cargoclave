import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import ShimmerRow from './ShimmerRow';

const MappingTable = ({ mappings, isLoading, onEdit, onToggleActive, onDelete }) => {
  const getChannelIcon = (channel) => {
    const icons = {
      'SMS': 'MessageSquare',
      'Email': 'Mail',
      'WhatsApp': 'MessageCircle',
      'In-App': 'Bell'
    };
    return icons?.[channel] || 'Bell';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-600 bg-red-100',
      'Medium': 'text-orange-600 bg-orange-100',
      'Low': 'text-green-600 bg-green-100'
    };
    return colors?.[priority] || 'text-gray-600 bg-gray-100';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[20%]">
                  Use Case
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[18%]">
                  Channels
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[25%]">
                  Template Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[12%]">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[10%]">
                  Active
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-[15%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5]?.map((item) => (
                <ShimmerRow key={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (mappings?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-gray-100 rounded-full">
            <Icon name="Inbox" size="2.5rem" className="text-gray-400 md:w-12 md:h-12" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">No Mappings Found</h3>
          <p className="text-sm md:text-base text-gray-600 max-w-md">
            Start by creating your first notification mapping to configure event-driven communications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[20%]">
                Use Case
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[18%]">
                Channels
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[25%]">
                Template Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[12%]">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-[10%]">
                Active
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider w-[15%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mappings?.map((mapping, index) => (
              <motion.tr
                key={mapping?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                      <Icon name="Zap" size="1rem" className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {mapping?.useCase}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {mapping?.channels?.map((channel, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 whitespace-nowrap"
                      >
                        <Icon name={getChannelIcon(channel)} size="0.75rem" className="flex-shrink-0" />
                        <span className="truncate">{channel}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon name="FileText" size="0.875rem" className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-mono truncate">
                      {mapping?.templateName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getPriorityColor(mapping?.priority)}`}>
                    {mapping?.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onToggleActive(mapping?.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                      mapping?.active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        mapping?.active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(mapping)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                      title="Edit Mapping"
                    >
                      <Icon name="Edit" size="1rem" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(mapping?.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Delete Mapping"
                    >
                      <Icon name="Trash2" size="1rem" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MappingTable;