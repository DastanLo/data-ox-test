import {Action, DispatchType, IAuthor, IPost} from "../interfaces";
import ac from "./actionTypes";
import axiosInstance from "../config/axiosInstance";

export const getAuthorsStart = (): Action => ({type: ac.GET_AUTHORS_START});
export const getAuthorsSuccess = (authors: IAuthor[]): Action => ({type: ac.GET_AUTHORS_SUCCESS, payload: authors});
export const getAuthorsError = (e: string): Action => ({type: ac.GET_AUTHORS_ERROR, payload: e});

export const getAuthorPostsStart = (): Action => ({type: ac.GET_AUTHOR_POSTS_START});
export const getAuthorPostsSuccess = (posts: IPost[]): Action => ({type: ac.GET_AUTHOR_POSTS_SUCCESS, payload: posts});
export const getAuthorPostsError = (e: string): Action => ({type: ac.GET_AUTHOR_POSTS_ERROR, payload: e});

export const getAuthors = () => async (dispatch: DispatchType) => {
  try {
    dispatch(getAuthorsStart());
    const response = await axiosInstance.get('/users');
    dispatch(getAuthorsSuccess(response.data));
  } catch(e) {
    dispatch(getAuthorsError('something went wrong'));
  }
}

export const getAuthorPosts = (id: string) => async (dispatch: DispatchType) => {
  try {
    dispatch(getAuthorPostsStart());
    const response = await axiosInstance.get(`/user/${id}/posts`);
    dispatch(getAuthorPostsSuccess(response.data));
  } catch(e) {
    dispatch(getAuthorPostsError('something went wrong'));
  }
}
