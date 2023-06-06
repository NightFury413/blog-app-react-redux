import type { User } from "../types";
import { ACTIONTYPE } from "../types";

interface UserAction {
  type: ACTIONTYPE;
  payload: User;
}

interface AuthState {
  users: User[];
}

const initialState: AuthState = {
  users: JSON.parse(localStorage.getItem("users") || "{}"),
};

export function authReducer(
  state: AuthState = initialState,
  action: UserAction
): AuthState {
  switch (action.type) {
    case ACTIONTYPE.ADD_USER:
      localStorage.setItem(
        "users",
        JSON.stringify([...state.users, action.payload])
      );
      // console.table(JSON.parse(localStorage.getItem("users") || "{}"));
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
}

export default authReducer;
