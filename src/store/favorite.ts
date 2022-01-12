import { Character, Characters } from './../utils/query'
import { RootState } from './rootReducer'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const favoriteKey = 'favoriteKey'
export interface Favorite {
  character: Characters
  like: boolean | null
  dislike: boolean | null
}

interface FavoriteState {
  items: Favorite[]
  inProgress: boolean
  error: string | null
}
const initialState: FavoriteState = {
  items: [],
  error: null,
  inProgress: false,
}
const copyObject = (obj: any) => JSON.parse(JSON.stringify(obj))
const saveFavoriteItems = (items: Favorite[]) =>
  localStorage.setItem(favoriteKey, JSON.stringify(items))

export const initFavorite = createAsyncThunk<Favorite[] | void, void>(
  'favorite/initFavorite',
  async () => {
    try {
      const characters = JSON.parse(localStorage.getItem(favoriteKey) || '')
      if (Array.isArray(characters)) {
        return characters
      }
    } catch {}
    return []
  }
)
export const addToFavorite = createAsyncThunk<
  Favorite[],
  { item: Characters; favorite: boolean },
  { state: RootState }
>('favorite/addToFavorite', async ({ item, favorite }, { getState }) => {
  const items: Favorite[] = copyObject(getState().favorite.items)
  let newItem = items.find(({ character }) => character.id === item.id)
  if (newItem) {
    if (favorite) {
      newItem.like === true ? (newItem.like = false) : (newItem.like = true)
      newItem.dislike === true
        ? (newItem.dislike = null)
        : (newItem.dislike = null)
    } else {
      newItem.dislike === true
        ? (newItem.dislike = false)
        : (newItem.dislike = true)
      newItem.like === true ? (newItem.like = null) : (newItem.like = null)
    }
  } else {
    if (favorite) {
      items.push({ character: item, like: favorite, dislike: null })
    } else {
      items.push({ character: item, like: null, dislike: favorite })
    }
  }

  saveFavoriteItems(items)
  return items
})
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initFavorite.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(initFavorite.fulfilled, (state, { payload: favorites }) => {
      state.inProgress = false
      if (!favorites) {
        return
      }
      state.items = favorites
    })
    builder.addCase(initFavorite.rejected, (state) => {
      state.inProgress = false
    })
    builder.addCase(addToFavorite.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(
      addToFavorite.fulfilled,
      (state, { payload: favorites }) => {
        state.inProgress = false
        state.items = favorites
      }
    )
  },
})

export const selectFavoriteItems = (state: RootState) => state.favorite.items

export default favoriteSlice.reducer
