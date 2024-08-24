import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartRedux";
import { publicrequest } from "../requestmethod";
import { mobile } from "../Responsive";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({flexDirection:"column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding:"0px"})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({width:"100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width:"100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const SingleProduct = () => {
  const location=useLocation();
  const id=location.pathname.split('/')[2]
  const[product,setproduct]=useState({});
const[quantity,setquantity]=useState(1)
const[color,setcolor]=useState("");
const[size,setsize]=useState("");
const dispatch=useDispatch()
  useEffect(() => {
  const getproduct=async()=>{
    console.log("hoo")
    const res= await publicrequest.get("/products/find/"+id)
    setproduct(res.data)

    setcolor(res.data.color[0])
    setsize(res.data.size[0])
    console.log(product)
  }
  getproduct();
  }, [id])

 
  const handlequantity=(type)=>{
    if(type==='dec'){
    quantity>1 &&  setquantity(quantity-1);
    }
    else{
      setquantity(quantity+1)
    }
  }

  const handleclick=()=>{
    //update cart
    dispatch(
    addProduct({
     ...product,quantity,color,size
    }))
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
         {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c)=>(
                <FilterColor color={c} key={c} onClick={()=>setcolor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setsize(e.target.value)}>
              {product.size?.map((s)=>(
                <FilterSizeOption key={s}>{s}</FilterSizeOption>
              ))}
                
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handlequantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handlequantity("inc")}  />
            </AmountContainer>
            <Button onClick={handleclick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default SingleProduct;