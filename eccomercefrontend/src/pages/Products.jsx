import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../Data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap:wrap ;
`;

const Products = ({cat,filter,sort}) => {
  const [products,setproducts]=useState([])
  const [filterprocducts,setfilterproducts]=useState([]);


  useEffect(() => {
  const getProduct=async()=>{
    try {
      const res=await axios.get( cat ?`https://eccomerce-n4q3.onrender.com/api/products?category=${cat}`:"https://eccomerce-n4q3.onrender.com/api/products");
console.log(res)
setproducts(res.data)
    } catch (error) {
      
    }
  }
  getProduct();
  }, [cat])

  useEffect(()=>{
cat &&setfilterproducts(products.filter(item=> Object.entries(filter).every(([key,value])=>
item[key].includes(value)
)))
  },[products,cat,filter])


useEffect(()=>{
if(sort==='newest'){
  setfilterproducts(prev=>
    [...prev].sort((a,b)=>a.createdAt-b.createdAt)
    );
}
else if(sort==='asc'){
  setfilterproducts(prev=>
    [...prev].sort((a,b)=>a.price-b.price)
    );
}else{
  setfilterproducts(prev=>
    [...prev].sort((a,b)=>b.price-a.price)
    );
}
},[sort])

  return (
    <Container>
      {
       cat ? filterprocducts.map((item) => 
        <Product item={item} key={item.id} />)
      : products.slice(0,8).map((item) => 
        <Product item={item} key={item.id} />) 
      }
    </Container>
  );
};

export default Products;