import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TemplatePreview = ({ templateName, onClose }) => {
  const getTemplatePreview = () => {
    const previews = {
      'kyc_success_email.html': {
        type: 'Email',
        subject: 'KYC Verification Successful',
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">KYC Verification Completed</h2>
            <p>Dear {{customer_name}},</p>
            <p>We are pleased to inform you that your KYC verification has been successfully completed.</p>
            <p>You can now access all features of our platform.</p>
            <div style="background: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <p style="margin: 0;"><strong>Verification Date:</strong> {{verification_date}}</p>
              <p style="margin: 0;"><strong>Reference ID:</strong> {{reference_id}}</p>
            </div>
            <p>Thank you for your cooperation.</p>
          </div>
        `
      },
      'new_inquiry_wa_msg': {
        type: 'WhatsApp',
        body: `
Hi {{customer_name}},

Thank you for your inquiry!

📋 *Inquiry Details*
Reference: {{inquiry_id}}
Date: {{inquiry_date}}

Our team will review your request and get back to you within 24 hours.

For urgent matters, please call: {{support_phone}}

Best regards,
CargoClave Team
        `
      },
      'price_alert_push.json': {
        type: 'In-App',
        body: `{
  "title": "Price Alert Triggered",
  "message": "Price for {{commodity_name}} has {{change_type}} by {{percentage}}%",
  "action": "view_details",
  "priority": "high",
  "icon": "trending_up",
  "data": {
    "commodity_id": "{{commodity_id}}",
    "new_price": "{{new_price}}",
    "old_price": "{{old_price}}"
  }
}`
      }
    };

    return previews?.[templateName] || {
      type: 'Generic',
      body: 'Template preview not available for this template.'
    };
  };

  const preview = getTemplatePreview();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Icon name="FileText" size="1.5rem" className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Template Preview</h3>
              <p className="text-sm text-gray-600">{templateName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="X" size="1.25rem" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Icon name="Tag" size="0.875rem" />
              {preview?.type}
            </span>
          </div>

          {preview?.subject && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">Subject:</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">{preview?.subject}</p>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Message Body:</label>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              {preview?.type === 'Email' ? (
                <div dangerouslySetInnerHTML={{ __html: preview?.body }} />
              ) : (
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {preview?.body}
                </pre>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size="1.25rem" className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">Variable Placeholders</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Variables in double curly braces (e.g., {`{{customer_name}}`}) will be replaced with actual values when the notification is sent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TemplatePreview;