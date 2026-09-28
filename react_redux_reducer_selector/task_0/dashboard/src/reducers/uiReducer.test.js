import uiReducer from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SELECT_COURSE,
} from '../actions/uiActionTypes';

describe('uiReducer tests', () => {
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  };

  it('should return the initial state when no action is passed', () => {
    const newState = uiReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should return the initial state when SELECT_COURSE is passed', () => {
    const newState = uiReducer(undefined, { type: SELECT_COURSE });
    expect(newState).toEqual(initialState);
  });

  it('should set isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const newState = uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(newState.isNotificationDrawerVisible).toBe(true);
  });

  it('should set isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER is passed', () => {
    const newState = uiReducer({ ...initialState, isNotificationDrawerVisible: true }, { type: HIDE_NOTIFICATION_DRAWER });
    expect(newState.isNotificationDrawerVisible).toBe(false);
  });

  it('should set isUserLoggedIn to true when LOGIN_SUCCESS is passed', () => {
    const newState = uiReducer(initialState, { type: LOGIN_SUCCESS });
    expect(newState.isUserLoggedIn).toBe(true);
  });

  it('should set isUserLoggedIn to false when LOGIN_FAILURE or LOGOUT is passed', () => {
    const stateAfterFailure = uiReducer(initialState, { type: LOGIN_FAILURE });
    expect(stateAfterFailure.isUserLoggedIn).toBe(false);

    const stateAfterLogout = uiReducer(initialState, { type: LOGOUT });
    expect(stateAfterLogout.isUserLoggedIn).toBe(false);
  });
});
