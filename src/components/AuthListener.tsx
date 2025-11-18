import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { getIdTokenResult, onIdTokenChanged, type User } from 'firebase/auth';

import { auth } from '@/libs';
import { ME } from '@/graphql';
import { useAppDispatch } from '@/hooks';
import { clearAuth, setAuth, setLoading, setUser, clearUser } from '@/store';

export const AuthListener = () => {
  const dispatch = useAppDispatch();

  const [fetchMe] = useLazyQuery(ME, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    let refreshTimer: number | undefined;

    const scheduleRefresh = async (user: User | null) => {
      if (!user) return;

      try {
        const idTokenResult = await getIdTokenResult(user, false);

        const expiresAt = new Date(idTokenResult.expirationTime).getTime();
        const now = Date.now();

        const refreshBufferMs = 5 * 60 * 1000;
        const msUntilRefresh = Math.max(expiresAt - now - refreshBufferMs, 5 * 1000);

        if (refreshTimer) window.clearTimeout(refreshTimer);

        refreshTimer = window.setTimeout(async () => {
          try {
            const freshToken = await user.getIdToken();
            dispatch(setAuth({ uid: user.uid, email: user.email ?? '', token: freshToken }));
            scheduleRefresh(user);
          } catch (error) {
            console.error('Token refresh error: ', error);
          }
        }, msUntilRefresh);
      } catch (error) {
        console.error('Failed to read token expiry: ', error);
      }
    };

    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(false);
          dispatch(
            setAuth({
              uid: user.uid,
              email: user.email ?? '',
              token,
            }),
          );

          const result = await fetchMe();

          if (result.data?.me) {
            dispatch(setUser(result.data.me));
          }

          scheduleRefresh(user);
        } catch (error) {
          console.error('Failed to get token on id change: ', error);
        }
      } else {
        dispatch(clearAuth());
        dispatch(clearUser());
        if (refreshTimer) {
          window.clearTimeout(refreshTimer);
          refreshTimer = undefined;
        }
      }

      dispatch(setLoading(false));
    });

    const onVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            const freshToken = await currentUser.getIdToken();
            dispatch(
              setAuth({
                uid: currentUser.uid,
                email: currentUser.email ?? '',
                token: freshToken,
              }),
            );
            scheduleRefresh(currentUser);
          } catch (error) {
            console.warn('Failed to refresh token on visibility change: ', error);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }
    };
  }, [dispatch, fetchMe]);

  return null;
};
