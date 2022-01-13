import { RootState } from './rootReducer'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../pages/UserPage'
import { Storage } from '@capacitor/storage'

const authKey = 'authKey'
const saveUserInfo = async (items: UserInfo) =>
  await Storage.set({ key: authKey, value: JSON.stringify(items) })
export interface TokenInfo {
  token: string
  expires: string | undefined
  userId: string | undefined
}
export interface UserInfo {
  user: User
  accessToken: TokenInfo
}
interface AccessTokenState {
  item?: UserInfo
  error: string | null
  inProgress: boolean
}
const initialState: AccessTokenState = {
  item: undefined,
  error: null,
  inProgress: false,
}
export const init = createAsyncThunk<UserInfo, void>('auth/init', async () => {
  const response = (await Storage.get({ key: authKey })).value
  if (!response) {
    return
  }
  try {
    return JSON.parse(response)
  } catch (error) {
    await Storage.remove({ key: authKey })
    return
  }
})

export const login = createAsyncThunk<UserInfo, UserInfo>(
  'auth/login',
  async (item: UserInfo) => {
    saveUserInfo(item)
    return item
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await Storage.remove({ key: authKey })
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(login.fulfilled, (state, { payload: token }) => {
      state.inProgress = false
      state.item = token
    })
    builder.addCase(logout.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.inProgress = false
      state.item = undefined
    })
    builder.addCase(init.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(init.fulfilled, (state, { payload: user }) => {
      state.inProgress = false
      state.item = user
    })
  },
})
export const selectToken = (state: RootState) => state.auth.item

export default authSlice.reducer
