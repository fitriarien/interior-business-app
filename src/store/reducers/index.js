import { combineReducers } from "redux";
import IsLoginReducer from "./isLoginReducer";

const reducers = combineReducers({
  isLogin: IsLoginReducer,
});

export default reducers;