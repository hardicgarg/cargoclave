import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import MappingTable from './components/MappingTable';
import AddMappingModal from './components/AddMappingModal';
import ToastNotification from './components/ToastNotification';
import SearchBar from './components/SearchBar';
import { useSidebar } from '../../context/SidebarContext';

const NotificationUseCaseMappingConfiguration = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mappings, setMappings] = useState([]);
  const [editingMapping, setEditingMapping] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setMappings([
        {
          id: 1,
          useCase: 'KYC Approved',
          channels: ['Email'],
          templateName: 'kyc_success_email.html',
          active: true,
          priority: 'High'
        },
        {
          id: 2,
          useCase: 'New Inquiry Raised',
          channels: ['WhatsApp'],
          templateName: 'new_inquiry_wa_msg',
          active: true,
          priority: 'Medium'
        },
        {
          id: 3,
          useCase: 'Price Alert Triggered',
          channels: ['In-App'],
          templateName: 'price_alert_push.json',
          active: true,
          priority: 'High'
        },
        {
          id: 4,
          useCase: 'Contract Created',
          channels: ['Email', 'SMS'],
          templateName: 'contract_creation_notification',
          active: true,
          priority: 'High'
        },
        {
          id: 5,
          useCase: 'Trip Completed',
          channels: ['SMS', 'WhatsApp'],
          templateName: 'trip_completion_alert',
          active: true,
          priority: 'Medium'
        },
        {
          id: 6,
          useCase: 'Payment Received',
          channels: ['Email', 'In-App'],
          templateName: 'payment_confirmation',
          active: false,
          priority: 'Low'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAddMapping = () => {
    setEditingMapping(null);
    setIsModalOpen(true);
  };

  const handleEditMapping = (mapping) => {
    setEditingMapping(mapping);
    setIsModalOpen(true);
  };

  const handleSaveMapping = (mappingData) => {
    if (editingMapping) {
      setMappings(mappings?.map(m => 
        m?.id === editingMapping?.id 
          ? { ...mappingData, id: editingMapping?.id } 
          : m
      ));
      showToast('Notification mapping updated successfully', 'success');
    } else {
      setMappings([...mappings, { ...mappingData, id: Date.now() }]);
      showToast('Notification mapping saved successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (id) => {
    setMappings(mappings?.map(m => 
      m?.id === id ? { ...m, active: !m?.active } : m
    ));
    const mapping = mappings?.find(m => m?.id === id);
    showToast(
      `Mapping ${mapping?.active ? 'deactivated' : 'activated'} successfully`,
      'info'
    );
  };

  const handleDeleteMapping = (id) => {
    setMappings(mappings?.filter(m => m?.id !== id));
    showToast('Mapping deleted successfully', 'success');
  };

  const filteredMappings = mappings?.filter(mapping =>
    mapping?.useCase?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    mapping?.templateName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MainSidebar onToggleCollapse={toggleSidebar} />
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-col gap-3 lg:gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-2 md:p-2.5 bg-blue-100 rounded-xl flex-shrink-0">
                    <Icon name="Settings" size="1.5rem" className="text-blue-600 md:w-7 md:h-7" />
                  </div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                    Notification Use Case Mapping
                  </h1>
                </div>
                <p className="text-sm md:text-base text-gray-600 ml-10 md:ml-14">
                  Configure notification channels and templates for application events
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddMapping}
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex-shrink-0 w-full lg:w-auto"
              >
                <Icon name="Plus" size="1.125rem" className="md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Add Mapping</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Cards with improved responsive design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8"
          >
            <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 truncate">Total Mappings</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{mappings?.length}</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 rounded-xl self-start md:self-auto flex-shrink-0">
                  <Icon name="Database" size="1.25rem" className="text-blue-600 md:w-6 md:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 truncate">Active</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">
                    {mappings?.filter(m => m?.active)?.length}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-green-50 rounded-xl self-start md:self-auto flex-shrink-0">
                  <Icon name="CheckCircle" size="1.25rem" className="text-green-600 md:w-6 md:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 truncate">Inactive</p>
                  <p className="text-2xl md:text-3xl font-bold text-orange-600">
                    {mappings?.filter(m => !m?.active)?.length}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 rounded-xl self-start md:self-auto flex-shrink-0">
                  <Icon name="XCircle" size="1.25rem" className="text-orange-600 md:w-6 md:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1 truncate">High Priority</p>
                  <p className="text-2xl md:text-3xl font-bold text-red-600">
                    {mappings?.filter(m => m?.priority === 'High')?.length}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-red-50 rounded-xl self-start md:self-auto flex-shrink-0">
                  <Icon name="AlertTriangle" size="1.25rem" className="text-red-600 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar with improved responsive width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-4 md:mb-6"
          >
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </motion.div>

          {/* Mapping Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <MappingTable
              mappings={filteredMappings}
              isLoading={isLoading}
              onEdit={handleEditMapping}
              onToggleActive={handleToggleActive}
              onDelete={handleDeleteMapping}
            />
          </motion.div>
        </div>
      </main>
      {/* Modals and Toast remain the same */}
      {isModalOpen && (
        <AddMappingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveMapping}
          editingMapping={editingMapping}
        />
      )}
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

export default NotificationUseCaseMappingConfiguration;