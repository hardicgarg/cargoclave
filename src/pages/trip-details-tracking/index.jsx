import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TripHeader from './components/TripHeader';
import TimelineStepper from './components/TimelineStepper';
import RouteVisualization from './components/RouteVisualization';
import TripInformationPanel from './components/TripInformationPanel';
import CommunicationPanel from './components/CommunicationPanel';
import DocumentManagement from './components/DocumentManagement';
import Button from '../../components/ui/Button';


const TripDetailsTracking = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('timeline');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tripData = {
    tripId: "TRP-2025-00847",
    status: "In Transit",
    priority: "High",
    customerName: "Global Manufacturing Corp",
    commodityName: "Industrial Equipment",
    scheduledDate: "11/27/2025",
    distance: 485,
    currentLat: 28.6139,
    currentLng: 77.2090,
    lastUpdate: "2 mins ago",
    currentSpeed: 65,
    distanceCovered: 287,
    distanceRemaining: 198,
    eta: "06:30 PM",
    vehicleNumber: "DL-3C-AB-1234",
    driver: {
      name: "Rajesh Kumar",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3f78660-1763295972306.png",
      avatarAlt: "Professional headshot of Indian male driver with short black hair wearing blue uniform shirt",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@cargoclave.com",
      license: "DL-0420150012345"
    },
    vehicle: {
      number: "DL-3C-AB-1234",
      makeModel: "Tata Prima 4038.S",
      capacity: "40 Tons",
      fuelLevel: 68
    },
    customer: {
      companyName: "Global Manufacturing Corp",
      contactPerson: "Amit Sharma",
      contactPhone: "+91 11 4567 8900",
      contactEmail: "amit.sharma@globalmanufacturing.com",
      billingAddress: "Plot 45, Sector 18, Gurugram, Haryana 122015"
    },
    commodity: {
      name: "Industrial Equipment",
      containerType: "40ft High Cube",
      quantity: "2 Units",
      weight: "38,500 kg",
      value: 450000
    },
    deliveryInstructions: "Handle with extreme care. Equipment is fragile and temperature-sensitive. Ensure proper securing during transit. Delivery window: 6:00 PM - 8:00 PM. Contact site manager 30 minutes before arrival."
  };

  const checkpoints = [
  {
    id: 1,
    location: "Origin Warehouse - Delhi",
    address: "Sector 63, Noida, Uttar Pradesh 201301",
    scheduledTime: "08:00 AM",
    actualTime: "08:15 AM",
    coordinates: "28.6139° N, 77.2090° E",
    status: "Completed",
    contactPerson: "Warehouse Manager",
    contactPhone: "+91 98765 11111",
    instructions: "Load verification and documentation check completed",
    proofImages: [
    {
      url: "https://images.unsplash.com/photo-1643094871937-5f146b8138d9",
      alt: "Warehouse loading dock with industrial equipment being loaded onto truck using forklift in bright daylight"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_18a197920-1764251981955.png",
      alt: "Close-up of shipping documents and cargo manifest being verified by warehouse staff member"
    }],

    notes: "All equipment loaded successfully. Documentation verified and signed."
  },
  {
    id: 2,
    location: "Checkpoint - Meerut Toll Plaza",
    address: "NH-58, Meerut, Uttar Pradesh 250001",
    scheduledTime: "10:30 AM",
    actualTime: "10:45 AM",
    coordinates: "28.9845° N, 77.7064° E",
    status: "Completed",
    contactPerson: "Toll Operator",
    contactPhone: "+91 98765 22222",
    instructions: "Standard checkpoint verification",
    proofImages: [
    {
      url: "https://images.unsplash.com/photo-1659975673018-baff09447516",
      alt: "Highway toll plaza with truck passing through electronic toll collection gate during daytime"
    }],

    notes: "Toll payment completed. Vehicle inspection passed."
  },
  {
    id: 3,
    location: "Rest Stop - Muzaffarnagar",
    address: "Delhi-Haridwar Highway, Muzaffarnagar, Uttar Pradesh 251001",
    scheduledTime: "01:00 PM",
    actualTime: "01:20 PM",
    coordinates: "29.4727° N, 77.7085° E",
    status: "Completed",
    contactPerson: "Rest Area Manager",
    contactPhone: "+91 98765 33333",
    instructions: "Mandatory driver rest break and vehicle inspection",
    proofImages: [],
    notes: "Driver rest break completed. Vehicle fuel level checked."
  },
  {
    id: 4,
    location: "Current Location - Roorkee",
    address: "NH-58, Roorkee, Uttarakhand 247667",
    scheduledTime: "03:30 PM",
    actualTime: "03:42 PM",
    coordinates: "29.8543° N, 77.8880° E",
    status: "In Progress",
    contactPerson: "N/A",
    contactPhone: "N/A",
    instructions: "Continue to destination",
    proofImages: [],
    notes: "Vehicle currently in transit. All systems normal."
  },
  {
    id: 5,
    location: "Checkpoint - Haridwar Entry",
    address: "Haridwar Bypass, Haridwar, Uttarakhand 249401",
    scheduledTime: "05:00 PM",
    actualTime: null,
    coordinates: "29.9457° N, 78.1642° E",
    status: "Pending",
    contactPerson: "Security Officer",
    contactPhone: "+91 98765 44444",
    instructions: "Security clearance and documentation check",
    proofImages: [],
    notes: null
  },
  {
    id: 6,
    location: "Destination - Manufacturing Plant",
    address: "SIDCUL Industrial Area, Haridwar, Uttarakhand 249403",
    scheduledTime: "06:30 PM",
    actualTime: null,
    coordinates: "29.9671° N, 78.1897° E",
    status: "Pending",
    contactPerson: "Plant Manager - Vikram Singh",
    contactPhone: "+91 98765 55555",
    instructions: "Unloading at Bay 3. Quality inspection required before acceptance.",
    proofImages: [],
    notes: null
  }];


  const messages = [
  {
    id: 1,
    type: "driver",
    sender: "Rajesh Kumar",
    content: "Started journey from warehouse. All equipment loaded and secured properly.",
    timestamp: "08:15 AM"
  },
  {
    id: 2,
    type: "driver",
    sender: "Rajesh Kumar",
    content: "Crossed Meerut toll plaza. Traffic is smooth. Expected to reach on time.",
    timestamp: "10:45 AM"
  },
  {
    id: 3,
    type: "internal",
    sender: "Operations Manager",
    content: "Monitor fuel levels. Ensure driver takes mandatory rest break at Muzaffarnagar.",
    timestamp: "11:30 AM"
  },
  {
    id: 4,
    type: "customer",
    sender: "You",
    content: "Your shipment is on schedule. Current location: Roorkee. ETA: 6:30 PM",
    timestamp: "03:45 PM"
  },
  {
    id: 5,
    type: "driver",
    sender: "Rajesh Kumar",
    content: "Completed rest break. Vehicle inspection done. Continuing to destination.",
    timestamp: "01:30 PM"
  },
  {
    id: 6,
    type: "customer",
    sender: "Amit Sharma",
    content: "Thanks for the update. Our team will be ready at the unloading bay.",
    timestamp: "03:50 PM"
  }];


  const documents = [
  {
    id: 1,
    name: "Loading Proof - Origin",
    type: "image",
    category: "pod",
    url: "https://images.unsplash.com/photo-1643094871937-5f146b8138d9",
    alt: "Warehouse loading dock with industrial equipment being loaded onto truck using forklift in bright daylight",
    uploadedBy: "Rajesh Kumar",
    uploadedAt: "08:15 AM"
  },
  {
    id: 2,
    name: "Cargo Manifest",
    type: "pdf",
    category: "other",
    url: "/documents/manifest.pdf",
    alt: "PDF document icon representing cargo manifest",
    uploadedBy: "Operations Team",
    uploadedAt: "08:00 AM"
  },
  {
    id: 3,
    name: "Toll Receipt - Meerut",
    type: "image",
    category: "other",
    url: "https://images.unsplash.com/photo-1659975673018-baff09447516",
    alt: "Highway toll plaza with truck passing through electronic toll collection gate during daytime",
    uploadedBy: "Rajesh Kumar",
    uploadedAt: "10:45 AM"
  },
  {
    id: 4,
    name: "Vehicle Inspection Report",
    type: "pdf",
    category: "other",
    url: "/documents/inspection.pdf",
    alt: "PDF document icon representing vehicle inspection report",
    uploadedBy: "Maintenance Team",
    uploadedAt: "07:45 AM"
  }];


  const handleEmergencyAction = () => {
    console.log('Emergency action triggered');
  };

  const handleReassign = () => {
    console.log('Reassign driver/vehicle');
  };

  const handleModifyRoute = () => {
    console.log('Modify route');
  };

  const handleUpdateStatus = (checkpointId) => {
    console.log('Update checkpoint status:', checkpointId);
  };

  const handleUploadProof = (checkpointId) => {
    console.log('Upload proof for checkpoint:', checkpointId);
  };

  const handleSendMessage = (message, type) => {
    console.log('Send message:', message, 'Type:', type);
  };

  const handleUploadDocument = () => {
    console.log('Upload document');
  };

  const handleDeleteDocument = (documentId) => {
    console.log('Delete document:', documentId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MainSidebar
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      
      <div className="main-content">
        <BreadcrumbNavigation />
        
        <TripHeader
          tripData={tripData}
          onEmergencyAction={handleEmergencyAction}
          onReassign={handleReassign}
          onModifyRoute={handleModifyRoute} />


        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeView === 'timeline' ? 'default' : 'outline'}
              iconName="Clock"
              iconPosition="left"
              onClick={() => setActiveView('timeline')}>

              Timeline
            </Button>
            <Button
              variant={activeView === 'communication' ? 'default' : 'outline'}
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => setActiveView('communication')}>

              Communication
            </Button>
            <Button
              variant={activeView === 'documents' ? 'default' : 'outline'}
              iconName="FileText"
              iconPosition="left"
              onClick={() => setActiveView('documents')}>

              Documents
            </Button>
          </div>

          {activeView === 'timeline' &&
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <RouteVisualization tripData={tripData} />
              </div>
              <div className="lg:col-span-3 space-y-6">
                <TimelineStepper
                checkpoints={checkpoints}
                onUpdateStatus={handleUpdateStatus}
                onUploadProof={handleUploadProof} />

                <TripInformationPanel tripData={tripData} />
              </div>
            </div>
          }

          {activeView === 'communication' &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CommunicationPanel
                messages={messages}
                onSendMessage={handleSendMessage} />

              </div>
              <div>
                <TripInformationPanel tripData={tripData} />
              </div>
            </div>
          }

          {activeView === 'documents' &&
          <DocumentManagement
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onDeleteDocument={handleDeleteDocument} />

          }
        </div>
      </div>
    </div>);

};

export default TripDetailsTracking;