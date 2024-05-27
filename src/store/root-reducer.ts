import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { selectedOfferProcess } from './selected-offer-process/selected-offer-process';
import { favoriteProcess } from './favorite-process/favorite-process';
import { offerProcess } from './offer-process/offer-process';
import { errorProcess } from './error-process/error-process';

export const rootReducer = combineReducers({
  [NameSpace.FavoriteProcess]: favoriteProcess.reducer,
  [NameSpace.Offers]: offerProcess.reducer,
  [NameSpace.SelectedOffer]: selectedOfferProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Error]: errorProcess.reducer
});
