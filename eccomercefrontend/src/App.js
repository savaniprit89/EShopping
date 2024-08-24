
import { BrowserRouter,Route,Routes ,Navigate} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import Register from './Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Stripe from './pages/Stripe';
import { useSelector } from "react-redux";
import Allproduct from "./pages/Allproduct";
import Orders from "./pages/Orders";
function App() {
  const user=useSelector(state=>state.user.currentUser);
  return (
    <div className="App">
        <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/products/:category" element={<ProductList/>} />
      <Route path="/allproduct" element={<Allproduct></Allproduct>} />
      <Route path="/product/:id" element={<SingleProduct/>} />
      <Route path="/login" element={user ? <Navigate to='/'  /> : <Login/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={user ? <Navigate to='/'  /> : <Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/pay" element={<Stripe />} />
    </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
