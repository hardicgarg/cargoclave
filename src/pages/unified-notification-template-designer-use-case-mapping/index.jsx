import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import TemplateSection from './components/TemplateSection';
import MappingSection from './components/MappingSection';
import ToastNotification from '../notification-use-case-mapping-configuration/components/ToastNotification';
import { useSidebar } from '../../context/SidebarContext';

const UnifiedNotificationTemplateDesignerUseCaseMapping = () => {
  const { toggleSidebar } = useSidebar();
  const [templates, setTemplates] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Load initial data
  useEffect(() => {
    setTimeout(() => {
      // Sample templates data
      setTemplates([
        {
          id: 1,
          name: 'kyc_success_email.html',
          category: 'Customer Communications',
          channel: 'Email',
          subject: 'KYC Verification Successful',
          content: '<p>Dear {{customer_name}},</p><p>Your KYC verification has been completed successfully.</p>',
          variables: ['customer_name', 'verification_date'],
          lastModified: '2025-12-10',
          status: 'Active'
        },
        {
          id: 2,
          name: 'new_inquiry_wa_msg',
          category: 'Customer Communications',
          channel: 'WhatsApp',
          subject: '',
          content: 'Hello {{customer_name}}! We received your inquiry about {{inquiry_topic}}. Our team will respond within 24 hours.',
          variables: ['customer_name', 'inquiry_topic'],
          lastModified: '2025-12-12',
          status: 'Active'
        },
        {
          id: 3,
          name: 'price_alert_push.json',
          category: 'System Alerts',
          channel: 'In-App',
          subject: 'Price Alert',
          content: '{"title": "Price Alert", "body": "Price for {{commodity}} has changed to {{new_price}}"}',
          variables: ['commodity', 'new_price'],
          lastModified: '2025-12-15',
          status: 'Active'
        },
        {
          id: 4,
          name: 'contract_creation_notification',
          category: 'Contract Events',
          channel: 'Email',
          subject: 'New Contract Created',
          content: '<p>Contract {{contract_id}} has been created for {{customer_name}}.</p>',
          variables: ['contract_id', 'customer_name', 'contract_date'],
          lastModified: '2025-12-11',
          status: 'Active'
        },
        {
          id: 5,
          name: 'trip_completion_alert',
          category: 'Trip Operations',
          channel: 'SMS',
          subject: '',
          content: 'Trip {{trip_id}} completed successfully. Driver: {{driver_name}}. Total distance: {{distance}} km.',
          variables: ['trip_id', 'driver_name', 'distance'],
          lastModified: '2025-12-13',
          status: 'Active'
        }
      ]);

      // Sample mappings data
      setMappings([
        {
          id: 1,
          useCase: 'KYC Approved',
          channels: ['Email'],
          templateName: 'kyc_success_email.html',
          frequency: 'Immediate',
          active: true,
          priority: 'High'
        },
        {
          id: 2,
          useCase: 'New Inquiry Raised',
          channels: ['WhatsApp'],
          templateName: 'new_inquiry_wa_msg',
          frequency: 'Immediate',
          active: true,
          priority: 'Medium'
        },
        {
          id: 3,
          useCase: 'Price Alert Triggered',
          channels: ['In-App'],
          templateName: 'price_alert_push.json',
          frequency: 'Immediate',
          active: true,
          priority: 'High'
        },
        {
          id: 4,
          useCase: 'Contract Created',
          channels: ['Email', 'SMS'],
          templateName: 'contract_creation_notification',
          frequency: 'Scheduled - Daily',
          active: true,
          priority: 'High'
        },
        {
          id: 5,
          useCase: 'Trip Completed',
          channels: ['SMS', 'WhatsApp'],
          templateName: 'trip_completion_alert',
          frequency: 'Event-Triggered',
          active: true,
          priority: 'Medium'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Template handlers
  const handleSaveTemplate = (templateData) => {
    if (selectedTemplate?.id) {
      setTemplates(templates?.map(t =>
        t?.id === selectedTemplate?.id
          ? { ...templateData, id: selectedTemplate?.id, lastModified: new Date()?.toISOString()?.split('T')?.[0] }
          : t
      ));
      showToast('Template updated successfully', 'success');
    } else {
      const newTemplate = {
        ...templateData,
        id: Date.now(),
        lastModified: new Date()?.toISOString()?.split('T')?.[0],
        status: 'Active'
      };
      setTemplates([...templates, newTemplate]);
      showToast('Template created successfully', 'success');
    }
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates?.filter(t => t?.id !== templateId));
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
    showToast('Template deleted successfully', 'success');
  };

  const handleNewTemplate = () => {
    setSelectedTemplate({
      name: '',
      category: '',
      channel: '',
      subject: '',
      content: '',
      variables: [],
      status: 'Draft'
    });
  };

  // Mapping handlers
  const handleSaveMapping = (mappingData) => {
    const existingMapping = mappings?.find(m => m?.id === mappingData?.id);
    
    if (existingMapping) {
      setMappings(mappings?.map(m =>
        m?.id === mappingData?.id ? mappingData : m
      ));
      showToast('Mapping updated successfully', 'success');
    } else {
      setMappings([...mappings, { ...mappingData, id: Date.now() }]);
      showToast('Mapping created successfully', 'success');
    }
  };

  const handleDeleteMapping = (mappingId) => {
    setMappings(mappings?.filter(m => m?.id !== mappingId));
    showToast('Mapping deleted successfully', 'success');
  };

  const handleToggleMappingActive = (mappingId) => {
    setMappings(mappings?.map(m =>
      m?.id === mappingId ? { ...m, active: !m?.active } : m
    ));
    const mapping = mappings?.find(m => m?.id === mappingId);
    showToast(
      `Mapping ${mapping?.active ? 'deactivated' : 'activated'} successfully`,
      'info'
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MainSidebar onToggleCollapse={toggleSidebar} />
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-b border-gray-200 px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
                  <Icon name="Bell" size="1.75rem" className="text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Notifications and Mapping
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Unified template creation and use case mapping workflow
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewTemplate}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                <Icon name="Plus" size="1.125rem" />
                <span className="font-medium">New Template</span>
              </motion.button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Total Templates</p>
                    <p className="text-2xl font-bold text-blue-900">{templates?.length}</p>
                  </div>
                  <Icon name="FileText" size="1.25rem" className="text-blue-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-700 font-medium">Active Templates</p>
                    <p className="text-2xl font-bold text-green-900">
                      {templates?.filter(t => t?.status === 'Active')?.length}
                    </p>
                  </div>
                  <Icon name="CheckCircle" size="1.25rem" className="text-green-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-700 font-medium">Total Mappings</p>
                    <p className="text-2xl font-bold text-purple-900">{mappings?.length}</p>
                  </div>
                  <Icon name="Link" size="1.25rem" className="text-purple-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-700 font-medium">Active Mappings</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {mappings?.filter(m => m?.active)?.length}
                    </p>
                  </div>
                  <Icon name="Activity" size="1.25rem" className="text-orange-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Split Screen Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Templates Section - 40% */}
            <TemplateSection
              templates={templates}
              isLoading={isLoading}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              onSaveTemplate={handleSaveTemplate}
              onDeleteTemplate={handleDeleteTemplate}
              onNewTemplate={handleNewTemplate}
            />

            {/* Mapping Section - 60% */}
            <MappingSection
              mappings={mappings}
              templates={templates}
              isLoading={isLoading}
              onSaveMapping={handleSaveMapping}
              onDeleteMapping={handleDeleteMapping}
              onToggleActive={handleToggleMappingActive}
              onCreateTemplate={handleNewTemplate}
            />
          </div>
        </div>
      </main>
      {/* Toast Notification */}
      {toast?.show && (
        <ToastNotification
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default UnifiedNotificationTemplateDesignerUseCaseMapping;