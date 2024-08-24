import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
      currentUser:JSON.parse(localStorage.getItem("user"))|| null,
       isFetching:false,
       error:false
    },
    reducers:{
      loginStart:(state)=>{
    state.isFetching=true
      },
      loginSuccess:(state,action)=>{
        state.isFetching=false;
        state.currentUser=action.payload;
        localStorage.setItem("user",JSON.stringify(state.currentUser))
        const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        const token=json["accessToken"];
        console.log(token)

     

      },
      registerSuccess:(state,action)=>{
        state.isFetching=false;
        state.currentUser=action.payload;
        localStorage.setItem("user",JSON.stringify(state.currentUser))
        const user = localStorage.getItem('user');
        const json = JSON.parse(user);
        const token=json["accessToken"];
        console.log(token)
        console.log(user)

     

      },
      loginFailure:(state)=>{
        state.isFetching=false;
        state.error=true
      },
      logout:(state)=>{
        state.isFetching=false;
        localStorage.removeItem("user")
        state.currentUser=null
      }
    }
})

export const {loginFailure,loginStart,loginSuccess,logout,registerSuccess}=userSlice.actions
export default userSlice.reducer;