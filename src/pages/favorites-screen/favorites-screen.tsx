import LoginHeader from '../../components/login-header/login-header';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorite-process/selectors';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <LoginHeader />
        </div>
      </header>
      {favorites.length === 0 ? (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList />
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
