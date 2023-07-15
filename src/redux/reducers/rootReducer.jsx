import { combineReducers } from "redux";
import  useReducer  from "./userReducer";





const rootReducer = combineReducers({

    user: useReducer ,
})
export default rootReducer ;