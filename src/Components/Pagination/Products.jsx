import React from 'react'

function Products({title, image}) {
  return (
        <div className='w-60 border m-2 p-2'>
        <h1>{title}</h1>
        <img src={image} alt={title} className='w-50 h-50' />
        </div>
  )
}

export default Products
