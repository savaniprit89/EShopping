

import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import Allproductmain from './Allproductmain'
import Announcement from './Announcement'
import Footer from './Footer'
import Navbar from './Navbar'
import Newsletter from './Newsletter'
import Products from './Products'

const  Container=styled.div`

`
const Title=styled.h1` 
margin:20px ;
`
const  FilterContainer=styled.div` 
display:flex ;
justify-content:space-between ;
${mobile({flexDirection:"column"})}
`
const  Filter=styled.div` 
margin:20px ;
display:flex ;
`
const  FilterText=styled.div` 
font-size:20px ;
font-weight:bold ;
margin-right:20px ;
`

const Select=styled.select` 
padding:10px ;
margin-right:20px ;
`
const Option=styled.option` 
`
function Allproduct() {
    const [filter,setfilter]=useState({})
    const [sort,setsort]=useState("newest")
    const handlechange=(e)=>{
const value=e.target.value;
setfilter({
    ...filter,
    [e.target.name]:value
})
    }
  return (
   <Container>
   <Navbar />
    <Announcement />
    <Title></Title>
    <FilterContainer>
        <Filter><FilterText>Filter Products:</FilterText>
        <Select name='color' onChange={handlechange}>
            <Option disabled selected>Color</Option>
            <Option>black</Option>
            <Option>yellow</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
        </Select>
        <Select name='size' onChange={handlechange}>
            <Option disabled selected>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
        </Select>
        </Filter>
        <Filter><FilterText>Sort Products:</FilterText>
        <Select onChange={e=>setsort(e.target.value)}>
            <Option selected value='newest'>Newest</Option>
            <Option  value='asc'>Price(Asc)</Option>
            <Option value='desc'>Price(desc)</Option>
        </Select></Filter>
    </FilterContainer>
   <Allproductmain  filter={ filter} sort={sort} />
   <Newsletter />
   <Footer />
   </Container>
  )
}

export default Allproduct