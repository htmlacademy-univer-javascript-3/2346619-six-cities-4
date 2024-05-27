import { fetchOfferAction, postComment } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { SelectedOfferProcess } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: SelectedOfferProcess = {
  selectedOffer: undefined,
  isSelectedOfferDataLoading: false,
};

export const selectedOfferProcess = createSlice({
  name: NameSpace.SelectedOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isSelectedOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.selectedOffer = action.payload;
        state.isSelectedOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isSelectedOfferDataLoading = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.selectedOffer!.reviews = action.payload;
      });
  }
});
