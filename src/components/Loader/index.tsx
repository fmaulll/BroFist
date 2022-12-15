import React from 'react'
import "./styles.scss"

const Loader = () => {
  return (
    <div className='loader-wrapper'>
        <div className='lds-hourglass'></div>
        <h1>Loading...</h1>
    </div>
  )
}

export default Loader