import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  name: string | null;
  email: string | null;
  photo: string | null;
}

export interface userState {
  user: IUser | null
}

interface loginAC {
  payload: IUser;
}

interface renameAC {
  payload: string;
}

interface changePhotoAC {
  payload: string;
}

const initialState: userState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: userState, action: loginAC) => {
      state.user = action.payload
    },
    rename: (state: userState, action: renameAC) => {
      if (state.user) state.user.name = action.payload
    },
    changePhoto: (state: userState, action: changePhotoAC) => {
      if (state.user) state.user.photo = action.payload
    },
    logout: (state: userState) => {
      state.user = null
    },
  },
})

export const { login, rename, changePhoto, logout } = userSlice.actions
export default userSlice.reducer