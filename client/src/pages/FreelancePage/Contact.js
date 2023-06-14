import React from 'react'
import ProjectCard from '../../components/ProjectCard'
import {BsTwitter} from "react-icons/bs"
import {BsLinkedin} from "react-icons/bs"
import {BsGithub} from "react-icons/bs"
import {BsInstagram} from "react-icons/bs"
import {AiFillMail} from "react-icons/ai"

function Contact({profile}) {
  return (
    <div className='w-full bg-slate-200 lg:pl-24 lg:pr-24 md:pl-12 md:pr-12 sm:pl-6 sm:pr-6 pl-4 pr-4 pt-24 h-screen overflow-y-scroll no-scrollbar'>
        <h2 className='text-5xl text-blue-600'>Let's Connect</h2>
        <div className='h-[4px] rounded mt-6 w-24 bg-slate-500'></div>
        <div className='grid lg:grid-cols-2 grid-cols-1 items-baseline mt-20'>
          <div className='flex p-6 bg-white shadow-lg lg:mr-2 mb-4 rounded'>
          <a href={profile?.linkedIn} target="_blank">
            <BsGithub className='h-24 w-24 p-5 border-[1px] border-slate-600 rounded'/>
            </a>
            <div className='flex flex-col justify-center ml-6'>
                <h2 className='text-2xl'>Github</h2>
                <h3 className='text-slate-600 xl:text-xl text-lg mt-2'>Click icon to visit</h3>
            </div>
          </div>
          <div className='flex p-6 lg:ml-2 bg-white shadow-lg lg:mt-0 mt-4 mb-4 rounded'>
          <a href={profile?.linkedIn} target="_blank">
            <BsLinkedin className='h-24 w-24 p-5 border-[1px] border-slate-600 rounded'/>
            </a>
            <div className='flex flex-col justify-center ml-6'>
                <h2 className='text-2xl'>LinkedIn</h2>
                <h3 className='text-slate-600 xl:text-xl text-lg mt-2'>Click icon to visit</h3>
            </div>
          </div>

          <div className='flex p-6 bg-white shadow-lg lg:mr-2 mb-4 mt-4 rounded'>
          <a href={profile?.linkedIn} target="_blank">
            <BsTwitter className='h-24 w-24 p-5 border-[1px] border-slate-600 rounded'/>
            </a>
            <div className='flex flex-col justify-center ml-6'>
                <h2 className='text-2xl'>Twitter</h2>
                <h3 className='text-slate-600 xl:text-xl text-lg mt-2'>Click icon to visit</h3>
            </div>
          </div>
          <div className='flex p-6 lg:ml-2 bg-white shadow-lg mb-4 mt-4 rounded'>
          <a href={profile?.linkedIn} target="_blank">
            <BsInstagram className='h-24 w-24 p-5 border-[1px] border-slate-600 rounded'/>
            </a>
            <div className='flex flex-col justify-center ml-6'>
                <h2 className='text-2xl'>Instagram</h2>
                <h3 className='text-slate-600 xl:text-xl text-lg mt-2'>Click icon to visit</h3>
            </div>
          </div>

          <div className='flex p-6 lg:mr-2 bg-white shadow-lg mb-4 mt-4 rounded'>
            <AiFillMail className='h-24 w-24 p-5 border-[1px] border-slate-600 rounded'/>
            <div className='flex flex-col justify-center ml-6'>
                <h2 className='text-2xl'>Email</h2>
                <h3 className='text-slate-600 xl:text-xl text-lg break-all mt-2'>{profile?.email}</h3>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact