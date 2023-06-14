import React , {useRef , useState , useEffect} from 'react'
import Navbar from '../components/Navbar'
import {AiFillUnlock} from "react-icons/ai"
import { motion } from "framer-motion"
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { changeUser , changeCurrFreelancer} from "../actions/index"
import { MdOutlineErrorOutline } from "react-icons/md"
import pic from "../assets/login2.webp"

function Login() {

  const email = useRef();
  const password = useRef();

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curr = JSON.parse(localStorage.getItem("freelance"));
  console.log(curr);

  // const hi = () => {
  //   if (curr !== null) {
  //     dispatch(changeUser(curr));
  //     navigate("/home");
  //   }
  // };

  const [modal, setModal] = useState('N');
  const [modal2, setModal2] = useState(curr!==null?'Y':'N');

  const changeModal = () => {
    setModal('N')
 }

  const handleClick = async (e) => {
    e.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,  
      };
      try {
        const res = await axios.post("/api/entry/login", user); 
        dispatch(changeUser(res.data))
        dispatch(changeCurrFreelancer(null))
        localStorage.removeItem('freelance');
        localStorage.setItem('freelance', JSON.stringify(res.data))
        localStorage.removeItem('freeCurrFreelancer');
        localStorage.setItem('freeCurrFreelancer', null)
        navigate("/home");
      } catch (err) {
        setModal('Y')
        setTimeout(changeModal, 5000);
      }
  }; 

  const changeYes = () => {
      dispatch(changeUser(curr));
      navigate("/home");
  }

  const changeNo = () => {
     setModal2('N');
  }

 
  return (
    <motion.div className='min-h-[750px] bg-white' variants={myVariant} initial="hidden" animate='visible' exit='exit'>
    <Navbar yes='Y'/>
    <div className='md:h-44 h-32 w-full flex flex-col justify-center bg-[#e5e9f4] xl:pl-52 lg:pl-36 md:pl-24 sm:pl-12 pr-4 pl-4 bg-no-repeat bg-cover' >
        <motion.div initial={{ x: '-10vw', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{duration:2 , type:'spring'}} className='md:text-2xl sm:text-lg  text-slate-600 font-semibold'>CONTINUE YOUR JOURNEY</motion.div>
        <motion.div initial={{ x: '100vw', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{duration:2 , type:'spring'}} className='xl:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold'>LOGIN YOUR ACCOUNT</motion.div>
        <motion.div initial={{ x: '-10vw', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{duration:2 , type:'spring'}} className='md:text-2xl sm:text-lg  text-slate-600 font-semibold'>AND SEARCH FOR GOOD JOBS AND FREELANCERS.</motion.div>
    </div>

    <div className={`${modal === 'N' ? 'hidden':""} bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`} style={{ position: "absolute", top: "60px", 'right': "4px" }}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce mt-[5px]'/>
           <div className='mt-[8px] ml-3'>Invalid credentials</div>
           <div onClick={()=>window.location.reload()} className="ml-6 p-2 bg-slate-300 text-slate-800 rounded-lg cursor-pointer">OK!</div>
      </div>

    <div className={`${modal2 === 'N' ? 'hidden':""} flex flex-col bg-[rgba(0,0,0,0.7)] min-h-screen w-full justify-center border-[2px] border-slate-300 shadow-lg pt-3 pb-3 pl-4 pr-4 rounded-md relative transition duration-3000 ease-in-out`} style={{ position: "absolute" , top:'0px' , left:'0px' }}>
        <div className='flex justify-center'>
          <div className='w-3/4 bg-white p-6 shadow-lg border-[2px] border-gray-600 rounded'>
            <div className='flex justify-center'>
            <img src={pic} className='h-64' alt="image"/>
            </div>
            <div className='flex justify-center mt-1'>
               <div className='text-center'>Hey {curr?.username}, Do you want to continue your journey with your previous login?</div>
            </div>
            <div className='flex justify-center mt-4'>
               <div onClick={changeYes} className='text-center cursor-pointer pl-4 pr-4 pt-2 pb-2 bg-green-600 rounded text-white mr-2'>Yes</div>
               <div onClick={changeNo} className='text-center cursor-pointer pl-4 pr-4 pt-2 pb-2 bg-red-600 rounded text-white ml-2'>No</div>
            </div>
          </div>
        </div>
    </div>

    <div className='xl:pl-52 xl:pr-52 lg:pl-36 lg:pr-36 md:pl-24 md:pr-24 sm:pl-12 sm:pr-12 pl-4 pr-4 pt-6 pb-6 flex w-full bg-white flex-row'>
    <div className='md:w-2/3 w-full border-2 border-[#565757] p-3'> 
    <div className='w-full pb-3'>
      <AiFillUnlock className='w-full h-44'/>
    </div>
    <form method="POST">
    <div className='flex sm:flex-row flex-col'>
        <div className='flex flex-col justify-center w-1/4 mr-1'>
          <h3 className=''>EMAIL</h3>
        </div>
          <div className='flex flex-row sm:mt-0 mt-1 sm:w-3/4 w-full'>
            <input type="email" ref={email} required className='w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500'/>
          </div>
       </div>
       <div className='flex sm:flex-row flex-col mt-6 '>
       <div className='flex flex-col justify-center w-1/4 mr-1'>
          <h3 className=''>PASSWORD</h3>
        </div>
          <div className='flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1'>
            <input type="password" ref={password} required className='w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500'/>
          </div>
       </div>
       <div className='w-full mt-6 flex flex-row justify-center'>
       <button onClick={handleClick} type='submit' className='text-lg pt-2 w-1/2 rounded pb-2  border-white bg-gradient-to-r from-sky-600 to-sky-400 text-white'>LOGIN</button>
       </div>
       </form>  
       </div>
       </div>   
    </motion.div>
  )
}

export default Login