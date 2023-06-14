import React , {useEffect} from 'react'
import { Link } from "react-router-dom";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function HomeTop() {

  const {ref , inView} = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
            scale:1,
            transition:{
                duration:2, type:'spring'
            }
        })
    }
    if(!inView){
        animation.start({
            scale:0.1
        })
    }
  }, [inView])

  return (
    <motion.div ref={ref}  animate={animation} className='2xl:pl-102 z-20 2xl:pr-102 xl:pl-80 xl:pr-80 lg:pl-56 lg:pr-56 md:pl-28 md:pr-32 sm:pl-32 sm:pr-28 pl-5 pr-5 pt-28 pb-28'>
        <div className='flex flex-row justify-center w-full'>
        <h1 className='font-bold md:text-6xl sm:text-4xl text-2xl text-center'>Find And Hire Expert Freelancers</h1>
        </div>
        <div className='flex flex-row justify-center w-full mt-6'>
        <h3 className='font-semibold md:text-2xl sm:text-lg text-slate-600 text-center'>Work with the best freelance talent</h3>
        </div>
        <div className='flex flex-row justify-center'>
        <Link to="/createJob" className='flex flex-col justify-center text-white hover:text-black cursor-pointer h-12 mt-6 bg-blue-600 ml-6 mr-6 pl-10 pr-10 rounded-md'>
            <div className='font-semibold'>Get Started</div>
        </Link>
        </div>
    </motion.div>
  )
}

export default HomeTop