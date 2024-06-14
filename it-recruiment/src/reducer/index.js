import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { jobReducer } from "./jobReducer";

const allReducer = combineReducers({
  searchReducer,
  jobReducer,
  // other reducers
});

export default allReducer;
