
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobile } from '../Responsive';
import Announcement from './Announcement';
import Footer from './Footer';
import Navbar from './Navbar';
import Singleorder from './Singleorder';
const Containeo = styled.div``;

const Wrappero = styled.div`
  padding: 20px;
  background-color:#fff7f7

`;

const Titleo = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

`;


const Bottomo = styled.div`
  display: flex;
  ${mobile({flexDirection:"column"})} 
`;

const Infoo = styled.div`
  flex: 5;
`;

const Producto = styled.div`

`;

const ProductDetailo = styled.div`
  

  display: flex;
  flex-direction:row ;
  ${mobile({flexDirection:"column"})} 
`;

const Imageo = styled.img`
  width: 200px;
  flex:1 ;
  height:250px ;
`;

const Detailso = styled.div`
  padding: 20px;
  display: flex;
  flex:2 ;
  margin-left:50px ;
  flex-direction: column;
`;

const ProductNameo = styled.span`
font-size:20px ;
`;

const ProductIdo = styled.span``;

const ProductColoro = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSizeo = styled.span`
font-size:20px ;
`;



const Hro = styled.hr`
  background-color: #eee;
  border: none;
  height: 5px;
`;


const Maindivo=styled.div`
display:flex ;
`

const Newdivo=styled.div` 
flex:1 ;
`

const Newdiv1o=styled.div` 
flex:1 ;
display:flex ;
flex-direction:column ;
padding:20px ;
gap:50px;
`
const PAmounto=styled.div` 
font-size:20px ;

`

const Pstatuso=styled.div` 
font-size:20px ;

`
const Orders = ({cat}) => {
  const user=useSelector(state=>state.user.currentUser)
  const[corder,setorders]=useState([]);

  useEffect(() => {
 const makerequest=async()=>{
  const ress=await axios.get(`https://eccomerce-n4q3.onrender.com/api/orders/find/${user._id}`);
  
  setorders(ress.data)
  console.log(corder)
 }
 makerequest();

  }, [corder])
  return (
    <Containeo>
    <Announcement />
      <Navbar />
      
      <Wrappero>
        <Titleo>YOUR ORDERS</Titleo>
    
       <Bottomo>
          <Infoo>
         { corder?.map((pro,index)=>(
            
           <div>
           <Titleo>ORDER:-{index+1}</Titleo>
           <Maindivo>
           <Newdivo>
           {
            pro.products.map((p)=>(
              <Producto key={p._id}>
              <ProductDetailo>
                <Imageo src={p.img} />
                <Detailso>
                  <ProductNameo>
                    <b>Product Name:</b> {p.title}
                  </ProductNameo>
                  <br>

                  </br>
                  <ProductColoro color={p.color} >
                  
                  </ProductColoro>
                  <br>

</br>
                  <ProductSizeo>
                    <b>Size:</b> {p.size}
                  </ProductSizeo>
                  <br>

</br>
                  <ProductSizeo>
                    <b>quantity:</b> {p.quantity}
                  </ProductSizeo>
                </Detailso>
              </ProductDetailo>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            </Producto>
            
            ))
           }
           <Hro />
           </Newdivo>
           <Newdiv1o>

           <PAmounto> <b>Total Amount:</b> {pro.amount}</PAmounto>
          <Pstatuso> <b>Status:</b>   {pro.status}</Pstatuso>
       
           </Newdiv1o>
           </Maindivo>
           </div>
            ))
         } 
        
          </Infoo>
          </Bottomo>

      </Wrappero>
      <Footer />
    </Containeo>
  )
}

export default Orders