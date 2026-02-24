import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const CustomerPerformanceGrid = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
  {
    id: 1,
    companyName: "Global Logistics Inc.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_18f79ee9b-1764262802360.png",
    logoAlt: "Global Logistics Inc company logo with blue shield design",
    satisfactionScore: 4.8,
    deliveryPunctuality: 96.5,
    damageIncidents: 2,
    communicationScore: 4.9,
    contractStatus: "Active",
    contractValue: "$2.4M",
    deliveriesCompleted: 1247,
    nextReview: "2025-12-15"
  },
  {
    id: 2,
    companyName: "TechCorp Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1979d814d-1764262801837.png",
    logoAlt: "TechCorp Solutions modern tech company logo",
    satisfactionScore: 4.6,
    deliveryPunctuality: 94.2,
    damageIncidents: 1,
    communicationScore: 4.7,
    contractStatus: "Active",
    contractValue: "$1.8M",
    deliveriesCompleted: 892,
    nextReview: "2025-12-20"
  },
  {
    id: 3,
    companyName: "Prime Manufacturing",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2ac7226-1764262801826.png",
    logoAlt: "Prime Manufacturing industrial building logo",
    satisfactionScore: 4.9,
    deliveryPunctuality: 98.1,
    damageIncidents: 0,
    communicationScore: 5.0,
    contractStatus: "Active",
    contractValue: "$3.2M",
    deliveriesCompleted: 1856,
    nextReview: "2025-12-10"
  },
  {
    id: 4,
    companyName: "Retail Express Co.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_100af19f0-1764262804255.png",
    logoAlt: "Retail Express Co storefront with modern retail design",
    satisfactionScore: 4.4,
    deliveryPunctuality: 91.8,
    damageIncidents: 5,
    communicationScore: 4.5,
    contractStatus: "Renewal Due",
    contractValue: "$1.2M",
    deliveriesCompleted: 634,
    nextReview: "2025-11-30"
  },
  {
    id: 5,
    companyName: "Healthcare Supplies Ltd.",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12980f39c-1764262803831.png",
    logoAlt: "Healthcare Supplies Ltd medical cross logo",
    satisfactionScore: 4.7,
    deliveryPunctuality: 95.3,
    damageIncidents: 1,
    communicationScore: 4.8,
    contractStatus: "Active",
    contractValue: "$2.1M",
    deliveriesCompleted: 1123,
    nextReview: "2025-12-25"
  },
  {
    id: 6,
    companyName: "Food Distribution Group",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_127885302-1764262802332.png",
    logoAlt: "Food Distribution Group fresh produce logo",
    satisfactionScore: 4.5,
    deliveryPunctuality: 93.7,
    damageIncidents: 3,
    communicationScore: 4.6,
    contractStatus: "Active",
    contractValue: "$1.6M",
    deliveriesCompleted: 789,
    nextReview: "2026-01-05"
  }];


  const filteredCustomers = customers?.filter((customer) =>
  customer?.companyName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleCustomerClick = (customerId) => {
    navigate(`/customer-master-data?customerId=${customerId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success';
      case 'Renewal Due':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSatisfactionColor = (score) => {
    if (score >= 4.7) return 'text-success';
    if (score >= 4.3) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Customer Performance</h2>
        <div className="flex items-center gap-2">
          <Icon name="Users" size="1.25rem" className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{filteredCustomers?.length} Customers</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Icon name="Search" size="1.125rem" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />

      </div>

      {/* Customer Cards */}
      <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredCustomers?.map((customer) =>
        <div
          key={customer?.id}
          onClick={() => handleCustomerClick(customer?.id)}
          className="bg-background border border-border rounded-lg p-4 hover:border-primary hover:shadow-elevated transition-all cursor-pointer">

            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <img
              src={customer?.logo}
              alt={customer?.logoAlt}
              className="w-16 h-16 rounded-lg object-cover border border-border" />

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-foreground mb-1 truncate">
                  {customer?.companyName}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(customer?.contractStatus)}`}>
                    {customer?.contractStatus}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {customer?.contractValue}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Star" size="1.125rem" className={getSatisfactionColor(customer?.satisfactionScore)} fill="currentColor" />
                <span className={`text-lg font-bold ${getSatisfactionColor(customer?.satisfactionScore)}`}>
                  {customer?.satisfactionScore}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-card border border-border rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Clock" size="0.875rem" className="text-primary" />
                  <span className="text-xs text-muted-foreground">Punctuality</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{customer?.deliveryPunctuality}%</p>
              </div>
              
              <div className="bg-card border border-border rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="AlertTriangle" size="0.875rem" className="text-warning" />
                  <span className="text-xs text-muted-foreground">Incidents</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{customer?.damageIncidents}</p>
              </div>
              
              <div className="bg-card border border-border rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MessageSquare" size="0.875rem" className="text-accent" />
                  <span className="text-xs text-muted-foreground">Communication</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{customer?.communicationScore}/5.0</p>
              </div>
              
              <div className="bg-card border border-border rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Package" size="0.875rem" className="text-success" />
                  <span className="text-xs text-muted-foreground">Deliveries</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{customer?.deliveriesCompleted}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Calendar" size="0.875rem" />
                <span>Next Review: {customer?.nextReview}</span>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">
                View Details →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default CustomerPerformanceGrid;