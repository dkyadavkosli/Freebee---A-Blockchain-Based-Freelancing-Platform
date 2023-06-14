import { combineReducers } from "redux";
import changeCategory from "./changeCategory";
import changeUser from "./changeUser";
import changeCurrJob from "./changeCurrJob";
import changeCurrResume from "./changeCurrResume";
import changeCurrFreelancer from "./changeCurrFreelancer";

const rootReducer = combineReducers({
    changeCategory,
    changeUser,
    changeCurrJob,
    changeCurrResume,
    changeCurrFreelancer
})

export default rootReducer;