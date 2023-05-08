import { combineReducers } from "redux";
import IsLoginReducer from "./isLoginReducer";
import pageReducer from "./pageReducer";

const reducers = combineReducers({
  isLogin: IsLoginReducer,
  pageRed: pageReducer,
});

export default reducers;