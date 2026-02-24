import React, { useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import CustomerListPanel from './components/CustomerListPanel';
import CustomerProfilePanel from './components/CustomerProfilePanel';

const CustomerMasterData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const mockCustomers = [
  {
    id: 1,
    companyName: "Global Logistics Inc.",
    primaryContact: "John Anderson",
    activeContracts: 12,
    rating: 5,
    status: "active",
    totalTrips: 245,
    totalRevenue: "1,250,000",
    city: "New York",
    state: "NY",
    phone: "+1 (555) 123-4567",
    email: "contact@globallogistics.com",
    taxId: "12-3456789",
    industry: "Manufacturing",
    customerSince: "01/15/2020",
    accountManager: "Sarah Mitchell",
    address: "1234 Business Park Drive",
    zipCode: "10001",
    country: "United States",
    serviceLevel: "Premium",
    paymentTerms: "Net 30",
    creditLimit: "500,000",
    billingFrequency: "Monthly",
    notes: "Key account with high volume requirements. Prefers dedicated fleet for time-sensitive shipments. Regular quarterly business reviews scheduled.",
    spocContacts: [
    {
      id: 1,
      name: "John Anderson",
      designation: "Supply Chain Director",
      role: "primary",
      email: "j.anderson@globallogistics.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1e20f1e-1763294981783.png",
      avatarAlt: "Professional headshot of middle-aged Caucasian man with short brown hair wearing navy blue suit and red tie",
      availability: "available",
      communicationPreferences: ["Email", "Phone", "Video Call"],
      availabilitySchedule: "Mon-Fri, 9:00 AM - 6:00 PM EST",
      lastContact: "11/25/2025"
    },
    {
      id: 2,
      name: "Emily Roberts",
      designation: "Operations Manager",
      role: "operations",
      email: "e.roberts@globallogistics.com",
      phone: "+1 (555) 123-4568",
      location: "New York, NY",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0f33e8e-1763297518529.png",
      avatarAlt: "Professional headshot of young Caucasian woman with blonde hair in bun wearing white blouse and pearl necklace",
      availability: "busy",
      communicationPreferences: ["Email", "SMS"],
      availabilitySchedule: "Mon-Fri, 8:00 AM - 5:00 PM EST",
      lastContact: "11/26/2025"
    },
    {
      id: 3,
      name: "Michael Chen",
      designation: "Finance Controller",
      role: "billing",
      email: "m.chen@globallogistics.com",
      phone: "+1 (555) 123-4569",
      location: "New York, NY",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7561ea2-1763295644596.png",
      avatarAlt: "Professional headshot of Asian man with black hair and glasses wearing charcoal gray suit and blue tie",
      availability: "available",
      communicationPreferences: ["Email"],
      availabilitySchedule: "Mon-Fri, 9:00 AM - 5:00 PM EST",
      lastContact: "11/20/2025"
    }],

    contractHistory: [
    {
      id: 1,
      contractId: "CNT-2025-001",
      description: "Electronics shipment from New York to Los Angeles",
      status: "active",
      startDate: "01/01/2025",
      endDate: "12/31/2025",
      value: "450,000",
      tripsCompleted: 45,
      commodity: "Electronics",
      route: "NY → LA",
      completionRate: 85
    },
    {
      id: 2,
      contractId: "CNT-2024-089",
      description: "Automotive parts distribution across East Coast",
      status: "completed",
      startDate: "03/15/2024",
      endDate: "12/31/2024",
      value: "680,000",
      tripsCompleted: 120,
      commodity: "Automotive Parts",
      route: "Multi-city",
      completionRate: 100
    },
    {
      id: 3,
      contractId: "CNT-2025-015",
      description: "Pharmaceutical cold chain logistics",
      status: "active",
      startDate: "06/01/2025",
      endDate: "05/31/2026",
      value: "320,000",
      tripsCompleted: 28,
      commodity: "Pharmaceuticals",
      route: "NY → Boston",
      completionRate: 65
    }],

    communicationLog: [
    {
      id: 1,
      type: "email",
      subject: "Q4 Contract Renewal Discussion",
      date: "11/26/2025",
      time: "10:30 AM",
      contactPerson: "John Anderson",
      notes: "Discussed contract renewal terms for Q1 2026. Client interested in expanding service coverage to include West Coast operations. Requested proposal by 12/05/2025.",
      loggedBy: "Sarah Mitchell",
      followUpRequired: true,
      followUpDate: "12/05/2025",
      attachments: ["Contract_Proposal_Draft.pdf", "Service_Coverage_Map.pdf"]
    },
    {
      id: 2,
      type: "call",
      subject: "Shipment Delay Resolution",
      date: "11/24/2025",
      time: "2:15 PM",
      contactPerson: "Emily Roberts",
      notes: "Addressed concerns regarding delayed shipment CNT-2025-001-045. Explained weather-related delays and provided updated ETA. Client satisfied with resolution and communication.",
      loggedBy: "Operations Team",
      followUpRequired: false,
      followUpDate: null,
      attachments: []
    },
    {
      id: 3,
      type: "meeting",
      subject: "Quarterly Business Review",
      date: "11/15/2025",
      time: "11:00 AM",
      contactPerson: "John Anderson, Emily Roberts",
      notes: "Conducted comprehensive review of Q3 performance. Discussed on-time delivery rates (96%), cost optimization opportunities, and service improvements. Client expressed satisfaction with overall service quality.",
      loggedBy: "Sarah Mitchell",
      followUpRequired: true,
      followUpDate: "02/15/2026",
      attachments: ["Q3_Performance_Report.pdf", "Meeting_Minutes.pdf"]
    },
    {
      id: 4,
      type: "service_request",
      subject: "Additional Vehicle Request",
      date: "11/10/2025",
      time: "9:45 AM",
      contactPerson: "Emily Roberts",
      notes: "Client requested additional refrigerated vehicle for pharmaceutical shipments during peak season. Approved and scheduled for deployment starting 12/01/2025.",
      loggedBy: "Fleet Coordinator",
      followUpRequired: false,
      followUpDate: null,
      attachments: ["Vehicle_Assignment_Confirmation.pdf"]
    }],

    performance: {
      onTimeRate: 96,
      satisfaction: 4.8,
      totalShipments: 245,
      issuesReported: 8,
      recentIssues: [
      {
        id: 1,
        title: "Delayed delivery due to weather conditions",
        description: "Shipment CNT-2025-001-045 delayed by 6 hours due to severe weather in Pennsylvania. Customer notified proactively.",
        date: "11/24/2025",
        resolved: true,
        resolution: "Shipment delivered successfully with 6-hour delay. Customer satisfied with communication."
      },
      {
        id: 2,
        title: "Documentation discrepancy",
        description: "Minor discrepancy in customs documentation for international shipment. Resolved within 2 hours.",
        date: "11/18/2025",
        resolved: true,
        resolution: "Documentation corrected and resubmitted. No impact on delivery schedule."
      },
      {
        id: 3,
        title: "Temperature monitoring alert",
        description: "Temperature sensor alert triggered during pharmaceutical shipment. Immediate investigation initiated.",
        date: "11/12/2025",
        resolved: true,
        resolution: "False alarm due to sensor calibration issue. Shipment integrity maintained throughout."
      }]

    }
  },
  {
    id: 2,
    companyName: "TechCorp Solutions",
    primaryContact: "Sarah Williams",
    activeContracts: 8,
    rating: 4,
    status: "active",
    totalTrips: 156,
    totalRevenue: "780,000",
    city: "San Francisco",
    state: "CA",
    phone: "+1 (555) 234-5678",
    email: "contact@techcorp.com",
    taxId: "98-7654321",
    industry: "Technology",
    customerSince: "06/20/2021",
    accountManager: "David Thompson",
    address: "5678 Innovation Boulevard",
    zipCode: "94102",
    country: "United States",
    serviceLevel: "Standard",
    paymentTerms: "Net 45",
    creditLimit: "300,000",
    billingFrequency: "Bi-weekly",
    notes: "Growing technology company with increasing logistics needs. Focus on cost-effective solutions with reliable service.",
    spocContacts: [
    {
      id: 1,
      name: "Sarah Williams",
      designation: "Logistics Manager",
      role: "primary",
      email: "s.williams@techcorp.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1be3d90e4-1763298371030.png",
      avatarAlt: "Professional headshot of African American woman with curly black hair wearing teal blazer and white shirt",
      availability: "available",
      communicationPreferences: ["Email", "Slack"],
      availabilitySchedule: "Mon-Fri, 8:00 AM - 5:00 PM PST",
      lastContact: "11/26/2025"
    }],

    contractHistory: [
    {
      id: 1,
      contractId: "CNT-2025-042",
      description: "Tech equipment distribution",
      status: "active",
      startDate: "04/01/2025",
      endDate: "03/31/2026",
      value: "280,000",
      tripsCompleted: 32,
      commodity: "Electronics",
      route: "SF → Seattle",
      completionRate: 72
    }],

    communicationLog: [
    {
      id: 1,
      type: "email",
      subject: "Service Level Agreement Review",
      date: "11/22/2025",
      time: "3:00 PM",
      contactPerson: "Sarah Williams",
      notes: "Reviewed current SLA terms and discussed potential upgrades for Q1 2026.",
      loggedBy: "David Thompson",
      followUpRequired: true,
      followUpDate: "12/10/2025",
      attachments: ["SLA_Review_Document.pdf"]
    }],

    performance: {
      onTimeRate: 94,
      satisfaction: 4.5,
      totalShipments: 156,
      issuesReported: 5,
      recentIssues: [
      {
        id: 1,
        title: "Packaging damage during transit",
        description: "Minor packaging damage reported on shipment CNT-2025-042-018.",
        date: "11/20/2025",
        resolved: true,
        resolution: "Repackaged and reshipped at no additional cost. Customer satisfied."
      }]

    }
  },
  {
    id: 3,
    companyName: "MediPharm Industries",
    primaryContact: "Dr. Robert Martinez",
    activeContracts: 15,
    rating: 5,
    status: "active",
    totalTrips: 320,
    totalRevenue: "1,850,000",
    city: "Boston",
    state: "MA",
    phone: "+1 (555) 345-6789",
    email: "contact@medipharm.com",
    taxId: "45-6789012",
    industry: "Pharmaceuticals",
    customerSince: "09/10/2019",
    accountManager: "Jennifer Lee",
    address: "9012 Medical Center Drive",
    zipCode: "02108",
    country: "United States",
    serviceLevel: "Premium Plus",
    paymentTerms: "Net 15",
    creditLimit: "750,000",
    billingFrequency: "Weekly",
    notes: "Critical pharmaceutical client requiring temperature-controlled logistics and strict compliance. 24/7 monitoring required.",
    spocContacts: [
    {
      id: 1,
      name: "Dr. Robert Martinez",
      designation: "Supply Chain VP",
      role: "primary",
      email: "r.martinez@medipharm.com",
      phone: "+1 (555) 345-6789",
      location: "Boston, MA",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1956cf962-1763300551216.png",
      avatarAlt: "Professional headshot of Hispanic man with gray hair and beard wearing white lab coat over blue dress shirt",
      availability: "available",
      communicationPreferences: ["Phone", "Email", "Emergency Hotline"],
      availabilitySchedule: "24/7 Emergency Contact",
      lastContact: "11/27/2025"
    }],

    contractHistory: [
    {
      id: 1,
      contractId: "CNT-2025-008",
      description: "Cold chain pharmaceutical distribution",
      status: "active",
      startDate: "01/15/2025",
      endDate: "12/31/2025",
      value: "920,000",
      tripsCompleted: 98,
      commodity: "Pharmaceuticals",
      route: "Multi-state",
      completionRate: 92
    }],

    communicationLog: [
    {
      id: 1,
      type: "call",
      subject: "Temperature Monitoring System Upgrade",
      date: "11/27/2025",
      time: "9:00 AM",
      contactPerson: "Dr. Robert Martinez",
      notes: "Discussed implementation of advanced IoT temperature monitoring for all pharmaceutical shipments.",
      loggedBy: "Jennifer Lee",
      followUpRequired: true,
      followUpDate: "12/01/2025",
      attachments: []
    }],

    performance: {
      onTimeRate: 98,
      satisfaction: 5.0,
      totalShipments: 320,
      issuesReported: 2,
      recentIssues: [
      {
        id: 1,
        title: "Temperature sensor calibration",
        description: "Routine sensor calibration performed during scheduled maintenance.",
        date: "11/15/2025",
        resolved: true,
        resolution: "All sensors recalibrated and tested. System operating optimally."
      }]

    }
  },
  {
    id: 4,
    companyName: "AutoParts Direct",
    primaryContact: "James Thompson",
    activeContracts: 6,
    rating: 3,
    status: "inactive",
    totalTrips: 89,
    totalRevenue: "420,000",
    city: "Detroit",
    state: "MI",
    phone: "+1 (555) 456-7890",
    email: "contact@autopartsdirect.com",
    taxId: "67-8901234",
    industry: "Automotive",
    customerSince: "03/05/2022",
    accountManager: "Mark Johnson",
    address: "3456 Industrial Parkway",
    zipCode: "48201",
    country: "United States",
    serviceLevel: "Standard",
    paymentTerms: "Net 60",
    creditLimit: "200,000",
    billingFrequency: "Monthly",
    notes: "Account currently inactive due to seasonal business slowdown. Expected to resume operations in Q1 2026.",
    spocContacts: [
    {
      id: 1,
      name: "James Thompson",
      designation: "Operations Director",
      role: "primary",
      email: "j.thompson@autopartsdirect.com",
      phone: "+1 (555) 456-7890",
      location: "Detroit, MI",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1004c3985-1763293517960.png",
      avatarAlt: "Professional headshot of Caucasian man with short blonde hair wearing black suit and striped tie",
      availability: "offline",
      communicationPreferences: ["Email"],
      availabilitySchedule: "Currently unavailable",
      lastContact: "09/15/2025"
    }],

    contractHistory: [
    {
      id: 1,
      contractId: "CNT-2024-156",
      description: "Automotive parts distribution",
      status: "completed",
      startDate: "01/01/2024",
      endDate: "08/31/2025",
      value: "420,000",
      tripsCompleted: 89,
      commodity: "Automotive Parts",
      route: "MI → OH",
      completionRate: 100
    }],

    communicationLog: [
    {
      id: 1,
      type: "email",
      subject: "Account Status Update",
      date: "09/15/2025",
      time: "11:00 AM",
      contactPerson: "James Thompson",
      notes: "Client informed of temporary business suspension. Agreed to reconnect in Q1 2026 for contract renewal.",
      loggedBy: "Mark Johnson",
      followUpRequired: true,
      followUpDate: "01/15/2026",
      attachments: []
    }],

    performance: {
      onTimeRate: 91,
      satisfaction: 4.2,
      totalShipments: 89,
      issuesReported: 12,
      recentIssues: []
    }
  },
  {
    id: 5,
    companyName: "FreshFoods Distribution",
    primaryContact: "Maria Garcia",
    activeContracts: 10,
    rating: 4,
    status: "active",
    totalTrips: 198,
    totalRevenue: "950,000",
    city: "Miami",
    state: "FL",
    phone: "+1 (555) 567-8901",
    email: "contact@freshfoods.com",
    taxId: "89-0123456",
    industry: "Food & Beverage",
    customerSince: "11/12/2020",
    accountManager: "Carlos Rodriguez",
    address: "7890 Distribution Center Road",
    zipCode: "33101",
    country: "United States",
    serviceLevel: "Premium",
    paymentTerms: "Net 30",
    creditLimit: "400,000",
    billingFrequency: "Bi-weekly",
    notes: "Perishable goods client requiring refrigerated transport. Time-sensitive deliveries with strict temperature requirements.",
    spocContacts: [
    {
      id: 1,
      name: "Maria Garcia",
      designation: "Distribution Manager",
      role: "primary",
      email: "m.garcia@freshfoods.com",
      phone: "+1 (555) 567-8901",
      location: "Miami, FL",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103c16fd1-1763300797899.png",
      avatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing red blazer and white blouse",
      availability: "available",
      communicationPreferences: ["Phone", "SMS", "Email"],
      availabilitySchedule: "Mon-Sat, 6:00 AM - 8:00 PM EST",
      lastContact: "11/26/2025"
    }],

    contractHistory: [
    {
      id: 1,
      contractId: "CNT-2025-067",
      description: "Fresh produce cold chain logistics",
      status: "active",
      startDate: "03/01/2025",
      endDate: "02/28/2026",
      value: "580,000",
      tripsCompleted: 67,
      commodity: "Perishable Foods",
      route: "FL → Southeast",
      completionRate: 78
    }],

    communicationLog: [
    {
      id: 1,
      type: "call",
      subject: "Holiday Season Capacity Planning",
      date: "11/26/2025",
      time: "1:30 PM",
      contactPerson: "Maria Garcia",
      notes: "Discussed increased capacity requirements for holiday season. Agreed to allocate 3 additional refrigerated vehicles.",
      loggedBy: "Carlos Rodriguez",
      followUpRequired: false,
      followUpDate: null,
      attachments: []
    }],

    performance: {
      onTimeRate: 95,
      satisfaction: 4.6,
      totalShipments: 198,
      issuesReported: 7,
      recentIssues: [
      {
        id: 1,
        title: "Refrigeration unit maintenance",
        description: "Scheduled maintenance performed on refrigerated vehicle during non-peak hours.",
        date: "11/18/2025",
        resolved: true,
        resolution: "Maintenance completed successfully. Vehicle back in service."
      }]

    }
  }];


  const filteredCustomers = mockCustomers?.filter((customer) => {
    const matchesSearch = customer?.companyName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    customer?.primaryContact?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer?.status === statusFilter;
    return matchesSearch && matchesStatus;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a?.companyName?.localeCompare(b?.companyName);
      case 'contracts':
        return b?.activeContracts - a?.activeContracts;
      case 'rating':
        return b?.rating - a?.rating;
      case 'recent':
        return new Date(b.customerSince) - new Date(a.customerSince);
      default:
        return 0;
    }
  });

  const handleAddCustomer = () => {
    console.log('Add new customer');
  };

  const handleEditCustomer = () => {
    console.log('Edit customer:', selectedCustomer?.id);
  };

  const handleDeleteCustomer = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCustomer?.companyName}?`)) {
      console.log('Delete customer:', selectedCustomer?.id);
      setSelectedCustomer(null);
    }
  };

  const handleBulkExport = () => {
    console.log('Export customer list');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <MainSidebar onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className="flex-1 flex flex-col overflow-hidden main-content">
        <BreadcrumbNavigation />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-2/5 border-r border-slate-200">
            <CustomerListPanel
              customers={filteredCustomers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onAddCustomer={handleAddCustomer}
              onBulkExport={handleBulkExport} />

          </div>
          
          <div className="flex-1">
            <CustomerProfilePanel
              customer={selectedCustomer}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer} />

          </div>
        </div>
      </div>
    </div>);

};

export default CustomerMasterData;