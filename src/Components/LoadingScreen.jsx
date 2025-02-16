import React from 'react'
import { ClipLoader } from 'react-spinners'


export default function Loadingscreen() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{    position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        zIndex: 9999, }}>
        <ClipLoader color='bg-gray-800'></ClipLoader>
    </div>
  )
}
