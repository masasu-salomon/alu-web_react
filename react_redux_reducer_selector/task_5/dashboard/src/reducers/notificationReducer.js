import { Map, fromJS } from 'immutable';
import { notificationsNormalizer } from '../schema/notifications';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';

const initialState = Map({
  notifications: Map(),
  filter: 'DEFAULT',
});

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const normalized = notificationsNormalizer(action.data);
      const notificationsMap = fromJS(normalized.entities.notifications).map((notes) =>
        notes.set('isRead', false)
      );
      return state.mergeDeep({ notifications: notificationsMap });
    }

    case MARK_AS_READ:
      return state.setIn(['notifications', action.index.toString(), 'isRead'], true);

    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);

    default:
      return state;
  }
}
