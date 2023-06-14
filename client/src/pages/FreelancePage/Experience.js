import React from 'react'
import ExperienceCard from '../../components/ExperienceCard'

function Experience({profile}) {
  return (
    <div className='w-full bg-slate-200 xl:pl-24 xl:pr-24 lg:pl-16 lg:pr-16 md:pl-10 md:pr-10 sm:pl-6 sm:pr-6 pl-3 pr-3 pt-24 h-screen overflow-y-scroll no-scrollbar'>
        <h2 className='md:text-5xl sm:text-4xl text-3xl text-blue-600'>Experience</h2>
        <div className='h-[4px] rounded mt-6 w-24 bg-slate-500'></div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-baseline mt-16'>
          {profile?.exp_title?.map((exp, i) => (
            <ExperienceCard
              title={exp}
              desc={profile?.exp_desc[i]}
              duration={profile?.exp_duration[i]}
            />
          ))}
        </div>
    </div>
  )
}

export default Experience