import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/apiCalls";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color,setcolor]=useState([]);
  const [size, setsize] = useState([]);
  const dispatch = useDispatch();
const navigate=useNavigate();
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
      let url=" "
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
      const product = { ...inputs, img:url, categories: cat,color:color ,size:size};
      console.log(product)
      addProduct(product, dispatch);
  navigate("/products")
    } catch (err)
     {
        console.log(err)
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            required
            onChange={(e) => setFile(e.target.files[0])}

          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="Product Name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            required
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            required
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" required placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>COLOR</label>
          <input type="text" required placeholder="black,blue" onChange={handleColor} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <select name="size" id='size' multiple onChange={handleSelect} required>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>

          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}