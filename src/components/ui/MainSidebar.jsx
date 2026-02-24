import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../AppIcon';

const MainSidebar = ({ onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'Dashboards',
      icon: 'LayoutDashboard',
      items: [
        { name: 'Operations', icon: 'Activity', path: '/operations-dashboard' },
        { name: 'Fleet Management', icon: 'Truck', path: '/fleet-management-dashboard' },
        { name: 'Customer Operations', icon: 'Users', path: '/customer-operations-dashboard' },
        { name: 'Safety Compliance', icon: 'Shield', path: '/safety-compliance-dashboard' },
        { name: 'Financial Analytics', icon: 'DollarSign', path: '/financial-analytics-dashboard' },
        { name: 'Analytics Command', icon: 'BarChart3', path: '/analytics-command-dashboard' },
        { name: 'Strategic Operations', icon: 'Target', path: '/strategic-operations-dashboard' }
      ]
    },
    {
      title: 'Operations',
      icon: 'Package',
      items: [
        { name: 'Contracts', icon: 'FileText', path: '/contracts-management' },
        { name: 'Trips Monitoring', icon: 'MapPin', path: '/trips-monitoring-management' },
        { name: 'New Contract', icon: 'Plus', path: '/new-contract-creation' }
      ]
    },
    {
      title: 'Notification Config',
      icon: 'Bell',
      items: [
        { name: 'Notifications and Mapping', icon: 'Bell', path: '/unified-notification-template-designer-use-case-mapping' },
        { name: 'Templates', icon: 'FileEdit', path: '/notification-template-designer' },
        { name: 'Use Case Mapping', icon: 'Settings', path: '/notification-use-case-mapping-configuration' }
      ]
    },
    {
      title: 'Fleet & Resources',
      icon: 'Truck',
      items: [
        { name: 'Vehicle Fleet', icon: 'Truck', path: '/vehicle-fleet-management' },
        { name: 'Driver Management', icon: 'Users', path: '/driver-management-system' }
      ]
    },
    {
      title: 'Data Management',
      icon: 'Database',
      items: [
        { name: 'Customer Master', icon: 'Building2', path: '/customer-master-data' },
        { name: 'Commodities & Containers', icon: 'Package', path: '/commodities-container-management' }
      ]
    },
    {
      title: 'Customer Portal',
      icon: 'UserCheck',
      items: [
        { name: 'My Dashboard', icon: 'LayoutDashboard', path: '/customer-portal-my-dashboard' },
        { name: 'My Dashboard 1', icon: 'LayoutGrid', path: '/customer-portal-my-dashboard-1' },
        { name: 'My Dashboard 2', icon: 'LayoutList', path: '/customer-portal-my-dashboard-2' },
        { name: 'My Dashboard 3', icon: 'LayoutTemplate', path: '/customer-portal-my-dashboard-3' },
        { name: 'My Contracts', icon: 'FileText', path: '/customer-portal-my-contracts' },
        { name: 'My Trips', icon: 'MapPin', path: '/customer-portal-my-trips' }
      ]
    },
    {
      title: 'Compliance',
      icon: 'Shield',
      items: [
        { name: 'System Audit', icon: 'FileSearch', path: '/system-audit-compliance' }
      ]
    },
    {
      title: 'System',
      icon: 'Settings',
      items: [
        { name: 'Users & Roles', icon: 'ShieldCheck', path: '/users-roles-management' }
      ]
    }
  ];

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  const toggleGroup = (groupIndex) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupIndex]: !prev?.[groupIndex]
    }));
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={handleMobileToggle}
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size="1.25rem" />
      </button>
      {isMobileOpen && (
        <div
          className="mobile-overlay"
          onClick={handleMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'animate-slide-in' : 'max-lg:hidden'
          }`}
      >
        <div className="sidebar-header">
          <div className="flex items-center">
            <div className="sidebar-logo">
              <Icon name="Package2" size="1.5rem" />
            </div>
            <span className="sidebar-logo-text">CargoClave</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {menuGroups?.map((group, groupIndex) => (
            <div key={groupIndex} className="nav-group">
              <div
                className="nav-group-title-wrapper"
                onClick={() => !isCollapsed && toggleGroup(groupIndex)}
              >
                <div className="nav-group-title">{group?.title}</div>
                {!isCollapsed && (
                  <div className="nav-group-toggle">
                    <Icon
                      name={collapsedGroups?.[groupIndex] ? 'ChevronRight' : 'ChevronDown'}
                      size="1rem"
                    />
                  </div>
                )}
              </div>
              {!collapsedGroups?.[groupIndex] && (
                <div className="nav-group-items">
                  {group?.items?.map((item, itemIndex) => (
                    <NavLink
                      key={itemIndex}
                      to={item?.path}
                      className={({ isActive }) =>
                        `nav-item ${isActive ? 'active' : ''}`
                      }
                      onClick={handleMobileClose}
                    >
                      <div className="nav-item-icon">
                        <Icon name={item?.icon} size="1.25rem" />
                      </div>
                      <span className="nav-item-label">{item?.name}</span>
                      {isCollapsed && (
                        <div className="tooltip">{item?.tooltip}</div>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <UserProfileDropdown isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

const UserProfileDropdown = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="user-profile">
      <div
        className="user-profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          <Icon name="User" size="1.25rem" />
        </div>
        <div className="user-info">
          <div className="user-name">Operations Manager</div>
          <div className="user-role">Admin</div>
        </div>
        <div className={`transition-transform duration-150 ${isCollapsed ? 'hidden' : ''}`}>
          <Icon
            name={isOpen ? 'ChevronUp' : 'ChevronDown'}
            size="1rem"
            className="text-muted-foreground"
          />
        </div>
      </div>

      {isOpen && !isCollapsed && (
        <div className="mt-2 animate-fade-in">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-150"
          >
            <Icon name="LogOut" size="1rem" className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MainSidebar;