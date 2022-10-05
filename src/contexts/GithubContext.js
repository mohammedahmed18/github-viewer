import { createContext, useContext, useReducer } from "react";
import GithubReducer from "../reducers/GithubReducer";
import useAlerts from "./AlertContext";

const GithubContext = createContext();
const API_URL = "https://api.github.com";


export const GithubProvider = ({ children }) => {
  const { showError } = useAlerts()
  const initial_state = {
    users: [],
    currentUser: {},
    loading: false,
    page: 1,
    apiUrl: "",
    repos: [],
  };
  const [state, dispatch] = useReducer(GithubReducer, initial_state);

  const loadMore = async () => {
    dispatch({ type: "START_LOADING" });
    const response = await fetch(state.apiUrl + state.page, {
      method: "GET",
    });
    const data = await response.json();
    if (data.items.length === 0) showError("no more items to show")
    dispatch({
      type: "LOAD_MORE",
      payload: data.items,
    });
  };

  const getRepos = async (login) => {
    const Url = `${API_URL}/users/` + login + "/repos?sort=created&per_page=28";
    const response = await fetch(Url, {
      method: "GET",
    });

    const repos = await response.json();
    let payload = { repos };

    dispatch({ type: "GET_REPOS", payload });
  };

  const getUser = async (login) => {
    dispatch({ type: "START_LOADING" });
    const Url = `${API_URL}/users/` + login;
    const response = await fetch(Url, {
      method: "GET",
    });
    const data = await response.json();
    let payload = { user: data };
    if (response.status === 404) {
      window.location = "/not-found";
    }
    dispatch({ type: "GET_USER", payload });
  };

  ////////////////////////////
  const searchUsers = async (name) => {
    dispatch({ type: "START_LOADING" });
    dispatch({ type: "EMPTY_USERS" });
    const params = new URLSearchParams(`q=${name}`);
    const Url = `${API_URL}/search/users?${params}&per_page=60&page=1`;
    const response = await fetch(Url);
    const data = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: { items: data.items, Url },
    });
  };
  const { users: results, loading, currentUser, repos } = state;
  return (
    <GithubContext.Provider
      value={{
        results,
        loading,
        searchUsers,
        loadMore,
        currentUser,
        getUser,
        repos,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const useGithub = () => (useContext(GithubContext));
export default useGithub