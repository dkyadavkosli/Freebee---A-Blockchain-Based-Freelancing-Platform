import React , {useRef , useEffect, useState} from "react";
import axios from 'axios';
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";
import { MdOutlineErrorOutline } from "react-icons/md"

function Comment() {

  const user_name = useRef();
  const desc = useRef();

  const [modal, setModal] = useState('N');

  const changeModal = () => {
    setModal('N')
}

  const handleClick = async (e) => {
    e.preventDefault();
      const user = {
        user_name: user_name.current.value,
        desc: desc.current.value,  
      };
      try {
        const res = await axios.post("/api/comment/create", user); 
        setModal('Y')
        setTimeout(changeModal, 5000);
      } catch (err) {
        window.alert("Invalid credentials")
        window.location.reload();
      }
  };

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
    <div  ref={ref} className="xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-10 md:pr-10 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-14 pb-14 bg-gray-800">
      <div>
        <motion.div animate={animation} className="sm:text-4xl text-3xl text-center text-white">
          Tell Us About Your Experience
        </motion.div>
      </div>
      <motion.div animate={animation} className="flex flex-row justify-center mt-4">
        <div className="h-[2px] w-16 bg-slate-200"></div>
      </motion.div>
 
      <input
          required
          type="text"
          ref={user_name}
          placeholder="Your Name"
          className="py-[15px] w-full text-white mt-12 sm:px-[25px] px-[15px] outline-none border-[1px] border-[#b4b4bd] bg-transparent font-epilogue text-[14px] placeholder:text-[#b4b7c1] rounded-[10px] sm:min-w-[300px]"
        />
        <textarea
          required
          rows={10}
          ref={desc}
          placeholder="Write Your Experience Of Using This Platform"
          className="py-[15px] sm:px-[25px] text-white px-[15px] w-full mt-3 outline-none border-[1px] border-[#b6b6c5] bg-transparent font-epilogue text-[14px] placeholder:text-[#b0b3bb] rounded-[10px] sm:min-w-[300px]"
        />
        <div className={`${modal === 'N' ? 'hidden':""} flex justify-center`}>
        <div className={`mt-3 bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce mt-[5px]'/>
           <div className='mt-[8px] ml-3'>Comment Posted Successfully</div>
           <div onClick={()=>window.location.reload()} className="ml-6 p-2 bg-slate-300 text-slate-800 rounded-lg cursor-pointer">OK!</div>
      </div>
      </div>
         <div className='flex flex-row justify-center'>
        <div onClick={handleClick} className='flex flex-col justify-center text-white hover:text-black cursor-pointer h-12 mt-6 bg-blue-600 ml-6 mr-6 pl-10 pr-10 rounded-md'>
            <h3 className='font-semibold'>Post Comment</h3>
        </div>
        </div>
    </div>
  );
}

export default Comment;
