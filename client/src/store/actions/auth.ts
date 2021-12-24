import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, AUTH_USER } from "../types";
import { eraseCookie, readCookie } from "../../utils/utils";
import { REACTURL } from "../../config/env";

export const loginUser = (dataToSubmit: any) => {
  const request = axios
    .post(`${REACTURL}/api/users/login`, dataToSubmit, {
      withCredentials: true,
    })
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const logoutUser = () => {
  eraseCookie("token");

  return {
    type: LOGOUT_USER,
  };
};

export const auth = () => {
  const request = axios
    .get(`${REACTURL}/api/users/auth`, {
      headers: {
        Authorization: `Bearer ${readCookie("token")}`,
      },
    })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.response);
    });

  return {
    type: AUTH_USER,
    payload: request,
  };
};
