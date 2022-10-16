import { useState } from 'react'
import { Loader } from 'react-feather'
import './style.scss'

type BackdropType = {
  open: boolean
}

function Backdrop({open}:BackdropType) {
  if(open) {return (
    <div className="backdrop-container">
      <Loader size={50}/>
    </div>
  )}else return (<></>)
}

export default Backdrop;