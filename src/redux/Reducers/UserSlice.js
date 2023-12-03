import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async Thunk
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    try {
        console.log('inside the createAsyncThunk');
        const response = await axios.get('http://localhost:3001/userdata', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw Error('Error fetching data');
    }
});


const initialState = {
    userId: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    picturePath: ''
}

const sliceUser = createSlice({
    name: 'user',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                console.log('loading');
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                // console.log('succeeded', action.payload);
                const { _id, firstname, lastname, email, password, picturePath } = action.payload.user;
                state.userId = _id;
                state.firstname = firstname;
                state.lastname = lastname;
                state.email = email;
                state.password = password;
                state.picturePath = picturePath;

            })
            .addCase(fetchData.rejected, (state, action) => {
                console.log('failed', action.error.message);
            });

    },

})


export const { updateDetails, addDetails } = sliceUser.actions
export default sliceUser.reducer

