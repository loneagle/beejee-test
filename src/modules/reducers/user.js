import { Types } from '../actions/userActions';

const defaultState = {
  page: 0
};

const user = (state = defaultState, { type, payload }) => {
  switch (type) {
    case Types.LOAD_TASKS: {
      return {
        ...state,
        ...payload
      };
    }
    case Types.ADD_TASK: {
      return {
        ...state,
        total_task_count: state.total_task_count + 1,
        tasks: [
          ...state.tasks,
          payload
        ]
      };
    }
    default:
      return state;
  }
};

export default user;
