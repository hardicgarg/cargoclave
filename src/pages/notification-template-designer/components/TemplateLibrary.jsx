import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TemplateLibrary = ({ 
  templates, 
  isLoading, 
  selectedTemplate, 
  onTemplateSelect, 
  onDeleteTemplate,
  searchTerm,
  onSearchChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', icon: 'Layers', color: 'text-gray-600' },
    { name: 'Contract Events', icon: 'FileText', color: 'text-blue-600' },
    { name: 'Trip Operations', icon: 'Truck', color: 'text-green-600' },
    { name: 'Customer Communications', icon: 'MessageSquare', color: 'text-purple-600' },
    { name: 'System Alerts', icon: 'AlertTriangle', color: 'text-orange-600' }
  ];

  const filteredTemplates = templates?.filter(template =>
    selectedCategory === 'All' || template?.category === selectedCategory
  );

  const getChannelIcon = (channel) => {
    const icons = {
      'Email': 'Mail',
      'SMS': 'MessageSquare',
      'WhatsApp': 'MessageCircle',
      'In-App': 'Bell'
    };
    return icons?.[channel] || 'File';
  };

  const getChannelColor = (channel) => {
    const colors = {
      'Email': 'bg-blue-100 text-blue-700',
      'SMS': 'bg-green-100 text-green-700',
      'WhatsApp': 'bg-emerald-100 text-emerald-700',
      'In-App': 'bg-purple-100 text-purple-700'
    };
    return colors?.[channel] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Icon 
            name="Search" 
            size="1.125rem" 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      {/* Category Filters */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Categories</h3>
        <div className="space-y-1">
          {categories?.map((category) => (
            <button
              key={category?.name}
              onClick={() => setSelectedCategory(category?.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                selectedCategory === category?.name
                  ? 'bg-purple-50 text-purple-700' :'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon name={category?.icon} size="1.125rem" className={category?.color} />
              <span className="text-sm font-medium">{category?.name}</span>
              <span className="ml-auto text-xs text-gray-500">
                {category?.name === 'All' 
                  ? templates?.length 
                  : templates?.filter(t => t?.category === category?.name)?.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Template List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredTemplates?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileX" size="3rem" className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No templates found</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTemplates?.map((template) => (
              <motion.div
                key={template?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => onTemplateSelect(template)}
                className={`mb-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTemplate?.id === template?.id
                    ? 'border-purple-500 bg-purple-50' :'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {template?.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{template?.category}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this template?')) {
                        onDeleteTemplate(template?.id);
                      }
                    }}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Icon name="Trash2" size="0.875rem" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getChannelColor(template?.channel)}`}>
                    <Icon name={getChannelIcon(template?.channel)} size="0.75rem" />
                    {template?.channel}
                  </span>
                  <span className="text-xs text-gray-400">
                    {template?.lastModified}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TemplateLibrary;