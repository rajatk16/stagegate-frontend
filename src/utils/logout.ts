import { signOut } from 'firebase/auth';
import { type NavigateFunction } from 'react-router';

import { auth } from '@/libs';
import { clearAuth, clearUser, store } from '@/store';

export const logout = async (navigate: NavigateFunction) => {
  try {
    await signOut(auth);
    store.dispatch(clearAuth());
    store.dispatch(clearUser());
    navigate('/login');
  } catch (error) {
    console.error('Logout error: ', error);
  }
};
