
import { Facebook, Instagram, MailOutline, Phone, Room, Twitter, WhatsApp } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
const Container=styled.div` 
display:flex ;
${mobile({flexDirection:"column"})}
`
const Left=styled.div` 
flex:1;
display:flex;
flex-direction:column ;
padding:20px ;
`
const Right=styled.div` 
flex:1;
padding:20px ;
`
const Center=styled.div` 

flex:1;
padding:20px ;
${mobile({display:"none"})}
`

const Title=styled.h3` 
margin-bottom:30px ;
`
const List=styled.ul` 
margin:0 ;
padding:0 ;
list-style:none ;
display:flex ;
flex-wrap:wrap ;
`
const Item=styled.li` 
width:50% ;
margin-bottom:10px ;
`
const Logo=styled.h1` 
`
const Desc=styled.div` 
margin:20px 0 ;
`
const SocialContainer=styled.div` 
display:flex ;
`
const SocialIcon=styled.div` 
width:40px ;
height:40px ;
border-radius:50% ;
color:white ;
background-color:teal ;
display:flex ;
align-items:center ;
justify-content:center ;
margin-right:10px ;
`
const ContactItem=styled.div`
margin-bottom:20px;
display:flex ;
align-items:center ;
`
function Footer() {
  return (
  <Container>
<Left>
<Logo>ABC.</Logo>
<Desc>Lorem34'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used'logo' is defined but never used</Desc>
<SocialContainer>
    <SocialIcon>
        <Facebook></Facebook>
    </SocialIcon>
    <SocialIcon>
       <Instagram></Instagram>
    </SocialIcon>
    <SocialIcon>
        <Twitter></Twitter>
    </SocialIcon>
    <SocialIcon>
       <WhatsApp></WhatsApp>
    </SocialIcon>
</SocialContainer>
</Left>
<Center>
<Title>Useful Links</Title>
<List>
  <Item>Home</Item>
  <Item>Cart</Item>
  <Item>Man fashion</Item>
  <Item>Women Fashion</Item>
  <Item>My Account</Item>
  <Item>Order Tracking</Item>
  <Item>Wishlist</Item>
  <Item>Terms</Item>
</List>
</Center>
<Right>
  <Title>Contact</Title>
  <ContactItem><Room style={{'marginRight':10}}></Room>India</ContactItem>
  <ContactItem><Phone style={{'marginRight':10}}></Phone>+9199999999999</ContactItem>
  <ContactItem><MailOutline style={{'marginRight':10}}></MailOutline> contact@gmail.com</ContactItem>
</Right>
  </Container>
  )
}

export default Footer