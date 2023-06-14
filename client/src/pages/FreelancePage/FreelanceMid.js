import React, { useState , useEffect } from "react";
import pic from "../../assets/profile1.png";
import About from "./About";
import Experience from "./Experience";
import Project from "./Project";
import Contact from "./Contact"
import Resume from "./Resume";
import { useStateContext } from "../../context";
import { useSelector } from 'react-redux';

function FreelanceMid() {
  const [part, setPart] = useState("About");

  const { getProfile } = useStateContext();

  const [profile, setProfile] = useState(null);

  const myResume=useSelector((state)=> 
  state.changeCurrResume
  );

  const fetchProfile = async () => {
    try{ 
    const data = await getProfile(myResume);
    setProfile(data);
    }catch(e){
      console.log(e)
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [])

  const [yes,setYes] = useState(0);

  const changeYes = () => {
    if(yes===0){
        setYes(1)
    }else{
        setYes(0)
    } 
  }
  

  return (
    <div className="flex flex-row">
      <div className="z-30 absolute flex justify-end w-full pl-2 pr-2">
        <h2
          onClick={changeYes}
          className="w-24 text-center md:hidden pt-3 pb-3 cursor-pointer border-[2px] border-slate-600 mt-3 rounded-lg"
        >
          Details
        </h2>
      </div>
      <div className="w-1/4 min-h-screen no-scrollbar md:block hidden">
        <div className="h-1/3 flex flex-col justify-center pb-2">
          <div className="flex justify-center">
            <img
              className="h-48 w-48 border-[6px] border-slate-600 rounded-full"
              src={profile?.image || pic}
              alt=""
            />
          </div>
        </div>
        <div className="h-[0.5px] bg-slate-500"></div>
        <div className="flex flex-col justify-center h-1/2">
          <div onClick={()=>setPart("About")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            ABOUT
          </div>
          <div onClick={()=>setPart("Projects")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            PROJECTS
          </div>
          <div onClick={()=>setPart("Experience")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            EXPERIENCE
          </div>
          <div onClick={()=>setPart("Resume")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            SKILLS
          </div>
          <div onClick={()=>setPart("Contact")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            CONTACT
          </div>
        </div>
        <div className="h-[0.5px] bg-slate-500"></div>
        <div className="text-center flex flex-col justify-center h-1/6 b">
          <h4>{profile?.rating} ⭐ out of 5</h4>
        </div>
      </div>

      <div className={`sm:w-1/3 w-2/3 min-h-screen no-scrollbar md:hidden absolute bg-white z-30 ${yes === 0 ? "hidden" : ""}`}>
        <div className="h-1/3 flex flex-col justify-center pb-2">
          <div className="flex justify-center">
            <img
              className="h-48 w-48 border-[6px] border-slate-600 rounded-full"
              src={profile?.image || pic}
              alt=""
            />
          </div>
        </div>
        <div className="h-[0.5px] bg-slate-500"></div>
        <div className="flex flex-col justify-center h-1/2">
          <div onClick={()=>setPart("About")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            ABOUT
          </div>
          <div onClick={()=>setPart("Projects")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            PROJECTS
          </div>
          <div onClick={()=>setPart("Experience")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            EXPERIENCE
          </div>
          <div onClick={()=>setPart("Resume")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            SKILLS
          </div>
          <div onClick={()=>setPart("Contact")} className="pt-3 pb-3 hover:bg-blue-500 hover:text-white cursor-pointer text-lg text-center">
            CONTACT
          </div>
        </div>
        <div className="h-[0.5px] bg-slate-500"></div>
        <div className="text-center flex flex-col justify-center h-1/6 mt-3 text-lg">
          <h4>{profile?.rating} ⭐ out of 5</h4>
        </div>
      </div>
   
      <div className={`${part==="About"?"":"hidden"} md:w-3/4 w-full z-20`}>
      <About profile={profile}/>
      </div>
      <div className={`${part==="Experience"?"":"hidden"} md:w-3/4 w-full z-20`}>
      <Experience profile={profile}/>
      </div>
      <div className={`${part==="Projects"?"":"hidden"} md:w-3/4 w-full z-20`}>
      <Project profile={profile}/>
      </div>
      <div className={`${part==="Contact"?"":"hidden"} md:w-3/4 w-full z-20`}>
      <Contact profile={profile}/>
      </div>
      <div className={`${part==="Resume"?"":"hidden"} md:w-3/4 w-full z-20`}>
      <Resume profile={profile}/>
      </div>
    </div>
  );
}

export default FreelanceMid;
