import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { redirectToRoute } from './action';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../components/constants/app-route';
import { FavoriteData } from '../types/favorite-data';
import { OfferData } from '../types/offer-data';
import { Review } from '../types/review';
import { CommentData } from '../types/comment-data';
import { SelectedOffer } from '../types/selected-offer';
import { addFavorite } from './favorite-process/favorite-process';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './error-process/error-process';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(AppRoute.Login);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const changeFavorite = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/add',
  async ({ offerId, status, favorites }, { dispatch, extra: api }) => {
    const { data: { id } } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    if (status === 1) {
      dispatch(addFavorite(favorites.concat(id)));
    } else {
      dispatch(addFavorite(favorites.filter((offId) => offId !== offerId)));
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(addFavorite(data.map((offer) => offer.id)));
  }
);

export const fetchOfferAction = createAsyncThunk<SelectedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const { data: offerData } = await api.get<OfferData>(`${APIRoute.Offers}/${id}`);
    const { data: reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    const { data: nearbyOffers } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return { offerData, reviews, nearbyOffers };
  }
);

export const postComment = createAsyncThunk<Review[], CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/post',
  async ({ comment, offerId, rating }, { extra: api }) => {
    await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    const { data: reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return reviews;
  },
);

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    },
    TIMEOUT_SHOW_ERROR,
    );
  },
);
