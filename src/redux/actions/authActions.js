import axios from "../../axios";
import jwtDecode from "jwt-decode";

export const SignInAction = (userData, history) => (dispatch) => {
  return axios
    .post("/auth/signin", userData)
    .then((response) => {
      // console.log(response.data);
      const jwt = `Bearer ${response.data.token}`;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", response.data.user._id);
      axios.defaults.headers.common.Authorization = jwt;
      history.push("/dashboard");
    })
    .catch((error) => {
      console.error("There was an error!", error);
      return error.response.data.message;
    });
};

export const verifyToken = (history) => (dispatch) => {
  const token = localStorage.jwt;
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutAction(history));
    } else {
      dispatch(getLoggedInUser());
    }
  }else{
    history.push("/signin");
  }

};

export const logoutAction = (history) => (dispatch) => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
  history.push("/signin");
};

export const getLoggedInUser = () => (dispatch) => {
  return axios
    .get("/auth/loggedInUser",{headers:{
      Authorization:`${localStorage.getItem('jwt')}`
    }})
    .then((response) => {
      dispatch({ type: "SET_AUTHENTICATED" });
      dispatch({
        type: "SET_USER",
        payload: response.data,
      });
    })
    .catch((error) => {
      return error.error;
    });
};
