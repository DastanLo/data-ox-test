export interface IState {
  posts: IPost[],
  allPosts: IPost[],
  postInfo: IPost,
  authors: IAuthor[],
  comments: IComment[],
  error: null | string,
  currentPage: number,
  postsPerPage: number,
  drawerOpen: boolean,
  loading: boolean,
  commentLoading: boolean,
  authorLoading: boolean,
}

export interface IAuthor {
  username: string,
  id: string,
}

export interface IComment {
  name: string,
  email: string,
  body: string,
  id: string,
}

export interface IPost {
  title: string,
  body: string,
  id?: string,
  userId?: number,
}

export interface Action {
  type: string,
  payload?: any,
}

export type DispatchType = (arg: Action) => Action;
