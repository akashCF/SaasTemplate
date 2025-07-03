import { MenuItem } from '@/types';

// Parse XML menu configuration to MenuItem array
export function parseMenuXML(xmlString: string): MenuItem[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  function parseMenuItem(element: Element): MenuItem {
    const id = element.getAttribute('id') || '';
    const label = element.getAttribute('label') || '';
    const icon = element.getAttribute('icon') || '';
    const path = element.getAttribute('path') || '';
    
    const submenuElement = element.querySelector('submenu');
    let submenu: MenuItem[] | undefined;
    
    if (submenuElement) {
      const submenuItems = submenuElement.querySelectorAll('item');
      submenu = Array.from(submenuItems).map(parseMenuItem);
    }
    
    return {
      id,
      label,
      icon,
      path,
      submenu,
    };
  }
  
  const menuItems = xmlDoc.querySelectorAll('menu > item');
  return Array.from(menuItems).map(parseMenuItem);
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format percentage
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate avatar fallback
export function getAvatarFallback(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Check if user has permission
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes('admin');
}

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage quota exceeded or other errors
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle errors
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Handle errors
    }
  },
};
