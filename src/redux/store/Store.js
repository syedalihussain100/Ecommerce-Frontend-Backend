import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Slices/users/UserSlice";




const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;