import React, { useState, useEffect, useRef } from "react";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import BidCard from "../../components/BidCard";
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Track from "./Track";
import { MdOutlineErrorOutline } from "react-icons/md";
import Loader from "../../components/Loader";

function JobMid() {
  const { getAJob, addBid } = useStateContext();

  const [job, setJob] = useState(null);

  const myJob = useSelector((state) => state.changeCurrJob);

  const fetchProfile = async () => {
    try {
      const data = await getAJob(myJob);
      setJob(data);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();

  const _cost = useRef();
  const _time = useRef();

  const myFreelancer = useSelector((state) => state.changeCurrFreelancer);

  const myUser = useSelector((state) => state.changeUser);

  const [modal, setModal] = useState("N");

  const changeModal = () => {
    setModal('N')
}

const [isLoading, setIsLoading] = useState(false);

  const createBid = async () => {
    if (myFreelancer?.engaged === 0) {
      setIsLoading(true);
      try {
        const data = await addBid(
          job?.pId,
          myUser?.username,
          _cost.current.value,
          _time.current.value,
          myFreelancer?.rating,
          myFreelancer?.pId,
          myFreelancer?.description,
          myFreelancer?.image
        );
        setIsLoading(false)
        navigate("/home");
      } catch (e) {
        console.log(e);
      }
    } else {
      setModal('Y')
      setTimeout(changeModal, 5000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="">
      {isLoading && <Loader/>}
      <h2 className="pt-10 pb-10 2xl:pl-40 2xl:pr-40 xl:pl-40 xl:pr-40 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 text-3xl text-white bg-blue-600">
        {job?.title}
      </h2>
      <div className="flex md:flex-row flex-col 2xl:pl-40 2xl:pr-40 xl:pl-40 xl:pr-40 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-6 pb-6 bg-slate-200">
        <div className="bg-white md:w-2/3 w-full pt-6 pb-6 pl-4 pr-4">
          <h3 className="text-xl">Job Description</h3>
          <p className="text-slate-600 mt-3">{job?.description}</p>
          <h3 className="text-xl mt-6">Skills Required</h3>
          <div className="flex mt-3">
            {job?.req_skills?.map((skill) => (
              <div className="pt-2 pb-2 pl-3 pr-3 text-white bg-blue-600 rounded-lg mr-3">
                {skill}
              </div>
            ))}
          </div>
          <h3 className="text-xl mt-7">Company Description</h3>
          <p className="text-slate-600 mt-3">{job?.com_desc}</p>
        </div>
        <div className="md:pl-4 md:pr-4 md:w-1/3 w-full md:mt-0 mt-4">
          <div className="bg-slate-100 shadow-md p-4">
            <h3 className="text-lg">Make A Bid</h3>
            <input
              ref={_cost}
              className="w-full border-[2px] border-slate-600 mt-2 p-1"
              placeholder="Enter Bid Amount"
            />
            <input
              ref={_time}
              className="w-full border-[2px] border-slate-600 mt-2 p-1"
              placeholder="Enter Time Duration"
            />
            <div className={`${modal === 'N' ? 'hidden':""} bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`} style={{ position: "absolute", top: "1px", 'right': "2px" }}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
           <div className='mt-[3px] ml-3'>Couldn't make a bid. You might already be engaged.</div>
           </div>
            <div className="mt-3"> 
              <div
                onClick={createBid}
                className="pt-2 pb-2 pl-3 cursor-pointer pr-3 bg-blue-600 text-white text-center"
              >
                Bid
              </div>
            </div>
          </div>
          <div className="bg-slate-100 shadow-md p-4 mt-4">
            <h3 className="text-lg">Amount Offered</h3>
            <h4 className="text-slate-600 mt-2">{job?.expected_cost} MATIC</h4>
          </div>
          <div className="bg-slate-100 shadow-md p-4 mt-4">
            <h3 className="text-lg">Expected Time</h3>
            <h4 className="text-slate-600 mt-2">{job?.expected_time} Days</h4>
          </div>
          <div className="bg-slate-100 shadow-md p-4 mt-4">
            <h3 className="text-lg">Contact Details</h3>
            <div className="flex mt-2">
              <a href={job?.twitter} target="_blank">
                <BsTwitter className="h-9 w-9 p-2 border-[1px] border-slate-600 mr-3 rounded-lg" />
              </a>
              <a href={job?.instagram} target="_blank">
                <BsInstagram className="h-9 w-9 p-2 border-[1px] border-slate-600 mr-3 rounded-lg" />
              </a>
              <a href={job?.linkedIn} target="_blank">
                <BsLinkedin className="h-9 w-9 p-2 border-[1px] border-slate-600 mr-3 rounded-lg" />
              </a>
            </div>
            <div className="mt-2 text-slate-700">Email: {job?.email}</div>
          </div>
          <div className="bg-slate-100 shadow-md p-4 mt-4">
            <h3 className="text-lg">Company's Address</h3>
            <h4 className="text-slate-600 mt-2">{job?.com_address}</h4>
          </div>
        </div>
      </div>

      <div className="2xl:pl-40 2xl:pr-40 xl:pl-40 xl:pr-40 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-6 pb-6 bg-slate-200">
        <h2 className="text-3xl mb-3">Look Who Made A Bid</h2>
        <div className="h-96 overflow-y-scroll no-scrollbar border-[4px] border-gray-600 bg-white p-2">
          {job?.bidders?.map((bidder) => (
            <BidCard
              bidArray={bidder?.bidArray}
              owner={bidder?.bidder}
              _id={job?.pId}
              desc={bidder?.desc.slice(0,250)}
              image={bidder?.image}
            />
          ))}
        </div>
      </div>

      <Track
        id={job?.pId}
        _d={job?._id}
        ask={job?.asks}
        final_selection={job?.final_selection}
        totalAsks={job?.totalAsk}
        final_amount={job?.final_amount}
        asks={job?.asks}
        responses={job?.responses}
        visible={job?.visible}
      />
    </div>
  );
}

export default JobMid;
