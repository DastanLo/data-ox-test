import ac from "../store/actionTypes";

export const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log('Could not save state');
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const actions: any = [ac.EDIT_POST_SUCCESS];

export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  let result = next(action);
  if (actions.includes(action.type)) {
    const state = JSON.parse(JSON.stringify(store.getState().allPosts));
    const allPostsIndex = state.findIndex((post: { id: number; }) => post.id === +action.payload.id);
    state[allPostsIndex] = action.payload;
    saveToLocalStorage([...state]);
  }
  return result;
};

