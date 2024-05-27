import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';
import { fetchFavoritesAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favorites: [],
  fetchedFavorites: [],
  isFavoriteLoading: false
};

export const favoriteProcess = createSlice({
  name: NameSpace.FavoriteProcess,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    addFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.fetchedFavorites = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state) => {
        state.isFavoriteLoading = false;
      });
  }
});

export const {addFavorite, addFavoriteOffers} = favoriteProcess.actions;
