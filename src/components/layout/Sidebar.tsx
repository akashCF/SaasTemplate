import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  User, 
  Shield, 
  CreditCard,
  Menu,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appStore } from '@/stores/appStore';
import { authStore } from '@/stores/authStore';
import { MenuItem } from '@/types';
import { cn } from '@/lib/utils';

const iconMap = {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  User,
  Shield,
  CreditCard,
};

interface SidebarProps {
  menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = appStore();
  const { user, logout } = authStore();

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={20} /> : <LayoutDashboard size={20} />;
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = isActiveRoute(item.path);
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.id} className={cn('mb-1', level > 0 && 'ml-4')}>
        <Link
          to={item.path}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {getIcon(item.icon)}
          {!sidebarCollapsed && <span>{item.label}</span>}
        </Link>
        
        {hasSubmenu && !sidebarCollapsed && (
          <div className="mt-1 ml-4">
            {item.submenu!.map(subItem => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex flex-col bg-card border-r transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold">SaaS Template</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8"
        >
          <Menu size={16} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* User info and logout */}
      <div className="p-4 border-t">
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            'w-full justify-start gap-3',
            sidebarCollapsed && 'px-2'
          )}
        >
          <LogOut size={16} />
          {!sidebarCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};
