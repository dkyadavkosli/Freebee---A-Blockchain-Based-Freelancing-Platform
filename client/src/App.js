import "./App.css";
import About from "./pages/About/About";
import AllFreelancers from "./pages/AllFreelancers/AllFreelancers";
import AllJobs from "./pages/AllJobs/AllJobs";
import FreelancePage from "./pages/FreelancePage/FreelancePage";
import HomePage from "./pages/Home/HomePage";
import CreateResume from "./pages/CreateResume/CreateResume"
import JobPage from "./pages/JobPage/JobPage";
import CreateJob from './pages/CreateJob/CreateJob'
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import UpdateCampCom from "./pages/UpdateResume/UpdateResume";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import { motion , AnimatePresence } from "framer-motion"
import MyJobs from "./pages/MyJobs/MyJobs";

function App() {
  const location = useLocation()
  return (
    <div className="">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/allfreelancers" element={<AllFreelancers/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/freelancer" element={<FreelancePage/>} />
          <Route path="/createresume" element={<CreateResume/> } />
          <Route path="/updateresume" element={<UpdateCampCom/> } />
          <Route path="/job" element={<JobPage/>} />
          <Route path="/createjob" element={<CreateJob/>} />
          <Route path="/alljobs" element={<AllJobs/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/" element={<Login />} />
        </Routes>
        </AnimatePresence>
    </div>
  );
}

export default App;
