import React , {useState, useEffect} from 'react'
import ReviewCom from '../../components/ReviewCom'
import axios from "axios"
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Reviews() {

  const {ref , inView} = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
            scale:1,
            transition:{
                duration:2.6, type:'spring'
            }
        })
    }
    if(!inView){
        animation.start({
            scale:0.1
        })
    }
  }, [inView])

  const [coms, setComs] = useState([]);

  const getComs = async () => {
    try {
      const res = await axios.get("/api/comment/");

      let temp = []

      for(var i=0; i<3;i++){
        var rand = res.data[Math.floor(Math.random() * res.data.length)];
        temp.push(rand)
      }

      setComs(temp);
    } catch (err) {
      window.alert("Oops!! Something went wrong.");
    }
  };

  useEffect(() => {
    getComs();
  }, [])

  return (
    <div ref={ref} className='bg-gray-800 mt-16 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-8 md:pr-8 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-12 pb-12'>
        <motion.div animate={animation} className='sm:text-4xl text-3xl text-center text-white'>Hear From Our Clients</motion.div>
        <motion.div animate={animation} className='text-lg text-center text-slate-300 mt-2'>Take a look at various reviews and experiences shared by our previous clients</motion.div>
        <div className='grid md:grid-cols-3 grid-cols-1 pt-2 pb-2 items-baseline md:mt-12 mt-7'>

            {coms?.map((item, i) => {
            return (
              <ReviewCom name={item?.user_name} desc={item?.desc}/>
            );
          })}
        </div>
    </div>
  )
}

export default Reviews