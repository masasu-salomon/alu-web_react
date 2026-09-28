import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';

describe('notificationReducer (Immutable + Normalizr)', () => {
  const data = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', value: 'New data available' },
  ];

  it('should return the default state', () => {
    const state = notificationReducer(undefined, {});
    expect(state.toJS()).toEqual({ filter: 'DEFAULT', notifications: {} });
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS correctly', () => {
    const action = { type: FETCH_NOTIFICATIONS_SUCCESS, data };
    const state = notificationReducer(undefined, action);
    const notifications = state.get('notifications').toJS();

    expect(notifications['1'].isRead).toBe(false);
    expect(notifications['2'].value).toBe('New resume available');
  });

  it('should handle MARK_AS_READ correctly', () => {
    const actionFetch = { type: FETCH_NOTIFICATIONS_SUCCESS, data };
    const loadedState = notificationReducer(undefined, actionFetch);

    const actionMark = { type: MARK_AS_READ, index: 2 };
    const newState = notificationReducer(loadedState, actionMark);
    expect(newState.getIn(['notifications', '2', 'isRead'])).toBe(true);
  });

  it('should handle SET_TYPE_FILTER correctly', () => {
    const actionFetch = { type: FETCH_NOTIFICATIONS_SUCCESS, data };
    const loadedState = notificationReducer(undefined, actionFetch);

    const actionFilter = { type: SET_TYPE_FILTER, filter: 'URGENT' };
    const newState = notificationReducer(loadedState, actionFilter);
    expect(newState.get('filter')).toBe('URGENT');
  });
});
