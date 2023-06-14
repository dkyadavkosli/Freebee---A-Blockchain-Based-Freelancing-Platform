import React , {useState , useEffect} from 'react'
import JobCard from '../../components/JobCard'
import { useSelector } from 'react-redux';
import { useStateContext } from "../../context";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function MyJobsCom() {

  const myResume=useSelector((state)=>
  state.changeCurrFreelancer
  );

  const { getMyActiveJobs , getMyFinishedJobs } = useStateContext();

  const [all, setAll] = useState([]);
  const [all2, setAll2] = useState([]);

  console.log(myResume?.pId)

  const getActiveJobs = async () => {
    try {
      const data = await getMyActiveJobs(myResume?.pId);
      setAll(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFinishedJobs = async () => {
    try {
      const data = await getMyFinishedJobs(myResume?.pId);
      setAll2(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getActiveJobs();
    getFinishedJobs();
  }, [])

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
    <div className="flex justify-center items-center flex-col xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 xl:pr-32 lg:pr-24 md:pr-16 sm:pr-12 pr-4 md:pt-10 pt-5 md:pb-10 pb-7">
      <motion.div ref={ref} animate={animation} className="md:text-4xl sm:text-3xl text-2xl text-center">
        JOBS WORKED UPON BY ME
      </motion.div>
      <motion.div animate={animation} className="flex flex-row justify-center mt-4 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6">
        <div className="h-[2px] w-16 bg-blue-600"></div>
      </motion.div>

      <div className='mt-12 w-full'>
        <div className='flex justify-center'>
        <h2 className='md:text-2xl sm:text-lg text-white pl-3 pr-3 pt-2 pb-2 rounded bg-blue-600'>Active Jobs</h2>
        </div>
        <div className='flex justify-center'>
           <h3 className='md:text-lg pl-3 pr-3 pt-2 pb-2 rounded text-slate-600'>Jobs that you have applied for and are currently active to apply</h3>
        </div>
        <div className='mt-2 border-[4px] border-slate-700 shadow-xl h-96 overflow-y-scroll no-scrollbar p-2'>
        {all?.map((free) => (
            <JobCard title={free?.title} desc={free?.description} cost={free?.expected_cost} pId={free?.pId} image={free?.image}/>
          ))}
        </div>
      </div>

      <div className='mt-12 w-full'>
        <div className='flex justify-center'>
           <h2 className='md:text-2xl sm:text-lg text-white pl-3 pr-3 pt-2 pb-2 rounded bg-blue-600'>Jobs Finished</h2>
        </div>
        <div className='flex justify-center'>
           <h3 className='md:text-lg pl-3 pr-3 pt-2 pb-2 rounded text-slate-600'>Jobs for which you are selected and are not active to apply</h3>
        </div>
        <div className='mt-2 border-[4px] border-slate-700 shadow-xl h-96 overflow-y-scroll no-scrollbar p-2'>
        {all2?.map((free) => (
            <JobCard title={free?.title} desc={free?.description} cost={free?.expected_cost} pId={free?.pId} image={free?.image}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyJobsCom