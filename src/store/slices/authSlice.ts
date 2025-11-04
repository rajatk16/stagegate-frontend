import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  email: string | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ uid: string; email: string; token: string }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loading = false;
    },
    clearAuth: (state) => {
      state.uid = null;
      state.email = null;
      state.token = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
