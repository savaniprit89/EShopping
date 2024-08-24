import { publicrequest } from "../requestmethod";
import { loginFailure, loginStart, loginSuccess, logout, registerSuccess } from "./userRedux"

export const login=async(dispatch,user)=>{
    dispatch(loginStart());
    try {
        const res=await publicrequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}
export const register=async(dispatch,user)=>{
    dispatch(loginStart());
    try {
        const res=await publicrequest.post("/auth/register",user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}



export const logoutt=async(dispatch)=>{
    dispatch(loginStart());
    try {
        
        dispatch(logout())
    } catch (error) {
        dispatch(loginFailure())
    }
  }