import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { SidebarProvider } from "./context/SidebarContext";
import NotFound from "pages/NotFound";
import VehicleFleetManagement from './pages/vehicle-fleet-management';
import CommoditiesContainerManagement from './pages/commodities-container-management';
import ContractsManagement from './pages/contracts-management';
import CustomerMasterData from './pages/customer-master-data';
import DriverManagementSystem from './pages/driver-management-system';
import ContractDetailsManagement from './pages/contract-details-management';
import LoginAuthentication from './pages/login-authentication';
import NewContractCreation from './pages/new-contract-creation';
import OperationsDashboard from './pages/operations-dashboard';
import TripDetailsTracking from './pages/trip-details-tracking';
import TripsMonitoringManagement from './pages/trips-monitoring-management';
import SystemAuditCompliance from './pages/system-audit-compliance';
import SafetyComplianceDashboard from './pages/safety-compliance-dashboard';
import FinancialAnalyticsDashboard from './pages/financial-analytics-dashboard';
import CustomerOperationsDashboard from './pages/customer-operations-dashboard';
import FleetManagementDashboard from './pages/fleet-management-dashboard';
import AnalyticsCommandDashboard from './pages/analytics-command-dashboard';
import StrategicOperationsDashboard from './pages/strategic-operations-dashboard';
import CustomerPortalMyContracts from 'pages/customer-portal-my-contracts';
import CustomerPortalMyTrips from 'pages/customer-portal-my-trips';
import CustomerPortalMyContractDetails from 'pages/customer-portal-my-contract-details';
import CustomerPortalMyTripDetails from 'pages/customer-portal-my-trip-details';
import CustomerPortalMyDashboard from 'pages/customer-portal-my-dashboard';
import CustomerPortalMyDashboard1 from 'pages/customer-portal-my-dashboard-1';
import CustomerPortalMyDashboard2 from 'pages/customer-portal-my-dashboard-2';
import CustomerPortalMyDashboard3 from 'pages/customer-portal-my-dashboard-3';
import UsersRolesManagement from './pages/users-roles-management';
import NotificationUseCaseMappingConfiguration from './pages/notification-use-case-mapping-configuration';
import NotificationTemplateDesigner from './pages/notification-template-designer';
import UnifiedNotificationTemplateDesignerUseCaseMapping from './pages/unified-notification-template-designer-use-case-mapping';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SidebarProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<LoginAuthentication />} />
            <Route path="/vehicle-fleet-management" element={<VehicleFleetManagement />} />
            <Route path="/commodities-container-management" element={<CommoditiesContainerManagement />} />
            <Route path="/contracts-management" element={<ContractsManagement />} />
            <Route path="/customer-master-data" element={<CustomerMasterData />} />
            <Route path="/driver-management-system" element={<DriverManagementSystem />} />
            <Route path="/contract-details-management" element={<ContractDetailsManagement />} />
            <Route path="/login-authentication" element={<LoginAuthentication />} />
            <Route path="/new-contract-creation" element={<NewContractCreation />} />
            <Route path="/operations-dashboard" element={<OperationsDashboard />} />
            <Route path="/customer-operations-dashboard" element={<CustomerOperationsDashboard />} />
            <Route path="/fleet-management-dashboard" element={<FleetManagementDashboard />} />
            <Route path="/trip-details-tracking" element={<TripDetailsTracking />} />
            <Route path="/trips-monitoring-management" element={<TripsMonitoringManagement />} />
            <Route path="/system-audit-compliance" element={<SystemAuditCompliance />} />
            <Route path="/safety-compliance-dashboard" element={<SafetyComplianceDashboard />} />
            <Route path="/financial-analytics-dashboard" element={<FinancialAnalyticsDashboard />} />
            <Route path="/analytics-command-dashboard" element={<AnalyticsCommandDashboard />} />
            <Route path="/strategic-operations-dashboard" element={<StrategicOperationsDashboard />} />
            <Route path="/customer-portal-my-dashboard" element={<CustomerPortalMyDashboard />} />
            <Route path="/customer-portal-my-dashboard-1" element={<CustomerPortalMyDashboard1 />} />
            <Route path="/customer-portal-my-dashboard-2" element={<CustomerPortalMyDashboard2 />} />
            <Route path="/customer-portal-my-dashboard-3" element={<CustomerPortalMyDashboard3 />} />
            <Route path="/customer-portal-my-contracts" element={<CustomerPortalMyContracts />} />
            <Route path="/customer-portal-my-trips" element={<CustomerPortalMyTrips />} />
            <Route path="/customer-portal-my-contract-details" element={<CustomerPortalMyContractDetails />} />
            <Route path="/customer-portal-my-trip-details" element={<CustomerPortalMyTripDetails />} />
            <Route path="/users-roles-management" element={<UsersRolesManagement />} />
            <Route path="/notification-use-case-mapping-configuration" element={<NotificationUseCaseMappingConfiguration />} />
            <Route path="/notification-template-designer" element={<NotificationTemplateDesigner />} />
            <Route path="/unified-notification-template-designer-use-case-mapping" element={<UnifiedNotificationTemplateDesignerUseCaseMapping />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SidebarProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;