import React, { useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import { useSidebar } from '../../context/SidebarContext';
import ContractHeader from './components/ContractHeader';
import OverviewTab from './components/OverviewTab';
import TripsTab from './components/TripsTab';
import ActivityTimeline from './components/ActivityTimeline';
import DocumentsSection from './components/DocumentsSection';
import RelatedContracts from './components/RelatedContracts';

const ContractDetailsManagement = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const contractData = {
    contractId: "CNT-2025-001",
    status: "Active",
    customerName: "Global Logistics Corp",
    customerId: "CUST-2024-789",
    customerEmail: "operations@globallogistics.com",
    customerPhone: "+1 (555) 123-4567",
    commodity: "Electronics",
    containerType: "40ft Refrigerated",
    quantity: 25,
    weight: "18,500 lbs",
    pickupLocation: "Los Angeles Port",
    pickupAddress: "2500 Navy Way, San Pedro, CA 90731",
    pickupDate: "11/28/2025",
    pickupLat: 33.7361,
    pickupLng: -118.2722,
    dropLocation: "Chicago Distribution Center",
    dropAddress: "1200 Industrial Pkwy, Chicago, IL 60608",
    dropDate: "12/02/2025",
    distance: "2,015 miles",
    estimatedDuration: "3 days 8 hours",
    contractValue: "$45,750.00",
    paymentTerms: "Net 30",
    paymentStatus: "Pending",
    createdDate: "11/15/2025",
    spocContacts: [
    {
      name: "Jennifer Martinez",
      role: "Operations Manager",
      email: "j.martinez@globallogistics.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1587e421f-1763296481314.png",
      avatarAlt: "Professional headshot of Hispanic female operations manager with long dark hair wearing navy blue blazer"
    },
    {
      name: "David Thompson",
      role: "Logistics Coordinator",
      email: "d.thompson@globallogistics.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b31fca0a-1763292840548.png",
      avatarAlt: "Professional headshot of Caucasian male logistics coordinator with short blonde hair wearing white dress shirt"
    }]

  };

  const tripsData = [
  {
    id: 1,
    tripId: "TRP-2025-001",
    status: "In Transit",
    scheduledDate: "11/28/2025",
    route: "Los Angeles → Phoenix",
    currentLocation: "Barstow, CA",
    driver: {
      name: "John Mitchell",
      phone: "+1 (555) 111-2222",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e48bbba3-1763296151273.png",
      avatarAlt: "Professional headshot of Caucasian male driver with short brown hair wearing blue uniform shirt"
    },
    vehicle: {
      number: "TRK-2024-001",
      model: "Freightliner Cascadia"
    }
  },
  {
    id: 2,
    tripId: "TRP-2025-002",
    status: "Scheduled",
    scheduledDate: "11/30/2025",
    route: "Phoenix → Albuquerque",
    driver: {
      name: "Sarah Johnson",
      phone: "+1 (555) 222-3333",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_169d718ff-1763301649656.png",
      avatarAlt: "Professional headshot of African American female driver with curly black hair wearing blue uniform shirt"
    },
    vehicle: {
      number: "TRK-2024-002",
      model: "Volvo VNL 760"
    }
  },
  {
    id: 3,
    tripId: "TRP-2025-003",
    status: "Unassigned",
    scheduledDate: "12/01/2025",
    route: "Albuquerque → Chicago"
  }];


  const activitiesData = [
  {
    type: "status_change",
    userName: "System",
    userAvatar: "https://ui-avatars.com/api/?name=System&background=3B82F6&color=fff",
    userAvatarAlt: "System avatar with blue background and white S letter representing automated system actions",
    timestamp: "2 hours ago",
    description: "Trip TRP-2025-001 status changed to In Transit",
    details: "Driver checked in at Los Angeles Port at 08:30 AM"
  },
  {
    type: "assigned",
    userName: "Operations Manager",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1587e421f-1763296481314.png",
    userAvatarAlt: "Professional headshot of Hispanic female operations manager with long dark hair wearing navy blue blazer",
    timestamp: "5 hours ago",
    description: "Assigned driver John Mitchell to TRP-2025-001",
    details: "Vehicle: TRK-2024-001 (Freightliner Cascadia)"
  },
  {
    type: "updated",
    userName: "Jennifer Martinez",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1587e421f-1763296481314.png",
    userAvatarAlt: "Professional headshot of Hispanic female operations manager with long dark hair wearing navy blue blazer",
    timestamp: "1 day ago",
    description: "Updated pickup time for TRP-2025-001",
    details: "Changed from 06:00 AM to 08:00 AM"
  },
  {
    type: "document",
    userName: "David Thompson",
    userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b31fca0a-1763292840548.png",
    userAvatarAlt: "Professional headshot of Caucasian male logistics coordinator with short blonde hair wearing white dress shirt",
    timestamp: "2 days ago",
    description: "Uploaded shipping manifest",
    details: "File: shipping_manifest_CNT-2025-001.pdf"
  },
  {
    type: "created",
    userName: "System",
    userAvatar: "https://ui-avatars.com/api/?name=System&background=3B82F6&color=fff",
    userAvatarAlt: "System avatar with blue background and white S letter representing automated system actions",
    timestamp: "12 days ago",
    description: "Contract CNT-2025-001 created",
    details: "Initial contract value: $45,750.00"
  }];


  const documentsData = [
  {
    id: 1,
    name: "Shipping_Manifest_CNT-2025-001.pdf",
    type: "pdf",
    size: 2457600,
    uploadedDate: "11/25/2025"
  },
  {
    id: 2,
    name: "Bill_of_Lading.pdf",
    type: "pdf",
    size: 1843200,
    uploadedDate: "11/24/2025"
  },
  {
    id: 3,
    name: "Insurance_Certificate.pdf",
    type: "pdf",
    size: 3276800,
    uploadedDate: "11/20/2025"
  },
  {
    id: 4,
    name: "Route_Map.png",
    type: "png",
    size: 5242880,
    uploadedDate: "11/18/2025"
  }];


  const relatedContractsData = [
  {
    contractId: "CNT-2024-987",
    status: "Completed",
    customerName: "Global Logistics Corp",
    commodity: "Automotive Parts",
    date: "10/15/2025"
  },
  {
    contractId: "CNT-2024-856",
    status: "Completed",
    customerName: "Global Logistics Corp",
    commodity: "Consumer Goods",
    date: "09/22/2025"
  },
  {
    contractId: "CNT-2024-745",
    status: "Active",
    customerName: "Global Logistics Corp",
    commodity: "Industrial Equipment",
    date: "11/10/2025"
  }];


  const handleEdit = () => {
    console.log('Edit contract');
    window.location.href = '/new-contract-creation';
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Contract deleted');
    setShowDeleteModal(false);
    window.location.href = '/contracts-management';
  };

  const handleAssignTrip = (assignmentData) => {
    console.log('Trip assigned:', assignmentData);
  };

  const handleUploadDocument = (files) => {
    console.log('Upload documents:', files);
  };

  const handleDeleteDocument = (docId) => {
    console.log('Delete document:', docId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MainSidebar isCollapsed={isCollapsed} onToggleCollapse={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <BreadcrumbNavigation />
        
        <ContractHeader
          contract={contractData}
          onEdit={handleEdit}
          onDelete={handleDelete} />


        <div className="p-6">
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-slate-200 mb-6">
                <div className="border-b border-slate-200">
                  <div className="flex space-x-1 p-1">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
                      }>

                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('trips')}
                      className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'trips' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
                      }>

                      Trips ({tripsData?.length})
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && <OverviewTab contract={contractData} />}
                  {activeTab === 'trips' &&
                  <TripsTab
                    trips={tripsData}
                    onAssignTrip={handleAssignTrip}
                    onUpdateStatus={(tripId, status) => console.log('Update status:', tripId, status)} />

                  }
                </div>
              </div>
            </div>

            <div className="w-96 space-y-6">
              <ActivityTimeline activities={activitiesData} />
              <DocumentsSection
                documents={documentsData}
                onUpload={handleUploadDocument}
                onDelete={handleDeleteDocument} />

              <RelatedContracts contracts={relatedContractsData} />
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Contract</h3>
                <p className="text-sm text-slate-600">
                  Are you sure you want to delete contract {contractData?.contractId}? This action cannot be undone and will affect all associated trips.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">

                Cancel
              </button>
              <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">

                Delete Contract
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ContractDetailsManagement;