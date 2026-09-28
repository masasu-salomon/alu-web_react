import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from '../actions/notificationActionTypes';

const initialState = {
  notifications: [],
  filter: 'DEFAULT',
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data.map((notes) => ({
          ...notes,
          isRead: false,
        })),
      };

    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((notes) =>
          notes.id === action.index ? { ...notes, isRead: true } : notes
        ),
      };

    case SET_TYPE_FILTER:
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  }
}
