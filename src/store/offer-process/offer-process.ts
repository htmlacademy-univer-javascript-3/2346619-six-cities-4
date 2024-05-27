import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferProcess } from '../../types/state';
import { NameSpace, cities } from '../../const';
import { fetchOffersAction } from '../api-actions';
import { Point } from '../../types/point';

const initialState: OfferProcess = {
  city: cities[0],
  offers: [],
  filterType: 'Popular',
  selectedPoint: undefined,
  isOffersDataLoading: false,
};

export const offerProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeFilter: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    changeSelectedPoint: (state, action: PayloadAction<Point | undefined>) => {
      state.selectedPoint = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      });
  }
});

export const { changeCity, changeFilter, changeSelectedPoint } = offerProcess.actions;
