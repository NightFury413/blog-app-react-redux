import type { Blog } from "../types";
import { ACTIONTYPE } from "../types";

interface BlogAction {
  type: ACTIONTYPE;
  payload: Blog;
}

interface BlogsState {
  blogs: Blog[];
}

const initialState: BlogsState = {
  blogs: JSON.parse(localStorage.getItem("blogs") || "[]"),
};

export function blogReducer(
  state: BlogsState = initialState,
  action: BlogAction
): BlogsState {
  switch (action.type) {
    case ACTIONTYPE.ADD_BLOG:
      localStorage.setItem(
        "blogs",
        JSON.stringify([...state.blogs, action.payload])
      );
      // console.table(JSON.parse(localStorage.getItem("users") || "{}"));
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };

    case ACTIONTYPE.UPDATE_BLOG:
      localStorage.setItem("blogs", JSON.stringify(action.payload));
      // console.table(JSON.parse(localStorage.getItem("users") || "{}"));
      // console.log("action", action.payload);
      return {
        ...state,
        blogs: action.payload as unknown as Blog[],
      };
    default:
      return state;
  }
}

export default blogReducer;
