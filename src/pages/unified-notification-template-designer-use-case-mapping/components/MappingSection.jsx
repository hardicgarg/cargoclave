import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import MappingForm from './MappingForm';
import MappingList from './MappingList';

const MappingSection = ({
  mappings,
  templates,
  isLoading,
  onSaveMapping,
  onDeleteMapping,
  onToggleActive,
  onCreateTemplate
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
  const [editingMapping, setEditingMapping] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMappings = mappings?.filter(mapping =>
    mapping?.useCase?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    mapping?.templateName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleNewMapping = () => {
    setEditingMapping(null);
    setViewMode('form');
  };

  const handleEditMapping = (mapping) => {
    setEditingMapping(mapping);
    setViewMode('form');
  };

  const handleSaveMapping = (mappingData) => {
    onSaveMapping(mappingData);
    setViewMode('list');
    setEditingMapping(null);
  };

  const handleCancelForm = () => {
    setViewMode('list');
    setEditingMapping(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Section Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon name="Link" size="1.25rem" className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Use Case Mapping</h2>
          </div>
          <div className="flex gap-2">
            {viewMode === 'form' && (
              <button
                onClick={handleCancelForm}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name="ArrowLeft" size="1rem" />
                Back to List
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewMapping}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Icon name="Plus" size="1rem" />
              New Mapping
            </motion.button>
          </div>
        </div>
        <p className="text-xs text-gray-600">
          {viewMode === 'list' ?'Configure notification mappings for business events'
            : editingMapping
            ? 'Edit existing notification mapping'
            : 'Create new notification mapping'}
        </p>
      </div>
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              {/* Search Bar */}
              <div className="px-4 py-3 bg-white border-b border-gray-200">
                <div className="relative">
                  <Icon
                    name="Search"
                    size="1.125rem"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    placeholder="Search mappings by use case or template..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Mapping List */}
              <MappingList
                mappings={filteredMappings}
                isLoading={isLoading}
                onEdit={handleEditMapping}
                onDelete={onDeleteMapping}
                onToggleActive={onToggleActive}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto"
            >
              <MappingForm
                editingMapping={editingMapping}
                templates={templates}
                onSave={handleSaveMapping}
                onCancel={handleCancelForm}
                onCreateTemplate={onCreateTemplate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MappingSection;