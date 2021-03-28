import ac from "./actionTypes";
import {Action, DispatchType, IPost} from "../interfaces";
import axiosInstance from "../config/axiosInstance";

export const createPostSuccess = (post: IPost): Action => ({type: ac.CREATE_POST_SUCCESS, payload: post});
export const createPostError = (e: string): Action => ({type: ac.CREATE_POST_ERROR, payload: e});

export const getPostsStart = (): Action => ({type: ac.GET_POSTS_START});
export const getPostsSuccess = (posts: IPost[]): Action => ({type: ac.GET_POSTS_SUCCESS, payload: posts});
export const getPostsError = (e: string): Action => ({type: ac.GET_POSTS_ERROR, payload: e});

export const deletePostSuccess = (id: number): Action => ({type: ac.DELETE_POST_SUCCESS, payload: id});
export const deletePostError = (e: string): Action => ({type: ac.DELETE_POST_ERROR, payload: e});

export const editPostSuccess = (post : IPost): Action => ({type: ac.EDIT_POST_SUCCESS, payload: post});
export const editPostError = (e: string): Action => ({type: ac.EDIT_POST_ERROR, payload: e});

export const getPostInfoStart = (): Action => ({type: ac.GET_POST_INFO_START});
export const getPostInfoSuccess = (post: IPost): Action => ({type: ac.GET_POST_INFO_SUCCESS, payload: post});
export const getPostInfoError = (e: string): Action => ({type: ac.GET_POST_INFO_ERROR, payload: e});


export const searchPost = (text: string): Action => ({type: ac.SEARCH_POST, payload: text});


export const editPost = (post: IPost) => async (dispatch: DispatchType) => {
  try {
    const response = await axiosInstance.put('/posts/' + post.id, post);
    dispatch(editPostSuccess(response.data));
  } catch(e) {
    dispatch(editPostError('something went wrong'));
  }
}

export const createPost = (post: IPost) => async (dispatch: DispatchType) => {
  try {
    const response = await axiosInstance.post('/posts', post);
    dispatch(createPostSuccess(response.data));
  } catch(e) {
    dispatch(createPostError('something went wrong'));
  }
}

export const deletePost = (id: number) => async (dispatch: DispatchType) => {
  try {
    await axiosInstance.delete('/posts/' + id);
    dispatch(deletePostSuccess(id));
  } catch(e) {
    dispatch(deletePostError('something went wrong'));
  }
}

export const getAllPosts = () => async (dispatch: DispatchType) => {
  try {
    dispatch(getPostsStart());
    const response = await axiosInstance.get('/posts');
    dispatch(getPostsSuccess(response.data));
  } catch(e) {
    dispatch(getPostsError('something went wrong'));
  }
}

export const getPostInfo = (id: string) => async (dispatch: DispatchType) => {
  try {
    dispatch(getPostInfoStart());
    const response = await axiosInstance.get('/posts/' + id);
    dispatch(getPostInfoSuccess(response.data));
  } catch(e) {
    dispatch(getPostInfoError('something went wrong'));
  }
}
