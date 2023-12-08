import { configureStore, createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: { isLoggedIn: false, userData: null }, 
    reducers: {
      login(state, action) {
        state.isLoggedIn = true;
        state.userData = action.payload; 
      },
      logout(state) {
        state.isLoggedIn = false;
        state.userData = null;
        localStorage.removeItem("userId");
      },
    },
  });
  

export const userActions= userSlice.actions;


export const store=configureStore({
    reducer:{
        user:userSlice.reducer
    

    }
})
