export type User = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export enum ACTIONTYPE {
  ADD_USER = "ADD_USER",
  ADD_BLOG = "ADD_BLOG",
  UPDATE_BLOG = "UPDATE_BLOG",
}

export interface Blog {
  id: Number;
  title: String;
  href: String;
  text: String;
  created_at: String;
  imageUrl: String;
  creatorName: String;
  creator: String;
  watches: Number;
  likes: Number;
  like_users: [];
}
