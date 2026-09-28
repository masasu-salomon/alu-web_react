import { Map, fromJS } from 'immutable';
import { coursesNormalizer } from '../schema/courses';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

const initialState = Map({
  courses: Map(),
});

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const normalized = coursesNormalizer(action.data);
      const coursesMap = fromJS(normalized.entities.courses).map((course) =>
        course.set('isSelected', false)
      );
      return state.mergeDeep({ courses: coursesMap });
    }

    case SELECT_COURSE:
      return state.setIn(['courses', action.index.toString(), 'isSelected'], true);

    case UNSELECT_COURSE:
      return state.setIn(['courses', action.index.toString(), 'isSelected'], false);

    default:
      return state;
  }
}
