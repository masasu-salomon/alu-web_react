import { Map } from 'immutable';
import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SELECT_COURSE,
} from '../actions/uiActionTypes';

describe('uiReducer (with Immutable.js)', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  });

  it('should return the initial state when no action is passed', () => {
    const newState = uiReducer(undefined, {});
    expect(newState.toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when SELECT_COURSE is passed', () => {
    const newState = uiReducer(undefined, { type: SELECT_COURSE });
    expect(newState.toJS()).toEqual(initialState.toJS());
  });

  it('should set isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const newState = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(newState.get('isNotificationDrawerVisible')).toBe(true);
  });

  it('should set isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER is passed', () => {
    const currentState = initialState.set('isNotificationDrawerVisible', true);
    const newState = uiReducer(currentState, { type: HIDE_NOTIFICATION_DRAWER });
    expect(newState.get('isNotificationDrawerVisible')).toBe(false);
  });

  it('should set isUserLoggedIn to true when LOGIN_SUCCESS is passed', () => {
    const newState = uiReducer(initialState, { type: LOGIN_SUCCESS });
    expect(newState.get('isUserLoggedIn')).toBe(true);
  });

  it('should set isUserLoggedIn to false when LOGIN_FAILURE or LOGOUT is passed', () => {
    const failureState = uiReducer(initialState, { type: LOGIN_FAILURE });
    expect(failureState.get('isUserLoggedIn')).toBe(false);

    const logoutState = uiReducer(initialState, { type: LOGOUT });
    expect(logoutState.get('isUserLoggedIn')).toBe(false);
  });
});
