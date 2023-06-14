import React from 'react'
import {BsTwitter} from "react-icons/bs"
import {BsLinkedin} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"

function About({profile}) {
  return (
    <div className="flex flex-col justify-center w-full bg-slate-300 min-h-screen xl:pl-36 xl:pr-36 lg:pl-28 lg:pr-28 md:pl-20 md:pr-20 sm:pl-12 sm:pr-12 pl-6 pr-6 pt-20 pb-20">
    <div className="text-center lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-blue-600">
      Hi, I Am {profile?.name}
    </div>
    <div className='pt-4 pb-4 flex justify-center'>
       <a href={profile?.linkedIn} target="_blank">
        <BsTwitter className='h-14 w-14 p-2 rounded-full border-[2px] border-slate-600'/>
        </a>
        <a href={profile?.linkedIn} target="_blank">
        <BsLinkedin className='h-14 w-14 p-2 rounded-full border-[2px] border-slate-600 ml-6 mr-6'/>
        </a>
        <a href={profile?.linkedIn} target="_blank">
        <BsGithub className='h-14 w-14 p-2 rounded-full border-[2px] border-slate-600'/>
        </a>
    </div>
    <p className="mt-3 text-xl text-center">
      {profile?.description?.slice(0,700)}...
    </p>
  </div>
  )
}

export default About