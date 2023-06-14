import React , {useState, useEffect} from "react";
import pic from "../assets/logo1.png";
import pic2 from "../assets/profile1.png";
import {GiHamburgerMenu} from "react-icons/gi"
import { useStateContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { changeUser , changeCurrResume } from "../actions/index"
import { MdOutlineErrorOutline } from "react-icons/md"

function Navbar({yes}) {

  const [nav,setNav] = useState(0);
  const [ys, setYes] = useState(0); 

  const myUser=useSelector((state)=> 
  state.changeUser
  );

  const myFreelancer=useSelector((state)=> 
  state.changeCurrFreelancer
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { connect, address } = useStateContext();

  const changeNav = () => {
    if(nav===1){
      setNav(0)
    }else{
      setNav(1)
    }
  }

  const logOut = () => {
    dispatch(changeUser(null))
    localStorage.removeItem('freelance');
    navigate("/")
  }

  const changeYes = () => {
    if(ys===1){
      setYes(0)
    }else{
      setYes(1)
    }
  }

  const [modal, setModal] = useState('N');

  const changeModal = () => {
      setModal('N')
  }

  const jobNav = () => {
    if(myFreelancer?.engaged === 1){
      setModal('Y')
      setTimeout(changeModal, 5000);
    }else{
      navigate('/createjob');
    }
  }

  const Nav = () => {
    dispatch(changeCurrResume(myFreelancer?.pId));
    localStorage.removeItem('freeCurrResume');
    localStorage.setItem('freeCurrResume', JSON.stringify(myFreelancer?.pId))
    navigate("/freelancer")
  }

  // const meta = () => {
  //   connect();
  //   setNav(0)
  // }

  return (
    <div className=" border-b-[1px]">
      <div className={`${modal === 'N' ? 'hidden':""} bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`} style={{ position: "absolute", top: "4px", 'right': "4px" }}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
           <div className='mt-[3px] ml-3'>You are engaged in a job. You can't create a job.</div>
      </div>
      <div className="sm:pl-10 sm:pr-10 pl-4 pr-4 flex flex-row bg-white justify-between w-full">
      <div className="flex flex-row">
        <GiHamburgerMenu onClick={changeYes} className="h-10 w-10 mt-2 mb-2 p-2 lg:hidden rounded-full cursor-pointer"/>
        <img className="h-10 lg:block hidden w-12 mt-2 mb-2 mr-5" src={pic} alt="" />
        <Link to="/home" className={`pl-6 pr-6 pt-4 pb-4 font-semibold cursor-pointer border-b-[2px] border-transparent hover:border-blue-600 ${yes==='Y'?'hidden':'lg:block hidden'}`}>
          Dashboard
        </Link>
        <Link to="/allfreelancers" className={`pl-6 pr-6 pt-4 pb-4 font-semibold cursor-pointer border-b-[2px] border-transparent hover:border-blue-600 ${yes==='Y'?'hidden':'lg:block hidden'}`}>
          Find Freelancers
        </Link>
        <Link to='/about' className={`pl-6 pr-6 pt-4 pb-4 font-semibold cursor-pointer border-b-[2px] border-transparent hover:border-blue-600 ${yes==='Y'?'hidden':'lg:block hidden'}`}>
          About
        </Link>
      </div>
      <div className="flex flex-row">
        <div onClick={()=>connect()} className={`flex flex-col ${address ? "hidden":""} justify-center text-white hover:text-black cursor-pointer mt-2 mb-2 bg-purple-600 hover:bg-white sm:mr-6 mr-1 sm:pl-4 sm:pr-4 pl-3 pr-3 rounded-md ${yes==='Y'?'hidden':''}`}>
          <h2 className="sm:text-base text-sm font-semibold">Connect</h2>
        </div>
        <div onClick={()=>connect()} className={`flex flex-col ${address ? "":"hidden"} justify-center text-white hover:text-black cursor-pointer mt-2 mb-2 bg-purple-600 hover:bg-white sm:mr-6 mr-1 sm:pl-4 sm:pr-4 pl-3 pr-3 rounded-md ${yes==='Y'?'hidden':''}`}>
          <h2 className="sm:text-base text-sm font-semibold">Connected</h2>
        </div>
        <Link to="/alljobs" className={` lg:flex lg:flex-col hidden justify-center hover:text-white mt-2 mb-2 cursor-pointer bg-white hover:bg-blue-600 sm:pl-4 sm:pr-4 pl-3 pr-3 rounded-md ${yes==='Y'?'hidden':''}`}>
          <h2 className="sm:text-base text-sm font-semibold">Get Job</h2>
        </Link>
        <div onClick={jobNav} className={`flex flex-col justify-center text-white hover:text-black cursor-pointer mt-2 mb-2 bg-blue-600 hover:bg-white sm:ml-6 ml-1 sm:mr-6 mr-1 sm:pl-4 sm:pr-4 pl-3 pr-3 rounded-md ${yes==='Y'?'hidden':''}`}>
          <h2 className="sm:text-base text-sm font-semibold">Post A Job</h2>
        </div>
        <div className="ml-2 flex flex-col justify-center" >
          <img onClick={changeNav} className="h-10 w-10 cursor-pointer rounded-full" src={myFreelancer?.image || pic2} alt="" />
        </div>
      </div>
      </div>
      <div className={`lg:hidden shadow-lg rounded-b bg-gray-300 border-b-[2px] border-l-[2px] border-r-[2px] border-gray-600 absolute w-screen z-30 pt-2 pb-2 sm:pl-12 sm:pr-12 pl-6 pr-6 ${ys===0?"hidden":""}`}>
       <div>
       <Link to="/home" className={`pt-1 pb-1 mt-1 sm:text-base text-sm font-semibold cursor-pointer ${yes==='Y'?'hidden':''}`}>
          Dashboard
        </Link>
        </div> 
        <div>
        <Link to="/allfreelancers" className={`pt-1 pb-1 mt-1 sm:text-base text-sm font-semibold cursor-pointer ${yes==='Y'?'hidden':''}`}>
          Find Freelancers
        </Link>
        </div>
        <div>
        <Link to="/alljobs" className={`pt-1 pb-1 mt-1 sm:text-base text-sm font-semibold cursor-pointer ${yes==='Y'?'hidden':''}`}>
          Get Job
        </Link>
        </div>
        <div>
        <Link to="/about" className={`pt-1 pb-1 mt-1 sm:text-base text-sm font-semibold cursor-pointer ${yes==='Y'?'hidden':''}`}>
          About
        </Link>
        </div>
      </div>
      <div className={`bg-white shadow-lg absolute sm:right-14 right-9 z-30 top-14 mt-[1px] p-4 ${nav===0?"hidden":""}`}>
        <div onClick={Nav} className={`${yes==='Y'?'hidden':''} cursor-pointer`}>My Profile</div>
        <div className={`pt-1 ${myFreelancer === null ? "":"hidden"} ${yes==='Y'?'hidden':''}`}>
        <Link to="/createresume" className={``}>Create Profile</Link>
        </div>
        <div className={`pt-1 ${myFreelancer !== null ? "":"hidden"} ${yes==='Y'?'hidden':''}`}>
           <Link to="/updateresume" className={``}>Update Profile</Link>
        </div>
        <div className="mt-1">
        <Link to="/myjobs" className={`${yes==='Y'?'hidden':''} cursor-pointer`}>My Jobs</Link>
        </div>
        <div className="mt-1">
        <Link to="/company" className={`${yes==='Y'?'hidden':''} cursor-pointer`}>Created Jobs</Link>
        </div>
        <div className={`${yes==='Y'?'':'pt-1'} ${myUser!==null ? "hidden":""}`}>
        <Link to="/">Login</Link>
        </div>
        <div onClick={logOut} className={`pt-1 cursor-pointer ${myUser===null ? "hidden":""}`}>LogOut</div>
        <div className="pt-1">
        <Link to="/register">Register</Link>
        </div>
        {/* <div onClick={()=>connect()} className={`pt-1 cursor-pointer ${address ? "hidden":""}`}>Connect Metamask</div>
        <div onClick={()=>connect()} className={`pt-1 cursor-pointer ${!address ? "hidden":""}`}>Metamask Connected</div> */}
      </div>
    </div>
  );
}

export default Navbar;
