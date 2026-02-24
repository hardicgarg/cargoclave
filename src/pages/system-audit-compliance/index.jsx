import React, { useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterPanel from './components/FilterPanel';
import AuditLogGrid from './components/AuditLogGrid';
import AuditDetailModal from './components/AuditDetailModal';
import ComplianceDashboard from './components/ComplianceDashboard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';


const SystemAuditCompliance = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const mockAuditLogs = [
  {
    id: 'AUD-2025-001',
    timestamp: '2025-11-27T13:45:23Z',
    date: '11/27/2025',
    time: '01:45 PM',
    userName: 'John Doe',
    userEmail: 'john.doe@cargoclave.com',
    userRole: 'Operations Manager',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd76b3a7-1763291706254.png",
    userAvatarAlt: 'Professional headshot of Caucasian man with short brown hair wearing navy blue business suit',
    action: 'update',
    module: 'contracts',
    affectedRecord: 'Contract #CT-2025-456',
    recordId: 'CT-2025-456',
    changeDetails: 'Updated delivery date from 12/15/2025 to 12/20/2025 and modified route stops to include additional checkpoint at Dallas warehouse',
    severity: 'medium',
    ipAddress: '192.168.1.45',
    sessionId: 'sess_7f8d9e2a1b3c',
    requestId: 'req_9k2m4n6p8q',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    apiEndpoint: '/api/v1/contracts/update',
    changes: [
    { field: 'Delivery Date', oldValue: '12/15/2025', newValue: '12/20/2025' },
    { field: 'Route Stops', oldValue: '3 stops', newValue: '4 stops' }]

  },
  {
    id: 'AUD-2025-002',
    timestamp: '2025-11-27T13:30:15Z',
    date: '11/27/2025',
    time: '01:30 PM',
    userName: 'Sarah Smith',
    userEmail: 'sarah.smith@cargoclave.com',
    userRole: 'Dispatcher',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f737cd94-1763296401660.png",
    userAvatarAlt: 'Professional headshot of Asian woman with long black hair wearing white blouse and glasses',
    action: 'create',
    module: 'trips',
    affectedRecord: 'Trip #TR-2025-789',
    recordId: 'TR-2025-789',
    changeDetails: 'Created new trip assignment for driver Michael Rodriguez with vehicle VH-2025-123 for contract CT-2025-456',
    severity: 'low',
    ipAddress: '192.168.1.67',
    sessionId: 'sess_3a4b5c6d7e8f',
    requestId: 'req_1x2y3z4a5b',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    apiEndpoint: '/api/v1/trips/create',
    changes: [
    { field: 'Driver', oldValue: 'Unassigned', newValue: 'Michael Rodriguez' },
    { field: 'Vehicle', oldValue: 'Unassigned', newValue: 'VH-2025-123' }]

  },
  {
    id: 'AUD-2025-003',
    timestamp: '2025-11-27T12:15:42Z',
    date: '11/27/2025',
    time: '12:15 PM',
    userName: 'Emily Davis',
    userEmail: 'emily.davis@cargoclave.com',
    userRole: 'Compliance Officer',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17faa8e7a-1763295754680.png",
    userAvatarAlt: 'Professional headshot of African American woman with curly hair wearing burgundy blazer',
    action: 'export',
    module: 'system',
    affectedRecord: 'Audit Report November 2025',
    recordId: 'RPT-2025-11',
    changeDetails: 'Exported comprehensive audit trail report for November 2025 containing 1,247 log entries for regulatory compliance review',
    severity: 'high',
    ipAddress: '192.168.1.89',
    sessionId: 'sess_9h8g7f6e5d4c',
    requestId: 'req_6m7n8o9p0q',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    apiEndpoint: '/api/v1/audit/export',
    changes: []
  },
  {
    id: 'AUD-2025-004',
    timestamp: '2025-11-27T11:45:18Z',
    date: '11/27/2025',
    time: '11:45 AM',
    userName: 'System Administrator',
    userEmail: 'admin@cargoclave.com',
    userRole: 'System Admin',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5173305-1763295835079.png",
    userAvatarAlt: 'Professional headshot of Hispanic man with short black hair wearing gray suit and blue tie',
    action: 'login',
    module: 'auth',
    affectedRecord: 'User Session',
    recordId: 'USR-ADMIN-001',
    changeDetails: 'Multiple failed login attempts detected from IP address 192.168.1.105 - account temporarily locked for security',
    severity: 'critical',
    ipAddress: '192.168.1.105',
    sessionId: 'sess_2k3l4m5n6o7p',
    requestId: 'req_8r9s0t1u2v',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    apiEndpoint: '/api/v1/auth/login',
    changes: []
  },
  {
    id: 'AUD-2025-005',
    timestamp: '2025-11-27T10:30:55Z',
    date: '11/27/2025',
    time: '10:30 AM',
    userName: 'Mike Johnson',
    userEmail: 'mike.johnson@cargoclave.com',
    userRole: 'Fleet Coordinator',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa069aff-1763301150658.png",
    userAvatarAlt: 'Professional headshot of Caucasian man with blonde hair wearing light blue shirt',
    action: 'update',
    module: 'vehicles',
    affectedRecord: 'Vehicle #VH-2025-234',
    recordId: 'VH-2025-234',
    changeDetails: 'Updated vehicle maintenance status from Active to Under Maintenance and scheduled service appointment for 12/01/2025',
    severity: 'medium',
    ipAddress: '192.168.1.78',
    sessionId: 'sess_5p6q7r8s9t0u',
    requestId: 'req_3w4x5y6z7a',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    apiEndpoint: '/api/v1/vehicles/update',
    changes: [
    { field: 'Status', oldValue: 'Active', newValue: 'Under Maintenance' },
    { field: 'Service Date', oldValue: 'Not Scheduled', newValue: '12/01/2025' }]

  },
  {
    id: 'AUD-2025-006',
    timestamp: '2025-11-27T09:15:33Z',
    date: '11/27/2025',
    time: '09:15 AM',
    userName: 'John Doe',
    userEmail: 'john.doe@cargoclave.com',
    userRole: 'Operations Manager',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd76b3a7-1763291706254.png",
    userAvatarAlt: 'Professional headshot of Caucasian man with short brown hair wearing navy blue business suit',
    action: 'delete',
    module: 'drivers',
    affectedRecord: 'Driver #DR-2025-089',
    recordId: 'DR-2025-089',
    changeDetails: 'Removed driver profile for Robert Williams due to employment termination - all associated trip history archived',
    severity: 'high',
    ipAddress: '192.168.1.45',
    sessionId: 'sess_1a2b3c4d5e6f',
    requestId: 'req_7g8h9i0j1k',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    apiEndpoint: '/api/v1/drivers/delete',
    changes: [
    { field: 'Status', oldValue: 'Active', newValue: 'Deleted' },
    { field: 'Employment', oldValue: 'Active', newValue: 'Terminated' }]

  },
  {
    id: 'AUD-2025-007',
    timestamp: '2025-11-26T16:45:22Z',
    date: '11/26/2025',
    time: '04:45 PM',
    userName: 'Sarah Smith',
    userEmail: 'sarah.smith@cargoclave.com',
    userRole: 'Dispatcher',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f737cd94-1763296401660.png",
    userAvatarAlt: 'Professional headshot of Asian woman with long black hair wearing white blouse and glasses',
    action: 'read',
    module: 'customers',
    affectedRecord: 'Customer #CU-2025-567',
    recordId: 'CU-2025-567',
    changeDetails: 'Accessed customer profile for Acme Logistics Inc to review contract terms and SPOC contact information',
    severity: 'low',
    ipAddress: '192.168.1.67',
    sessionId: 'sess_6f7g8h9i0j1k',
    requestId: 'req_2l3m4n5o6p',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    apiEndpoint: '/api/v1/customers/view',
    changes: []
  },
  {
    id: 'AUD-2025-008',
    timestamp: '2025-11-26T14:20:11Z',
    date: '11/26/2025',
    time: '02:20 PM',
    userName: 'Emily Davis',
    userEmail: 'emily.davis@cargoclave.com',
    userRole: 'Compliance Officer',
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17faa8e7a-1763295754680.png",
    userAvatarAlt: 'Professional headshot of African American woman with curly hair wearing burgundy blazer',
    action: 'config',
    module: 'system',
    affectedRecord: 'Data Retention Policy',
    recordId: 'POL-2025-003',
    changeDetails: 'Updated data retention policy settings - increased contract archive period from 5 years to 7 years for regulatory compliance',
    severity: 'critical',
    ipAddress: '192.168.1.89',
    sessionId: 'sess_4k5l6m7n8o9p',
    requestId: 'req_0q1r2s3t4u',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    apiEndpoint: '/api/v1/system/config',
    changes: [
    { field: 'Retention Period', oldValue: '5 years', newValue: '7 years' },
    { field: 'Policy Version', oldValue: 'v2.1', newValue: 'v2.2' }]

  }];


  const [logs, setLogs] = useState(mockAuditLogs);

  const handleApplyFilters = (filters) => {
    let filtered = [...mockAuditLogs];

    if (filters?.dateFrom) {
      filtered = filtered?.filter((log) => new Date(log.timestamp) >= new Date(filters.dateFrom));
    }

    if (filters?.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate?.setHours(23, 59, 59, 999);
      filtered = filtered?.filter((log) => new Date(log.timestamp) <= toDate);
    }

    if (filters?.user && filters?.user !== 'all') {
      filtered = filtered?.filter((log) => log?.userEmail === filters?.user);
    }

    if (filters?.actionType && filters?.actionType?.length > 0) {
      filtered = filtered?.filter((log) => filters?.actionType?.includes(log?.action));
    }

    if (filters?.module && filters?.module !== 'all') {
      filtered = filtered?.filter((log) => log?.module === filters?.module);
    }

    if (filters?.severity && filters?.severity !== 'all') {
      filtered = filtered?.filter((log) => log?.severity === filters?.severity);
    }

    if (filters?.ipAddress) {
      filtered = filtered?.filter((log) => log?.ipAddress?.includes(filters?.ipAddress));
    }

    setLogs(filtered);
  };

  const handleResetFilters = () => {
    setLogs(mockAuditLogs);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query?.trim()) {
      setLogs(mockAuditLogs);
      return;
    }

    const searchLower = query?.toLowerCase();
    let filtered = mockAuditLogs?.filter((log) =>
    log?.userName?.toLowerCase()?.includes(searchLower) ||
    log?.action?.toLowerCase()?.includes(searchLower) ||
    log?.module?.toLowerCase()?.includes(searchLower) ||
    log?.affectedRecord?.toLowerCase()?.includes(searchLower) ||
    log?.recordId?.toLowerCase()?.includes(searchLower) ||
    log?.changeDetails?.toLowerCase()?.includes(searchLower)
    );
    setLogs(filtered);
  };

  const handleExport = (format) => {
    console.log(`Exporting audit logs in ${format} format`);
    alert(`Exporting ${logs?.length} audit log entries as ${format?.toUpperCase()}`);
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
  };

  const handleCloseModal = () => {
    setSelectedLog(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MainSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <BreadcrumbNavigation />

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">System Audit & Compliance</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Comprehensive audit trail and compliance monitoring
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                  iconName="BarChart3"
                  iconPosition="left"
                  onClick={() => setActiveTab('dashboard')}>

                  Dashboard
                </Button>
                <Button
                  variant={activeTab === 'logs' ? 'default' : 'outline'}
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => setActiveTab('logs')}>

                  Audit Logs
                </Button>
              </div>
            </div>

            {activeTab === 'logs' &&
            <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                    type="search"
                    placeholder="Search by user, action, module, record ID, or description..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e?.target?.value)} />

                  </div>
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    Quick Export
                  </Button>
                </div>
              </div>
            }
          </div>

          {activeTab === 'dashboard' ?
          <ComplianceDashboard /> :

          <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <FilterPanel
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters} />

              </div>

              <div className="col-span-9">
                <AuditLogGrid
                logs={logs}
                onExport={handleExport}
                onViewDetails={handleViewDetails} />

              </div>
            </div>
          }
        </div>
      </div>
      {selectedLog &&
      <AuditDetailModal log={selectedLog} onClose={handleCloseModal} />
      }
    </div>);

};

export default SystemAuditCompliance;