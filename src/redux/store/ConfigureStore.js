import { configureStore } from "@reduxjs/toolkit";


import UserSlice from '../Reducers/UserSlice'


const store = configureStore({
    reducer: {
        User: UserSlice
    },
});

export default store;