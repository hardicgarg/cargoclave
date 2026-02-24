import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CustomerSelectionSection from './components/CustomerSelectionSection';
import CommodityConfigurationSection from './components/CommodityConfigurationSection';
import RoutePlanningSection from './components/RoutePlanningSection';
import ContractDetailsSection from './components/ContractDetailsSection';
import FormProgressSidebar from './components/FormProgressSidebar';

const NewContractCreation = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    commodity: false,
    route: false,
    details: false
  });
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSaveDraft = () => {
    console.log('Draft saved');
  };

  const handleLoadTemplate = (templateId) => {
    console.log('Loading template:', templateId);
  };

  const handleSubmit = () => {
    setShowPreview(true);
  };

  const handleConfirmSubmit = () => {
    console.log('Contract submitted');
    navigate('/contracts-management');
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    navigate('/contracts-management');
  };

  const completedSections = [
    selectedCustomer ? 1 : 0,
    selectedCommodity ? 1 : 0,
    0,
    0
  ]?.reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen bg-slate-50">
      <MainSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-[3.75rem]' : 'ml-[15rem]'}`}>
        <BreadcrumbNavigation />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-5xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">Create New Contract</h1>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      iconName="X"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={handleSubmit}
                    >
                      Preview & Submit
                    </Button>
                  </div>
                </div>
                <p className="text-slate-600">
                  Fill in the details below to create a new logistics contract. All required fields must be completed.
                </p>
              </div>

              <div className="space-y-4">
                <CustomerSelectionSection
                  selectedCustomer={selectedCustomer}
                  onCustomerChange={setSelectedCustomer}
                  isExpanded={expandedSections?.customer}
                  onToggle={() => toggleSection('customer')}
                />

                <CommodityConfigurationSection
                  selectedCommodity={selectedCommodity}
                  onCommodityChange={setSelectedCommodity}
                  isExpanded={expandedSections?.commodity}
                  onToggle={() => toggleSection('commodity')}
                />

                <RoutePlanningSection
                  isExpanded={expandedSections?.route}
                  onToggle={() => toggleSection('route')}
                />

                <ContractDetailsSection
                  isExpanded={expandedSections?.details}
                  onToggle={() => toggleSection('details')}
                />
              </div>

              <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                  <Icon name="Info" size="1.25rem" className="text-blue-600" />
                  <p className="text-sm text-slate-600">
                    Complete all required sections to enable contract submission
                  </p>
                </div>
                <Button
                  variant="default"
                  iconName="Send"
                  iconPosition="left"
                  onClick={handleSubmit}
                  disabled={completedSections < 4}
                >
                  Submit Contract
                </Button>
              </div>
            </div>
          </div>

          <FormProgressSidebar
            completedSections={completedSections}
            totalSections={4}
            lastSaved="2 mins ago"
            onSaveDraft={handleSaveDraft}
            onLoadTemplate={handleLoadTemplate}
          />
        </div>
      </div>
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Contract Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size="1.25rem" className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Customer:</span>
                    <span className="font-medium text-slate-900">Global Logistics Inc.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Contact:</span>
                    <span className="font-medium text-slate-900">Sarah Mitchell</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Commodity Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Type:</span>
                    <span className="font-medium text-slate-900">Electronics & Technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Containers:</span>
                    <span className="font-medium text-slate-900">2 × 40ft Dry Container</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Route Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pickup:</span>
                    <span className="font-medium text-slate-900">Los Angeles, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery:</span>
                    <span className="font-medium text-slate-900">New York, NY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Distance:</span>
                    <span className="font-medium text-slate-900">2,789 miles</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Contract Terms</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service Type:</span>
                    <span className="font-medium text-slate-900">Express Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payment Terms:</span>
                    <span className="font-medium text-slate-900">Net 30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Contract Value:</span>
                    <span className="font-medium text-slate-900">$45,000.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
              >
                Back to Edit
              </Button>
              <Button
                variant="default"
                iconName="Check"
                iconPosition="left"
                onClick={handleConfirmSubmit}
              >
                Confirm & Submit
              </Button>
            </div>
          </div>
        </div>
      )}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size="1.5rem" className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Discard Changes?
                </h3>
                <p className="text-sm text-slate-600">
                  You have unsaved changes. Are you sure you want to leave? All progress will be lost.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
              >
                Continue Editing
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmCancel}
              >
                Discard Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewContractCreation;