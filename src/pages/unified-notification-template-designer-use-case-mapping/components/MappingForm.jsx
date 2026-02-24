import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MappingForm = ({ editingMapping, templates, onSave, onCancel, onCreateTemplate }) => {
  const [formData, setFormData] = useState({
    useCase: '',
    channels: [],
    templateName: '',
    frequency: 'Immediate',
    frequencyDetails: {},
    priority: 'Medium',
    active: true
  });

  const [showTemplateCreate, setShowTemplateCreate] = useState(false);

  const useCaseOptions = [
    'KYC Approved',
    'New Inquiry Raised',
    'Price Alert Triggered',
    'Contract Created',
    'Trip Completed',
    'Payment Received',
    'Document Uploaded',
    'Status Changed',
    'Alert Generated',
    'Maintenance Required'
  ];

  const channelOptions = ['Email', 'SMS', 'WhatsApp', 'In-App'];

  const frequencyOptions = [
    { value: 'Immediate', label: 'Immediate', description: 'Send notification immediately when event occurs' },
    { value: 'Scheduled - Hourly', label: 'Scheduled - Hourly', description: 'Batch and send every hour' },
    { value: 'Scheduled - Daily', label: 'Scheduled - Daily', description: 'Batch and send once daily' },
    { value: 'Scheduled - Weekly', label: 'Scheduled - Weekly', description: 'Batch and send weekly' },
    { value: 'Event-Triggered', label: 'Event-Triggered', description: 'Send based on specific event conditions' }
  ];

  useEffect(() => {
    if (editingMapping) {
      setFormData({
        ...editingMapping,
        frequencyDetails: editingMapping?.frequencyDetails || {}
      });
    }
  }, [editingMapping]);

  const handleChannelToggle = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev?.channels?.includes(channel)
        ? prev?.channels?.filter(c => c !== channel)
        : [...prev?.channels, channel]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData?.useCase || formData?.channels?.length === 0 || !formData?.templateName) {
      alert('Please fill in all required fields');
      return;
    }
    onSave({ ...formData, id: editingMapping?.id });
  };

  const getFilteredTemplates = () => {
    if (formData?.channels?.length === 0) return templates;
    return templates?.filter(template =>
      formData?.channels?.includes(template?.channel)
    );
  };

  const renderFrequencyDetails = () => {
    switch (formData?.frequency) {
      case 'Scheduled - Hourly':
        return (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send at minute:
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={formData?.frequencyDetails?.minute || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  frequencyDetails: { ...formData?.frequencyDetails, minute: e?.target?.value }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'Scheduled - Daily':
        return (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send at time:
            </label>
            <input
              type="time"
              value={formData?.frequencyDetails?.time || '09:00'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  frequencyDetails: { ...formData?.frequencyDetails, time: e?.target?.value }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'Scheduled - Weekly':
        return (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send on day:
            </label>
            <select
              value={formData?.frequencyDetails?.day || 'Monday'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  frequencyDetails: { ...formData?.frequencyDetails, day: e?.target?.value }
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']?.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Use Case Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Use Case <span className="text-red-500">*</span>
          </label>
          <select
            value={formData?.useCase}
            onChange={(e) => setFormData({ ...formData, useCase: e?.target?.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a use case</option>
            {useCaseOptions?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Channel Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Notification Channels <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {channelOptions?.map((channel) => (
              <motion.button
                key={channel}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChannelToggle(channel)}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  formData?.channels?.includes(channel)
                    ? 'border-blue-500 bg-blue-50 text-blue-700' :'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon
                  name={
                    channel === 'SMS' ? 'MessageSquare' :
                    channel === 'Email' ? 'Mail' :
                    channel === 'WhatsApp' ? 'MessageCircle' : 'Bell'
                  }
                  size="1.25rem"
                />
                <span className="font-medium">{channel}</span>
                {formData?.channels?.includes(channel) && (
                  <Icon name="Check" size="1rem" className="ml-auto" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Template Selection with Inline Create */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Template <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => {
                onCreateTemplate();
                setShowTemplateCreate(true);
              }}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Icon name="Plus" size="0.875rem" />
              Create New Template
            </button>
          </div>
          <select
            value={formData?.templateName}
            onChange={(e) => setFormData({ ...formData, templateName: e?.target?.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Template</option>
            {getFilteredTemplates()?.map((template) => (
              <option key={template?.id} value={template?.name}>
                {template?.name} ({template?.channel})
              </option>
            ))}
          </select>
          {formData?.channels?.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              Showing templates for selected channels: {formData?.channels?.join(', ')}
            </p>
          )}
        </div>

        {/* Message Frequency */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Message Frequency <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {frequencyOptions?.map((option) => (
              <div
                key={option?.value}
                onClick={() => setFormData({ ...formData, frequency: option?.value })}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData?.frequency === option?.value
                    ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData?.frequency === option?.value
                          ? 'border-blue-500 bg-blue-500' :'border-gray-300'
                      }`}
                    >
                      {formData?.frequency === option?.value && (
                        <Icon name="Check" size="0.75rem" className="text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{option?.label}</p>
                      <p className="text-sm text-gray-600">{option?.description}</p>
                    </div>
                  </div>
                  <Icon
                    name="Clock"
                    size="1.25rem"
                    className={formData?.frequency === option?.value ? 'text-blue-500' : 'text-gray-400'}
                  />
                </div>
                {formData?.frequency === option?.value && renderFrequencyDetails()}
              </div>
            ))}
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority Level
          </label>
          <div className="flex gap-3">
            {['High', 'Medium', 'Low']?.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setFormData({ ...formData, priority })}
                className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                  formData?.priority === priority
                    ? priority === 'High' ?'border-red-500 bg-red-50 text-red-700'
                      : priority === 'Medium' ?'border-orange-500 bg-orange-50 text-orange-700' :'border-green-500 bg-green-50 text-green-700' :'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900">Active Status</p>
            <p className="text-sm text-gray-600">Enable or disable this mapping</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, active: !formData?.active })}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              formData?.active ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                formData?.active ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg flex items-center gap-2"
          >
            <Icon name="Save" size="1.125rem" />
            {editingMapping ? 'Update Mapping' : 'Save Mapping'}
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default MappingForm;