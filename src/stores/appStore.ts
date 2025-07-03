import { create } from 'zustand';
import { AppSettings, MenuItem } from '@/types';
import appSettings from '@/config/appsettings.json';

interface AppState {
  settings: AppSettings;
  menuItems: MenuItem[];
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setMenuItems: (items: MenuItem[]) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const appStore = create<AppState>((set) => ({
  settings: appSettings as AppSettings,
  menuItems: [],
  theme: 'light',
  sidebarCollapsed: false,

  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setMenuItems: (menuItems) => {
    set({ menuItems });
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },
}));
