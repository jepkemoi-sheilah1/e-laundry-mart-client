export const DEFAULT_ROUTES: { [key: string]: string } = {
  admin: '/admin/dashboard',
  user: '/user/home',
  vendor: '/vendor/dashboard',
};

export type UserRole = 'admin' | 'user' | 'vendor'; // Define UserRole type
