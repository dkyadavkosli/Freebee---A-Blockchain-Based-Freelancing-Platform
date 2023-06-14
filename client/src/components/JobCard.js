import React from 'react'
import pic from "../assets/bigImg.jpg";
import pic2 from "../assets/coin.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeCurrJob} from "../actions/index"

function JobCard({title,desc, cost, pId, image}) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Nav = () => {
    dispatch(changeCurrJob(pId));
    localStorage.removeItem('freeCurrJob');
    localStorage.setItem('freeCurrJob', JSON.stringify(pId))
    navigate("/job") 
  }

  return (
    <div onClick={Nav} className="w-full flex sm:flex-row cursor-pointer flex-col mb-3 border-[2px] border-slate-500">
      <img className="sm:w-1/3 w-full min-h-52" src={image||pic} alt="" />
      <div className="pl-6 pr-6 sm:w-1/2 w-full flex flex-col justify-center">
        <div className="sm:pt-2 pt-4 sm:pb-2 pb-1">
        <h2 className="text-xl text-blue-600">{title}</h2>
        <p className="lg:mt-4 mt-2 text-slate-600">
          {desc.slice(0,220)}... 
        </p>
        </div>
      </div>
      <div className="w-[2px] mt-4 sm:block hidden mb-4 bg-slate-300"></div>
      <div className="h-[2px] mt-4 sm:hidden mb-4 bg-slate-300 ml-4 mr-4"></div>
      <div className="sm:flex flex-row justify-center hidden sm:w-1/6 w-full">
        <div className="flex flex-col justify-center">
        <img className="h-12 w-12" src={pic2} alt=""/>
        <h3 className="mt-2 text-center">{cost}</h3>
        </div>
      </div>
      <div className="flex flex-row pb-3 justify-center sm:hidden w-full">
      <div className="flex flex-col justify-center">
        <img className="h-12 w-12" src={pic2} alt=""/>
        <h3 className="mt-2 text-center">{cost}</h3>
        </div>
      </div>
    </div>
  )
}

export default JobCard