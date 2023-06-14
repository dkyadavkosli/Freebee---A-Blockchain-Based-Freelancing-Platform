import React from "react";
import pic from "../assets/quote.png"
import pic2 from "../assets/profile1.png"

function ReviewCom({name,desc}) {
  return (
    <div className="p-4 bg-white flex flex-col justify-between ml-2 mr-2 min-h-103 md:mt-0 mt-3">
      <div>
      <img className="h-10 w-10" src={pic} alt=""/>
      <p className="mt-2">
        {desc}
      </p>
      </div>
      <div className="mt-4 flex flex-row">
        <img className="h-12 w-12" src={pic2} alt=""/>
        <div className="flex flex-col justify-center ml-4">
            <h2 className="leading-4">{name}</h2> 
            <h3 className="text-sm text-slate-500">User</h3>
        </div>
      </div>
    </div>
  );
}

export default ReviewCom;
