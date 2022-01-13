import { combineReducers } from '@reduxjs/toolkit'

import favoriteReducer from './favorite'
import authReducer from './auth'

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
