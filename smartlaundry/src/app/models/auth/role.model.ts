export interface Role {
  role: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export const ROLE_INFO: Role[] = [
  {
    role: 'admin',
    label: 'Administrator',
    description: 'Has full access to all features',
    icon: 'admin_panel_settings',
    color: 'blue'
  },
  {
    role: 'user',
    label: 'User',
    description: 'Can access basic features',
    icon: 'person',
    color: 'green'
  },
  {
    role: 'vendor',
    label: 'Vendor',
    description: 'Can manage laundry services and orders',
    icon: 'store',
    color: 'orange'
  }
];
