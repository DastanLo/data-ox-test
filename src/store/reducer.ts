import {Action, IState} from "../interfaces";
import ac from "./actionTypes";
import {getPagePosts} from "../config/utils";

const initialState: IState = {
  posts: [],
  comments: [],
  postInfo: {
    title: '',
    body: '',
    id: '',
  },
  allPosts: [],
  authors: [],
  error: null,
  drawerOpen: false,
  currentPage: 1,
  postsPerPage: 5,
  loading: false,
  commentLoading: false,
  authorLoading: false,
}

const reducer = (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case ac.GET_POSTS_START:
      return {...state, loading: true};
    case ac.GET_POSTS_SUCCESS:
      return {...state,
        posts: getPagePosts(state, action.payload),
        allPosts: action.payload,
        loading: false,
        currentPage: 1,
      };
    case ac.GET_POSTS_ERROR:
      return {...state, loading: false, error: action.payload};
    case ac.GET_POST_INFO_START:
      return {...state, loading: true};
    case ac.GET_POST_INFO_SUCCESS:
      return {...state, loading: false, postInfo: action.payload};
    case ac.GET_POST_INFO_ERROR:
      return {...state, loading: false, error: action.payload};
    case ac.CREATE_POST_SUCCESS:
      return {...state, allPosts: [...state.allPosts, action.payload]};
    case ac.CREATE_POST_ERROR:
      return {...state, error: action.payload};
    case ac.DELETE_POST_SUCCESS:
      const updatedPosts = state.posts.filter(post => post.id !== action.payload);
      const updatedAllPosts = state.allPosts.filter(post => post.id !== action.payload);
      return {...state, posts: updatedPosts, allPosts: updatedAllPosts};
    case ac.DELETE_POST_ERROR:
      return {...state, error: action.payload};
    case ac.EDIT_POST_SUCCESS:
      const editedAllPosts = JSON.parse(JSON.stringify(state.allPosts));
      const editedPosts = JSON.parse(JSON.stringify(state.posts));
      const allPostsIndex = state.allPosts.findIndex(post => post.id === action.payload.id);
      const postsIndex = state.posts.findIndex(post => post.id === action.payload.id);
      if (postsIndex) {
        editedPosts[postsIndex] = action.payload;
      }
      editedPosts[allPostsIndex] = action.payload;
      return {...state, allPosts: editedAllPosts, posts: editedPosts};
    case ac.EDIT_POST_ERROR:
      return {...state, error: action.payload};
    case ac.GET_COMMENTS_START:
      return {...state, commentLoading: true};
    case ac.GET_COMMENTS_SUCCESS:
      return {...state, commentLoading: false, comments: action.payload};
    case ac.GET_COMMENTS_ERROR:
      return {...state, commentLoading: false, error: action.payload};
    case ac.GET_AUTHORS_START:
      return {...state, authorLoading: true};
    case ac.GET_AUTHORS_SUCCESS:
      return {...state, authorLoading: false, authors: action.payload};
    case ac.GET_AUTHORS_ERROR:
      return {...state, authorLoading: false, error: action.payload};
    case ac.GET_AUTHOR_POSTS_START:
      return {...state, loading: true};
    case ac.GET_AUTHOR_POSTS_SUCCESS:
      return {...state,
        posts: getPagePosts(state, action.payload),
        allPosts: action.payload,
        loading: false,
        currentPage: 1,
      };
    case ac.GET_AUTHOR_POSTS_ERROR:
      return {...state, loading: false, error: action.payload};
    case ac.TOGGLE_DRAWER:
      return {...state, drawerOpen: !state.drawerOpen};
    case ac.PAGINATE_POSTS:
      return {...state, currentPage: action.payload};
    case ac.GET_PAGE_POSTS:
      return {...state, posts: getPagePosts(state, state.allPosts)};
    case ac.SEARCH_POST:
      const posts = state.allPosts.filter(post => post.title.includes(action.payload));
      return {...state, posts};
    case ac.SEARCH_COMMENT:
      const comments = state.comments.filter(comment => comment.body.includes(action.payload));
      return {...state, comments};
    default:
      return state;
  }
};

export default reducer;
