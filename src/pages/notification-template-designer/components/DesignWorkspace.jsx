import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import ChannelPreviewTabs from './ChannelPreviewTabs';
import VariableInserter from './VariableInserter';

const DesignWorkspace = ({ selectedTemplate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    channel: '',
    subject: '',
    content: '',
    variables: []
  });

  const [activeTab, setActiveTab] = useState('editor');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (selectedTemplate) {
      setFormData({
        name: selectedTemplate?.name || '',
        category: selectedTemplate?.category || '',
        channel: selectedTemplate?.channel || '',
        subject: selectedTemplate?.subject || '',
        content: selectedTemplate?.content || '',
        variables: selectedTemplate?.variables || []
      });
      setCharacterCount(selectedTemplate?.content?.length || 0);
    }
  }, [selectedTemplate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'content') {
      setCharacterCount(value?.length || 0);
    }
  };

  const handleInsertVariable = (variable) => {
    const newContent = formData?.content + `{{${variable}}}`;
    handleInputChange('content', newContent);
    if (!formData?.variables?.includes(variable)) {
      setFormData(prev => ({
        ...prev,
        variables: [...prev?.variables, variable]
      }));
    }
  };

  const handleSave = () => {
    if (!formData?.name || !formData?.category || !formData?.channel || !formData?.content) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  const getCharacterLimit = () => {
    const limits = {
      'SMS': 160,
      'WhatsApp': 4096,
      'Email': 10000,
      'In-App': 500
    };
    return limits?.[formData?.channel] || 0;
  };

  const characterLimit = getCharacterLimit();
  const isOverLimit = characterLimit > 0 && characterCount > characterLimit;

  if (!selectedTemplate) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Icon name="FileEdit" size="4rem" className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Template Selected
          </h3>
          <p className="text-sm text-gray-500 max-w-md">
            Select a template from the library to edit, or create a new template to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Workspace Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="ArrowLeft" size="1.25rem" className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {selectedTemplate?.id ? 'Edit Template' : 'New Template'}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedTemplate?.id ? selectedTemplate?.name : 'Create a new notification template'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Icon name="Save" size="1.125rem" />
              Save Template
            </motion.button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'editor' ?'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Edit3" size="1rem" />
              Editor
            </div>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'preview' ?'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Eye" size="1rem" />
              Preview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('variables')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'variables'
                ? 'bg-purple-100 text-purple-700' :'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="Code" size="1rem" />
              Variables
            </div>
          </button>
        </div>
      </div>
      {/* Workspace Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'editor' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Template Configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  placeholder="e.g., kyc_success_email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Contract Events">Contract Events</option>
                  <option value="Trip Operations">Trip Operations</option>
                  <option value="Customer Communications">Customer Communications</option>
                  <option value="System Alerts">System Alerts</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channel <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.channel}
                  onChange={(e) => handleInputChange('channel', e?.target?.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Channel</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="In-App">In-App</option>
                </select>
              </div>

              {(formData?.channel === 'Email' || formData?.channel === 'In-App') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData?.subject}
                    onChange={(e) => handleInputChange('subject', e?.target?.value)}
                    placeholder="Enter subject line"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Template Content <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                    {characterCount} {characterLimit > 0 && `/ ${characterLimit}`}
                  </span>
                  {isOverLimit && (
                    <span className="text-red-600 font-medium">Character limit exceeded!</span>
                  )}
                </div>
              </div>
              <textarea
                value={formData?.content}
                onChange={(e) => handleInputChange('content', e?.target?.value)}
                placeholder="Enter your template content here. Use {{variable_name}} for dynamic content."
                rows={12}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm ${
                  isOverLimit ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 Tip: Insert variables using the Variables tab or type {'{{'} variable_name {'}}'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <ChannelPreviewTabs 
            channel={formData?.channel}
            subject={formData?.subject}
            content={formData?.content}
          />
        )}

        {activeTab === 'variables' && (
          <VariableInserter 
            currentVariables={formData?.variables}
            onInsertVariable={handleInsertVariable}
          />
        )}
      </div>
    </div>
  );
};

export default DesignWorkspace;