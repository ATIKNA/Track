import { AsyncStorage } from "react-native";
import createDataContext from "../context/createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case 'signout':
      return {token:null,errorMessage:""}


    default:
      return state;
  }
};
const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};
const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("TrackList");
    }
    else{
        navigate('Signup')
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    //make an api request to sign up with that email and password
    //if we signup, we somehow want to modify our state and say that we are authenticated
    //if signup fails, we probably need to reflect error message somewhere
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      //await AsyncStorage.getItem('token')
      //navigate to main flow
      navigate("TrackList");
    } catch (err) {
      console.log(err)
      dispatch({
        type: "add_error",
        payload: "Something went wrong with signup",
      });
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    //make an api request to sign in with that email and password
    //if we signup, we somehow want to modify our state and say that we are authenticated
    //if signup fails, we probably need to reflect error message somewhere
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      console.log(err)
      dispatch({
        type: "add_error",
        payload: "Something went wrong with signin",
      });
    }
  };
};
const signout = (dispatch) => {
  return async () => {
    //somehow signout
    await AsyncStorage.removeItem('token')
    dispatch({type:'signout'})
    navigate('loginFlow')
  };
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage,tryLocalSignin },
  { token: null, errorMessage: "" }
);
