import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyContractDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const contractData = {
    contractId: 'CNT-2025-001',
    status: 'active',
    createdDate: '2025-01-15',
    serviceProvider: {
      name: 'Swift Logistics Solutions',
      contact: 'operations@swiftlogistics.com',
      phone: '+1 (555) 234-5678',
      rating: 4.8,
      completedTrips: 1247,
      onTimeDelivery: 96.5
    },
    commodity: 'Electronics',
    containerType: '40ft Standard Container',
    quantity: 2,
    origin: {
      address: 'Los Angeles Distribution Center, 1234 Industrial Blvd, Los Angeles, CA 90001',
      contact: 'John Manager',
      phone: '+1 (310) 555-0100'
    },
    destination: {
      address: 'New York Warehouse, 567 Commerce St, New York, NY 10001',
      contact: 'Sarah Receiver',
      phone: '+1 (212) 555-0200'
    },
    value: 125000,
    priority: 'high',
    estimatedDistance: 2789,
    estimatedDuration: '5 days',
    specialInstructions: 'Temperature controlled shipping required. Handle with care.',
    trips: [
      {
        id: 'TRP-2025-1127',
        status: 'in-transit',
        driver: 'John Mitchell',
        driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
        driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
        vehicle: 'TRK-001',
        progress: 65,
        eta: '11/28/2025 2:30 PM'
      },
      {
        id: 'TRP-2025-1128',
        status: 'completed',
        driver: 'Sarah Johnson',
        driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_138d182b8-1763297744003.png",
        driverAvatarAlt: 'Professional headshot of African American female driver with long black hair in professional attire',
        vehicle: 'TRK-003',
        progress: 100,
        completedDate: '11/25/2025 3:45 PM'
      }
    ],
    documents: [
      {
        name: 'Contract Agreement.pdf',
        type: 'PDF',
        size: '2.4 MB',
        uploadedDate: '2025-01-15',
        url: '#'
      },
      {
        name: 'Service Level Agreement.pdf',
        type: 'PDF',
        size: '1.8 MB',
        uploadedDate: '2025-01-15',
        url: '#'
      },
      {
        name: 'Insurance Certificate.pdf',
        type: 'PDF',
        size: '856 KB',
        uploadedDate: '2025-01-15',
        url: '#'
      }
    ],
    timeline: [
      {
        date: '2025-01-15 09:30 AM',
        event: 'Contract Created',
        description: 'Contract successfully created and submitted for review'
      },
      {
        date: '2025-01-15 02:15 PM',
        event: 'Service Provider Assigned',
        description: 'Swift Logistics Solutions assigned to handle shipment'
      },
      {
        date: '2025-01-16 10:00 AM',
        event: 'First Trip Scheduled',
        description: 'Trip TRP-2025-1127 scheduled for pickup'
      },
      {
        date: '2025-01-20 08:30 AM',
        event: 'Trip Completed',
        description: 'Trip TRP-2025-1128 successfully delivered'
      }
    ]
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      'on-hold': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          statusColors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}
      >
        {status?.replace('-', ' ')?.toUpperCase()}
      </span>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Building2" size="1.25rem" className="text-primary" />
            Service Provider Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Company Name</label>
              <p className="text-base font-medium text-foreground">{contractData?.serviceProvider?.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Contact Email</label>
              <p className="text-base text-foreground">{contractData?.serviceProvider?.contact}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone Number</label>
              <p className="text-base text-foreground">{contractData?.serviceProvider?.phone}</p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <Icon name="Star" size="1rem" className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{contractData?.serviceProvider?.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {contractData?.serviceProvider?.completedTrips} trips completed
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Package" size="1.25rem" className="text-primary" />
            Shipment Details
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Commodity Type</label>
              <p className="text-base font-medium text-foreground">{contractData?.commodity}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Container Specifications</label>
              <p className="text-base text-foreground">{contractData?.containerType}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Quantity</label>
              <p className="text-base text-foreground">{contractData?.quantity} containers</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Contract Value</label>
              <p className="text-base font-semibold text-foreground">
                ${contractData?.value?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPin" size="1.25rem" className="text-primary" />
          Route Information
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Pickup Location</label>
            <div className="space-y-2">
              <p className="text-sm text-foreground">{contractData?.origin?.address}</p>
              <div className="text-sm text-muted-foreground">
                <p>Contact: {contractData?.origin?.contact}</p>
                <p>Phone: {contractData?.origin?.phone}</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Delivery Location</label>
            <div className="space-y-2">
              <p className="text-sm text-foreground">{contractData?.destination?.address}</p>
              <div className="text-sm text-muted-foreground">
                <p>Contact: {contractData?.destination?.contact}</p>
                <p>Phone: {contractData?.destination?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Estimated Distance</label>
            <p className="text-base font-medium text-foreground">
              {contractData?.estimatedDistance} miles
            </p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estimated Duration</label>
            <p className="text-base font-medium text-foreground">{contractData?.estimatedDuration}</p>
          </div>
        </div>
      </div>

      {contractData?.specialInstructions && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="AlertCircle" size="1.25rem" className="text-primary" />
            Special Instructions
          </h3>
          <p className="text-sm text-foreground">{contractData?.specialInstructions}</p>
        </div>
      )}
    </div>
  );

  const renderTripsTab = () => (
    <div className="space-y-4">
      {contractData?.trips?.map((trip) => (
        <div key={trip?.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{trip?.id}</h3>
              <p className="text-sm text-muted-foreground">
                {trip?.status === 'completed'
                  ? `Completed: ${trip?.completedDate}`
                  : `ETA: ${trip?.eta}`}
              </p>
            </div>
            {getStatusBadge(trip?.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <img
                src={trip?.driverAvatar}
                alt={trip?.driverAvatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{trip?.driver}</p>
                <p className="text-xs text-muted-foreground">{trip?.vehicle}</p>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Progress</label>
              <div className="mt-1">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${trip?.progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{trip?.progress}% Complete</p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/customer-portal-my-trip-details')}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-3">
      {contractData?.documents?.map((doc, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size="1.25rem" className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{doc?.name}</p>
              <p className="text-xs text-muted-foreground">
                {doc?.size} • Uploaded {new Date(doc?.uploadedDate)?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
            Download
          </Button>
        </div>
      ))}
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-4">
      {contractData?.timeline?.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
            {index !== contractData?.timeline?.length - 1 && (
              <div className="w-0.5 h-full bg-border" />
            )}
          </div>
          <div className="flex-1 pb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-semibold text-foreground">{item?.event}</h4>
                <span className="text-xs text-muted-foreground">{item?.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <BreadcrumbNavigation />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <button
                  onClick={() => navigate('/customer-portal-my-contracts')}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
                >
                  <Icon name="ArrowLeft" size="1rem" />
                  Back to My Contracts
                </button>
                <h1 className="text-3xl font-bold text-foreground">{contractData?.contractId}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Created on {new Date(contractData?.createdDate)?.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(contractData?.status)}
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="border-b border-border mb-6">
              <nav className="flex gap-6">
                {['overview', 'trips', 'documents', 'timeline']?.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab?.charAt(0)?.toUpperCase() + tab?.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'trips' && renderTripsTab()}
            {activeTab === 'documents' && renderDocumentsTab()}
            {activeTab === 'timeline' && renderTimelineTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortalMyContractDetails;