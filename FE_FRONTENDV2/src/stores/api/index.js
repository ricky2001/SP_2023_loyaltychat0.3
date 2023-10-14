import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../utils/api/axiosIntance.js'


export const useConsign = createAsyncThunk('api/consign', async ({ emailFrom, emailTo,starConsign,text }) => {
    console.log(emailFrom, emailTo,starConsign,text)
    const numPoint = parseInt(starConsign)
    const response = await axiosInstance.post('api/consign', { emailFrom, emailTo,starConsign:numPoint,text });
    const data = await response.data;
   
    return data;
  });
  
  export const UseRewardExchange = createAsyncThunk('api/item', async ({ email,itemid,itemname,itemprice,total }) => {
    console.log(email,itemid,itemname,itemprice,total)
    const numPoint = parseInt(itemprice)
    const response = await axiosInstance.post('api/item', { email,itemid,itemname,itemprice:numPoint,total });
    const data = await response.data;
   
    return data;
  });

  export const getCoins = createAsyncThunk('api/getCoin', async () => {
    const response = await axiosInstance.get('api/UserRewardExchange');
    const data = await response.data;
 
    return data;
 }); 

 export const getCoin = createAsyncThunk('api/getCoins', async () => {
    const response = await axiosInstance.get('api/userConsign');
    const data = await response.data;
 
    return data;
 }); 

 export const getName = createAsyncThunk('api/getName', async () => {
  const response = await axiosInstance.get('api/user');
  const data = await response.data;

  return data;
});


 export const checkIn = createAsyncThunk('api/checkIn', async ({dateCheckIn,star}) => {
  const response = await axiosInstance.post('api/checkin',{dateCheckIn,points:star});
  const data = await response.data;
  return data;
 });

export const getHistory = createAsyncThunk('api/userDateCheckIn', async () => {
  const  response = await axiosInstance.get('api/userDateCheckIn');
  const  data = await response.data;
  
  return data;

});

export const getNewsfeed = createAsyncThunk('api/news', async () => {
  const  response = await axiosInstance.get('api/news');
  const  data = await response.data;
  
  return data;

});

export const scanqrcode = createAsyncThunk('api/scanqrcode', async () => {
  const  response = await axiosInstance.get('api/scanqrcode');
  const  data = await response.data;
  
  return data;

});

  let initialStateAPI = {
    coin:0,
    code:500,
    names:"Sai Reacky",
    date:[],

    }

export  const  apiSlice = createSlice({name:'api', initialState: initialStateAPI, 
    reducers: {
      
    
    
    },
    extraReducers:(builder) => {
        builder
          .addCase(useConsign.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(useConsign.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.code = action.payload.code;
           
          })
          .addCase(useConsign.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getCoin.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getCoin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.coin = action.payload.points;
           
          })
          .addCase(getCoin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(getName.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getName.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.names = action.payload.name;
           
          })
          
          .addCase(getHistory.pending, (state) => {
            state.status = 'loading';
          } )
          .addCase(getHistory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.date = action.payload.dateHistory;
           
           
           
          } )
          .addCase(getHistory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          } )
          .addCase(checkIn.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkIn.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.code = action.payload.code;
           
          } )
          .addCase(checkIn.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          } )
          
          .addCase(scanqrcode.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(scanqrcode.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.code = action.payload.code;
           
          } )
          .addCase(scanqrcode.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          } )
      },
    });

export default apiSlice.reducer;