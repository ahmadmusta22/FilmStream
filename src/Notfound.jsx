import React from 'react'
import errImg from './assets/error.jpg'

export default function Notfound() {
  const imgStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '600px',
    display: 'block',
    margin: '0 auto',
    borderRadius: '10px',
  };

  return (
    <img src={errImg} alt="Error" style={imgStyle} className='mt-3' />
  )
}
