import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { appStore } from '@/stores/appStore';
import { parseMenuXML } from '@/utils/helpers';

// Menu XML content as string
const menuXML = `<?xml version="1.0" encoding="UTF-8"?>
<menu>
  <item id="dashboard" label="Dashboard" icon="LayoutDashboard" path="/dashboard" />
  <item id="users" label="Users" icon="Users" path="/users" />
  <item id="analytics" label="Analytics" icon="BarChart3" path="/analytics" />
  <item id="settings" label="Settings" icon="Settings" path="/settings">
    <submenu>
      <item id="profile" label="Profile" icon="User" path="/settings/profile" />
      <item id="security" label="Security" icon="Shield" path="/settings/security" />
      <item id="billing" label="Billing" icon="CreditCard" path="/settings/billing" />
    </submenu>
  </item>
</menu>`;

export const Layout: React.FC = () => {
  const { menuItems, setMenuItems } = appStore();

  useEffect(() => {
    // Parse menu XML on mount
    try {
      const parsedMenu = parseMenuXML(menuXML);
      setMenuItems(parsedMenu);
    } catch (error) {
      console.error('Failed to parse menu XML:', error);
    }
  }, [setMenuItems]);

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar menuItems={menuItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
};
