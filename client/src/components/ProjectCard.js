import React from 'react'
import pic from "../assets/bigImg.jpg";

function ProjectCard({title, desc, platform}) {
  return (
    <div className="mb-3 pb-3 border-[2px] border-slate-600 mr-3">
      <img className='h-44 w-full border-b-[2px] border-slate-600' src={pic} alt=""/>
      <h2 className="text-xl mt-3  pl-3 pr-3">
        {title}
      </h2>
      <h3 className="text-lg text-center pt-3 pb-3 ml-3 mr-3 bg-blue-600 text-white mt-3">{platform}</h3>
    </div>
  )
}

export default ProjectCard