import React from 'react'

function Singleorder({product}) {
    console.log("sdskd",product)
  return (
    
     <div>
     {
        product?.map((p)=>(
            <div>
            hii
            </div>
        ))
     }
     </div> 
  )
}

export default Singleorder