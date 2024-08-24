import { Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'

const Container=styled.div`
height:60vh ;
background-color:#fcf5f5 ;
display:flex ;
align-items:center ;
flex-direction:column ;
justify-content:center ;
`
const Title=styled.h1`
font-size:70px ;
margin-bottom: 20px;
${mobile({fontSize:"40px"})}
`
const Desc=styled.div`
font-size:24px ;
font-weight:300 ;
margin-bottom: 20px;
${mobile({textAlign:"center"})}
`
const Inputcontainer=styled.div`
width:50% ;
height:40px;
background-color:white ;
display:flex ;
justify-content:space-between   ;
border:1px solid lightgray ;
${mobile({width:"80%"})}
`
const Input=styled.input`
border:none ;
flex:8;
padding-left:20px ;
`
const Button=styled.button`
flex:1 ;
border:none ;
background-color:teal ;
color:white ;
`

function Newsletter() {
  return (
    <Container>
        <Title>NEWSLETTER</Title>
        <Desc>Get timely update for favorite products</Desc>
        <Inputcontainer>
            <Input placeholder='enter mail'>
            </Input>
            <Button>
                <Send></Send>
            </Button>
        </Inputcontainer>
    </Container>
  )
}

export default Newsletter