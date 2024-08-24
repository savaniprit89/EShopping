import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Mail, Search, ShoppingBasket, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { mobile } from '../Responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutt } from '../redux/apiCalls'
import { empty } from '../redux/cartRedux'
const Container=styled.div`
height:60px;
${mobile({height:"60px"})}
padding-bottom:15px ;
`

const Wrapper=styled.div`
padding:10px 20px;
display:flex;
justify-content:space-between;
align-items:center;
${mobile({padding:"10px 0px"})}
`

const Left=styled.div`
flex:1;
display:flex ;
align-items:center ;
`
const Right=styled.div`
flex:1;
display: flex;
align-items:center ;
justify-content:flex-end ;
${mobile({flex:2,justifyContent:"center"})}
`
const Center=styled.div`
flex:1;
`
const Language=styled.span`
font-size:14px;
cursor: pointer;
${mobile({display:"none"})}

`
const Searchcontainer=styled.div`
border:1px solid lightgray ;
display:flex ;
align-items: center;
margin-left:20px ;
padding:5px ;
`
const Input=styled.input`
border:none ;
${mobile({width:"50px"})}
`
const Logo=styled.h1`
font-weight:bold ;
text-align:center ;
text-decoration: none;
${mobile({fontSize:"24px"})}
`

const Menuitem=styled.div`
font-size:14px ;
cursor: pointer;
margin-left:25px ;
`
function Navbar() {
  const quantity=useSelector(state=>state.cart.quantity)
  
  const navigate=useNavigate();
 
  const user=useSelector(state=>state.user.currentUser)
  console.log(user)
  const dispatch = useDispatch();
  const handleclick=()=>{
    
    logoutt(dispatch).then(()=>{
      dispatch(empty())
      navigate("/")
    })
    
  }
 
  return (

    <Container>
       <Wrapper>
        <Left><Language>EN</Language>
        <Searchcontainer>
            <Input></Input>
        <Search style={{color:"gray",fontSize:16}} />
        </Searchcontainer></Left>
        <Link to='/' style={{textDecoration:"none",color:"inherit"}}>
        <Center><Logo>EShopping.</Logo></Center>
        </Link>
        <Right>
        { user ? (<><button onClick={handleclick}>logout</button></>):(<> <Link to='/register' style={{textDecoration:"none",color:"inherit"}}><Menuitem>REGISTER</Menuitem></Link>
        <Link to='/login' style={{textDecoration:"none",color:"inherit"}}><Menuitem>SIGN IN</Menuitem></Link></>) }
        
        <Link to='/cart'>
        <Menuitem><Badge  color='primary' badgeContent={quantity}> 
          <ShoppingCartOutlined />
        </Badge></Menuitem></Link>

        {
          user && (<><Link to='/orders' style={{textDecoration:"none",color:"inherit"}}>
        <Menuitem> Orders</Menuitem></Link></>)
        }
        <Link to='/' style={{textDecoration:"none",color:"inherit"}}>
        <Menuitem> HOME</Menuitem></Link>
        </Right>
       </Wrapper>
    </Container>
  )
}

export default Navbar