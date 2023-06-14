import React from "react";

function Resume({ profile }) {
  return (
    <div className="flex flex-col justify-center w-full bg-slate-300 min-h-screen xl:pl-36 xl:pr-36 lg:pl-28 lg:pr-28 md:pl-20 md:pr-20 sm:pl-12 sm:pr-12 pl-6 pr-6">
      <h2 className="text-5xl text-center text-blue-700">My Skills</h2>
      <div className="flex justify-center">
      <div className="h-[4px] rounded mt-6 w-24 bg-slate-500 mb-8"></div>
      </div>
      <div className=" border-[4px] shadow-lg rounded border-gray-600 h-72 mb-8 overflow-y-scroll no-scrollbar p-2">
      <div className="grid grid-cols-2 justify-cente">
        {profile?.skills?.map((skill) => (
          <div className="pt-4 pb-4 pl-6 pr-6 mb-3 text-xl text-center text-white bg-blue-600 rounded-lg mr-3">
            {skill}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Resume;
