import { Link, useLocation, useNavigate } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userrequest } from "../../requestmethod";
import { updateProduct } from "../../redux/apiCalls";
import axios from "axios";

export default function Product() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color,setcolor]=useState([]);
  const [size, setsize] = useState([]);
    const location=useLocation();
    const productid=location.pathname.split('/')[2];
    const product=useSelector(state=>state.product.products.find(product=>product._id === productid))
    const [pStats, setPStats] = useState([]);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
      useEffect(() => {
        const getStats = async () => {
          try {
            const user = localStorage.getItem('user');
            const json = JSON.parse(user);
            const token=json["accessToken"];
            const headers = { Authorization: `Bearer ${token}`};
            const res = await userrequest.get("/orders/income?pid=" + productid,{headers});
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productid, MONTHS]);

      console.log(pStats)
      const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };
      const handleColor = (e) => {
        setcolor(e.target.value.split(","));
      };
      const handleCat = (e) => {
        setCat(e.target.value.split(","));
      };
      const handleSelect = (e) => {
        const value = Array.from(
          e.target.selectedOptions,
          (option) => option.value
        );
        setsize(value);
      };
      const handleClick = async(e) => {
        e.preventDefault();
        try {
          let url=""
         if(file){
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "upload");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dhzh0vxzv/image/upload",
                data
              );
    
             
              url = uploadRes.data.url;
          
              }
              const data={};
              if(url!== "") data.img=url;
              if(cat.length>0) data.categories=cat;
              if(color.length>0) data.color=color;
              if(size.length>0) data.size=size; 
          const product = { ...inputs, ...data};
          console.log(product)
          updateProduct(productid,product, dispatch);
      navigate("/products")
        } catch (err)
         {
            console.log(err)
        }
      };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product: {product.title}</h1>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product?.img} alt="" className="productInfoImg" />
                  <span className="productName">{product?.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product?._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
             
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock ? "true" :"false"}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title" placeholder={product?.title} onChange={handleChange} />
                  <label>Product Desc</label>
                  <input type="text" name="desc"  placeholder={product?.desc} onChange={handleChange} />
                  <label>Product price</label>
                  <input type="text" name="price"  placeholder={product?.price} onChange={handleChange} />
                  <label>Categories</label>
                  <input type="text"  placeholder={product?.categories} onChange={handleCat}  />
                  <label>COLOR</label>
          <input type="text" placeholder={product?.color} onChange={handleColor} />
          <label>Size</label>
          <select name="size" id='size' multiple onChange={handleSelect}  
           >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>

          </select>
                  <label>In Stock</label>
                  <select name="inStock" id="inStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product?.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  <button className="productButton" onClick={handleClick}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
