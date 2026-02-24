import React, { useState, useMemo } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import CommodityCard from './components/CommodityCard';
import ContainerSpecCard from './components/ContainerSpecCard';
import CommodityFormModal from './components/CommodityFormModal';
import ContainerFormModal from './components/ContainerFormModal';
import CompatibilityMatrixModal from './components/CompatibilityMatrixModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const CommoditiesContainerManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('commodities');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [handlingFilter, setHandlingFilter] = useState('');

  const [commodityModalOpen, setCommodityModalOpen] = useState(false);
  const [containerModalOpen, setContainerModalOpen] = useState(false);
  const [compatibilityModalOpen, setCompatibilityModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const userRole = 'operations_manager';

  const mockCommodities = [
    {
      id: 1,
      name: "Electronics Components",
      category: "Electronics",
      handlingType: "Fragile",
      temperatureRange: null,
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 3,
      compatibleContainerIds: [1, 2, 5]
    },
    {
      id: 2,
      name: "Fresh Produce",
      category: "Perishables",
      handlingType: "Temperature Controlled",
      temperatureRange: "2°C to 8°C",
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 2,
      compatibleContainerIds: [2, 4]
    },
    {
      id: 3,
      name: "Industrial Chemicals",
      category: "Chemicals",
      handlingType: "Hazmat",
      temperatureRange: "15°C to 25°C",
      isHazmat: true,
      hazmatClass: "Class 8 - Corrosive Substances",
      compatibleContainers: 1,
      compatibleContainerIds: [3]
    },
    {
      id: 4,
      name: "Textile Materials",
      category: "Textiles",
      handlingType: "Standard",
      temperatureRange: null,
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 4,
      compatibleContainerIds: [1, 2, 4, 5]
    },
    {
      id: 5,
      name: "Heavy Machinery Parts",
      category: "Machinery",
      handlingType: "Heavy",
      temperatureRange: null,
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 2,
      compatibleContainerIds: [1, 5]
    },
    {
      id: 6,
      name: "Pharmaceutical Products",
      category: "Pharmaceuticals",
      handlingType: "Temperature Controlled",
      temperatureRange: "2°C to 8°C",
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 2,
      compatibleContainerIds: [2, 4]
    },
    {
      id: 7,
      name: "Packaged Food Items",
      category: "Food & Beverage",
      handlingType: "Standard",
      temperatureRange: null,
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 3,
      compatibleContainerIds: [1, 2, 4]
    },
    {
      id: 8,
      name: "Frozen Seafood",
      category: "Perishables",
      handlingType: "Temperature Controlled",
      temperatureRange: "-18°C to -25°C",
      isHazmat: false,
      hazmatClass: null,
      compatibleContainers: 1,
      compatibleContainerIds: [2]
    }
  ];

  const mockContainers = [
    {
      id: 1,
      name: "20ft Standard Dry Container",
      type: "Dry",
      dimensions: "20\' x 8\' x 8.6'",
      maxWeight: "28,000 kg",
      capacity: "33 cubic meters",
      compatibleCommodities: 5,
      specialRequirements: ["Stackable"]
    },
    {
      id: 2,
      name: "40ft Refrigerated Container",
      type: "Refrigerated",
      dimensions: "40\' x 8\' x 8.6'",
      maxWeight: "32,000 kg",
      capacity: "67 cubic meters",
      compatibleCommodities: 4,
      specialRequirements: ["Temperature Control", "Food Grade", "Insulated"]
    },
    {
      id: 3,
      name: "20ft Tank Container",
      type: "Tank",
      dimensions: "20\' x 8\' x 8.6'",
      maxWeight: "30,000 kg",
      capacity: "21,000 liters",
      compatibleCommodities: 1,
      specialRequirements: ["Hazmat Certified", "Ventilation"]
    },
    {
      id: 4,
      name: "40ft High Cube Refrigerated",
      type: "Refrigerated",
      dimensions: "40\' x 8\' x 9.6'",
      maxWeight: "32,000 kg",
      capacity: "76 cubic meters",
      compatibleCommodities: 3,
      specialRequirements: ["Temperature Control", "Food Grade", "Insulated", "Stackable"]
    },
    {
      id: 5,
      name: "40ft Flat Rack Container",
      type: "Flat Rack",
      dimensions: "40\' x 8\' x 8.6'",
      maxWeight: "45,000 kg",
      capacity: "N/A",
      compatibleCommodities: 3,
      specialRequirements: []
    }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'General Cargo', label: 'General Cargo' },
    { value: 'Perishables', label: 'Perishables' },
    { value: 'Chemicals', label: 'Chemicals' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Machinery', label: 'Machinery' },
    { value: 'Textiles', label: 'Textiles' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Pharmaceuticals', label: 'Pharmaceuticals' }
  ];

  const handlingOptions = [
    { value: '', label: 'All Handling Types' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Fragile', label: 'Fragile' },
    { value: 'Temperature Controlled', label: 'Temperature Controlled' },
    { value: 'Hazmat', label: 'Hazmat' },
    { value: 'Heavy', label: 'Heavy' }
  ];

  const containerTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Dry', label: 'Dry Container' },
    { value: 'Refrigerated', label: 'Refrigerated Container' },
    { value: 'Open Top', label: 'Open Top Container' },
    { value: 'Flat Rack', label: 'Flat Rack Container' },
    { value: 'Tank', label: 'Tank Container' }
  ];

  const filteredCommodities = useMemo(() => {
    return mockCommodities?.filter(commodity => {
      const matchesSearch = commodity?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                          commodity?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesCategory = !categoryFilter || commodity?.category === categoryFilter;
      const matchesHandling = !handlingFilter || commodity?.handlingType === handlingFilter;
      
      return matchesSearch && matchesCategory && matchesHandling;
    });
  }, [searchQuery, categoryFilter, handlingFilter]);

  const filteredContainers = useMemo(() => {
    return mockContainers?.filter(container => {
      const matchesSearch = container?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                          container?.type?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesType = !typeFilter || container?.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const handleAddCommodity = () => {
    setSelectedItem(null);
    setCommodityModalOpen(true);
  };

  const handleEditCommodity = (commodity) => {
    setSelectedItem(commodity);
    setCommodityModalOpen(true);
  };

  const handleDeleteCommodity = (commodity) => {
    setSelectedItem(commodity);
    setDeleteType('commodity');
    setDeleteModalOpen(true);
  };

  const handleAddContainer = () => {
    setSelectedItem(null);
    setContainerModalOpen(true);
  };

  const handleEditContainer = (container) => {
    setSelectedItem(container);
    setContainerModalOpen(true);
  };

  const handleDeleteContainer = (container) => {
    setSelectedItem(container);
    setDeleteType('container');
    setDeleteModalOpen(true);
  };

  const handleViewContainers = (commodity) => {
    setSelectedItem(commodity);
    setCompatibilityModalOpen(true);
  };

  const handleSaveCommodity = (formData) => {
    console.log('Saving commodity:', formData);
    setCommodityModalOpen(false);
  };

  const handleSaveContainer = (formData) => {
    console.log('Saving container:', formData);
    setContainerModalOpen(false);
  };

  const handleSaveCompatibility = (commodityId, containerIds) => {
    console.log('Saving compatibility:', { commodityId, containerIds });
  };

  const handleConfirmDelete = (itemId) => {
    console.log('Deleting item:', itemId);
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  const isReadOnly = userRole === 'compliance_officer';

  return (
    <div className="min-h-screen bg-slate-50">
      <MainSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <BreadcrumbNavigation />

        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Commodities & Container Management</h1>
              <p className="text-slate-600 mt-1">Configure commodity types and container specifications</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                onClick={handleExport}
              >
                Export Data
              </Button>
              {!isReadOnly && (
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={activeTab === 'commodities' ? handleAddCommodity : handleAddContainer}
                >
                  Add {activeTab === 'commodities' ? 'Commodity' : 'Container'}
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 mb-6">
            <div className="border-b border-slate-200">
              <div className="flex items-center">
                <button
                  onClick={() => setActiveTab('commodities')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'commodities' ?'border-blue-600 text-blue-600' :'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size="1.125rem" />
                    <span>Commodities</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                      {mockCommodities?.length}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('containers')}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === 'containers' ?'border-blue-600 text-blue-600' :'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Box" size="1.125rem" />
                    <span>Containers</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
                      {mockContainers?.length}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2">
                  <Input
                    type="search"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                  />
                </div>
                {activeTab === 'commodities' ? (
                  <>
                    <Select
                      placeholder="Filter by category"
                      options={categoryOptions}
                      value={categoryFilter}
                      onChange={setCategoryFilter}
                    />
                    <Select
                      placeholder="Filter by handling"
                      options={handlingOptions}
                      value={handlingFilter}
                      onChange={setHandlingFilter}
                    />
                  </>
                ) : (
                  <Select
                    placeholder="Filter by type"
                    options={containerTypeOptions}
                    value={typeFilter}
                    onChange={setTypeFilter}
                  />
                )}
              </div>

              {activeTab === 'commodities' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommodities?.length > 0 ? (
                    filteredCommodities?.map(commodity => (
                      <CommodityCard
                        key={commodity?.id}
                        commodity={commodity}
                        onEdit={handleEditCommodity}
                        onDelete={handleDeleteCommodity}
                        onViewContainers={handleViewContainers}
                        isReadOnly={isReadOnly}
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <Icon name="Package" size="3rem" className="text-slate-300 mb-4" />
                      <p className="text-slate-600 text-lg font-medium mb-2">No commodities found</p>
                      <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContainers?.length > 0 ? (
                    filteredContainers?.map(container => (
                      <ContainerSpecCard
                        key={container?.id}
                        container={container}
                        onEdit={handleEditContainer}
                        onDelete={handleDeleteContainer}
                        isReadOnly={isReadOnly}
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                      <Icon name="Box" size="3rem" className="text-slate-300 mb-4" />
                      <p className="text-slate-600 text-lg font-medium mb-2">No containers found</p>
                      <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {isReadOnly && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size="1.25rem" className="text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Read-Only Access</p>
                  <p className="text-sm text-amber-800">
                    You have read-only access to this module. Contact your administrator to request edit permissions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CommodityFormModal
        isOpen={commodityModalOpen}
        onClose={() => setCommodityModalOpen(false)}
        onSubmit={handleSaveCommodity}
        commodity={selectedItem}
        containers={mockContainers}
      />
      <ContainerFormModal
        isOpen={containerModalOpen}
        onClose={() => setContainerModalOpen(false)}
        onSubmit={handleSaveContainer}
        container={selectedItem}
      />
      <CompatibilityMatrixModal
        isOpen={compatibilityModalOpen}
        onClose={() => setCompatibilityModalOpen(false)}
        commodity={selectedItem}
        containers={mockContainers}
        onSave={handleSaveCompatibility}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        item={selectedItem}
        type={deleteType}
      />
    </div>
  );
};

export default CommoditiesContainerManagement;