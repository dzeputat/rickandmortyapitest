import { combineReducers } from '@reduxjs/toolkit'

import favoriteReducer from './favorite'

const rootReducer = combineReducers({
  favorite: favoriteReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
