import axios from 'axios';
import config from '../../config';

export const Types = {
  LOAD_TASKS: 'LOAD_TASKS',
  ADD_TASK: 'ADD_TASK',
};

const loadTasksSuccess = (data) => {
  return {
    type: Types.LOAD_TASKS,
    payload: data,
  };
};

export function addNewTask(data, configHead) {
  return (dispatch) => {
    return axios
      .post(`${config.address}create${config.name}`, data, configHead)
      .then((result) => {
        const {data: { status, message }} = result;

        switch (status) {
          case 'ok':
            dispatch(addTaskSuccess(message));
            break;
          case 'error':
            alert(message);
            break;
          default:
            alert('Server error');
        }
      })
      .catch(() => {
        alert('Server error');
      });
  }
}

const addTaskSuccess = (data) => {
  return {
    type: Types.ADD_TASK,
    payload: data,
  };
};

export function loadTasks(page, field, direction) {
  return (dispatch) => {
    return loadUsingDifferentGet(dispatch, `${config.name}&page=${page}&sort_field=${field}&sort_direction=${direction}`);
  }
}

function loadUsingDifferentGet(dispatch, url) {
  return axios
    .get(`${config.address}${url}`)
    .then((result) => {
      const {data: { status, message }} = result;

      switch (status) {
        case 'ok':
          dispatch(loadTasksSuccess(message));
          break;
        case 'error':
          alert(message);
          break;
        default:
          alert('Server error');
      }
    })
    .catch(() => {
      alert('Server error');
    });
}

export function editTask(data) {
  const { id, token, text, status } = data;
  console.log(status);
  const formData = new FormData();

  formData.append('token', token);

  if (text) {
    formData.append('text', text);
  }
  if (status || status === 0) {
    formData.append('status', status);
  }


  return (dispatch) => {
    return axios
      .post(`${config.address}edit/${id}${config.name}`, formData)
      .then((result) => {
        const {data: { status, message }} = result;

        switch (status) {
          case 'ok':
            dispatch(loadTasksSuccess(message));
            break;
          case 'error':
            console.log(message);
            break;
          default:
            alert('Server error');
        }
      })
      .catch(() => {
        alert('Server error');
      });
  };
}


