import { configureStore } from "@reduxjs/toolkit";


import UserSlice from '../Reducers/UserSlice'
import AdminSlice from "../Reducers/AdminSlice";


const store = configureStore({
    reducer: {
        User: UserSlice,
        Admin : AdminSlice
    },
});

export default store;