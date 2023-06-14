import React , {useState} from "react";
import pic from "../assets/bigImg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeCurrResume} from "../actions/index"
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { MdOutlineErrorOutline } from "react-icons/md"

function BidCard({bidArray, owner , desc, image, _id}) { 

  const { final_select } = useStateContext();

  const navigate = useNavigate();

  const dispatch = useDispatch();
    
  const [modal, setModal] = useState('N');

  const changeModal = () => {
      setModal('N')
  }

  const select = async () => {
    try {
      const data = await final_select(
        _id, ethers.utils.formatEther(bidArray[3])*1000000000000000000, ethers.utils.formatEther(bidArray[0])*1000000000000000000
      );
      navigate("/home")
    } catch (e) {
      setModal('Y')
      setTimeout(changeModal, 5000);
    }
  };

  const Nav = () => {
    dispatch(changeCurrResume(bidArray[3]));
    localStorage.removeItem('freeCurrResume');
    localStorage.setItem('freeCurrResume', JSON.stringify(bidArray[3]))
    navigate("/freelancer")
  }

  return (
    <div to="/freelancer" className="bg-slate-100 mt-2 mb-2 p-3 cursor-pointer border-[2px] border-slate-600 rounded flex sm:flex-row flex-col">
      <div className={`${modal === 'N' ? 'hidden':""} bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`} style={{ position: "absolute", top: "4px", 'right': "4px" }}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
           <div className='mt-[3px] ml-3'>You should have the required funds in your wallet</div>
      </div>
      <img onClick={Nav}
        className="w-1/6 min-h-40 lg:block hidden border-[2px] border-slate-600"
        src={image||pic}
        alt=""
      />
      <div onClick={Nav} className="lg:w-3/6 w-2/3 sm:block hidden pl-4 pr-4">
        <h2 className="text-xl truncate">{owner}</h2>
        <p className="mt-1 text-slate-600">
          {desc}...
        </p>
      </div>
      <div className="lg:w-2/6 w-1/3 sm:flex flex-col hidden justify-center">
        <h2 className="text-lg text-slate-700 text-center">Amount: {ethers.utils.formatEther(bidArray[0].toString())*1000000000000000000}</h2>
        <h2 className="text-lg text-slate-700 text-center mt-1">Time: {ethers.utils.formatEther(bidArray[1].toString())*1000000000000000000} Days</h2>
        <h2 className="text-lg text-slate-700 text-center mt-1">{ethers.utils.formatEther(bidArray[2].toString())*1000000000000000000} ⭐ out of 5</h2>
        <div className="flex justify-center items-center">
           <div onClick={select} className="text-lg bg-blue-600 text-slate-100 text-center mt-2 pt-2 pb-2 pl-5 pr-5 rounded-md">Select</div>
        </div>
      </div>

      <div className="lg:w-3/6 sm:w-2/3 w-full sm:hidden pl-2 pr-2">
        <h2 className="text-xl">{owner}</h2>
        <p className="mt-1 text-slate-600">
          {desc}
        </p>
      </div>
      <div className="lg:w-2/6 sm:w-1/3 w-full sm:hidden grid grid-cols-1 mt-2 pl-2 pr-2">
      <div className="text-lg text-slate-700 text-center">Amount: {ethers.utils.formatEther(bidArray[0].toString())*1000000000000000000}</div>
        <h2 className="text-lg text-slate-700 text-center mt-1">Time: {ethers.utils.formatEther(bidArray[1].toString())*1000000000000000000} Days</h2>
        <h2 className="text-lg text-slate-700 text-center mt-1">{ethers.utils.formatEther(bidArray[2].toString())*1000000000000000000} ⭐ out of 5</h2>
        <h2 className="flex justify-center items-center">
           <div onClick={select} className="text-lg bg-blue-600 text-slate-100 text-center mt-2 pt-2 pb-2 pl-5 pr-5 rounded-md">Select</div>
        </h2>
      </div>
    </div>
  );
}

export default BidCard;
