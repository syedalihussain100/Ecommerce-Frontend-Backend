import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.post(
                "http://localhost:4000/register",
                user,
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);


// login action 
export const loginUserAction = createAsyncThunk(
    "users/login",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                user,
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);


// forget password action here
export const forgetPasswordAction = createAsyncThunk(
    "users/forgetpassword",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.post(
                "http://localhost:4000/forgetpassword",
                user,
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);


// reset password action here
export const resetPasswordAction = createAsyncThunk(
    "users/resetpassword",
    async (password, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.put(
                `http://localhost:4000/password/reset/${password?.token}`,
                {
                    password: password?.password
                },
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);



//get user from local storage and place into store

const userLoginfromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


const usersSlices = createSlice({
    name: "users",
    initialState: {
        userAuth: userLoginfromStorage,
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.loginData = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        // forget password
        builder.addCase(forgetPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.forgetPassword = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(forgetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        // reset password
        builder.addCase(resetPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.resetPassword = action?.payload;
            state.message = "Your Password has been Reset Go To Login Page!"
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    },
});

export default usersSlices.reducer;