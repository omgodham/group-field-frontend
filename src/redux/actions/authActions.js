import axios from "../../axios"
export const SignInAction = (userData, history) => (dispatch) => {
    return axios.post('/auth/signin', userData)
      .then(response => {
          console.log(response.data)
        const jwt = `Bearer ${response.data.token}`
        localStorage.setItem('jwt', jwt)
        localStorage.setItem('userId', response.data.user._id)
        dispatch({ type: "SET_AUTHENTICATED" })
        dispatch({
          type: "SET_USER",
          payload: response.data.user
        })
        axios.defaults.headers.common.Authorization = jwt
        history.push('/dashboard')
      })
      .catch(error => {
        console.error('There was an error!', error)
        return error.response.data.message
      })
  }