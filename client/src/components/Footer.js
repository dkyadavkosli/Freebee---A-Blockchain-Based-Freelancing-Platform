import React from 'react'

function Footer({col}) {
  return (
    <div className={`pt-3 pb-3  ${col==="yes"?"bg-gray-700 text-white":"bg-gray-800 text-white"} text-center`}>***Thanks for visiting - Freelance***</div>
  )
}

export default Footer