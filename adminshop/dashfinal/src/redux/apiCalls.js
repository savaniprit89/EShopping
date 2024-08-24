import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { publicrequest, userrequest } from "../requestmethod";
import { addProductFailure, addProductStart, addProductSuccess, deleteproductfailure, deleteproductstart, deleteproductsuccess, getproductfailure, getproductstart, getproductsuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"

export const login=async(dispatch,user)=>{
    dispatch(loginStart());
  
    try {
        const res=await publicrequest.post("/auth/login",user)
      
       if(res.data.isAdmin){
          dispatch(loginSuccess(res.data))
          console.log("fgdf")
       }else{
        dispatch(loginFailure())
       }
        
     
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
export const getproduct=async(dispatch)=>{
    dispatch(getproductstart());
    try {
        const res=await publicrequest.get("/products")
        dispatch(getproductsuccess(res.data))
    } catch (error) {
        dispatch(getproductfailure())
    }
}

export const deleteproduct=async(id,dispatch)=>{
    dispatch(deleteproductstart());
    try {
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
       await userrequest.delete(`/products/${id}`,{headers})
        dispatch(deleteproductsuccess(id))
    } catch (error) {
        dispatch(deleteproductfailure())
    }
}


export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // 
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
      const res = await userrequest.put(`/products/${id}`, product,{headers});
      const p=res.data
      dispatch(updateProductSuccess({ id, p }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
      const res = await userrequest.post(`/products`, product,{headers});
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };