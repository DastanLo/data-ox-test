import {IPost, IState} from "../interfaces";

export function getPagePosts(state: IState, posts: IPost[]): IPost[] {
  const indexOfLastPost = state.currentPage * state.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - state.postsPerPage;
  return posts.slice(indexOfFirstPost, indexOfLastPost);
}
