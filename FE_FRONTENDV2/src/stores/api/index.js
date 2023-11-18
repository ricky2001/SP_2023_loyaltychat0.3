import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '../../utils/api/axiosIntance.js'


export const useConsign = createAsyncThunk('api/consign', async ({ emailFrom, emailTo, starConsign, text }) => {
  console.log(emailFrom, emailTo, starConsign, text)
  const numPoint = parseInt(starConsign)
  const response = await axiosInstance.post('api/consign', { emailFrom, emailTo, starConsign: numPoint, text });
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


export const checkIn = createAsyncThunk('api/checkIn', async ({ dateCheckIn, star }) => {
  const response = await axiosInstance.post('api/checkin', { dateCheckIn, points: star });
  const data = await response.data;
  return data;
});

export const getHistory = createAsyncThunk('api/userDateCheckIn', async () => {
  const response = await axiosInstance.get('api/userDateCheckIn');
  const data = await response.data;

  return data;

});

export const scanqrCode = createAsyncThunk('api/scanqrCode', async ({ emailuser, event}) => {
  console.log(emailuser,event)
  const response = await axiosInstance.post('api/scanqrcode', { emailuser, event});
  const data = await response.data;

  return data;

});

export const useExchange = createAsyncThunk('api/useExchange', async ({ emailuser, itemid, itemTotal }) => {
  console.log(emailuser, itemid, itemTotal);
  const numItemid=parseInt(itemid)
  const numItemtotal=parseInt(itemTotal)
  const response = await axiosInstance.post('api/itemexchange', { emailuser, itemid:numItemid, itemTotal:numItemtotal });
  const data = await response.data;
 
  return data;
});

export const getUserItemExchange = createAsyncThunk('api/getUserItemExchange', async () => {
  const response = axiosInstance.get('api/getUserItemExchange');
  const data = response.data;

  return data;

});

export const userMessage = createAsyncThunk('api/aiMessage', async ({ userInput }) => {
  // console.log(userInput)
  const response = await axiosInstance.post('api/aiMessage', { "message": userInput })
  return response.data;

});

export const showNews = createAsyncThunk('api/getNews', async ({ author, detail }) => {
  console.log(author, detail)
  const response = await axiosInstance.get('api/getNews');
  return response.data;

});

export const addNews = createAsyncThunk('api/createNews', async ({ author, detail }) => {
  console.log(author, detail)
  const response = await axiosInstance.post('api/createNews', { author, detail });
  return response.data;

});

export const editNews = createAsyncThunk('api/updateNews', async ({ author, detail }) => {
  console.log(author, detail)
  const response = await axiosInstance.post('api/updateNews', { author, detail });
  return response.data;

});

export const minusNews = createAsyncThunk('api/deleteNews', async ({ author, detail }) => {
  console.log(author, detail)
  const response = await axiosInstance.post('api/deleteNews');
  return response.data;

});

export const keepForm = createAsyncThunk('api/keepForm', async ({ email, EventName, comments,satisfied }) => {
  console.log(email, EventName, comments,satisfied );
  const response = await axiosInstance.post('api/keepForm', { email, EventName, comments,satisfied  });
  const data = await response.data;
 
  return data;
});
// export const getForm = createAsyncThunk('api/getForm', async ({ author, detail }) => {
//   console.log(author, detail)
//   const response = await axiosInstance.get('api/getForm');
//   return response.data;

// });

// export const addNews = createAsyncThunk('api/createNews', async ({ author, detail }) => {
//   console.log(author, detail)
//   const response = await axiosInstance.post('api/createNews', { author, detail });
//   return response.data;

// });

// export const editNews = createAsyncThunk('api/updateNews', async ({ author, detail }) => {
//   console.log(author, detail)
//   const response = await axiosInstance.post('api/updateNews', { author, detail });
//   return response.data;

// });

// export const minusNews = createAsyncThunk('api/deleteNews', async ({ author, detail }) => {
//   console.log(author, detail)
//   const response = await axiosInstance.post('api/deleteNews');
//   return response.data;

// });


let initialStateAPI = {
  coin: 0,
  code: 500,
  names: "",
  date: [],
  data: [],
  history: [],
}

export const apiSlice = createSlice({
  name: 'api', initialState: initialStateAPI,
  reducers: {
    setHistory(state, action) {
      const userChat = { text: action.payload, isUser: true, timestamp: Math.floor(Date.now() / 1000) };
      state.history.push(userChat)
    }
  },
  extraReducers: (builder) => {
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

      .addCase(getName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.date = action.payload.dateHistory;



      })
      .addCase(getHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(checkIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.code = action.payload.code;

      })
      .addCase(checkIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(scanqrCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(scanqrCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.code = action.payload.code;

      })
      .addCase(scanqrCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(useExchange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(useExchange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.code = action.payload.code;

      })
      .addCase(useExchange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUserItemExchange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserItemExchange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.code = action.payload.code;
      })
      .addCase(getUserItemExchange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(showNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(showNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(showNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(editNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(minusNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(minusNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(minusNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(userMessage.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(userMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const botMessage = { text: action.payload.messages.content, isUser: false, timestamp: Math.floor(Date.now() / 1000) };
        state.history.push(botMessage)
      })
      .addCase(userMessage.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
        const botMessage = { text: action.error.message, isUser: false, timestamp: Math.floor(Date.now() / 1000) };
        state.history.push(botMessage)
      })
      .addCase(keepForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(keepForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.code = action.payload.code;

      })
      .addCase(keepForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setHistory } = apiSlice.actions;

export default apiSlice.reducer;

