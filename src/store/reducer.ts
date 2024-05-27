import {createReducer} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { addFavorite, changeCity, changeFilter, changeSelectedPoint, loadOffers, loadSelectedOffer, loadSelectedOfferComments, requireAuthorization, saveEmail, setError, setOffersDataLoadingStatus, setSelectedOfferDataLoadingStatus, showMessageInitial } from './action';
import { Point } from '../types/point';
import { cities } from '../const';
import { AuthorizationStatus } from '../components/constants/status';
import { SelectedOffer } from '../types/selected-offer';

type StateType = {
  city: string;
  offers: Offer[];
  filterType: string;
  selectedPoint: Point | undefined;
  isOffersDataLoading: boolean;
  error: string | null;
  authorizationStatus: AuthorizationStatus;
  email: string;
  favorites: string[];
  showMessage: boolean;
  selectedOfferId: string;
  selectedOffer: SelectedOffer | undefined;
  isSelectedOfferDataLoading: boolean;
}

const initialState: StateType = {
  city: cities[0],
  offers: [],
  filterType: 'Popular',
  selectedPoint: undefined,
  isOffersDataLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  email: '',
  favorites: [],
  showMessage: true,
  selectedOfferId: '',
  selectedOffer: undefined,
  isSelectedOfferDataLoading: false,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveEmail, (state, action) => {
      state.email = action.payload;
    })
    .addCase(addFavorite, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(showMessageInitial, (state, action) => {
      state.showMessage = action.payload;
    })
    .addCase(loadSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferDataLoadingStatus, (state, action) => {
      state.isSelectedOfferDataLoading = action.payload;
    })
    .addCase(loadSelectedOfferComments, (state, action) => {
      state.selectedOffer!.reviews = action.payload;
    });
});

export {reducer};
