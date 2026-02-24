import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathnames = location?.pathname?.split('/')?.filter((x) => x);

  const breadcrumbMap = {
    'operations-dashboard': 'Dashboard',
    'contracts-management': 'Contracts',
    'contract-details-management': 'Contract Details',
    'new-contract-creation': 'New Contract',
    'trips-monitoring-management': 'Trips',
    'trip-details-tracking': 'Trip Details',
    'commodities-container-management': 'Commodities',
    'customer-master-data': 'Customers',
    'driver-management-system': 'Drivers',
    'vehicle-fleet-management': 'Vehicles',
    'system-audit-compliance': 'Audit'
  };

  if (pathnames?.length === 0 || pathnames?.[0] === 'login-authentication') {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/operations-dashboard" className="breadcrumb-item">
        <Icon name="Home" size="1rem" className="mr-1" />
        <span>Home</span>
      </Link>
      {pathnames?.map((pathname, index) => {
        const routeTo = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
        const isLast = index === pathnames?.length - 1;
        const label = breadcrumbMap?.[pathname] || pathname;

        return (
          <React.Fragment key={pathname}>
            <span className="breadcrumb-separator">
              <Icon name="ChevronRight" size="1rem" />
            </span>
            {isLast ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-item">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BreadcrumbNavigation;