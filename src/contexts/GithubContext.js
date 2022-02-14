import { createContext, useContext, useReducer } from "react";
import { Navigate, useNavigate } from "react-router";
import GithubReducer from "../reducers/GithubReducer";


const GithubContext = createContext();

// alert context
import AlertContext from "./AlertContext";
export const GithubProvider = ({ children }) => {
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
    const response = await fetch(state.apiUrl + state.page, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: "LOAD_MORE",
      payload: data.items,
    });
  };

  const getRepos = async (login) => {
    const Url =
      `${process.env.REACT_APP_API_URL}/users/` +
      login +
      "/repos?sort=created&per_page=28";
    const response = await fetch(Url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });

    const repos = await response.json();
    let payload = { repos };

    dispatch({ type: "GET_REPOS", payload });
  };

  const { showError } = useContext(AlertContext);
  const navigate = useNavigate();

  const getUser = async (login) => {
    dispatch({ type: "START_LOADING" });
    const Url = `${process.env.REACT_APP_API_URL}/users/` + login;
    const response = await fetch(Url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    let payload = { user: data };
    if (response.status == 404) {
      payload.user = {};
      showError("this user is not found");
      navigate("/");
    }
    dispatch({ type: "GET_USER", payload });
  };

  ////////////////////////////
  const searchUsers = async (name) => {
    dispatch({ type: "START_LOADING" });
    const params = new URLSearchParams(`q=${name}`);
    const Url = `${process.env.REACT_APP_API_URL}/search/users?${params}&per_page=42&page=`;
    const response = await fetch(Url + 1, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    });
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

export default GithubContext;
