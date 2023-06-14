import React, { useState, useEffect, useRef } from "react";
import pic from "../../assets/create.png";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { RiArrowDropDownLine } from "react-icons/ri";
import CampaignFactory from "../../artifacts/contracts/Freelancing.sol/Freelancing.json";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import { Link, useNavigate } from "react-router-dom";
import { useStorageUpload } from '@thirdweb-dev/react';
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader"
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

const CreateJobCom = () => {
  const address = useAddress();

  const [isLoading, setIsLoading] = useState(false);

  const [skills, setSkills] = useState([]);

  const [category1, setCategory1] = useState(0);

  const Category = useRef();

  const new_skill = useRef();

  const navigate = useNavigate();

  const [category, setCategory] = useState();

  const getCategory1 = () => {
    if (category1 === 0) {
      setCategory1(1);
    } else {
      setCategory1(0);
    }
  };

  const myUser=useSelector((state)=> 
  state.changeUser
  );

  const getSetCategory = (cat) => {
    setCategory(cat);
    setCategory1(0);
  };

  const [form, setForm] = useState({
    owner_name: myUser?myUser:"DK",
    title: "",
    description: "",
    company_desc: "",
    deadline: "",
    twitter: "",
    mail: "",
    instagram: "",
    linkedIn: "",
    comapny_address: "",
    expected_time: "",
    expected_cost: "",
    image:""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x678fa39BBfEc2D55107D1c4C577e6a1Ab5B439f6",
      CampaignFactory.abi,
      signer
    );

    setIsLoading(true);

    const campaignData = await contract.createJob(
      [
        form.owner_name,
        form.title,
        form.description,
        form.twitter,
        form.mail,
        form.instagram,
        form.linkedIn,
        form.comapny_address,
        form.company_desc,
        form.image[0],
        myUser?._id,
        categoryLocation
      ],
      [
        new Date(form.deadline).getTime(),
        form.expected_time,
        form.expected_cost,
      ],
      address, skills, category
    );

    await campaignData.wait();

    setSkills([]);

    setIsLoading(false)

    navigate("/home");
  };

  const changeSkills = () => {
    const pp = new_skill.current.value;
    setSkills([...skills, pp])
    new_skill.current.value = "";
  }

  const [file,setFile] = useState();
  const {mutateAsync : upload} = useStorageUpload();

  const uploadFiles = async (e) =>{
    setIsLoading(true);
    const uploadUrl = await upload({
        data : [file],
        options: {
            uploadWithGatewayUrl:true,
            uploadWithoutDirectory:true
        }
    })
    setForm({ ...form, image: uploadUrl });
    console.log(uploadUrl)
    setIsLoading(false)
  } 

  const {ref , inView} = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if(inView){
        animation.start({
            scale:1,
            transition:{
                duration:2.6, type:'spring'
            }
        })
    }
    if(!inView){
        animation.start({
            scale:0.1
        })
    }
  }, [inView])

  const [categoryLocation, setCategoryLocation] = useState();
  const [category1Location, setCategory1Location] = useState(0);
  const CategoryLocation = useRef();

  const getCategory2Location = () => {
    if (category1Location === 0) {
      setCategory1Location(1);
    } else {
      setCategory1Location(0);
    }
  };

  const getSetCategoryLocation = (cat) => {
    setCategoryLocation(cat);
    setCategory1Location(0);
  };

  return (
    <div className="flex justify-center items-center flex-col xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 xl:pr-32 lg:pr-24 md:pr-16 sm:pr-12 pr-4 md:pt-8 pt-5 md:pb-10 pb-7">
      {isLoading && <Loader/>}
      <motion.div ref={ref} animate={animation} className="flex flex-row w-full mt-4 justify-center">
        <h2 className="sm:text-3xl text-2xl font-semibold cursor-pointer">
          CREATE YOUR JOB
        </h2>
      </motion.div>
      <motion.div animate={animation} className="flex flex-row w-full mb-6 justify-center">
        <h4 className="mt-2 text-slate-600 font-semibold">
          Get started with getting bids for your job. Make sure that you
          provide all necessary details.
        </h4>
      </motion.div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[16px] flex flex-col gap-[30px]"
      >
        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Title *"
            placeholder="Enter Job Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Amount Offered *"
            placeholder="Enter Amount Offered"
            inputType="text"
            value={form.expected_cost}
            handleChange={(e) => handleFormFieldChange("expected_cost", e)}
          />
        </div>

        <FormField
          labelName="Job Description *"
          placeholder="Write Job Description"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full sm:flex hidden justify-start items-center p-4 pl-6 bg-gradient-to-r from-[#e2e7f1] to-[#f4f1f1] h-[120px] rounded-[10px]">
          <img
            src={pic}
            alt="money"
            className="w-[60px] h-[60px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] ml-[20px]">
            Provide all relevant details to attract freelancers
          </h4>
        </div>

        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Expected Time (Days) *"
            placeholder="Enter Expected Time Duration"
            inputType="text"
            value={form.expected_time}
            handleChange={(e) => handleFormFieldChange("expected_time", e)}
          />
          <FormField
            labelName="Company Address *"
            placeholder="Enter Company Address"
            inputType="text"
            value={form.comapny_address}
            handleChange={(e) => handleFormFieldChange("comapny_address", e)}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-[40px]">
          <div className="flex-1 w-full flex flex-col">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Skills Required *
            </h3>
            <div className="pt-[9px] pb-[9px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter upto 4 required skills"
                type="text"
                step="0.1"
                ref={new_skill}
                className="outline-none bg-transparent font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
              <div onClick={changeSkills} className="py-[5px] px-[5px] bg-blue-600 text-white border-[1px] rounded cursor-pointer">
                Add Skill
              </div>
            </div>
          </div>
          <FormField
            labelName="Deadline To Apply *"
            placeholder="Enter Last Date To Apply"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col justify-center w-full mb-0.5">
            <h3 className='font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">'>
              Category *
            </h3>
          </div>
          <div className="flex flex-row w-full mt-2">
            <input
              type="text"
              onChange={() => {}}
              ref={Category}
              defaultValue={category}
              value={category}
              className={` py-[15px] sm:px-[25px] px-[15px] outline-none border-t-[1px] border-b-[1px] border-l-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-[14px] placeholder:text-[#a1a7b5] ${
                category1 === 0 ? "rounded-l-[10px]" : ""
              } sm:min-w-[300px] w-full hover:border-gray-500`}
              placeholder="Select Category"
            />
            <RiArrowDropDownLine
              onClick={getCategory1}
              className={`cursor-pointer border-t-[1px] border-b-[1px] ${
                category1 === 0 ? "rounded-r-[10px]" : ""
              } border-r-[1px] border-[#8e8e9e] h-14 w-14`}
            />
          </div>
          <div className={`flex ${category1 === 0 ? "hidden" : ""} flex-row`}>
            <div className="w-full border-2 border-cyan-900 max-h-32 overflow-y-scroll scrollbar pl-2 pt-1 pb-1">
              <div>
                <div
                  onClick={() => getSetCategory("DEVELOPERS")}
                  className="text-slate-600 cursor-pointer"
                >
                  DEVELOPERS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("DESIGNERS")}
                  className="text-slate-600 cursor-pointer"
                >
                  DESIGNERS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("FINANCIAL EXPERTS")}
                  className="text-slate-600 cursor-pointer"
                >
                  FINANCIAL EXPERTS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("PROJECT MANAGERS")}
                  className="text-slate-600 cursor-pointer"
                >
                  PROJECT MANAGERS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("ARTISTS")}
                  className="text-slate-600 cursor-pointer"
                >
                  ARTISTS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("TEACHERS AND TRAINERS")}
                  className="text-slate-600 cursor-pointer"
                >
                  TEACHERS AND TRAINERS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("SALES EXPERTS")}
                  className="text-slate-600 cursor-pointer"
                >
                  SALES EXPERTS
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory("WRITERS AND TRANSLATORS")}
                  className="text-slate-600 cursor-pointer"
                >
                  WRITERS AND TRANSLATORS
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Twitter *"
            placeholder="Enter your twitter account"
            inputType="text"
            value={form.twitter}
            handleChange={(e) => handleFormFieldChange("twitter", e)}
          />
          <FormField
            labelName="E-Mail *"
            placeholder="Enter your E-mail"
            inputType="text"
            value={form.mail}
            handleChange={(e) => handleFormFieldChange("mail", e)}
          />
        </div>

        <div className="flex-1 w-full flex flex-col mt-5">
        <div className="font-epilogue font-medium text-[17px] leading-[22px] mb-[10px]">
          Campaign Image *
        </div>
        <div className="pt-[14px] pb-[12px] flex flex-row justify-between sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[14px] rounded-[10px] sm:min-w-[300px]">
        <input
          onChange={(e)=>{
            if(e.target.files){
                setFile(e.target.files[0]);
            }
          }}
          type='file'
          step="0.1"
          className="outline-none bg-transparent cursor-pointer font-epilogue text-[14px] placeholder:text-[#999eac]"
        />
        <div onClick={uploadFiles} className="py-[5px] px-[5px] bg-purple-700 text-white border-[1px] rounded cursor-pointer">IPFS Upload</div>
        </div>
        </div>

        <div className="">
        <span className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
          Job Location *
        </span>
        <div className="flex flex-row w-full mt-2">
            <input
              type="text"
              onChange={() => {}}
              ref={CategoryLocation}
              value={categoryLocation}
              className={` py-[15px] sm:px-[25px] px-[15px] outline-none border-t-[1px] border-b-[1px] border-l-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-[14px] placeholder:text-[#a1a7b5] ${
                category1 === 0 ? "rounded-l-[10px]" : ""
              } sm:min-w-[300px] w-full hover:border-gray-500`}
              placeholder="Select Location"
            />
            <RiArrowDropDownLine
              onClick={getCategory2Location}
              className={`cursor-pointer border-t-[1px] border-b-[1px] ${
                category1Location === 0 ? "rounded-r-[10px]" : ""
              } border-r-[1px] border-[#8e8e9e] h-14 w-14`}
            />
          </div>
          <div className={`flex ${category1Location === 0 ? "hidden" : ""} flex-row`}>
            <div className="w-full border-2 border-cyan-900 max-h-32 overflow-y-scroll scrollbar pl-2 pt-1 pb-1">
              <div>
                <div
                  onClick={() => getSetCategoryLocation('IN-OFFICE')}
                  className="text-slate-600 cursor-pointer"
                >
                  IN-OFFICE
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategoryLocation('ONLINE')}
                  className="text-slate-600 cursor-pointer"
                >
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Instagram *"
            placeholder="Enter your Instagram Address"
            inputType="text"
            value={form.instagram}
            handleChange={(e) => handleFormFieldChange("instagram", e)}
          />
          <FormField
            labelName="LinkedIn *"
            placeholder="Enter your LinkedIn Address"
            inputType="text"
            value={form.linkedIn}
            handleChange={(e) => handleFormFieldChange("linkedIn", e)}
          />
        </div>

        <FormField
          labelName="Company Description *"
          placeholder="Write your Comapny's Description"
          isTextArea
          value={form.company_desc}
          handleChange={(e) => handleFormFieldChange("company_desc", e)}
        />

        <div className="flex justify-center items-center mt-[20px]">
          <CustomButton
            btnType="submit"
            title="Create New Job"
            styles="bg-gradient-to-r from-slate-600 to-slate-500"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateJobCom;
