import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../Data'
import { mobile } from '../Responsive'
const Container=styled.div`
width:100%;
height: 100vh;
display:flex ;
position:relative;
overflow:hidden ;
${mobile({display:"none"})}
`
const Arrow=styled.div`
width:50px ;
height:50px ;
background-color:#fff7f7 ;
border-radius: 50%;
display: flex;
align-items:center;
justify-content:center ;
position:absolute;
bottom:0 ;
top:0;
left:${props=>props.direction==='left' && "10px"};
right:${props=>props.direction==='right' && "10px"};
margin:auto ;
cursor: pointer;
opacity:0.5 ;
z-index:2 ;
`

const Wrapper=styled.div`
height:100% ;
display:flex ;
transform:translateX(${props=>props.Slideindex*-100}vw) ;
transition:all 1s ease ;
`

const Slide=styled.div`
display:flex;
width:100vw;
height:100vh ;
align-items:center ;
background-color:#${props=>props.bg} ;
`

const Imgcontainer=styled.div`
flex:1;
height:100% ;

`
const Image=styled.img`
height:80%;
width:80% ;
`
const Infpcontainer=styled.div`
flex:1  ;
padding:50px ;
`

const Title=styled.h1` 
margin:0 ;
font-size:78px ;
`
const Button=styled.button`
padding:10px ;
font-size:20px ;
background-color:transparent;
cursor: pointer;
`
const Desc=styled.p`
margin:50px 0;
font-size:20px ;
font-weight:500 ;
letter-spacing:3px ;
`

function Slider() {
const [index,setindex]=useState(0);

    const handleclick=(direction)=>{
if(direction==='left'){
    setindex(index>0?index-1:2)
}
else{
    setindex(index<2?index+1:0)
}
    }

  return (
    
    
<Container>


    <Arrow direction='left' onClick={()=>handleclick("left")}>
        <ArrowLeftOutlined />
    </Arrow>
    <Wrapper Slideindex={index}>
    {sliderItems.map((item)=>(
        <Slide bg={item.bg} key={item.id}>
        <Imgcontainer><Image alt='fbjsbdjb'  src={item.img}></Image></Imgcontainer>
        <Infpcontainer>
            <Title>{item.title}</Title>
            <Desc>{item.desc} </Desc>
        <Button>Shop Now</Button>
        </Infpcontainer>
        </Slide>
    ))}
       
    </Wrapper>
    <Arrow direction='right' onClick={()=>handleclick("right")}>
        <ArrowRightOutlined />
    </Arrow>
</Container>

  )
}

export default Slider