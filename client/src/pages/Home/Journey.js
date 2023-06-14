import React , {useEffect} from 'react'
import pic1 from "../../assets/job.png"
import pic2 from "../../assets/hire.png"
import pic3 from "../../assets/work.png"
import pic4 from "../../assets/pay.png"
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Journey() {

    const {ref , inView} = useInView();
    const animation = useAnimation();
  
    useEffect(() => {
      if(inView){
          animation.start({
              scale:1,
              transition:{
                  duration:2.8, type:'spring'
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
    <div ref={ref} className='xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-10 md:pr-10 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-14 pb-14'>
        <div>
        <motion.div animate={animation} className='sm:text-4xl text-3xl text-center'>It's Easy to Get Work Done on Freelance</motion.div>
        </div>
        <motion.div animate={animation} className='flex flex-row justify-center mt-4'>
            <div className='h-[2px] w-16 bg-blue-600'></div>
        </motion.div>
        <div className='grid md:grid-cols-4 grid-cols-1 pt-2 pb-2 items-baseline mt-12'>
            <div className='mr-3'>
                <div className='flex flex-row justify-center'>
                <div className='h-24 w-24 p-4 bg-white rounded-full shadow-lg'>
                   <img className='h-full w-full' src={pic1} alt=""/>
                </div>
                </div>
                <h2 className='text-xl text-center mt-4'>Post A Job</h2>
                <h3 className='text-slate-600 text-center mt-2'>Create your job for free and start recieving quotes for the same</h3>
            </div>
            <div className='mr-3 ml-3'>
                <div className='flex flex-row justify-center'>
                <div className='h-24 w-24 p-5 bg-white rounded-full shadow-lg'>
                   <img className='h-full w-full' src={pic2} alt=""/>
                </div>
                </div>
                <h2 className='text-xl text-center mt-4'>Hire Freelancers</h2>
                <h3 className='text-slate-600 text-center mt-2'>Compare the quotes and hire the best freelance professionals</h3>
            </div>
            <div className='mr-3 ml-3'>
                <div className='flex flex-row justify-center'>
                <div className='h-24 w-24 p-5 bg-white rounded-full shadow-lg'>
                   <img className='h-full w-full' src={pic3} alt=""/>
                </div>
                </div>
                <h2 className='text-xl text-center mt-4'>Get Work Done</h2>
                <h3 className='text-slate-600 text-center mt-2'>Keep a track of work done and decide on when to make payment</h3>
            </div>
            <div className='ml-3'>
                <div className='flex flex-row justify-center'>
                <div className='h-24 w-24 p-4 bg-white rounded-full shadow-lg'>
                   <img className='h-full w-full' src={pic4} alt=""/>
                </div>
                </div>
                <h2 className='text-xl text-center mt-4'>Make Secure Payment</h2>
                <h3 className='text-slate-600 text-center mt-2'>Complete the digital payment process using your metamask account</h3>
            </div>
        </div>
    </div>
  )
}

export default Journey