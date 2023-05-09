import { combineReducers } from "redux";
import IsLoginReducer from "./isLoginReducer";
import pageReducer from "./pageReducer";
import productPageReducer from "./productPageReducer";
import imagePageReducer from "./imagePageReducer";

const reducers = combineReducers({
  isLogin: IsLoginReducer,
  orderPage: pageReducer,
  productPage: productPageReducer,
  imagePage: imagePageReducer
});

export default reducers;