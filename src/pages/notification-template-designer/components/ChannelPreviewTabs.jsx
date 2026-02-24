import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ChannelPreviewTabs = ({ channel, subject, content }) => {
  const [previewData, setPreviewData] = useState({
    customer_name: 'John Doe',
    contract_id: 'CNT-2025-001',
    trip_id: 'TRP-2025-456',
    driver_name: 'Mike Johnson',
    commodity: 'Electronics',
    new_price: '$1,250',
    verification_date: '2025-12-16',
    inquiry_topic: 'Shipping Rates',
    distance: '245'
  });

  const replaceVariables = (text) => {
    if (!text) return '';
    let result = text;
    Object.entries(previewData)?.forEach(([key, value]) => {
      result = result?.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return result;
  };

  const previewContent = replaceVariables(content);
  const previewSubject = replaceVariables(subject);

  const renderEmailPreview = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="font-medium">From:</span>
            <span>notifications@cargoclave.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="font-medium">To:</span>
            <span>customer@example.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <span className="font-medium">Subject:</span>
            <span>{previewSubject || 'No subject'}</span>
          </div>
        </div>
        <div className="p-6">
          <div 
            dangerouslySetInnerHTML={{ __html: previewContent }} 
            className="prose max-w-none"
          />
        </div>
      </div>
    </div>
  );

  const renderSMSPreview = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Icon name="MessageSquare" size="1rem" className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">CargoClave</p>
            <p className="text-xs text-gray-600">SMS Notification</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{previewContent}</p>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-right">Just now</p>
      </div>
    </div>
  );

  const renderWhatsAppPreview = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-[#e5ddd5] p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size="1.25rem" className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">CargoClave</p>
            <p className="text-xs text-gray-600">Business Account</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm rounded-tl-none">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">{previewContent}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs text-gray-500">12:34 PM</span>
            <Icon name="CheckCheck" size="0.875rem" className="text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderInAppPreview = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name="Bell" size="1.25rem" className="text-white" />
              </div>
              <div>
                <p className="font-semibold">CargoClave</p>
                <p className="text-xs text-purple-100">Just now</p>
              </div>
            </div>
            <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
              <Icon name="X" size="1.125rem" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">{previewSubject}</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{previewContent}</p>
        </div>
        <div className="px-4 pb-4">
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    if (!content) {
      return (
        <div className="text-center py-12">
          <Icon name="FileText" size="3rem" className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Add content to see preview</p>
        </div>
      );
    }

    switch (channel) {
      case 'Email':
        return renderEmailPreview();
      case 'SMS':
        return renderSMSPreview();
      case 'WhatsApp':
        return renderWhatsAppPreview();
      case 'In-App':
        return renderInAppPreview();
      default:
        return (
          <div className="text-center py-12">
            <Icon name="AlertCircle" size="3rem" className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Select a channel to see preview</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Sparkles" size="1.25rem" className="text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Preview how your notification will appear to recipients with sample data substitution
        </p>
        
        {/* Sample Data Editor */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-3 uppercase">Sample Data</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(previewData)?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="text-xs text-gray-600 min-w-[120px]">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setPreviewData(prev => ({
                    ...prev,
                    [key]: e?.target?.value
                  }))}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Preview Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderPreview()}
      </motion.div>
    </div>
  );
};

export default ChannelPreviewTabs;