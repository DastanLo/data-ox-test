import ac from "./actionTypes";
import {Action, DispatchType, IComment} from "../interfaces";
import axiosInstance from "../config/axiosInstance";

export const getCommentsStart = (): Action => ({type: ac.GET_COMMENTS_START});
export const getCommentsSuccess = (comments: IComment[]): Action => ({type: ac.GET_COMMENTS_SUCCESS, payload: comments});
export const getCommentsError = (e: string): Action => ({type: ac.GET_COMMENTS_ERROR, payload: e});

export const searchComment = (text: string): Action => ({type: ac.SEARCH_COMMENT, payload: text});

export const getPostComments = (id: string) => async (dispatch: DispatchType) => {
  try {
    dispatch(getCommentsStart());
    const response = await axiosInstance.get(`/post/${id}/comments`);
    dispatch(getCommentsSuccess(response.data));
  } catch(e) {
    dispatch(getCommentsError('something went wrong'));
  }
}
