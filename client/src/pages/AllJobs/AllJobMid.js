import React , {useEffect, useState , useRef} from "react";
import JobCard from "../../components/JobCard";
import { useStateContext } from "../../context";
import loader from "../../assets/loader.svg";
import {
  useAddress,
} from "@thirdweb-dev/react";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

function AllJobMid() {
    const { getJobs } = useStateContext();

    const [jobs, setJobs] = useState(null);
    const [jobs2, setJobs2] = useState(null);
    const [jobs3, setJobs3] = useState(null);
    const [cat, setCat] = useState(null);

    const [yes,setYes] = useState(0);
    const [isLoading, setLoading] = useState(false)

    const address = useAddress()

    const changeYes = () => {
      if(yes===0){
          setYes(1)
      }else{
          setYes(0)
      } 
    }

    const fetchJobs = async () => {
      try{ 
      setLoading(true)
      const data = await getJobs();
      setJobs(data);
      setJobs2(data);
      setJobs3(data);
      setLoading(false)
      }catch(e){
        console.log(e)
      }
    };

    const changeCat = () => {
      if(cat!==null){
        setJobs(jobs2.filter(
          (cam) => cam.category === cat
        ))
        setJobs3(jobs2.filter(
          (cam) => cam.category === cat
        ))
      }
    }
  
    const [sorts, setSorts] = useState(null);
  
    const changeSorts = () => {
      if(sorts==='time'){
        setJobs(jobs.sort((a,b)=>b?.expected_time - a?.expected_time))
        setJobs3(jobs.sort((a,b)=>b?.expected_time - a?.expected_time))
      }else if(sorts==='amount'){
        setJobs(jobs.sort((a,b)=>b?.expected_cost - a?.expected_cost))
        setJobs3(jobs.sort((a,b)=>b?.expected_cost - a?.expected_cost))
      }
    }

    useEffect(() => {
      fetchJobs();
    }, [address])

    useEffect(() => {
      changeCat();
    }, [cat]);
  
    
    useEffect(() => {
      changeSorts();
    }, [sorts]);

    const change2Category = (cats) => {
      setCat(cats);
    }
  
    const change2Sorts = (cats) => {
      setSorts(cats);
    }

    const {ref , inView} = useInView();
    const animation = useAnimation();
  
    useEffect(() => {
      if(inView){
          animation.start({
              scale:1,
              transition:{
                  duration:3.4, type:'spring'
              }
          })
      }
      if(!inView){
          animation.start({
              scale:0.1
          })
      }
    }, [inView])

  const [category, setCategory] = useState('Select Location');
  const [category1, setCategory1] = useState(0);
  const Category = useRef();
  const search = useRef()

  const getCategory1 = () => {
    if (category1 === 0) {
      setCategory1(1);
    } else {
      setCategory1(0);
    }
  };

  const getSetCategory = (cat) => {
    setCategory(cat);
    setCategory1(0);
  };

  
  const changeForFree = () => {
    if (category === "IN-OFFICE") {
      const curr = jobs3?.filter((free) => free?.location === "IN-OFFICE");
      setJobs(curr)
    }else if (category === "ONLINE") {
      const curr = jobs3?.filter((free) => free?.location === "ONLINE");
      setJobs(curr)
    }
  };

  const changeSearch = () => {
    const curr = jobs2.filter((free) => free?.title === search.current.value);
    setJobs(curr)
  };

  useEffect(() => {
    changeForFree();
  }, [category]);
    
  return (
    <div className="xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 pt-12 pb-8 min-h-screen">
      <motion.div ref={ref} animate={animation} className="md:text-4xl sm:text-3xl text-2xl text-center">
        Explore Various Active Jobs
      </motion.div>
      <div className="flex flex-row justify-center mt-4 xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6">
        <div className="h-[2px] w-16 bg-blue-600"></div>
      </div>

      <div className="grid grid-cols-2 mt-8 sm:gap-[20px] gap-[8px]">
        <div className="">
        <div className="flex flex-row w-full mt-2">
            <input
              type="text"
              onChange={() => {}}
              ref={Category}
              defaultValue={category}
              value={category}
              className={` py-[15px] sm:px-[25px] px-[15px] outline-none border-t-[1px] border-b-[1px] border-l-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-[14px] placeholder:text-[#a1a7b5] ${
                category1 === 0 ? "rounded-l-[10px]" : ""
              } sm:min-w-[200px] w-full hover:border-gray-500`}
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
                  onClick={() => getSetCategory('IN-OFFICE')}
                  className="text-slate-600 cursor-pointer"
                >
                  IN-OFFICE
                </div>
              </div>
              <div className="pt-1">
                <div
                  onClick={() => getSetCategory('ONLINE')}
                  className="text-slate-600 cursor-pointer"
                >
                  ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 h-[56px] border-[1px] border-[#8e8e9e] rounded-[8px] hover:border-gray-500 flex">
        <input
              type="text"
              ref={search}
              onChange={() => {}}
              className={` py-[15px] sm:px-[25px] px-[15px] outline-none bg-transparent font-epilogue text-[14px] placeholder:text-[#a1a7b5] w-full`}
              placeholder="Enter Name To Search"
            />
        <div className="flex flex-col justify-center pl-2 pr-2">
        <div onClick={changeSearch} className="w-[40px] h-[40px] rounded-[32px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
              <FiSearch className="w-[15px] h-[15px] text-white object-contain" />
        </div>
        </div>
        </div>
      </div>

      <div className="">
        <h2
          onClick={changeYes}
          className="w-24 text-center lg:hidden pt-3 pb-3 cursor-pointer border-[2px] border-slate-600 mt-6 rounded-lg"
        >
          Filters
        </h2>
      </div>

      <div className="flex lg:mt-10 mt-5">
        <div className={`w-1/4 lg:block hidden`}>
          <h2 className="text-xl text-blue-600 mb-2">Categories</h2>

          <div onClick={()=>change2Category("DEVELOPERS")} className="pt-2 pb-2 cursor-pointer">Developers</div>
          <div onClick={()=>change2Category("DESIGNERS")} className="pt-2 pb-2 cursor-pointer">Designers</div>
          <div onClick={()=>change2Category("FINANCIAL EXPERTS")} className="pt-2 pb-2 cursor-pointer">Financial Experts</div>
          <div onClick={()=>change2Category("PROJECT MANAGERS")} className="pt-2 pb-2 cursor-pointer">Project Managers</div>
          <div onClick={()=>change2Category("ARTISTS")} className="pt-2 pb-2 cursor-pointer">Artists</div>
          <div onClick={()=>change2Category("TEACHERS AND TRAINERS")} className="pt-2 pb-2 cursor-pointer">Teachers And Trainers</div>
          <div onClick={()=>change2Category("SALES EXPERTS")} className="pt-2 pb-2 cursor-pointer">Sales Experts</div>
          <div onClick={()=>change2Category("WRITERS AND TRANSLATORS")} className="pt-2 pb-2 cursor-pointer">Writers And Translators</div>

          <h2 className="text-xl text-blue-600 mb-2 mt-6">Sort By</h2>

          <div onClick={()=>change2Sorts('time')} className="pt-2 pb-2 cursor-pointer">Expected Time</div>
          <div onClick={()=>change2Sorts('amount')} className="pt-2 pb-2 cursor-pointer">Amount Offered</div>
        </div>
        <div
          className={`md:w-1/4 sm:w-1/2 w-3/4 lg:hidden absolute bg-white z-30 ${
            yes === 0 ? "hidden" : ""
          }`}
        >
          <h2 className="text-xl text-blue-600 mb-2">Categories</h2>

          <div onClick={()=>change2Category("DEVELOPERS")} className="pt-2 pb-2 cursor-pointer">Developers</div>
          <div onClick={()=>change2Category("DESIGNERS")} className="pt-2 pb-2 cursor-pointer">Designers</div>
          <div onClick={()=>change2Category("FINANCIAL EXPERTS")} className="pt-2 pb-2 cursor-pointer">Financial Experts</div>
          <div onClick={()=>change2Category("PROJECT MANAGERS")} className="pt-2 pb-2 cursor-pointer">Project Managers</div>
          <div onClick={()=>change2Category("ARTISTS")} className="pt-2 pb-2 cursor-pointer">Artists</div>
          <div onClick={()=>change2Category("TEACHERS AND TRAINERS")} className="pt-2 pb-2 cursor-pointer">Teachers And Trainers</div>
          <div onClick={()=>change2Category("SALES EXPERTS")} className="pt-2 pb-2 cursor-pointer">Sales Experts</div>
          <div onClick={()=>change2Category("WRITERS AND TRANSLATORS")} className="pt-2 pb-2 cursor-pointer">Writers And Translators</div>

          <h2 className="text-xl text-blue-600 mb-2 mt-6">Sort By</h2>

          <div onClick={()=>change2Sorts('time')} className="pt-2 pb-2 cursor-pointer">Expected Time</div>
          <div onClick={()=>change2Sorts('amount')} className="pt-2 pb-2 cursor-pointer">Amount Offered</div>
        </div>
        <div className="lg:w-3/4 z-20 w-full">
        <div className="flex flex-wrap gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader" 
            className="w-[100px] sm:block hidden h-[100px] mt-[20px] object-contain"
          />
        )}

        {!isLoading && jobs?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            No Jobs found.
          </p>
        )}
      </div>
        {
          jobs?.map((job) => (
            <JobCard key={job?.pId} title={job.title} desc={job.description} cost={job?.expected_cost} pId={job?.pId} image={job?.image}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllJobMid;
