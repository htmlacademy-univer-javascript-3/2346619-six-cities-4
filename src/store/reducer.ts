import {createReducer} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { changeCity, changeFilter, changeSelectedPoint, loadOffers, setError, setOffersDataLoadingStatus } from './action';
import { Point } from '../types/point';
import { cities } from '../const';

type StateType = {
  city: string;
  offers: Offer[];
  filterType: string;
  selectedPoint: Point | undefined;
  isOffersDataLoading: boolean;
  error: string | null;
}

const initialState: StateType = {
  city: cities[0],
  offers: [],
  filterType: 'Popular',
  selectedPoint: undefined,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filterType = action.payload;
    })
    .addCase(changeSelectedPoint, (state, action) => {
      state.selectedPoint = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
