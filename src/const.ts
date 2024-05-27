import { Offer } from './types/offer';

export const getFilter = (offers: Offer[] | undefined, filterType: string): Offer[] | undefined => {
  const defaultOffers = offers?.slice();
  switch (filterType) {
    case 'Popular':
      return offers;
    case 'Price: low to high':
      return defaultOffers?.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return defaultOffers?.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return defaultOffers?.sort((a, b) => b.rating - a.rating);
  }
};

export default getFilter;

export const TIMEOUT_SHOW_ERROR = 2000;

export const cities = ['Paris', 'Amsterdam', 'Cologne', 'Brussels', 'Hamburg', 'Dusseldorf'];

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments'
}

const monthsMap = new Map ([
  ['01', 'January'],
  ['02', 'February'],
  ['03', 'March'],
  ['04', 'April'],
  ['05', 'May'],
  ['06', 'June'],
  ['07', 'July'],
  ['08', 'August'],
  ['09', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December'],
]);

export const getCommentDate = (date: string[]): string => {
  const year = date[0];
  const month = monthsMap.get(date[1]);
  return `${year} ${month}`;
};
