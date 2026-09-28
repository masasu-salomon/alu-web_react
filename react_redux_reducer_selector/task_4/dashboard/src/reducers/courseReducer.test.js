import { fromJS } from 'immutable';
import courseReducer from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

describe('courseReducer (Immutable + Normalizr)', () => {
  const data = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  it('should return the initial state', () => {
    const state = courseReducer(undefined, {});
    expect(state.toJS()).toEqual({ courses: {} });
  });

  it('should handle FETCH_COURSE_SUCCESS and normalize data', () => {
    const action = { type: FETCH_COURSE_SUCCESS, data };
    const newState = courseReducer(undefined, action);
    const courses = newState.get('courses').toJS();

    expect(courses['1'].isSelected).toBe(false);
    expect(courses['2'].name).toBe('Webpack');
  });

  it('should handle SELECT_COURSE correctly', () => {
    const actionFetch = { type: FETCH_COURSE_SUCCESS, data };
    const loadedState = courseReducer(undefined, actionFetch);

    const actionSelect = { type: SELECT_COURSE, index: 2 };
    const newState = courseReducer(loadedState, actionSelect);
    expect(newState.getIn(['courses', '2', 'isSelected'])).toBe(true);
  });

  it('should handle UNSELECT_COURSE correctly', () => {
    const actionFetch = { type: FETCH_COURSE_SUCCESS, data };
    const loadedState = courseReducer(undefined, actionFetch);

    const actionUnselect = { type: UNSELECT_COURSE, index: 2 };
    const newState = courseReducer(loadedState, actionUnselect);
    expect(newState.getIn(['courses', '2', 'isSelected'])).toBe(false);
  });
});
