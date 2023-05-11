import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../utils/api/axiosIntance.js';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const response = await axiosInstance.post('/api/signin', { email, password });
    const data = await response.data;
 
    return data;
  });
  


let initialStateAuth = {
    isAuth: false,
    user:null,
    email:'',
    password:'',
    token:'',
}

export  const  authSlice = createSlice({name:'auth', initialState: initialStateAuth, 
reducers: {
    auth:(state)=>{
        if(localStorage.getItem('token')){
            state.isAuth = true;
        }else{
            state.isAuth = false;
        }


    },
    setEmail:(state,action)=>{
      if (localStorage.getItem('email')) {
        state.email = localStorage.getItem('email');
      }
    },
   
    logout: (state) => {
        localStorage.removeItem('token');
    }


},
extraReducers:(builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('email', action.payload.email);
       
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {auth,logout,setEmail} = authSlice.actions;
export default authSlice.reducer;