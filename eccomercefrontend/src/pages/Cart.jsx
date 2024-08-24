import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../Responsive";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userrequest } from "../requestmethod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { empty } from "../redux/cartRedux";
const KEY='pk_test_51L46SpSGaGiMaMX08LyUV3KA20Rl9qyJatPJP9dCjohyjzvl4plswXS0xmoOjXtybahQ4n8v5aLTuLWw6do3mfEY00IyJSOIHq'
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({marginRight:"5px"})} 
`;

const TopTexts = styled.div`
  ${mobile({display:"none"})}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
 
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})} 
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})} 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Strip=styled.div`
width:100% ;
display:flex ;
justify-content:center ;

`

const Log=styled.button`
padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
width:100% ;
cursor: pointer;
`
const Cart = () => {
const cart=useSelector(state=>state.cart)
const quantity=useSelector(state=>state.cart.quantity)
const user=useSelector(state=>state.user.currentUser)
const [stripe,setstripetoken]=useState(null)
console.log(cart,"cart");
const dispatch=useDispatch()
const navigate=useNavigate()
    const onToken=(token)=>{
    setstripetoken(token)
    console.log(token.card.address_city)
    console.log(token,"sds")
    }
    useEffect(() => {
      const makerequest=async()=>{
          try {
           
            const details=Object.assign({selected:false},cart);
            details.userId=user._id;
            details.amount=cart.total;
            details.address=stripe.card.address_city
            const ress=await axios.post("https://eccomerce-n4q3.onrender.com/api/orders",details);
             const res=await userrequest.post("/checkout/payment",{
              tokenId:stripe.id,
              amount:cart.total*100
             }).then(()=>{

             
              navigate('/orders')
             dispatch(empty())
             })


       
             
            

          } catch (error) {
              console.log(error)
          }
      }
      stripe  && makerequest()
      }, [stripe])
  return (
    <Container>
    <Announcement />
      <Navbar />
      
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
         
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product=>(<Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b>{product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  quantity:
                  <ProductAmount>{product.quantity}</ProductAmount>
                
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
            ))
            }
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Strip>
            {!user ?(<> <Link to='/login'><Log>Login</Log></Link></>):(
            <StripeCheckout
    name='abc shop'
    billingAddress shippingAddress description={`your total is $${cart.total}`}
    amount={cart.total*100}
    token={onToken}
    stripeKey={KEY}
    ></StripeCheckout>)}
    </Strip>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;