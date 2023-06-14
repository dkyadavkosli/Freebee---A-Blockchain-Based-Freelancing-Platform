import React , {useEffect} from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JobMid from './JobMid'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

function JobPage() {

  const myUser=useSelector((state)=>
  state.changeUser
  );

  const nav = useNavigate();

  useEffect(() => {
    if (myUser==null) nav("/");
  }, []);

  const myVariant = {
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{duration:1}
    },
    exit:{
      x:'-100vw',
      transition:{ease : 'easeInOut' , duration:0.5}
    }
  }

  return (
    <motion.div variants={myVariant} initial="hidden" animate='visible' exit='exit'>
        <Navbar/>
        <JobMid/>
        <Footer/>
    </motion.div>
  )
}

export default JobPage