import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";

const allReducer = combineReducers({
  searchReducer,
  // other reducers
});

export default allReducer;
