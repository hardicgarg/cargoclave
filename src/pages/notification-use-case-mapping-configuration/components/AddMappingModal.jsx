import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import TemplatePreview from './TemplatePreview';

const AddMappingModal = ({ isOpen, onClose, onSave, editingMapping }) => {
  const [formData, setFormData] = useState({
    useCase: '',
    channels: [],
    templateName: '',
    priority: 'Medium',
    active: true
  });
  const [showPreview, setShowPreview] = useState(false);

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

  const channelOptions = ['SMS', 'Email', 'WhatsApp', 'In-App'];

  // Available templates from Template Designer
  const availableTemplates = [
    { name: 'kyc_success_email.html', channel: 'Email' },
    { name: 'new_inquiry_wa_msg', channel: 'WhatsApp' },
    { name: 'price_alert_push.json', channel: 'In-App' },
    { name: 'contract_creation_notification', channel: 'Email' },
    { name: 'trip_completion_alert', channel: 'SMS' },
    { name: 'payment_confirmation', channel: 'Email' }
  ];

  // Filter templates based on selected channels
  const getFilteredTemplates = () => {
    if (formData?.channels?.length === 0) return availableTemplates;
    return availableTemplates?.filter(template =>
      formData?.channels?.includes(template?.channel)
    );
  };

  useEffect(() => {
    if (editingMapping) {
      setFormData(editingMapping);
    } else {
      setFormData({
        useCase: '',
        channels: [],
        templateName: '',
        priority: 'Medium',
        active: true
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.useCase && formData?.channels?.length > 0 && formData?.templateName) {
      onSave(formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Icon name="Settings" size="1.5rem" className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingMapping ? 'Edit Mapping' : 'Add New Mapping'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Configure notification channel and template
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="X" size="1.25rem" className="text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Use Case Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Use Case <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData?.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e?.target?.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                          name={channel === 'SMS' ? 'MessageSquare' : channel === 'Email' ? 'Mail' : channel === 'WhatsApp' ? 'MessageCircle' : 'Bell'}
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

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData?.templateName}
                    onChange={(e) => handleInputChange('templateName', e?.target?.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Template</option>
                    {getFilteredTemplates()?.map((template) => (
                      <option key={template?.name} value={template?.name}>
                        {template?.name} ({template?.channel})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Templates are filtered based on selected channels
                  </p>
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
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              >
                {editingMapping ? 'Update Mapping' : 'Save Mapping'}
              </motion.button>
            </div>
          </motion.div>

          {/* Template Preview Modal */}
          {showPreview && (
            <TemplatePreview
              templateName={formData?.templateName}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddMappingModal;