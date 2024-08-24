import {createSlice} from '@reduxjs/toolkit';

export const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        isfetching:false,
        error:false,
    },
    reducers:{
       //get all
       getproductstart:(state)=>{
        state.isfetching=true
        state.error=false
       },
       getproductsuccess:(state,action)=>{
        state.isfetching=false
        state.products=action.payload
        state.error=false
       },
       getproductfailure:(state)=>{
        state.isfetching=false
        state.error=true
       },


        //delete
        deleteproductstart:(state)=>{
            state.isfetching=true
            state.error=false
           },
           deleteproductsuccess:(state,action)=>{
            state.isfetching=false
            state.products.splice(
                state.products.findIndex((item)=>item._id === action.payload),1
            )
            state.error=false
           },
           deleteproductfailure:(state)=>{
            state.isfetching=false
            state.error=true
           },
               //UPDATE
    updateProductStart: (state) => {
        state.isfetching = true;
        state.error = false;
      },
      updateProductSuccess: (state, action) => {
        state.isfetching = false;
        state.products[
          state.products.findIndex((item) => item._id === action.payload._id)
        ] = action.payload.product;

      },
      updateProductFailure: (state) => {
        state.isfetching = false;
        state.error = true;
      },
      //UPDATE
      addProductStart: (state) => {
        state.isfetching = true;
        state.error = false;
      },
      addProductSuccess: (state, action) => {
        state.isfetching = false;
        state.products.push(action.payload);
      },
      addProductFailure: (state) => {
        state.isfetching = false;
        state.error = true;
      },
    }
})

export const {getproductstart,getproductfailure,getproductsuccess,deleteproductfailure,deleteproductstart,deleteproductsuccess,updateProductFailure,updateProductStart,updateProductSuccess,addProductFailure,addProductStart,addProductSuccess}=productSlice.actions
export default productSlice.reducer;