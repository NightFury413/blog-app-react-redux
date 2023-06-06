import { ADD_USER } from "../reducer/constants";

export const addUser = (user: any) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};
