import React from "react";
import pic1 from "../assets/bigImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrResume} from "../actions/index"

function ProfileCard({title, desc, pId, image}) {

  const navigate = useNavigate();

  const dispatch = useDispatch(); 

  const Nav = () => {
    dispatch(changeCurrResume(pId));
    localStorage.removeItem('freeCurrResume');
    localStorage.setItem('freeCurrResume', JSON.stringify(pId))
    navigate("/freelancer")
  }

  return (
    <div className="ml-3 mr-3 shadow-lg md:mt-0 mt-3">
      <img className="w-full h-64" src={image||pic1} alt="" />
      <div className="pl-3 pr-3 pt-2 pb-4 bg-white">
      <h2 className="text-lg mt-2 text-blue-600">{title}</h2>
      <p className="mt-2">
        {desc.slice(0,220)}...
      </p>
      </div>
      <div onClick={Nav} to="/freelancer" className="w-full cursor-pointer">
      <h2 className="w-full pt-3 pb-3 bg-blue-500 hover:bg-indigo-600 text-white text-center">View Profile</h2>
      </div>
    </div>
  );
}

export default ProfileCard;
