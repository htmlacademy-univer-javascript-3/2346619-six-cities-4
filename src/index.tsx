import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-action';
import ErrorMessage from './components/error-message/error-mesage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage/>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
