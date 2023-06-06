import { ACTIONTYPE } from "../types";

export const addBlog = (blog: any) => {
  return {
    type: ACTIONTYPE.ADD_BLOG,
    payload: blog,
  };
};

export const updateBlog = (blogs: []) => {
  return {
    type: ACTIONTYPE.UPDATE_BLOG,
    payload: blogs,
  };
};
