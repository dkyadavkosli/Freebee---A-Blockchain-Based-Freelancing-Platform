import React , {useEffect, useState} from 'react'
import pic from "../../assets/tick.png"
import pic2 from "../../assets/bigImg.jpg"
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Intro() {

  const {ref , inView} = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
            x:0,
            transition:{
                duration:1.2
            }
        })
    }
    if(!inView){
        animation.start({
            x:'-100vw'
        })
    }
  }, [inView])

  return (
    <div ref={ref} className='bg-gray-800 mt-16 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-16 pb-16 flex flex-row'>
        <div className='lg:w-5/12 w-full pr-10'>
          <motion.div animate={animation} className='md:text-3xl text-2xl text-white'>A whole world of freelance talent at your fingertips</motion.div>
          <div className='mt-8'>
            <div className='flex flex-row'>
                <img className='w-8 h-8' src={pic} alt=""/>
                <h3 className='text-xl text-white ml-3'>The best for every budget</h3>
            </div>
            <h4 className='mt-2 text-slate-300'>Find high-quality services at every price point. No hourly rates, just project-based pricing.</h4>
          </div>
          <div className='mt-6'>
            <div className='flex flex-row'>
                <img className='w-8 h-8' src={pic} alt=""/>
                <h3 className='text-xl text-white ml-3'>Search for best freelancers</h3>
            </div>
            <h4 className='mt-2 text-slate-300'>Explore and get to various freelancers that are best fit as per for your project requirements.</h4>
          </div>
          <div className='mt-6'>
            <div className='flex flex-row'>
                <img className='w-8 h-8' src={pic} alt=""/>
                <h3 className='text-xl text-white ml-3'>Quality work done quickly</h3>
            </div>
            <h4 className='mt-2 text-slate-300'>Find the right freelancer to begin working on your project within minutes.</h4>
          </div>
          <div className='mt-6'>
            <div className='flex flex-row'>
                <img className='w-8 h-8' src={pic} alt=""/>
                <h3 className='text-xl text-white ml-3'>Protected payments, always</h3>
            </div>
            <h4 className='mt-2 text-slate-300'>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</h4>
          </div>
        </div>
        <div className='w-7/12 lg:block hidden pl-16 pt-8 pb-8'>
            <img className='h-full w-full border-[2px] border-white rounded' src={pic2} alt=""/>
        </div>
    </div>
  )
}

export default Intro