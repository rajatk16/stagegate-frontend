import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/graphql';
import type { RootState } from '..';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      if (!state.user) return;
      state.user.profilePicture = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const { setUser, clearUser, setProfilePicture } = userSlice.actions;
