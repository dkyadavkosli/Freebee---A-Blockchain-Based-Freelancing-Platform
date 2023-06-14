import React from 'react'
import Navbar from '../../components/Navbar'
import CompanyCom from './CompanyCom'
import Footer from "../../components/Footer"
import { motion } from 'framer-motion'

function CompanyProfile() {

  const myVariant = {
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{duration:1}
    },
    exit:{
      x:'-100vw',
      transition:{ease : 'easeInOut' , duration:0.5}
    }
  }

  return (
    <motion.div variants={myVariant} initial="hidden" animate='visible' exit='exit'>
        <Navbar/>
        <CompanyCom/>
        <Footer/>
    </motion.div>
  )
}

export default CompanyProfile