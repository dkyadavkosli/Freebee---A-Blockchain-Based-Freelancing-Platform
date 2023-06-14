import React from 'react'
import pic1 from "../../assets/developer.png"
import pic2 from "../../assets/designer.png"
import pic3 from "../../assets/finance.png"
import pic4 from "../../assets/manager.png"
import pic5 from "../../assets/artist.png"
import pic6 from "../../assets/teacher.png"
import pic7 from "../../assets/sales.png"
import pic8 from "../../assets/writer.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeCategory} from "../../actions/index"

function Categories() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const Search = (cat) => {
    dispatch(changeCategory(cat));
    navigate("/allfreelancers")
  }

  return (
    <div className='xl:pl-32 xl:pr-32 lg:pl-24 lg:pr-24 md:pl-16 md:pr-16 sm:pl-10 sm:pr-10 pl-6 pr-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-2 pb-2 items-baseline'>
        <div onClick={()=>Search("DEVELOPERS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic1} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Developers</h3>
          <p className='mt-4'>Seasoned software engineers, coders, and architects with expertise across hundreds of technologies.</p>
        </div>
        <div onClick={()=>Search("DESIGNERS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic2} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Designers</h3>
          <p className='mt-4'>Expert UI, UX, Visual and Interaction designers as well as a wide range of illustrators, animators, and more.</p>
        </div>
        <div onClick={()=>Search("FINANCIAL EXPERTS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic3} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Financial Experts</h3>
          <p className='mt-4'>Experts in professional financial modeling & valuation, startup funding, interim CFO work, and market sizing.</p>
        </div>
        <div onClick={()=>Search("PROJECT MANAGERS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic4} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Project Managers</h3>
          <p className='mt-4'>Digital and technical project managers and more with expertise in numerous PM tools, frameworks, and styles.</p>
        </div>

        <div onClick={()=>Search("ARTISTS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic5} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Artists</h3>
          <p className='mt-4'>Experts, professionals and creative individuals with expertise in various fields like drawing, music, dance, sculpture, etc. </p>
        </div>
        <div onClick={()=>Search("TEACHERS AND TRAINERS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic6} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Teachers And Trainers</h3>
          <p className='mt-4'>Professionals who are experts in their fields and have the ability to express their knowledge and understandings.</p>
        </div>
        <div onClick={()=>Search("SALES EXPERTS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic7} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Sales Experts</h3>
          <p className='mt-4'>Professionals who have extensive knowledge and specialize in the field of sales, marketing, and business development.</p>
        </div>
        <div onClick={()=>Search("WRITERS AND TRANSLATORS")} className='shadow-lg bg-slate-50 cursor-pointer hover:scale-105 transition hover:bg-indigo-400 duration-500 pt-10 pl-6 pr-6 mt-2 mb-1 pb-10 ml-2 mr-2 rounded-md'>
          <img className='w-16 h-16' src={pic8} alt=""/>
          <h3 className='text-xl text-blue-700 mt-4'>Writers And Translators</h3>
          <p className='mt-4'>Experts having the ability to use language in order to express their thoughts, ideas, and stories in written form.</p>
        </div>
    </div>
  )
}

export default Categories