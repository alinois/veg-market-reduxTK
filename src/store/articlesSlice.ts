import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchArticles } from '../api/getArticles'
import type { Article } from '../types'

interface ArticlesState {
  data: Article[]
  loading: boolean
  error: string | null
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: null,
}

export const loadArticles = createAsyncThunk<Article[]>(
  'articles/load',
  async () => {
    return await fetchArticles()
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.error = action.error.message || 'Error loading articles'
        state.loading = false
      })
  },
})

export default articlesSlice.reducer
