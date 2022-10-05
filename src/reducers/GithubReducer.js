const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload.items,
        loading: false,
        apiUrl: action.payload.Url,
        page: 2,
      };
    case "EMPTY_USERS":
      return {
        ...state,
        users: []
      }
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payload.repos,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        currentUser: action.payload.user,
        loading: false,
      };
    case "START_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "LOAD_MORE":
      return {
        ...state,
        users: [...state.users, ...action.payload],
        loading: false,
        page: state.page + 1,
      };
    default:
      return state;
  }
};
export default GithubReducer;
