import React, { useState, useEffect, useRef } from "react";
import pic from "../../assets/create.png";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { RiArrowDropDownLine } from "react-icons/ri";
import CampaignFactory from "../../artifacts/contracts/Freelancing.sol/Freelancing.json";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
import { useStorageUpload } from '@thirdweb-dev/react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from "../../components/Loader";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

const UpdateResumeCom = () => {
  const address = useAddress();

  const [category1, setCategory1] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const Category = useRef();

  const myFreelancer=useSelector((state)=> 
  state.changeCurrFreelancer
  );

  const [category, setCategory] = useState(myFreelancer?.category);

  const getCategory1 = () => {
    if (category1 === 0) {
      setCategory1(1);
    } else {
      setCategory1(0);
    }
  };

  const navigate = useNavigate();

  const myUser=useSelector((state)=> 
  state.changeUser
  );

  const getSetCategory = (cat) => {
    setCategory(cat);
    setCategory1(0);
  };

  const new_skill = useRef();
  const new_exp_title = useRef();
  const new_exp_desc = useRef();
  const new_exp_duration = useRef();
  const new_pro_title = useRef();
  const new_pro_desc = useRef();
  const new_pro_platform = useRef();

  const [skills, setSkills] = useState([]);
  const [exp_title, setExp_title] = useState([]);
  const [exp_desc, setExp_desc] = useState([]);
  const [exp_duration, setExp_duration] = useState([]);
  const [pro_title, setPro_title] = useState([]);
  const [pro_desc, setPro_desc] = useState([]);
  const [pro_platform, setPro_platform] = useState([]);

  const [form, setForm] = useState({
    owner_name: myFreelancer?.name,
    description: myFreelancer?.description,
    twitter: myFreelancer?.twitter,
    mail: myFreelancer?.email,
    instagram: myFreelancer?.instagram,
    linkedIn: myFreelancer?.linkedIn,
    github: "github.com",
    image: [myFreelancer?.image]
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  console.log(category)

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

    const campaignData = await contract.updateProfile(
      myFreelancer?.pId,  
      [
        form.owner_name,
        form.description,
        category,
        form.twitter,
        form.mail,
        form.instagram,
        form.linkedIn,
        form.github,
        form.image[0],
        myUser?._id
      ],
      address, skills, exp_title, exp_desc, exp_duration, pro_title, pro_desc, pro_platform
    );

    await campaignData.wait();

    setSkills([]);
    setExp_title([]);
    setExp_desc([]);
    setExp_duration([]);
    setPro_desc([]);
    setPro_platform([]);
    setPro_title([]);

    console.log("HOi gava");
    setIsLoading(false);
    navigate("/home");
  };

  const changeSkills = () => {
    const pp = new_skill.current.value;
    setSkills([...skills, pp]);
    new_skill.current.value = "";
  };

  const changeExperience = () => {
    const pp = new_exp_title.current.value;
    setExp_title([...exp_title, pp]);
    new_exp_title.current.value = "";

    const qq = new_exp_desc.current.value;
    setExp_desc([...exp_desc, qq]);
    new_exp_desc.current.value = "";

    const kk = new_exp_duration.current.value;
    setExp_duration([...exp_duration, kk]);
    new_exp_duration.current.value = "";
  };

  const changeProject = () => {
    const pp = new_pro_title.current.value;
    setPro_title([...pro_title, pp]);
    new_pro_title.current.value = "";

    const qq = new_pro_desc.current.value;
    setPro_desc([...pro_desc, qq]);
    new_pro_desc.current.value = "";

    const kk = new_pro_platform.current.value;
    setPro_platform([...pro_platform, kk]);
    new_pro_platform.current.value = "";
  };

  const [file,setFile] = useState();
  const {mutateAsync : upload} = useStorageUpload();
 
  const uploadFiles = async (e) =>{
    const uploadUrl = await upload({
        data : [file],
        options: {
            uploadWithGatewayUrl:true,
            uploadWithoutDirectory:true
        }
    })
    setForm({ ...form, image: uploadUrl });
    console.log(uploadUrl)
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

  return (
    <div className="flex justify-center items-center flex-col xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 xl:pr-32 lg:pr-24 md:pr-16 sm:pr-12 pr-4 md:pt-10 pt-5 md:pb-10 pb-7">
      {isLoading && <Loader/>}
      <div className="flex flex-row w-full mt-4 justify-center">
        <motion.div ref={ref} animate={animation} className="sm:text-3xl text-2xl font-semibold cursor-pointer">
          UPDATE YOUR PROFILE
        </motion.div>
      </div>
      <motion.div animate={animation} className="flex flex-row w-full mb-6 justify-center">
        <h3 className="mt-2 text-slate-600 text-center font-semibold">
          Update your resume to make it a perfect one. Make sure that you
          provide all necessary details.
        </h3>
      </motion.div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[16px] flex flex-col gap-[30px]"
      >
        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Name *"
            placeholder="Enter Your Name"
            inputType="text"
            value={form.owner_name}
            defaultValue={myFreelancer?.name}
            handleChange={(e) => handleFormFieldChange("owner_name", e)}
          />
          <div className="flex-1 w-full flex flex-col">
            <h2 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Skills *
            </h2>
            <div className="pt-[9px] pb-[9px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter upto 4 skills"
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
        </div>

        <FormField
          labelName="About Me *"
          placeholder="Write Your Brief Description"
          isTextArea
          value={form.description}
          defaultValue={myFreelancer?.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full sm:flex hidden justify-start items-center p-4 pl-6 bg-gradient-to-r from-[#e2e7f1] to-[#f4f1f1] h-[120px] rounded-[10px]">
          <img
            src={pic}
            alt="money"
            className="w-[60px] h-[60px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] ml-[20px]">
            Update resume and make bids for various jobs
          </h4>
        </div>

        <div className="flex md:flex-row flex-col gap-[40px]">
          <FormField
            labelName="Twitter *"
            placeholder="Enter your twitter account"
            inputType="text"
            value={form.twitter}
            defaultValue={myFreelancer?.twitter}
            handleChange={(e) => handleFormFieldChange("twitter", e)}
          />
          <FormField
            labelName="E-Mail *"
            placeholder="Enter your E-mail"
            inputType="text"
            value={form.mail}
            defaultValue={myFreelancer?.email}
            handleChange={(e) => handleFormFieldChange("mail", e)}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col justify-center w-full mb-0.5">
            <h2 className='font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">'>
              Category *
            </h2>
          </div>
          <div className="flex flex-row w-full mt-2">
            <input
              type="text"
              onChange={() => {}}
              ref={Category}
              defaultValue={`${category === null ? myFreelancer?.category : category}`}
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
            labelName="Instagram *"
            placeholder="Enter your Instagram Address"
            inputType="text"
            value={form.instagram}
            defaultValue={myFreelancer?.instagram}
            handleChange={(e) => handleFormFieldChange("instagram", e)}
          />
          <FormField
            labelName="LinkedIn *"
            placeholder="Enter your LinkedIn Address"
            inputType="text"
            value={form.linkedIn}
            defaultValue={myFreelancer?.linkedIn}
            handleChange={(e) => handleFormFieldChange("linkedIn", e)}
          />
        </div>

        <div className="border-[2px] border-slate-600 pl-6 pr-6 pt-6 pb-6 mt-6">
        <h2 className="text-[25px] text-center">Experience In The Field</h2>
        <div className='flex flex-row justify-center mt-4 mb-6'>
            <div className='h-[2px] w-16 bg-blue-600'></div>
        </div>
        <div className="flex lg:flex-row flex-col gap-[40px]">
          <div className="flex-1 w-full flex flex-col">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Experience Title *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter a title for the experience"
                type="text"
                step="0.1"
                ref={new_exp_title}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Experience Duration *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter the duration of the experience"
                type="text"
                step="0.1"
                ref={new_exp_duration}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          </div>
          <div className="flex-1 w-full flex flex-col mt-8">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Experience Description *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <textarea
                rows={6}
                placeholder="Enter the description of the experience"
                type="text"
                ref={new_exp_desc}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div onClick={changeExperience} className="bg-blue-600 cursor-pointer text-white pt-3 pb-3 w-36 rounded-md text-center">Add Experience</div>
          </div>
        </div>

    
        <div className="flex-1 w-full flex flex-col mt-5">
        <h2 className="font-epilogue font-medium text-[17px] leading-[22px] mb-[10px]">
          Profile Image *
        </h2>
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


        <div className="border-[2px] border-slate-600 pl-2 pr-2 pt-6 pb-6 mt-6">
        <h2 className="text-[25px] text-center">Projects Done</h2>
        <div className='flex flex-row justify-center mt-4 mb-6'>
            <div className='h-[2px] w-16 bg-blue-600'></div>
        </div>
        <div className="flex lg:flex-row flex-col gap-[40px]">
          <div className="flex-1 w-full flex flex-col">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Project Title *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter a title for the project"
                type="text"
                step="0.1"
                ref={new_pro_title}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Platform Used *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <input
                placeholder="Enter platform used for the project"
                type="text"
                step="0.1"
                ref={new_pro_platform}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          </div>
          <div className="flex-1 w-full flex flex-col mt-8">
            <h3 className="font-epilogue font-medium text-[16px] leading-[22px] mb-[10px]">
              Project Description *
            </h3>
            <div className="pt-[15px] pb-[15px] flex flex-row justify-between sm:pl-[25px] sm:pr-[10px] pl-[15px] pr-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-[16px] rounded-[10px] sm:min-w-[300px]">
              <textarea
                rows={6}
                placeholder="Enter a description for the project"
                type="text"
                ref={new_pro_desc}
                className="outline-none bg-transparent w-full font-epilogue text-[14px] placeholder:text-[#999eac]"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div onClick={changeProject} className="bg-blue-600 cursor-pointer text-white pt-3 pb-3 w-36 rounded-md text-center">Add Project</div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[20px]">
          <CustomButton
            btnType="submit"
            title="Update Profile"
            styles="bg-gradient-to-r from-slate-600 to-slate-500"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateResumeCom;