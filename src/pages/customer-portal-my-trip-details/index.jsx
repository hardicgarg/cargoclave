import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerPortalMyTripDetails = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const tripData = {
    id: 'TRP-2025-1127',
    contractId: 'CNT-2025-001',
    status: 'in-transit',
    serviceProvider: {
      name: 'Swift Logistics Solutions',
      contact: 'operations@swiftlogistics.com',
      phone: '+1 (555) 234-5678',
      rating: 4.8
    },
    driver: {
      name: 'John Mitchell',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
      avatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
      phone: '+1 (555) 987-6543',
      email: 'john.mitchell@swiftlogistics.com',
      rating: 4.9
    },
    vehicle: {
      id: 'TRK-001',
      type: '40ft Container Truck',
      plateNumber: 'ABC-1234',
      capacity: '28,000 lbs'
    },
    commodity: 'Electronics',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    estimatedDistance: 2789,
    currentLocation: 'Kansas City, MO',
    progress: 65,
    startDate: '2025-01-20 08:00 AM',
    eta: '2025-01-28 2:30 PM',
    checkpoints: [
      {
        id: 1,
        name: 'Los Angeles Distribution Center',
        address: '1234 Industrial Blvd, Los Angeles, CA 90001',
        status: 'completed',
        scheduledTime: '2025-01-20 08:00 AM',
        actualTime: '2025-01-20 08:15 AM',
        notes: 'Pickup completed. All items loaded successfully.',
        proofOfDelivery: "https://images.unsplash.com/photo-1532635026-d12867005472",
        proofOfDeliveryAlt: 'Warehouse loading dock with packages being loaded onto truck by forklift operator'
      },
      {
        id: 2,
        name: 'Phoenix Distribution Hub',
        address: '567 Logistics Way, Phoenix, AZ 85001',
        status: 'completed',
        scheduledTime: '2025-01-22 10:00 AM',
        actualTime: '2025-01-22 10:30 AM',
        notes: 'Checkpoint passed. Minor delay due to traffic.',
        proofOfDelivery: "https://images.unsplash.com/photo-1495690129813-e1c60c78f4ec",
        proofOfDeliveryAlt: 'Distribution hub building exterior with multiple loading bays and parked delivery trucks'
      },
      {
        id: 3,
        name: 'Kansas City Transit Center',
        address: '890 Commerce St, Kansas City, MO 64101',
        status: 'in-progress',
        scheduledTime: '2025-01-25 3:00 PM',
        actualTime: null,
        notes: 'Currently at checkpoint. Refueling and driver rest break.',
        proofOfDelivery: null,
        proofOfDeliveryAlt: null
      },
      {
        id: 4,
        name: 'Chicago Logistics Center',
        address: '234 Industrial Park Dr, Chicago, IL 60601',
        status: 'pending',
        scheduledTime: '2025-01-27 11:00 AM',
        actualTime: null,
        notes: null,
        proofOfDelivery: null,
        proofOfDeliveryAlt: null
      },
      {
        id: 5,
        name: 'New York Warehouse',
        address: '567 Commerce St, New York, NY 10001',
        status: 'pending',
        scheduledTime: '2025-01-28 2:30 PM',
        actualTime: null,
        notes: null,
        proofOfDelivery: null,
        proofOfDeliveryAlt: null
      }],

    communications: [
      {
        date: '2025-01-20 08:30 AM',
        type: 'notification',
        message: 'Trip started. Driver en route to Phoenix.',
        sender: 'System'
      },
      {
        date: '2025-01-22 11:00 AM',
        type: 'update',
        message: 'Passed Phoenix checkpoint. Minor 30-minute delay reported.',
        sender: 'John Mitchell'
      },
      {
        date: '2025-01-25 3:15 PM',
        type: 'update',
        message: 'Arrived at Kansas City. Taking scheduled rest break.',
        sender: 'John Mitchell'
      }],

    documents: [
      {
        name: 'Bill of Lading.pdf',
        type: 'PDF',
        size: '1.2 MB',
        uploadedDate: '2025-01-20',
        url: '#'
      },
      {
        name: 'Delivery Instructions.pdf',
        type: 'PDF',
        size: '856 KB',
        uploadedDate: '2025-01-20',
        url: '#'
      }]

  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
      'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' }
    };

    const config = statusConfig?.[status] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200'
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium border ${config?.bg} ${config?.text} ${config?.border}`}>

        {status?.replace('-', ' ')?.toUpperCase()}
      </span>);

  };

  const getCheckpointIcon = (status) => {
    if (status === 'completed') {
      return <Icon name="CheckCircle" size="1.5rem" className="text-green-600" />;
    } else if (status === 'in-progress') {
      return <Icon name="Clock" size="1.5rem" className="text-blue-600" />;
    } else {
      return <Icon name="Circle" size="1.5rem" className="text-gray-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[15rem]">
        <BreadcrumbNavigation />

        <div className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-start justify-between">
              <div>
                <button
                  onClick={() => navigate('/customer-portal-my-trips')}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2">

                  <Icon name="ArrowLeft" size="1rem" />
                  Back to My Trips
                </button>
                <h1 className="text-3xl font-bold text-foreground">{tripData?.id}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Contract: {tripData?.contractId}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(tripData?.status)}
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Details
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Building2" size="1.25rem" className="text-primary" />
                  Service Provider
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Company</label>
                    <p className="text-base font-medium text-foreground">{tripData?.serviceProvider?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Contact</label>
                    <p className="text-sm text-foreground">{tripData?.serviceProvider?.contact}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p className="text-sm text-foreground">{tripData?.serviceProvider?.phone}</p>
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <Icon name="Star" size="1rem" className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{tripData?.serviceProvider?.rating}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="User" size="1.25rem" className="text-primary" />
                  Assigned Driver
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tripData?.driver?.avatar}
                      alt={tripData?.driver?.avatarAlt}
                      className="w-16 h-16 rounded-full object-cover" />

                    <div>
                      <p className="text-base font-medium text-foreground">{tripData?.driver?.name}</p>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size="0.875rem" className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{tripData?.driver?.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Contact</label>
                    <p className="text-sm text-foreground">{tripData?.driver?.email}</p>
                    <p className="text-sm text-foreground">{tripData?.driver?.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Truck" size="1.25rem" className="text-primary" />
                  Vehicle Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Vehicle ID</label>
                    <p className="text-base font-medium text-foreground">{tripData?.vehicle?.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Type</label>
                    <p className="text-sm text-foreground">{tripData?.vehicle?.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Plate Number</label>
                    <p className="text-sm text-foreground">{tripData?.vehicle?.plateNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Capacity</label>
                    <p className="text-sm text-foreground">{tripData?.vehicle?.capacity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size="1.25rem" className="text-primary" />
                  Trip Progress
                </h3>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-medium text-foreground">{tripData?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${tripData?.progress}%` }} />

                  </div>
                </div>

                <div className="space-y-4">
                  {tripData?.checkpoints?.map((checkpoint, index) =>
                    <div key={checkpoint?.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getCheckpointIcon(checkpoint?.status)}
                        {index !== tripData?.checkpoints?.length - 1 &&
                          <div className="w-0.5 h-full bg-border mt-2" />
                        }
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{checkpoint?.name}</h4>
                          {getStatusBadge(checkpoint?.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{checkpoint?.address}</p>
                        <div className="text-sm text-foreground mb-2">
                          <span className="text-muted-foreground">Scheduled:</span> {checkpoint?.scheduledTime}
                          {checkpoint?.actualTime &&
                            <>
                              <br />
                              <span className="text-muted-foreground">Actual:</span> {checkpoint?.actualTime}
                            </>
                          }
                        </div>
                        {checkpoint?.notes &&
                          <p className="text-sm text-muted-foreground italic">{checkpoint?.notes}</p>
                        }
                        {checkpoint?.proofOfDelivery &&
                          <div className="mt-2">
                            <img
                              src={checkpoint?.proofOfDelivery}
                              alt={checkpoint?.proofOfDeliveryAlt}
                              className="w-32 h-32 object-cover rounded border border-border" />

                          </div>
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="MessageSquare" size="1.25rem" className="text-primary" />
                    Updates
                  </h3>
                  <div className="space-y-4">
                    {tripData?.communications?.map((comm, index) =>
                      <div key={index} className="border-l-2 border-primary pl-3">
                        <p className="text-sm text-foreground mb-1">{comm?.message}</p>
                        <div className="text-xs text-muted-foreground">
                          {comm?.sender} • {comm?.date}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="FileText" size="1.25rem" className="text-primary" />
                    Documents
                  </h3>
                  <div className="space-y-3">
                    {tripData?.documents?.map((doc, index) =>
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">

                        <div className="flex items-center gap-2">
                          <Icon name="FileText" size="1rem" className="text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                            <p className="text-xs text-muted-foreground">{doc?.size}</p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary/80">
                          <Icon name="Download" size="1rem" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CustomerPortalMyTripDetails;