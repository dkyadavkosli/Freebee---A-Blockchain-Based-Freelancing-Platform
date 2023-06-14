import React from "react";
import pic from "../assets/experience.png";
import { ethers } from "ethers";

function ExperienceCard({title, desc, duration}) {
  return (
    <div className="mb-3 pb-3 border-[2px] border-slate-600 mr-3 pl-3 pr-3">
      <h2 className="text-3xl mt-4">
        {title}
      </h2>
      <div className="h-[3px] rounded mt-4 w-24 bg-slate-500 mb-3"></div>
      <p className="text-lg h-44 overflow-y-scroll scrollbar pr-1">
        {desc}
      </p>
      <div className="text-lg text-center pt-3 pb-3 bg-blue-600 text-white mt-3">{ethers.utils.formatEther(duration?._hex.toString())*1000000000000000000} months</div>
    </div>
  );
}

export default ExperienceCard;
