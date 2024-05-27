import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { addFavorite, loadOffers, loadSelectedOffer, loadSelectedOfferComments, redirectToRoute, requireAuthorization, saveEmail, setError, setOffersDataLoadingStatus, setSelectedOfferDataLoadingStatus, showMessageInitial } from './action';
import { store } from '.';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthorizationStatus } from '../components/constants/status';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../components/constants/app-route';
import { FavoriteData } from '../types/favorite-data';
import { OfferData } from '../types/offer-data';
import { Review } from '../types/review';
import { CommentData } from '../types/comment-data';

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>('/offers');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(showMessageInitial(false));
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(saveEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
    dispatch(showMessageInitial(true));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(saveEmail(email));
    dispatch(redirectToRoute(AppRoute.Main));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(addFavorite([]));
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

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (id , { dispatch, extra: api }) => {
    dispatch(setSelectedOfferDataLoadingStatus(true));
    const { data : offerData } = await api.get<OfferData>(`${APIRoute.Offers}/${id}`);
    const { data : reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
    const { data : nearbyOffers } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadSelectedOffer({offerData, reviews, nearbyOffers}));
    dispatch(setSelectedOfferDataLoadingStatus(false));
  }
);

export const postComment = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/post',
  async ({ comment, offerId, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    const { data : reviews } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadSelectedOfferComments(reviews));
  },
);
