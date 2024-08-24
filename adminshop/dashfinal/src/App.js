import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";

import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login"
import "./style/dark.scss";
import OrderList from "./pages/orderList/OrderList";
import { useSelector } from "react-redux";




function App() {
 
  const ProtectedRoute=({children})=>{
    const user=useSelector(state=>state.user.currentUser);
    console.log(user ,"djlsd")
    if(!user){
      return <Navigate to='/login'></Navigate>
    }
    return children;
  }

  return (
<div>
      <BrowserRouter>
      
  
        <Routes>
       
        
        
          <Route path="/" element={
            <>
            <ProtectedRoute>
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
         <Home></Home>
                
</div>
</ProtectedRoute>
            </>
          }>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="/products" element={
            <>
             <ProtectedRoute>
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
<ProductList />
        
</div>
</ProtectedRoute>  
            </>
          }>
          </Route>
          <Route path="/product/:productId" element={
            <>
<ProtectedRoute>  
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
<Product />
                
</div>
</ProtectedRoute>  
            </>
          }>
          </Route>
          <Route path="/newproduct" element={
            <>
            <ProtectedRoute>  
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
<NewProduct />
                
</div>
</ProtectedRoute>  
            </>
          }>
          </Route>
          <Route path="/users" element={
            <>
            <ProtectedRoute>  
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
<UserList />
                
</div>
</ProtectedRoute>  
            </>
          }>
          </Route>
          <Route path="/orders" element={
            <>
            <ProtectedRoute>  
<Topbar></Topbar>
<div className="container">
<Sidebar></Sidebar>
<OrderList />
                
</div>
</ProtectedRoute>  
            </>
          }>
          </Route>
         
         
          
        
           
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
