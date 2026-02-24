import React, { useState } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VehicleCard from './components/VehicleCard';
import VehicleDetailsPanel from './components/VehicleDetailsPanel';
import VehicleFilters from './components/VehicleFilters';
import AddVehicleModal from './components/AddVehicleModal';

const VehicleFleetManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    fuelType: 'all',
    resultCount: 12
  });

  const mockVehicles = [
    {
      id: 'VH001',
      make: 'Ford',
      model: 'F-150',
      year: 2023,
      vin: '1FTFW1E84NFA12345',
      licensePlate: 'TRK-2301',
      type: 'Box Truck',
      capacity: '10,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 87,
      totalMileage: 45230,
      avgSpeed: 52,
      fuelEfficiency: 18.5,
      totalTrips: 234,
      assignedDriver: {
        name: 'Michael Rodriguez',
        phone: '+1 (555) 234-5678',
        email: 'michael.r@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
        avatarAlt: 'Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/15/2025',
        nextService: '12/15/2025',
        totalCost: 8450,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, filter replacement, tire rotation',
            date: '11/15/2025',
            mileage: 45000,
            cost: 450
          },
          {
            type: 'Repair',
            description: 'Brake System Repair',
            details: 'Replaced front brake pads and rotors',
            date: '10/20/2025',
            mileage: 43500,
            cost: 850
          },
          {
            type: 'Inspection',
            description: 'Annual Safety Inspection',
            details: 'Comprehensive vehicle safety check',
            date: '09/10/2025',
            mileage: 42000,
            cost: 150
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8901',
          origin: 'Los Angeles, CA',
          destination: 'San Francisco, CA',
          driver: {
            name: 'Michael Rodriguez',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
            avatarAlt: 'Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform shirt'
          },
          date: '11/25/2025',
          distance: 382,
          status: 'Completed'
        },
        {
          id: 'TRP-8902',
          origin: 'San Francisco, CA',
          destination: 'Sacramento, CA',
          driver: {
            name: 'Michael Rodriguez',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
            avatarAlt: 'Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform shirt'
          },
          date: '11/24/2025',
          distance: 87,
          status: 'Completed'
        },
        {
          id: 'TRP-8903',
          origin: 'Sacramento, CA',
          destination: 'Portland, OR',
          driver: {
            name: 'Michael Rodriguez',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e09ed354-1763295969767.png",
            avatarAlt: 'Professional headshot of Hispanic male driver with short black hair wearing navy blue uniform shirt'
          },
          date: '11/23/2025',
          distance: 586,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '01/15/2025',
          expiryDate: '01/15/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '03/01/2025',
          expiryDate: '03/01/2026',
          status: 'Valid'
        },
        {
          name: 'Safety Inspection',
          type: 'Inspection',
          issueDate: '09/10/2025',
          expiryDate: '09/10/2026',
          status: 'Valid'
        },
        {
          name: 'Emission Test',
          type: 'Emission',
          issueDate: '08/20/2025',
          expiryDate: '12/20/2025',
          status: 'Expiring Soon'
        }]

    },
    {
      id: 'VH002',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2022,
      vin: '1FUJGHDV8NLBC5678',
      licensePlate: 'TRK-2302',
      type: 'Refrigerated',
      capacity: '26,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 92,
      totalMileage: 78450,
      avgSpeed: 58,
      fuelEfficiency: 8.2,
      totalTrips: 456,
      assignedDriver: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 345-6789',
        email: 'sarah.j@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_186a7b615-1763293775329.png",
        avatarAlt: 'Professional headshot of Caucasian female driver with blonde hair tied back wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/10/2025',
        nextService: '12/10/2025',
        totalCost: 12350,
        history: [
          {
            type: 'Service',
            description: 'Refrigeration Unit Service',
            details: 'Coolant refill, compressor check, temperature calibration',
            date: '11/10/2025',
            mileage: 78000,
            cost: 1200
          },
          {
            type: 'Repair',
            description: 'Transmission Repair',
            details: 'Replaced transmission fluid and filter',
            date: '10/05/2025',
            mileage: 76500,
            cost: 2500
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8904',
          origin: 'Seattle, WA',
          destination: 'Portland, OR',
          driver: {
            name: 'Sarah Johnson',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_186a7b615-1763293775329.png",
            avatarAlt: 'Professional headshot of Caucasian female driver with blonde hair tied back wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 173,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '02/10/2025',
          expiryDate: '02/10/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '02/10/2025',
          expiryDate: '02/10/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH003',
      make: 'Kenworth',
      model: 'T680',
      year: 2021,
      vin: '1XKYDP9X5MJ123456',
      licensePlate: 'TRK-2303',
      type: 'Flatbed',
      capacity: '48,000 lbs',
      fuelType: 'Diesel',
      status: 'Maintenance',
      utilizationRate: 0,
      totalMileage: 125600,
      avgSpeed: 55,
      fuelEfficiency: 7.8,
      totalTrips: 678,
      assignedDriver: null,
      maintenance: {
        lastService: '11/20/2025',
        nextService: '01/20/2026',
        totalCost: 18750,
        history: [
          {
            type: 'Repair',
            description: 'Engine Overhaul',
            details: 'Complete engine rebuild and component replacement',
            date: '11/20/2025',
            mileage: 125000,
            cost: 8500
          }]

      },
      tripHistory: [],
      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '04/15/2025',
          expiryDate: '04/15/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH004',
      make: 'Peterbilt',
      model: '579',
      year: 2023,
      vin: '1XPBDP9X5ND789012',
      licensePlate: 'TRK-2304',
      type: 'Box Truck',
      capacity: '20,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 78,
      totalMileage: 32100,
      avgSpeed: 54,
      fuelEfficiency: 9.1,
      totalTrips: 189,
      assignedDriver: {
        name: 'James Wilson',
        phone: '+1 (555) 456-7890',
        email: 'james.w@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_183f5ab63-1763296652710.png",
        avatarAlt: 'Professional headshot of African American male driver with short hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/05/2025',
        nextService: '12/05/2025',
        totalCost: 4200,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, air filter replacement, fluid top-up',
            date: '11/05/2025',
            mileage: 32000,
            cost: 380
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8905',
          origin: 'Chicago, IL',
          destination: 'Detroit, MI',
          driver: {
            name: 'James Wilson',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_183f5ab63-1763296652710.png",
            avatarAlt: 'Professional headshot of African American male driver with short hair wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 283,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '05/20/2025',
          expiryDate: '05/20/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '05/20/2025',
          expiryDate: '05/20/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH005',
      make: 'Volvo',
      model: 'VNL 760',
      year: 2022,
      vin: '4V4NC9EH5NN345678',
      licensePlate: 'TRK-2305',
      type: 'Tanker',
      capacity: '8,000 gallons',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 85,
      totalMileage: 67890,
      avgSpeed: 56,
      fuelEfficiency: 7.5,
      totalTrips: 345,
      assignedDriver: {
        name: 'Robert Chen',
        phone: '+1 (555) 567-8901',
        email: 'robert.c@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151f60f91-1763299385526.png",
        avatarAlt: 'Professional headshot of Asian male driver with short black hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '10/28/2025',
        nextService: '11/28/2025',
        totalCost: 9800,
        history: [
          {
            type: 'Service',
            description: 'Tank Inspection',
            details: 'Internal tank cleaning and pressure testing',
            date: '10/28/2025',
            mileage: 67500,
            cost: 1500
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8906',
          origin: 'Houston, TX',
          destination: 'Dallas, TX',
          driver: {
            name: 'Robert Chen',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151f60f91-1763299385526.png",
            avatarAlt: 'Professional headshot of Asian male driver with short black hair wearing navy blue uniform shirt'
          },
          date: '11/25/2025',
          distance: 239,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '06/10/2025',
          expiryDate: '06/10/2026',
          status: 'Valid'
        },
        {
          name: 'Hazmat Certification',
          type: 'Certification',
          issueDate: '07/01/2025',
          expiryDate: '07/01/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH006',
      make: 'Mack',
      model: 'Anthem',
      year: 2023,
      vin: '1M2AN07C8KM901234',
      licensePlate: 'TRK-2306',
      type: 'Box Truck',
      capacity: '15,000 lbs',
      fuelType: 'Diesel',
      status: 'In Service',
      utilizationRate: 0,
      totalMileage: 28450,
      avgSpeed: 53,
      fuelEfficiency: 8.8,
      totalTrips: 156,
      assignedDriver: null,
      maintenance: {
        lastService: '11/22/2025',
        nextService: '12/22/2025',
        totalCost: 3200,
        history: [
          {
            type: 'Service',
            description: 'Scheduled Service',
            details: 'Oil change, brake inspection, tire check',
            date: '11/22/2025',
            mileage: 28400,
            cost: 420
          }]

      },
      tripHistory: [],
      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '03/15/2025',
          expiryDate: '03/15/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH007',
      make: 'International',
      model: 'LT Series',
      year: 2021,
      vin: '3HSDJAPR5MN567890',
      licensePlate: 'TRK-2307',
      type: 'Refrigerated',
      capacity: '22,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 89,
      totalMileage: 89200,
      avgSpeed: 57,
      fuelEfficiency: 8.0,
      totalTrips: 512,
      assignedDriver: {
        name: 'Maria Garcia',
        phone: '+1 (555) 678-9012',
        email: 'maria.g@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
        avatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/12/2025',
        nextService: '12/12/2025',
        totalCost: 14500,
        history: [
          {
            type: 'Service',
            description: 'Refrigeration Maintenance',
            details: 'Compressor service, coolant replacement, temperature sensor calibration',
            date: '11/12/2025',
            mileage: 89000,
            cost: 1350
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8907',
          origin: 'Miami, FL',
          destination: 'Atlanta, GA',
          driver: {
            name: 'Maria Garcia',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1633a6836-1763301455488.png",
            avatarAlt: 'Professional headshot of Hispanic female driver with long dark hair wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 662,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '07/20/2025',
          expiryDate: '07/20/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '07/20/2025',
          expiryDate: '07/20/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH008',
      make: 'Western Star',
      model: '4700',
      year: 2022,
      vin: '5KJJALDE5MF234567',
      licensePlate: 'TRK-2308',
      type: 'Flatbed',
      capacity: '40,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 81,
      totalMileage: 54300,
      avgSpeed: 54,
      fuelEfficiency: 7.9,
      totalTrips: 298,
      assignedDriver: {
        name: 'David Thompson',
        phone: '+1 (555) 789-0123',
        email: 'david.t@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12b07153c-1763292694836.png",
        avatarAlt: 'Professional headshot of Caucasian male driver with brown hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/08/2025',
        nextService: '12/08/2025',
        totalCost: 7600,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, filter replacement, brake inspection',
            date: '11/08/2025',
            mileage: 54000,
            cost: 480
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8908',
          origin: 'Phoenix, AZ',
          destination: 'Las Vegas, NV',
          driver: {
            name: 'David Thompson',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12b07153c-1763292694836.png",
            avatarAlt: 'Professional headshot of Caucasian male driver with brown hair wearing navy blue uniform shirt'
          },
          date: '11/25/2025',
          distance: 297,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '08/05/2025',
          expiryDate: '08/05/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH009',
      make: 'Isuzu',
      model: 'NPR-HD',
      year: 2023,
      vin: 'JALC4W16X7K678901',
      licensePlate: 'TRK-2309',
      type: 'Box Truck',
      capacity: '12,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 76,
      totalMileage: 18900,
      avgSpeed: 48,
      fuelEfficiency: 12.5,
      totalTrips: 123,
      assignedDriver: {
        name: 'Jennifer Lee',
        phone: '+1 (555) 890-1234',
        email: 'jennifer.l@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
        avatarAlt: 'Professional headshot of Asian female driver with short black hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/18/2025',
        nextService: '12/18/2025',
        totalCost: 2100,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, air filter replacement, tire rotation',
            date: '11/18/2025',
            mileage: 18800,
            cost: 320
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8909',
          origin: 'Boston, MA',
          destination: 'New York, NY',
          driver: {
            name: 'Jennifer Lee',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2c344ce-1763299429241.png",
            avatarAlt: 'Professional headshot of Asian female driver with short black hair wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 215,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '09/10/2025',
          expiryDate: '09/10/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '09/10/2025',
          expiryDate: '09/10/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH010',
      make: 'Hino',
      model: '268A',
      year: 2022,
      vin: '5PVNX8JV8N4890123',
      licensePlate: 'TRK-2310',
      type: 'Box Truck',
      capacity: '14,500 lbs',
      fuelType: 'Diesel',
      status: 'Inactive',
      utilizationRate: 0,
      totalMileage: 42700,
      avgSpeed: 50,
      fuelEfficiency: 11.2,
      totalTrips: 245,
      assignedDriver: null,
      maintenance: {
        lastService: '10/15/2025',
        nextService: '11/15/2025',
        totalCost: 5400,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, brake service, tire replacement',
            date: '10/15/2025',
            mileage: 42500,
            cost: 680
          }]

      },
      tripHistory: [],
      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '10/05/2025',
          expiryDate: '10/05/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH011',
      make: 'Mercedes-Benz',
      model: 'Sprinter 3500',
      year: 2023,
      vin: 'WD3PE8CC5NP456789',
      licensePlate: 'TRK-2311',
      type: 'Box Truck',
      capacity: '5,000 lbs',
      fuelType: 'Diesel',
      status: 'Active',
      utilizationRate: 72,
      totalMileage: 15600,
      avgSpeed: 55,
      fuelEfficiency: 16.8,
      totalTrips: 98,
      assignedDriver: {
        name: 'Thomas Anderson',
        phone: '+1 (555) 901-2345',
        email: 'thomas.a@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116c94415-1763295713677.png",
        avatarAlt: 'Professional headshot of Caucasian male driver with gray hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/20/2025',
        nextService: '12/20/2025',
        totalCost: 1800,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, filter replacement, fluid check',
            date: '11/20/2025',
            mileage: 15500,
            cost: 280
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8910',
          origin: 'Denver, CO',
          destination: 'Salt Lake City, UT',
          driver: {
            name: 'Thomas Anderson',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116c94415-1763295713677.png",
            avatarAlt: 'Professional headshot of Caucasian male driver with gray hair wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 525,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '11/01/2025',
          expiryDate: '11/01/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '11/01/2025',
          expiryDate: '11/01/2026',
          status: 'Valid'
        }]

    },
    {
      id: 'VH012',
      make: 'Ram',
      model: 'ProMaster 3500',
      year: 2023,
      vin: '3C6TRVPG5NE567890',
      licensePlate: 'TRK-2312',
      type: 'Box Truck',
      capacity: '4,680 lbs',
      fuelType: 'Gasoline',
      status: 'Active',
      utilizationRate: 68,
      totalMileage: 12300,
      avgSpeed: 52,
      fuelEfficiency: 14.2,
      totalTrips: 87,
      assignedDriver: {
        name: 'Patricia Martinez',
        phone: '+1 (555) 012-3456',
        email: 'patricia.m@cargoclave.com',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3c975bc-1763294670489.png",
        avatarAlt: 'Professional headshot of Hispanic female driver with curly brown hair wearing navy blue uniform shirt'
      },
      maintenance: {
        lastService: '11/25/2025',
        nextService: '12/25/2025',
        totalCost: 1200,
        history: [
          {
            type: 'Service',
            description: 'Regular Maintenance',
            details: 'Oil change, air filter replacement, tire check',
            date: '11/25/2025',
            mileage: 12200,
            cost: 240
          }]

      },
      tripHistory: [
        {
          id: 'TRP-8911',
          origin: 'Philadelphia, PA',
          destination: 'Baltimore, MD',
          driver: {
            name: 'Patricia Martinez',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1756e8eb7-1763294548267.png",
            avatarAlt: 'Professional headshot of Hispanic female driver with curly brown hair wearing navy blue uniform shirt'
          },
          date: '11/26/2025',
          distance: 106,
          status: 'Completed'
        }],

      documents: [
        {
          name: 'Vehicle Registration',
          type: 'Registration',
          issueDate: '12/01/2025',
          expiryDate: '12/01/2026',
          status: 'Valid'
        },
        {
          name: 'Insurance Certificate',
          type: 'Insurance',
          issueDate: '12/01/2025',
          expiryDate: '12/01/2026',
          status: 'Valid'
        }]

    }];


  const [vehicles, setVehicles] = useState(mockVehicles);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      type: 'all',
      fuelType: 'all',
      resultCount: 12
    });
  };

  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      id: `VH${String(vehicles?.length + 1)?.padStart(3, '0')}`,
      ...vehicleData,
      utilizationRate: 0,
      totalMileage: 0,
      avgSpeed: 0,
      fuelEfficiency: 0,
      totalTrips: 0,
      assignedDriver: null,
      maintenance: {
        lastService: 'N/A',
        nextService: 'Pending',
        totalCost: 0,
        history: []
      },
      tripHistory: [],
      documents: []
    };
    setVehicles((prev) => [...prev, newVehicle]);
    setIsAddModalOpen(false);
  };

  const handleEditVehicle = () => {
    console.log('Edit vehicle:', selectedVehicle?.id);
  };

  const handleDeleteVehicle = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedVehicle?.make} ${selectedVehicle?.model}?`)) {
      setVehicles((prev) => prev?.filter((v) => v?.id !== selectedVehicle?.id));
      setSelectedVehicle(null);
    }
  };

  const filteredVehicles = vehicles?.filter((vehicle) => {
    const matchesSearch = filters?.search === '' ||
      vehicle?.vin?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vehicle?.licensePlate?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vehicle?.make?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      vehicle?.model?.toLowerCase()?.includes(filters?.search?.toLowerCase());

    const matchesStatus = filters?.status === 'all' || vehicle?.status === filters?.status;
    const matchesType = filters?.type === 'all' || vehicle?.type === filters?.type;
    const matchesFuelType = filters?.fuelType === 'all' || vehicle?.fuelType === filters?.fuelType;

    return matchesSearch && matchesStatus && matchesType && matchesFuelType;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <MainSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-[3.75rem]' : 'ml-[15rem]'}`}>
        <BreadcrumbNavigation />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Truck" size="1.5rem" className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Vehicle Fleet Management</h1>
                  <p className="text-slate-600">Manage and monitor your vehicle fleet operations</p>
                </div>
              </div>
              <Button variant="default" iconName="Plus" onClick={() => setIsAddModalOpen(true)}>
                Add Vehicle
              </Button>
            </div>
          </div>

          <VehicleFilters
            filters={{ ...filters, resultCount: filteredVehicles?.length }}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters} />


          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-5 space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
              {filteredVehicles?.length === 0 ?
                <div className="bg-white rounded-lg border-2 border-dashed border-slate-300 p-12 text-center">
                  <Icon name="Search" size="3rem" className="text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">No vehicles found</p>
                  <p className="text-sm text-slate-500 mt-1">Try adjusting your filters</p>
                </div> :

                filteredVehicles?.map((vehicle) =>
                  <VehicleCard
                    key={vehicle?.id}
                    vehicle={vehicle}
                    isSelected={selectedVehicle?.id === vehicle?.id}
                    onClick={() => setSelectedVehicle(vehicle)} />

                )
              }
            </div>

            <div className="col-span-7">
              <VehicleDetailsPanel
                vehicle={selectedVehicle}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle} />

            </div>
          </div>
        </main>
      </div>
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddVehicle} />

    </div>);

};

export default VehicleFleetManagement;