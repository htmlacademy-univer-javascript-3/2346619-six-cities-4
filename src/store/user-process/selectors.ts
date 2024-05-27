import { AuthorizationStatus } from '../../components/constants/status';
import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getEmail = (state: State): string => state[NameSpace.User].email;
