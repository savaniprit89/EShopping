
import React from 'react'
import Navbar from './Navbar'
import Announcement from './Announcement'
import Slider from './Slider'
import Categories from './Categories'
import Products from './Products'
import Newsletter from './Newsletter'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRightOutlined } from '@material-ui/icons'

const All=styled.div`
margin:0 20px ;
width:100% ;
display:flex ;
align-items:center ;
justify-content: center;
`
function Home() {
  return (
    <div>
     <Announcement />
        <Navbar />
       <Slider />
       <Categories />
       <Products />
       <Link to='/allproduct' style={{textDecoration:"none",color:"inherit"}}>
       <All>
       
<h2>All PRODUCTS</h2>
<ArrowRightOutlined style={{width:"50px",height:"50px",cursor:"pointer"}} />
       </All>
       </Link>
       <Newsletter />
       <Footer />
    </div>
  )
}

export default Home