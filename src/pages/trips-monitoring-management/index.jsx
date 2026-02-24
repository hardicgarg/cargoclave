import React, { useState, useMemo } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterPanel from './components/FilterPanel';
import BulkActionsBar from './components/BulkActionsBar';
import TripTableRow from './components/TripTableRow';
import LiveTrackingCard from './components/LiveTrackingCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TripsMonitoringManagement = () => {
  const [filters, setFilters] = useState({
    tripId: '',
    customer: 'all',
    driver: 'all',
    vehicle: 'all',
    startDate: '',
    endDate: '',
    status: []
  });

  const [selectedTrips, setSelectedTrips] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const mockTrips = [
  {
    id: 'TRP-2025-1127',
    contractId: 'CNT-2025-0456',
    customer: 'Acme Corporation',
    commodity: 'Electronics',
    driver: 'John Smith',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
    driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
    vehicle: 'TRK-001',
    origin: 'New York, NY',
    destination: 'Miami, FL',
    status: 'in-transit',
    progress: 65,
    currentCheckpoint: 3,
    totalCheckpoints: 5,
    eta: '11/28/2025 2:30 PM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1128',
    contractId: 'CNT-2025-0457',
    customer: 'Global Logistics Inc.',
    commodity: 'Automotive Parts',
    driver: 'Maria Garcia',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
    driverAvatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing company uniform',
    vehicle: 'TRK-003',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    status: 'delayed',
    progress: 45,
    currentCheckpoint: 2,
    totalCheckpoints: 4,
    eta: '11/27/2025 4:15 PM',
    delayMinutes: 35
  },
  {
    id: 'TRP-2025-1129',
    contractId: 'CNT-2025-0458',
    customer: 'Swift Transport Co.',
    commodity: 'Pharmaceuticals',
    driver: 'David Chen',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8b4d412-1763296666105.png",
    driverAvatarAlt: 'Professional headshot of Asian male driver with short black hair and glasses wearing blue shirt',
    vehicle: 'TRK-005',
    origin: 'Chicago, IL',
    destination: 'Houston, TX',
    status: 'in-transit',
    progress: 80,
    currentCheckpoint: 4,
    totalCheckpoints: 5,
    eta: '11/27/2025 6:45 PM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1130',
    contractId: 'CNT-2025-0459',
    customer: 'Prime Shipping Ltd.',
    commodity: 'Consumer Goods',
    driver: 'Sarah Johnson',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe899efa-1763299749488.png",
    driverAvatarAlt: 'Professional headshot of African American female driver with curly hair wearing red company jacket',
    vehicle: 'TRK-002',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    status: 'at-checkpoint',
    progress: 50,
    currentCheckpoint: 2,
    totalCheckpoints: 3,
    eta: '11/27/2025 8:00 PM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1131',
    contractId: 'CNT-2025-0460',
    customer: 'Express Cargo Services',
    commodity: 'Food & Beverages',
    driver: 'Michael Brown',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b82ab60e-1763296079393.png",
    driverAvatarAlt: 'Professional headshot of Caucasian male driver with beard wearing gray uniform shirt',
    vehicle: 'TRK-004',
    origin: 'Boston, MA',
    destination: 'Philadelphia, PA',
    status: 'scheduled',
    progress: 0,
    currentCheckpoint: 0,
    totalCheckpoints: 3,
    eta: '11/28/2025 10:00 AM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1132',
    contractId: 'CNT-2025-0461',
    customer: 'Acme Corporation',
    commodity: 'Industrial Equipment',
    driver: 'John Smith',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdbf1da3-1763299816234.png",
    driverAvatarAlt: 'Professional headshot of Caucasian male driver with short brown hair wearing navy blue uniform',
    vehicle: 'TRK-001',
    origin: 'Dallas, TX',
    destination: 'Denver, CO',
    status: 'completed',
    progress: 100,
    currentCheckpoint: 6,
    totalCheckpoints: 6,
    eta: '11/27/2025 12:00 PM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1133',
    contractId: 'CNT-2025-0462',
    customer: 'Global Logistics Inc.',
    commodity: 'Textiles',
    driver: 'Maria Garcia',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
    driverAvatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing company uniform',
    vehicle: 'TRK-003',
    origin: 'Atlanta, GA',
    destination: 'Charlotte, NC',
    status: 'in-transit',
    progress: 70,
    currentCheckpoint: 3,
    totalCheckpoints: 4,
    eta: '11/27/2025 5:30 PM',
    delayMinutes: 0
  },
  {
    id: 'TRP-2025-1134',
    contractId: 'CNT-2025-0463',
    customer: 'Swift Transport Co.',
    commodity: 'Electronics',
    driver: 'David Chen',
    driverAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a8b4d412-1763296666105.png",
    driverAvatarAlt: 'Professional headshot of Asian male driver with short black hair and glasses wearing blue shirt',
    vehicle: 'TRK-005',
    origin: 'San Francisco, CA',
    destination: 'Las Vegas, NV',
    status: 'delayed',
    progress: 55,
    currentCheckpoint: 2,
    totalCheckpoints: 4,
    eta: '11/27/2025 9:00 PM',
    delayMinutes: 45
  }];


  const filteredTrips = useMemo(() => {
    return mockTrips?.filter((trip) => {
      if (filters?.tripId && !trip?.id?.toLowerCase()?.includes(filters?.tripId?.toLowerCase())) {
        return false;
      }
      if (filters?.customer !== 'all' && trip?.customer !== filters?.customer) {
        return false;
      }
      if (filters?.driver !== 'all' && trip?.driver !== filters?.driver) {
        return false;
      }
      if (filters?.vehicle !== 'all' && trip?.vehicle !== filters?.vehicle) {
        return false;
      }
      if (filters?.status?.length > 0 && !filters?.status?.includes(trip?.status)) {
        return false;
      }
      return true;
    });
  }, [filters, mockTrips]);

  const sortedTrips = useMemo(() => {
    if (!sortConfig?.key) return filteredTrips;

    return [...filteredTrips]?.sort((a, b) => {
      if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTrips, sortConfig]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      tripId: '',
      customer: 'all',
      driver: 'all',
      vehicle: 'all',
      startDate: '',
      endDate: '',
      status: []
    });
  };

  const handleSelectTrip = (tripId, checked) => {
    setSelectedTrips((prev) =>
    checked ? [...prev, tripId] : prev?.filter((id) => id !== tripId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedTrips(checked ? sortedTrips?.map((trip) => trip?.id) : []);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = () => {
    console.log('Exporting trips data');
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-background">
      <MainSidebar onToggleCollapse={handleToggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
        <BreadcrumbNavigation />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/5 border-r border-border overflow-y-auto">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters} />

          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-card border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Trips Monitoring</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track and manage all logistics operations in real-time
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    onClick={handleExport}>

                    Export
                  </Button>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    Create Trip
                  </Button>
                </div>
              </div>
            </div>

            <BulkActionsBar
              selectedCount={selectedTrips?.length}
              onClearSelection={() => setSelectedTrips([])} />


            <div className="flex-1 overflow-hidden flex gap-4 p-6">
              <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden flex flex-col">
                <div className="overflow-x-auto flex-1">
                  <table className="w-full">
                    <thead className="bg-muted/50 sticky top-0 z-10">
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={
                            selectedTrips?.length === sortedTrips?.length &&
                            sortedTrips?.length > 0
                            }
                            onChange={(e) => handleSelectAll(e?.target?.checked)}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />

                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('id')}>

                          <div className="flex items-center gap-1">
                            Trip ID
                            <Icon name="ArrowUpDown" size="0.875rem" />
                          </div>
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('customer')}>

                          <div className="flex items-center gap-1">
                            Customer
                            <Icon name="ArrowUpDown" size="0.875rem" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Driver / Vehicle
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Route
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('status')}>

                          <div className="flex items-center gap-1">
                            Status
                            <Icon name="ArrowUpDown" size="0.875rem" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Progress
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground"
                          onClick={() => handleSort('eta')}>

                          <div className="flex items-center gap-1">
                            ETA
                            <Icon name="ArrowUpDown" size="0.875rem" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTrips?.map((trip) =>
                      <TripTableRow
                        key={trip?.id}
                        trip={trip}
                        isSelected={selectedTrips?.includes(trip?.id)}
                        onSelect={handleSelectTrip} />

                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-border px-6 py-4 bg-muted/30">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {sortedTrips?.length} of {mockTrips?.length} trips
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                      </button>
                      <span className="px-3 py-1">Page 1 of 1</span>
                      <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-80">
                <LiveTrackingCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default TripsMonitoringManagement;