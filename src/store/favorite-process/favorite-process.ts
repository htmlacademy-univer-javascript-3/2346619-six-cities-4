import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: FavoriteProcess = {
  favorites: []
};

export const favoriteProcess = createSlice({
  name: NameSpace.FavoriteProcess,
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    }
  },
});

export const {addFavorite} = favoriteProcess.actions;
