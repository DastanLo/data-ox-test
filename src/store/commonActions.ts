import {Action} from "../interfaces";
import ac from "./actionTypes";

export const toggleDrawer = (): Action => ({type: ac.TOGGLE_DRAWER});
export const paginate = (page: number): Action => ({type: ac.PAGINATE_POSTS, payload: page});
export const getPagePosts = (): Action => ({type: ac.GET_PAGE_POSTS});
