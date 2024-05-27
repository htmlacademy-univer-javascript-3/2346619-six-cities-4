import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFilter } from '../../store/offer-process/offer-process';
import { getFilterType } from '../../store/offer-process/selectors';

function FilterForm(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const filterType = useAppSelector(getFilterType);
  const dispatch = useAppDispatch();
  const handleFilterTypeChange = (type: string) => {
    dispatch(changeFilter(type));
    setIsOpened(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpened(!isOpened)}>
        {filterType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${filterType === 'Popular' ? 'places__option--active' : ''}`} onClick={() => handleFilterTypeChange('Popular')} tabIndex={0}>Popular</li>
        <li className={`places__option ${filterType === 'Price: low to high' ? 'places__option--active' : ''}`} onClick={() => handleFilterTypeChange('Price: low to high')} tabIndex={0}>Price: low to high</li>
        <li className={`places__option ${filterType === 'Price: high to low' ? 'places__option--active' : ''}`} onClick={() => handleFilterTypeChange('Price: high to low')} tabIndex={0}>Price: high to low</li>
        <li className={`places__option ${filterType === 'Top rated first' ? 'places__option--active' : ''}`} onClick={() => handleFilterTypeChange('Top rated first')} tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}

export default FilterForm;
