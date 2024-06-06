import { useAppDispatch } from '../../hooks';
import { cities } from '../../const';
import { changeCity } from '../../store/offer-process/offer-process';
import { Link } from 'react-router-dom';

type CityListProps = {
  chosenCity: string;
}

function CityList({chosenCity}: CityListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return(
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <Link className={`locations__item-link tabs__item ${(city === chosenCity) ? 'tabs__item--active' : 'tabs__item--incative'}`} onClick={() => dispatch(changeCity(city))} to={'/'}>
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
