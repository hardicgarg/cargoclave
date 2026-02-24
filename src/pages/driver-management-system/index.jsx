import React, { useState, useMemo, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import DriverCard from './components/DriverCard';
import DriverFilters from './components/DriverFilters';
import DriverProfile from './components/DriverProfile';
import BulkActionsBar from './components/BulkActionsBar';

const DriverManagementSystem = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    licenseType: 'all',
    availability: 'all',
    certification: 'all',
    performance: 'all',
    resultCount: 0
  });

  const mockDrivers = [
  {
    id: 1,
    name: "Michael Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
    avatarAlt: "Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform shirt",
    licenseNumber: "DL-CA-8945621",
    licenseType: "Class A",
    licenseStatus: "Valid",
    licenseIssueDate: "2022-03-15",
    licenseExpiryDate: "2026-03-15",
    licenseAuthority: "California DMV",
    currentAssignment: "TRP-2024-1156 (Los Angeles → Phoenix)",
    availability: "On Trip",
    rating: 4.8,
    totalTrips: 342,
    dateOfBirth: "1985-06-12",
    bloodGroup: "O+",
    phone: "+1 (555) 234-5678",
    email: "michael.rodriguez@cargoclave.com",
    address: "1234 Sunset Blvd, Los Angeles, CA 90028",
    employeeId: "EMP-2022-0156",
    joinDate: "2022-03-20",
    experience: 12,
    emergencyContactName: "Maria Rodriguez",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+1 (555) 234-5679",
    licenseDocument: "https://example.com/license1.pdf",
    medicalCertificate: "https://example.com/medical1.pdf",
    backgroundCheck: "https://example.com/background1.pdf",
    hazmatCert: "https://example.com/hazmat1.pdf"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15632a94f-1763295548468.png",
    avatarAlt: "Professional headshot of Caucasian female driver with blonde hair in ponytail wearing company uniform",
    licenseNumber: "DL-TX-7823456",
    licenseType: "Class A",
    licenseStatus: "Valid",
    licenseIssueDate: "2021-08-10",
    licenseExpiryDate: "2025-08-10",
    licenseAuthority: "Texas DPS",
    currentAssignment: null,
    availability: "Available",
    rating: 4.9,
    totalTrips: 428,
    dateOfBirth: "1988-11-25",
    bloodGroup: "A+",
    phone: "+1 (555) 345-6789",
    email: "sarah.johnson@cargoclave.com",
    address: "5678 Oak Street, Dallas, TX 75201",
    employeeId: "EMP-2021-0089",
    joinDate: "2021-08-15",
    experience: 15,
    emergencyContactName: "David Johnson",
    emergencyContactRelation: "Brother",
    emergencyContactPhone: "+1 (555) 345-6790",
    licenseDocument: "https://example.com/license2.pdf",
    medicalCertificate: "https://example.com/medical2.pdf",
    backgroundCheck: "https://example.com/background2.pdf",
    hazmatCert: "https://example.com/hazmat2.pdf"
  },
  {
    id: 3,
    name: "James Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19174f29b-1763299874307.png",
    avatarAlt: "Professional headshot of Asian male driver with short black hair and glasses wearing blue company polo shirt",
    licenseNumber: "DL-AZ-6712389",
    licenseType: "Class B",
    licenseStatus: "Expiring Soon",
    licenseIssueDate: "2020-12-05",
    licenseExpiryDate: "2024-12-05",
    licenseAuthority: "Arizona MVD",
    currentAssignment: "TRP-2024-1189 (Phoenix → Albuquerque)",
    availability: "On Trip",
    rating: 4.6,
    totalTrips: 267,
    dateOfBirth: "1990-03-18",
    bloodGroup: "B+",
    phone: "+1 (555) 456-7890",
    email: "james.chen@cargoclave.com",
    address: "9012 Desert View Dr, Phoenix, AZ 85001",
    employeeId: "EMP-2020-0234",
    joinDate: "2020-12-10",
    experience: 8,
    emergencyContactName: "Linda Chen",
    emergencyContactRelation: "Mother",
    emergencyContactPhone: "+1 (555) 456-7891",
    licenseDocument: "https://example.com/license3.pdf",
    medicalCertificate: "https://example.com/medical3.pdf",
    backgroundCheck: "https://example.com/background3.pdf",
    hazmatCert: "https://example.com/hazmat3.pdf"
  },
  {
    id: 4,
    name: "Patricia Williams",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe899efa-1763299749488.png",
    avatarAlt: "Professional headshot of African American female driver with curly black hair wearing red company jacket",
    licenseNumber: "DL-NV-5634712",
    licenseType: "Class A",
    licenseStatus: "Valid",
    licenseIssueDate: "2023-02-20",
    licenseExpiryDate: "2027-02-20",
    licenseAuthority: "Nevada DMV",
    currentAssignment: null,
    availability: "Off Duty",
    rating: 4.7,
    totalTrips: 156,
    dateOfBirth: "1992-07-30",
    bloodGroup: "AB+",
    phone: "+1 (555) 567-8901",
    email: "patricia.williams@cargoclave.com",
    address: "3456 Strip Blvd, Las Vegas, NV 89101",
    employeeId: "EMP-2023-0045",
    joinDate: "2023-02-25",
    experience: 6,
    emergencyContactName: "Robert Williams",
    emergencyContactRelation: "Father",
    emergencyContactPhone: "+1 (555) 567-8902",
    licenseDocument: "https://example.com/license4.pdf",
    medicalCertificate: "https://example.com/medical4.pdf",
    backgroundCheck: "https://example.com/background4.pdf",
    hazmatCert: "https://example.com/hazmat4.pdf"
  },
  {
    id: 5,
    name: "Robert Martinez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_198b2dbd0-1763294059481.png",
    avatarAlt: "Professional headshot of Hispanic male driver with gray hair and mustache wearing white company shirt",
    licenseNumber: "DL-NM-4523678",
    licenseType: "Class A",
    licenseStatus: "Valid",
    licenseIssueDate: "2019-05-15",
    licenseExpiryDate: "2025-05-15",
    licenseAuthority: "New Mexico MVD",
    currentAssignment: null,
    availability: "Available",
    rating: 4.9,
    totalTrips: 512,
    dateOfBirth: "1978-09-14",
    bloodGroup: "O-",
    phone: "+1 (555) 678-9012",
    email: "robert.martinez@cargoclave.com",
    address: "7890 Central Ave, Albuquerque, NM 87101",
    employeeId: "EMP-2019-0178",
    joinDate: "2019-05-20",
    experience: 20,
    emergencyContactName: "Carmen Martinez",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+1 (555) 678-9013",
    licenseDocument: "https://example.com/license5.pdf",
    medicalCertificate: "https://example.com/medical5.pdf",
    backgroundCheck: "https://example.com/background5.pdf",
    hazmatCert: "https://example.com/hazmat5.pdf"
  },
  {
    id: 6,
    name: "Jennifer Davis",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_165071dbb-1763298716209.png",
    avatarAlt: "Professional headshot of Caucasian female driver with brown hair in bun wearing green company vest",
    licenseNumber: "DL-UT-3412567",
    licenseType: "Class B",
    licenseStatus: "Valid",
    licenseIssueDate: "2022-09-10",
    licenseExpiryDate: "2026-09-10",
    licenseAuthority: "Utah DMV",
    currentAssignment: null,
    availability: "On Leave",
    rating: 4.5,
    totalTrips: 198,
    dateOfBirth: "1987-04-22",
    bloodGroup: "A-",
    phone: "+1 (555) 789-0123",
    email: "jennifer.davis@cargoclave.com",
    address: "2345 Temple Square, Salt Lake City, UT 84101",
    employeeId: "EMP-2022-0267",
    joinDate: "2022-09-15",
    experience: 9,
    emergencyContactName: "Michael Davis",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+1 (555) 789-0124",
    licenseDocument: "https://example.com/license6.pdf",
    medicalCertificate: "https://example.com/medical6.pdf",
    backgroundCheck: "https://example.com/background6.pdf",
    hazmatCert: "https://example.com/hazmat6.pdf"
  },
  {
    id: 7,
    name: "David Thompson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac0d146d-1763294431127.png",
    avatarAlt: "Professional headshot of Caucasian male driver with blonde hair wearing black company jacket and cap",
    licenseNumber: "DL-CO-2301456",
    licenseType: "Class A",
    licenseStatus: "Valid",
    licenseIssueDate: "2021-11-20",
    licenseExpiryDate: "2025-11-20",
    licenseAuthority: "Colorado DMV",
    currentAssignment: "TRP-2024-1201 (Denver → Kansas City)",
    availability: "On Trip",
    rating: 4.8,
    totalTrips: 389,
    dateOfBirth: "1983-12-08",
    bloodGroup: "B-",
    phone: "+1 (555) 890-1234",
    email: "david.thompson@cargoclave.com",
    address: "6789 Mountain View Rd, Denver, CO 80201",
    employeeId: "EMP-2021-0312",
    joinDate: "2021-11-25",
    experience: 14,
    emergencyContactName: "Susan Thompson",
    emergencyContactRelation: "Sister",
    emergencyContactPhone: "+1 (555) 890-1235",
    licenseDocument: "https://example.com/license7.pdf",
    medicalCertificate: "https://example.com/medical7.pdf",
    backgroundCheck: "https://example.com/background7.pdf",
    hazmatCert: "https://example.com/hazmat7.pdf"
  },
  {
    id: 8,
    name: "Lisa Anderson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c21fb188-1763301095388.png",
    avatarAlt: "Professional headshot of Caucasian female driver with red hair wearing orange company safety vest",
    licenseNumber: "DL-KS-1290345",
    licenseType: "Class C",
    licenseStatus: "Valid",
    licenseIssueDate: "2023-04-05",
    licenseExpiryDate: "2027-04-05",
    licenseAuthority: "Kansas DMV",
    currentAssignment: null,
    availability: "Available",
    rating: 4.6,
    totalTrips: 134,
    dateOfBirth: "1991-08-16",
    bloodGroup: "AB-",
    phone: "+1 (555) 901-2345",
    email: "lisa.anderson@cargoclave.com",
    address: "4567 Prairie Ave, Kansas City, KS 66101",
    employeeId: "EMP-2023-0089",
    joinDate: "2023-04-10",
    experience: 5,
    emergencyContactName: "John Anderson",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+1 (555) 901-2346",
    licenseDocument: "https://example.com/license8.pdf",
    medicalCertificate: "https://example.com/medical8.pdf",
    backgroundCheck: "https://example.com/background8.pdf",
    hazmatCert: "https://example.com/hazmat8.pdf"
  }];


  const filteredDrivers = useMemo(() => {
    let result = [...mockDrivers];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      result = result?.filter(
        (driver) =>
        driver?.name?.toLowerCase()?.includes(searchLower) ||
        driver?.licenseNumber?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.licenseType !== 'all') {
      result = result?.filter((driver) => driver?.licenseType === filters?.licenseType);
    }

    if (filters?.availability !== 'all') {
      result = result?.filter((driver) => driver?.availability === filters?.availability);
    }

    if (filters?.certification !== 'all') {
      result = result?.filter((driver) => driver?.licenseStatus === filters?.certification);
    }

    if (filters?.performance !== 'all') {
      if (filters?.performance === '4.5+') {
        result = result?.filter((driver) => driver?.rating >= 4.5);
      } else if (filters?.performance === '4.0+') {
        result = result?.filter((driver) => driver?.rating >= 4.0);
      } else if (filters?.performance === '3.5+') {
        result = result?.filter((driver) => driver?.rating >= 3.5);
      } else if (filters?.performance === '<3.5') {
        result = result?.filter((driver) => driver?.rating < 3.5);
      }
    }

    return result;
  }, [filters, mockDrivers]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      resultCount: key === 'search' ? prev?.resultCount : filteredDrivers?.length
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      licenseType: 'all',
      availability: 'all',
      certification: 'all',
      performance: 'all',
      resultCount: mockDrivers?.length
    });
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  const handleDriverCheckbox = (driverId) => {
    setSelectedDriverIds((prev) =>
    prev?.includes(driverId) ?
    prev?.filter((id) => id !== driverId) :
    [...prev, driverId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedDriverIds(filteredDrivers?.map((d) => d?.id));
    } else {
      setSelectedDriverIds([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for ${selectedDriverIds?.length} drivers`);
  };

  React.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      resultCount: filteredDrivers?.length
    }));
  }, [filteredDrivers?.length]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <MainSidebar onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 main-content">
        <BreadcrumbNavigation />

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Driver Management
                </h1>
                <p className="text-sm text-slate-600">
                  Manage driver profiles, certifications, and performance tracking
                </p>
              </div>
              <Button variant="default" iconName="UserPlus">
                Add New Driver
              </Button>
            </div>
          </div>

          <DriverFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters} />


          <div className="flex gap-6">
            <div className="w-[35%] flex flex-col">
              <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <Checkbox
                    label={`Select All (${filteredDrivers?.length})`}
                    checked={
                    selectedDriverIds?.length === filteredDrivers?.length &&
                    filteredDrivers?.length > 0
                    }
                    onChange={(e) => handleSelectAll(e?.target?.checked)} />

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" iconName="SlidersHorizontal" />
                    <Button variant="ghost" size="icon" iconName="Download" />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                {filteredDrivers?.map((driver) =>
                <div key={driver?.id} className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <Checkbox
                      checked={selectedDriverIds?.includes(driver?.id)}
                      onChange={() => handleDriverCheckbox(driver?.id)} />

                    </div>
                    <div className="pl-10">
                      <DriverCard
                      driver={driver}
                      isSelected={selectedDriver?.id === driver?.id}
                      onClick={() => handleDriverSelect(driver)} />

                    </div>
                  </div>
                )}

                {filteredDrivers?.length === 0 &&
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size="2rem" className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No drivers found
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button variant="outline" size="sm" onClick={handleResetFilters}>
                      Clear Filters
                    </Button>
                  </div>
                }
              </div>
            </div>

            <div className="flex-1">
              {selectedDriver ?
              <DriverProfile
                driver={selectedDriver}
                onUpdate={(updatedDriver) => {
                  console.log('Driver updated:', updatedDriver);
                }}
                onClose={() => setSelectedDriver(null)} /> :


              <div className="bg-white rounded-lg border border-slate-200 h-full flex items-center justify-center">
                  <div className="text-center p-12">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name="UserCircle" size="2.5rem" className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Select a driver to view details
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md">
                      Click on any driver card from the list to view their complete profile,
                      documents, performance metrics, and trip history
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <BulkActionsBar
        selectedCount={selectedDriverIds?.length}
        onClearSelection={() => setSelectedDriverIds([])}
        onBulkAction={handleBulkAction} />

    </div>);

};

export default DriverManagementSystem;