import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import TemplateLibrary from '../../notification-template-designer/components/TemplateLibrary';
import DesignWorkspace from '../../notification-template-designer/components/DesignWorkspace';

const TemplateSection = ({
  templates,
  isLoading,
  selectedTemplate,
  onTemplateSelect,
  onSaveTemplate,
  onDeleteTemplate,
  onNewTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('library'); // 'library' or 'editor'

  const filteredTemplates = templates?.filter(template =>
    template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    template?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    setViewMode('editor');
  };

  const handleSave = (templateData) => {
    onSaveTemplate(templateData);
    setViewMode('library');
  };

  const handleCancel = () => {
    onTemplateSelect(null);
    setViewMode('library');
  };

  return (
    <div className="w-2/5 border-r border-gray-200 flex flex-col bg-white">
      {/* Section Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon name="FileEdit" size="1.25rem" className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-900">Templates</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('library')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'library' ?'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
              }`}
              title="Library View"
            >
              <Icon name="LayoutGrid" size="1.125rem" />
            </button>
            {selectedTemplate && (
              <button
                onClick={() => setViewMode('editor')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'editor' ?'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
                }`}
                title="Editor View"
              >
                <Icon name="Edit3" size="1.125rem" />
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-600">
          {viewMode === 'library' ? 'Browse and select templates' : 'Edit template content'}
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'library' ? (
          <div className="h-full flex flex-col">
            {/* Search Bar */}
            <div className="px-4 py-3 border-b border-gray-100">
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
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Template List */}
            <div className="flex-1 overflow-y-auto">
              <TemplateLibrary
                templates={filteredTemplates}
                isLoading={isLoading}
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
                onDeleteTemplate={onDeleteTemplate}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                compactMode={true}
              />
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <DesignWorkspace
              selectedTemplate={selectedTemplate}
              onSave={handleSave}
              onCancel={handleCancel}
              compactMode={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSection;