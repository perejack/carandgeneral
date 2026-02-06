const ADMIN_PASSWORD_KEY = 'admin_authenticated';

export const login = (password: string): boolean => {
  if (password === 'admin123') {
    localStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(ADMIN_PASSWORD_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) === 'true';
};
