import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async Thunk
export const AdminfetchData = createAsyncThunk('data/AdminfetchData', async () => {
    try {
        console.log('inside the Admin createAsyncThunk');
        const response = await axios.get('http://localhost:3001/admin/allUsers', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw Error('Error fetching data');
    }
});


const initialState = [];

const sliceAdmin = createSlice({
    name: 'Admin',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(AdminfetchData.pending, (state) => {
                console.log('loading');
            })
            .addCase(AdminfetchData.fulfilled, (state, action) => {
                console.log('succeeded', action.payload.allUsers);
                return action.payload.allUsers


            })
            .addCase(AdminfetchData.rejected, (state, action) => {
                console.log('failed', action.error.message);
            });

    },

})


// export const {  } = sliceAdmin.actions
export default sliceAdmin.reducer

