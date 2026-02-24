import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import BulkActionBar from './components/BulkActionBar';
import ContractCard from './components/ContractCard';
import ContractTable from './components/ContractTable';

const ContractsManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: 'createdDate', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    preset: '',
    startDate: '',
    endDate: '',
    customers: [],
    commodities: [],
    statuses: [],
    minValue: '',
    maxValue: '',
    priorities: [],
    erpSynced: false,
    accountingSynced: false
  });

  const mockContracts = [
  {
    id: 'c1',
    contractId: 'CNT-2025-001',
    customer: 'Acme Corporation',
    commodity: 'Electronics',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    status: 'active',
    value: 125000,
    priority: 'high',
    createdDate: '2025-01-15',
    assignedDriver: {
      name: 'John Mitchell',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
      avatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform'
    },
    erpSynced: true,
    accountingSynced: true
  },
  {
    id: 'c2',
    contractId: 'CNT-2025-002',
    customer: 'Global Logistics Inc.',
    commodity: 'Automotive Parts',
    origin: 'Detroit, MI',
    destination: 'Houston, TX',
    status: 'in-progress',
    value: 89500,
    priority: 'medium',
    createdDate: '2025-01-18',
    assignedDriver: {
      name: 'Sarah Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_138d182b8-1763297744003.png",
      avatarAlt: 'Professional headshot of African American female driver with long black hair in professional attire'
    },
    erpSynced: true,
    accountingSynced: false
  },
  {
    id: 'c3',
    contractId: 'CNT-2025-003',
    customer: 'Swift Transport Co.',
    commodity: 'Pharmaceuticals',
    origin: 'Boston, MA',
    destination: 'Miami, FL',
    status: 'active',
    value: 156000,
    priority: 'high',
    createdDate: '2025-01-20',
    assignedDriver: {
      name: 'Michael Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151f60f91-1763299385526.png",
      avatarAlt: 'Professional headshot of Asian male driver with short black hair wearing company uniform'
    },
    erpSynced: true,
    accountingSynced: true
  },
  {
    id: 'c4',
    contractId: 'CNT-2025-004',
    customer: 'Mega Freight Solutions',
    commodity: 'Food & Beverage',
    origin: 'Chicago, IL',
    destination: 'Seattle, WA',
    status: 'completed',
    value: 67800,
    priority: 'low',
    createdDate: '2025-01-10',
    assignedDriver: {
      name: 'Emily Rodriguez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129aa8ebc-1763299616245.png",
      avatarAlt: 'Professional headshot of Hispanic female driver with brown hair in ponytail wearing safety vest'
    },
    erpSynced: true,
    accountingSynced: true
  },
  {
    id: 'c5',
    contractId: 'CNT-2025-005',
    customer: 'Prime Shipping Ltd.',
    commodity: 'Textiles',
    origin: 'Atlanta, GA',
    destination: 'Denver, CO',
    status: 'draft',
    value: 45200,
    priority: 'medium',
    createdDate: '2025-01-22',
    assignedDriver: {
      name: 'David Thompson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b31fca0a-1763292840548.png",
      avatarAlt: 'Professional headshot of Caucasian male driver with blonde hair wearing casual work attire'
    },
    erpSynced: false,
    accountingSynced: false
  },
  {
    id: 'c6',
    contractId: 'CNT-2025-006',
    customer: 'Acme Corporation',
    commodity: 'Chemicals',
    origin: 'Philadelphia, PA',
    destination: 'Phoenix, AZ',
    status: 'on-hold',
    value: 98700,
    priority: 'high',
    createdDate: '2025-01-12',
    assignedDriver: {
      name: 'Lisa Anderson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1229f703d-1763298919401.png",
      avatarAlt: 'Professional headshot of Caucasian female driver with red hair wearing safety equipment'
    },
    erpSynced: true,
    accountingSynced: false
  },
  {
    id: 'c7',
    contractId: 'CNT-2025-007',
    customer: 'Global Logistics Inc.',
    commodity: 'Machinery',
    origin: 'San Francisco, CA',
    destination: 'Dallas, TX',
    status: 'active',
    value: 234000,
    priority: 'high',
    createdDate: '2025-01-25',
    assignedDriver: {
      name: 'Robert Kim',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19174f29b-1763299874307.png",
      avatarAlt: 'Professional headshot of Asian male driver with glasses wearing company polo shirt'
    },
    erpSynced: true,
    accountingSynced: true
  },
  {
    id: 'c8',
    contractId: 'CNT-2025-008',
    customer: 'Swift Transport Co.',
    commodity: 'Electronics',
    origin: 'Portland, OR',
    destination: 'Minneapolis, MN',
    status: 'in-progress',
    value: 112500,
    priority: 'medium',
    createdDate: '2025-01-17',
    assignedDriver: {
      name: 'Jennifer Martinez',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
      avatarAlt: 'Professional headshot of Hispanic female driver with long dark hair in professional uniform'
    },
    erpSynced: true,
    accountingSynced: true
  },
  {
    id: 'c9',
    contractId: 'CNT-2025-009',
    customer: 'Mega Freight Solutions',
    commodity: 'Automotive Parts',
    origin: 'Nashville, TN',
    destination: 'Las Vegas, NV',
    status: 'cancelled',
    value: 54300,
    priority: 'low',
    createdDate: '2025-01-08',
    assignedDriver: {
      name: 'Christopher Lee',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17859c296-1763293764435.png",
      avatarAlt: 'Professional headshot of Asian male driver with short hair wearing casual work shirt'
    },
    erpSynced: false,
    accountingSynced: false
  },
  {
    id: 'c10',
    contractId: 'CNT-2025-010',
    customer: 'Prime Shipping Ltd.',
    commodity: 'Pharmaceuticals',
    origin: 'Baltimore, MD',
    destination: 'San Diego, CA',
    status: 'active',
    value: 187600,
    priority: 'high',
    createdDate: '2025-01-23',
    assignedDriver: {
      name: 'Amanda White',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1db60fb63-1763295621126.png",
      avatarAlt: 'Professional headshot of Caucasian female driver with blonde hair wearing safety vest'
    },
    erpSynced: true,
    accountingSynced: true
  }];


  const searchSuggestions = [
  'CNT-2025-001',
  'CNT-2025-002',
  'CNT-2025-003',
  'Acme Corporation',
  'Global Logistics Inc.',
  'Swift Transport Co.',
  'Mega Freight Solutions',
  'Prime Shipping Ltd.'];


  const [filteredContracts, setFilteredContracts] = useState(mockContracts);

  useEffect(() => {
    let result = [...mockContracts];

    if (searchTerm) {
      result = result?.filter(
        (contract) =>
        contract?.contractId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        contract?.customer?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (filters?.startDate) {
      result = result?.filter(
        (contract) => new Date(contract.createdDate) >= new Date(filters.startDate)
      );
    }

    if (filters?.endDate) {
      result = result?.filter(
        (contract) => new Date(contract.createdDate) <= new Date(filters.endDate)
      );
    }

    if (filters?.customers?.length > 0) {
      result = result?.filter((contract) =>
      filters?.customers?.some((customer) =>
      contract?.customer?.toLowerCase()?.includes(customer?.toLowerCase())
      )
      );
    }

    if (filters?.commodities?.length > 0) {
      result = result?.filter((contract) =>
      filters?.commodities?.some((commodity) =>
      contract?.commodity?.toLowerCase()?.includes(commodity?.toLowerCase())
      )
      );
    }

    if (filters?.statuses?.length > 0) {
      result = result?.filter((contract) =>
      filters?.statuses?.includes(contract?.status)
      );
    }

    if (filters?.minValue) {
      result = result?.filter(
        (contract) => contract?.value >= parseFloat(filters?.minValue)
      );
    }

    if (filters?.maxValue) {
      result = result?.filter(
        (contract) => contract?.value <= parseFloat(filters?.maxValue)
      );
    }

    if (filters?.priorities?.length > 0) {
      result = result?.filter((contract) =>
      filters?.priorities?.includes(contract?.priority)
      );
    }

    if (filters?.erpSynced) {
      result = result?.filter((contract) => contract?.erpSynced);
    }

    if (filters?.accountingSynced) {
      result = result?.filter((contract) => contract?.accountingSynced);
    }

    result?.sort((a, b) => {
      const aValue = a?.[sortConfig?.column];
      const bValue = b?.[sortConfig?.column];

      if (sortConfig?.column === 'createdDate') {
        return sortConfig?.direction === 'asc' ?
        new Date(aValue) - new Date(bValue) :
        new Date(bValue) - new Date(aValue);
      }

      if (sortConfig?.column === 'value') {
        return sortConfig?.direction === 'asc' ?
        aValue - bValue :
        bValue - aValue;
      }

      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' ?
        aValue?.localeCompare(bValue) :
        bValue?.localeCompare(aValue);
      }

      return 0;
    });

    setFilteredContracts(result);
  }, [searchTerm, filters, sortConfig]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      preset: '',
      startDate: '',
      endDate: '',
      customers: [],
      commodities: [],
      statuses: [],
      minValue: '',
      maxValue: '',
      priorities: [],
      erpSynced: false,
      accountingSynced: false
    });
    setSearchTerm('');
  };

  const handleSavePreset = (name) => {
    console.log('Saving preset:', name, filters);
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
    prev?.includes(id) ? prev?.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(checked ? filteredContracts?.map((c) => c?.id) : []);
  };

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev?.column === column && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleQuickAction = (action, contractId) => {
    console.log('Quick action:', action, contractId);
    if (action === 'view') {
      navigate('/contract-details-management');
    }
  };

  const handleBulkAction = (action, value) => {
    console.log('Bulk action:', action, value, selectedIds);
  };

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-[3.75rem]' : 'ml-[15rem]'}`}>
        <BreadcrumbNavigation />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/4 border-r border-border overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onSavePreset={handleSavePreset} />

          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Contracts Management</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage and monitor all logistics contracts
                  </p>
                </div>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={20}
                  onClick={() => navigate('/new-contract-creation')}>

                  New Contract
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <SearchBar onSearch={setSearchTerm} suggestions={searchSuggestions} />
                </div>
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded transition-all duration-150 ${
                    viewMode === 'table' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    <Icon name="Table" size="1.125rem" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded transition-all duration-150 ${
                    viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
                    }>

                    <Icon name="LayoutGrid" size="1.125rem" />
                  </button>
                </div>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={18}
                  onClick={() => console.log('Export all')}>

                  Export
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {selectedIds?.length > 0 &&
              <BulkActionBar
                selectedCount={selectedIds?.length}
                onBulkAction={handleBulkAction}
                onClearSelection={() => setSelectedIds([])} />

              }

              {viewMode === 'table' ?
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <ContractTable
                  contracts={filteredContracts}
                  selectedIds={selectedIds}
                  onSelect={handleSelect}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  onQuickAction={handleQuickAction} />

                </div> :

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredContracts?.map((contract) =>
                <ContractCard
                  key={contract?.id}
                  contract={contract}
                  isSelected={selectedIds?.includes(contract?.id)}
                  onSelect={handleSelect}
                  onQuickAction={handleQuickAction} />

                )}
                </div>
              }

              {filteredContracts?.length === 0 &&
              <div className="flex flex-col items-center justify-center py-16">
                  <Icon name="FileX" size="4rem" className="text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No contracts found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ContractsManagement;