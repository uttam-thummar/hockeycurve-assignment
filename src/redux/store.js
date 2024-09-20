import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskSlice from "./reducers/task/taskSlice";

const rootReducer = combineReducers({
    task: taskSlice
});

const store = configureStore({
    reducer: rootReducer
});

export default store;