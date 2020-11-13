import * as api from '../api';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../constants/actionTypes';

// Login User
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await api.getUser(body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);

    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => console.log(error));
    // }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
