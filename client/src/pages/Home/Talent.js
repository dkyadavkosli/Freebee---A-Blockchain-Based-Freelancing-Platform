import React , {useState, useEffect} from 'react'
import ProfileCard from '../../components/ProfileCard'
import { useStateContext } from "../../context";
import {
  useAddress,
} from "@thirdweb-dev/react";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Talent() {

  const [all, setAll] = useState();

  const { getAllProfiles } = useStateContext();

  const address = useAddress();

  const getProfiles = async () => {
    try {
      const data = await getAllProfiles();
      setAll(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfiles();
  }, [address]);

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

  return (
    <div ref={ref} className='pt-14 pb-14'>
        <div className='xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-12 md:pr-12 sm:pl-10 sm:pr-10 pl-6 pr-6'>
        <motion.div animate={animation} className='text-4xl text-center'>Meet Talented Freelancers On Our Platform</motion.div>
        </div>
        <motion.div animate={animation} className='flex flex-row justify-center mt-4 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6'>
            <div className='h-[2px] w-16 bg-blue-600'></div>
        </motion.div>
        <div className='grid md:grid-cols-3 grid-cols-1 items-baseline md:mt-12 mt-7 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-8 md:pr-8 sm:pl-10 sm:pr-10 pl-6 pr-6'>
            {all?.map((free) => (
            <ProfileCard
              title={free?.name}
              key={free?.pId}
              desc={free?.description}
              pId={free?.pId} 
              image={free?.image}
            />
          ))}
        </div>
    </div>
  )
}

export default Talent