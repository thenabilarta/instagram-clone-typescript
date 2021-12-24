import { LOGIN_USER, LOGOUT_USER, AUTH_USER } from "../types";

const initialState = {
  isLoggedIn: false,
  role: "none",
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, ...action.payload };

    case LOGIN_USER:
      return action.payload;

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default Reducer;
