import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { MdLogin } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineErrorOutline } from "react-icons/md";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();
  const phone = useRef();
  const address = useRef();
  const _otp = useRef();

  const history = useNavigate();

  const [modal, setModal] = useState("N");
  const [modal2, setModal2] = useState("N");
  const [modal3, setModal3] = useState("N");
  const [modal4, setModal4] = useState("N");

  const changeModal = () => {
    setModal("N");
    setModal2("N");
    setModal3("N");
    setModal4("N");
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!_otp.current.value === otp) {
      setModal2("Y");
      setTimeout(changeModal, 5000);
    } else {
      if (cpassword.current.value !== password.current.value) {
        cpassword.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          phone: phone.current.value,
          address: address.current.value,
        };
        try {
          await axios.post("/api/entry/register", user);
          history("/");
        } catch (err) {
          setModal("Y");
          setTimeout(changeModal, 5000);
        }
      }
    }
  };

  const myVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  const [visible, setVisible] = useState(0);
  const [otp, setOtp] = useState();

  const handleMail = async (e) => {
    e.preventDefault();
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(email.current.value)) {
      setModal3("Y");
      setTimeout(changeModal, 5000);
    } else {
      const curr = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      setOtp(curr);
      const user = {
        otp: curr,
        email: email.current.value,
      };
      try {
        await axios.post("/api/entry/email", user);
        setModal4("Y");
        setTimeout(changeModal, 5000);
        setVisible(1);
      } catch (err) {
        window.alert("An account with this Email already exists");
      }
    }
  };

  return (
    <motion.div
      variants={myVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className=""
    >
      <Navbar yes="Y" />
      <div className="md:h-44 sm:h-36 sm:pt-0 sm:pb-0 pt-6 pb-6 w-full flex flex-col justify-center bg-[#e5e9f4] xl:pl-52 lg:pl-36 md:pl-24 sm:pl-12 sm:pr-12 md:pr-24 pr-4 pl-4 bg-no-repeat bg-cover">
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="md:text-2xl sm:text-lg text-slate-600 font-semibold"
        >
          LET'S BEGIN A NEW JOURNEY
        </motion.div>
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="xl:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold"
        >
          CREATE AN ACCOUNT
        </motion.div>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="md:text-2xl sm:text-lg text-slate-600 font-semibold"
        >
          AND START SEARCHING FOR GOOD JOBS AND FREELANCERS.
        </motion.div>
      </div>

      <div className="xl:pl-52 xl:pr-52 lg:pl-36 lg:pr-36 md:pl-24 md:pr-24 sm:pl-12 sm:pr-12 pl-4 pr-4 pt-6 pb-6 flex w-full bg-white flex-row">
        <div className="md:w-2/3 w-full border-2 border-[#505053] p-3">
          <div className="w-full pb-3">
            <MdLogin className="w-full h-44" />
          </div>
          <form onSubmit={handleClick} method="POST">
            <div className="flex sm:flex-row flex-col">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h3 className=" ">NAME</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="text"
                  ref={username}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h3 className=" ">EMAIL</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="email"
                  ref={email}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h3 className=" ">PHONE</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="text"
                  ref={phone}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h3 className=" ">ADDRESS</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="text"
                  ref={address}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center w-1/4 mr-1">
                <h3 className=" ">PASSWORD</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 sm:mt-0 mt-1 w-full">
                <input
                  type="password"
                  ref={password}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center sm:w-1/4 w-full mr-1">
                <h3 className=" ">CONFIRM PASSWORD</h3>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="password"
                  ref={cpassword}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col mt-6 ">
              <div className="flex flex-col justify-center sm:w-1/4 w-full mr-1">
                <h2 className="">VERIFICATION OTP</h2>
              </div>
              <div className="flex flex-row sm:w-3/4 w-full sm:mt-0 mt-1">
                <input
                  type="password"
                  ref={_otp}
                  required
                  className="w-full h-8 bg-slate-100 border-[1px] border-slate-600 rounded hover:border-2 pt-1 pl-2 pb-1 pr-2 hover:border-gray-500"
                />
              </div>
            </div>

            <div
              className={`${
                modal2 === "N" ? "hidden" : ""
              } bg-purple-600 border-[2px] mt-4 border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "60px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce mt-[5px]" />
              <div className="mt-[8px] ml-3">Enter Valid OTP.</div>
            </div>

            <div
              className={`${
                modal3 === "N" ? "hidden" : ""
              } bg-purple-600 border-[2px] mt-4 border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "60px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce mt-[5px]" />
              <div className="mt-[8px] ml-3">Enter a valid Email.</div>
            </div>

            <div
              className={`${
                modal4 === "N" ? "hidden" : ""
              } bg-purple-600 border-[2px] mt-4 border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "60px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce mt-[5px]" />
              <div className="mt-[8px] ml-3">
                An email has been sent to your mail id.
              </div>
            </div>

            <div
              className={`${
                modal === "N" ? "hidden" : ""
              } bg-purple-600 border-[2px] border-slate-300 shadow-lg text-white pt-3 pb-3 pl-4 pr-4 rounded-md flex relative w-auto transition duration-3000 ease-in-out`}
              // style={{ position: "absolute", top: "60px", right: "4px" }}
            >
              <MdOutlineErrorOutline className="h-8 w-8 animate-bounce mt-[5px]" />
              <div className="mt-[8px] ml-3">
                Some error occured. Try changing email id
              </div>
              <div
                onClick={() => window.location.reload()}
                className="ml-6 p-2 bg-slate-300 text-slate-800 rounded-lg cursor-pointer"
              >
                OK!
              </div>
            </div>

            <div
              className={`w-full mt-6 flex flex-row justify-center ${
                visible === 0 ? "hidden" : ""
              }`}
            >
              <button
                type="submit"
                className="text-lg pt-2 w-1/2 rounded pb-2  border-white bg-gradient-to-r from-sky-600 to-sky-400 text-white"
              >
                REGISTER
              </button>
            </div>
            <div
              onClick={handleMail}
              className={`w-full mt-6 flex flex-row justify-center ${
                visible === 1 ? "hidden" : ""
              }`}
            >
              <div className="text-lg pt-2 w-1/2 rounded pb-2 cursor-pointer text-center  border-white bg-gradient-to-r from-sky-600 to-sky-400 text-white">
                Verify Email
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
