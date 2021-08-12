import {combineReducers} from "redux";
import addCustomerFormReducer from "./addCustomerFormReducer";

const reducers = combineReducers({
    customers: addCustomerFormReducer
})

export default reducers
