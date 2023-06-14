import React, { useRef , useState } from "react";
import pic from "../../assets/profile1.png";
import { useSelector } from "react-redux";
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";

function Track({
  id,
  _id,
  ask,
  totalAsks,
  final_amount,
  asks,
  responses,
  final_selection,
  visible
}) {
  const { makeAsk, makeResponse , rate } = useStateContext();

  const desc = useRef();
  const _rating = useRef()

  console.log(totalAsks);

  const navigate = useNavigate();

  const myUser = useSelector((state) => state.changeUser);

  const myFree = useSelector((state) => state.changeCurrFreelancer);

  const [modal, setModal] = useState("N");

  const changeModal = () => {
    setModal('N')
  }

  const Ask = async () => {
    if (asks.length !== responses.length) {
      setModal('Y')
      setTimeout(changeModal, 5000);
    } else {
      try {
        const data = await makeAsk(id, desc.current.value);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const [modal1, setModal1] = useState("N");

  const changeModal1 = () => {
    setModal1('N')
  }

  const Response = async (_resp) => {
    if (myUser?._id !== _id) {
      setModal1('Y')
      setTimeout(changeModal1, 5000);
    } else {
      let _amt = 0;
      if (totalAsks < 3) {
        _amt = Math.floor(final_amount / 4);
      } else {
        _amt = final_amount;
      }
      try {
        const data = await makeResponse(
          id,
          _resp,
          "0x64Cb1575C62663c1D54A1Ea6f2dbAfDE182F74BD",
          _amt
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const [modal2, setModal2] = useState("N");

  const changeModal2 = () => {
    setModal2('N')
  }

  const rateFree = async() => {
    try{
        const data = await rate(_rating.current.value, final_selection);
        setModal2('Y')
        setTimeout(changeModal2, 5000);
    }catch{
        window.alert("Some Error Occured");
    }
  }

  return (
    <div className={`${visible === 0 ? "":"hidden"} 2xl:pl-40 2xl:pr-40 xl:pl-40 xl:pr-40 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-6 pb-10 bg-slate-200`}>
      <h2 className={`font-epilogue sm:text-3xl text-xl ${myFree?.pId === final_selection && visible === 0 ? "" : "hidden"}`}>Post An Update</h2>
      <div className={`w-full mt-3 ${myFree?.pId === final_selection && visible === 0 ? "" : "hidden"}`}>
        <textarea
          ref={desc}
          required
          rows={2}
          placeholder="Add a Comment"
          className="py-[15px] sm:px-[25px] px-[15px] w-full outline-none border-[1px] border-[#515153] bg-transparent font-epilogue text-[14px] placeholder:text-[#3f3f40] rounded-[10px] sm:min-w-[300px]"
        />
      </div>
      <div className={`${modal === 'N' ? 'hidden':""} ${myFree?.pId === final_selection && visible === 0 ? "" : "hidden"} mt-2 bg-blue-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
           <div className='mt-[3px] ml-3'>Please wait before making another ask.</div>
      </div> 
      <div className={`mt-2 ${myFree?.pId === final_selection && visible === 0 ? "" : "hidden"} mb-6`}>
        <div
          onClick={Ask}
          className="py-[6px] px-[6px] bg-purple-700 max-w-[120px] text-white text-center border-[3px] rounded-md cursor-pointer"
        >
          Post Update
        </div>
      </div>

      <h2 className={`sm:text-3xl text-xl mb-3 mt-4 ${visible === 0 ? "":"hidden"}`}>Track The Progress</h2>
      <div className={`${visible === 0 ? "":"hidden"} h-96 overflow-y-scroll no-scrollbar border-[4px] border-gray-600 bg-white p-2`}>
        <h3 className="ml-1 text-lg font-semibold mb-2">
          Milestones Completed : {totalAsks}/4{" "}
        </h3>
        <div className="grid grid-cols-1">
          {ask?.map((item, i) => {
            return (
              <div className="p-3 mt-1 mb-1 bg-[#dbdbdd] ml-1 mr-1 rounded flex flex-row">
                <img
                  src={pic}
                  alt="money"
                  className="w-[50px] h-[50px] object-contain"
                />
                <div className="ml-6 pt-[6px]">
                  <h3 className="text-lg">Admin</h3>
                  <p className="text-slate-600">{item}</p>
                  <div className={`${modal1 === 'N' ? 'hidden':""} mt-2 bg-blue-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}>
                     <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
                     <div className='mt-[3px] ml-3'>You are not the Job Creator</div>
                  </div> 
                  <div className="flex gap-[15px] mt-3">
                    <div
                      onClick={() => Response(1)}
                      className="pt-2 pb-2 pl-3 pr-3 bg-blue-600 rounded text-white text-sm cursor-pointer"
                    >
                      Allow
                    </div>
                    <div
                      onClick={() => Response(1)}
                      className="pt-2 pb-2 pl-3 pr-3 bg-red-600 rounded text-white text-sm cursor-pointer"
                    >
                      Deny
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={`mt-3 text-lg font-semibold ml-1`}>Rate the Work Done</div>
        <div className={`${modal2 === 'N' ? 'hidden':""} mt-2 bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}>
           <MdOutlineErrorOutline className='h-8 w-8 animate-bounce'/>
           <div className='mt-[3px] ml-3'>Rated the freelancer successfully.</div>
      </div> 
        <div className="flex justify-between mt-2 ml-1">
          <input ref={_rating} type="number" placeholder="Enter your rating (1-5)"
          className="py-[15px] sm:px-[25px] px-[15px] w-full outline-none border-[1px] border-[#515153] bg-transparent font-epilogue text-[14px] placeholder:text-[#3f3f40] rounded-[10px] sm:min-w-[250px]" />
          <div onClick={rateFree} className="flex flex-col justify-center bg-blue-600 text-white rounded-md ml-3 px-[10px] cursor-pointer">
            <div>Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
