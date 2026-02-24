import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MainSidebar from 'components/ui/MainSidebar';
import Icon from 'components/AppIcon';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import RoleCreatorTab from './components/RoleCreatorTab';
import UsersManagementTab from './components/UsersManagementTab';

const UsersRolesManagement = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const breadcrumbItems = [
    { label: 'System', href: '#' },
    { label: 'Users & Roles', href: '/users-roles-management' }
  ];

  const tabs = [
    { id: 'roles', label: 'Role Creator', icon: 'ShieldCheck' },
    { id: 'users', label: 'Users Management', icon: 'Users' }
  ];

  return (
    <>
      <Helmet>
        <title>Users & Roles Management | CargoClave</title>
        <meta name="description" content="Comprehensive administrative interface for managing user access and role-based permissions within the CargoClave system" />
      </Helmet>

      <div className="flex h-screen bg-background">
        <MainSidebar onToggleCollapse={setIsSidebarCollapsed} />
        
        <div className="flex-1 flex flex-col overflow-hidden ml-[240px]">
          <div className="border-b border-border bg-card">
            <div className="px-6 pt-4">
              <BreadcrumbNavigation items={breadcrumbItems} />
            </div>
            
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Icon name="ShieldCheck" size="1.75rem" className="text-primary" />
                    Users & Roles Management
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure roles and manage administrative access controls
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="px-6 flex gap-1 border-t border-border bg-muted/50">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-200
                    ${activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-background' :'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }
                  `}
                >
                  <Icon name={tab?.icon} size="1.125rem" />
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'roles' && <RoleCreatorTab />}
              {activeTab === 'users' && <UsersManagementTab />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UsersRolesManagement;