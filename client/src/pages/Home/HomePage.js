import { React, useEffect, useRef } from "react";
import Navbar from '../../components/Navbar'
import HomeTop from './HomeTop'
import Categories from './Categories'
import pic8 from "../../assets/tile1.png"
import Journey from "./Journey";
import Reviews from "./Reviews";
import Intro from "./Intro";
import Talent from "./Talent";
import Footer from "../../components/Footer";
import Comment from "./Comment";
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrFreelancer , changeCategory } from "../../actions/index"
import { useStateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

function HomePage() {

  const canvasRef = useRef(null);
  canvasRef.width = window.innerWidth;
  canvasRef.height = window.innerHeight;

  useEffect(() => {
    console.log(canvasRef);

    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext("2d");

    let mouseX;
    let mouseY;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const maxRadius = 35;

    canvas.onmousemove = function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    function Circle(xCoordinate, yCoordinate, radius) {
      const randomNumber = Math.floor(Math.random() * colorArray.length);
      const randomTrueOrFalse = Math.floor(Math.random() * 2);

      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
      this.radius = radius;
      this.color = '#f1ece5';

      if (randomTrueOrFalse === 1) {
        this.xVelocity = -0.2 * 1;
      } else {
        this.xVelocity = 0.2 * 1;
      }

      if (randomTrueOrFalse === 1) {
        this.yVelocity = -0.2 * 1;
      } else {
        this.yVelocity = 0.2 * 1;
      }

      // As distance gets closer to 0, increase radius

      this.update = function () {
        this.xCoordinate += this.xVelocity;
        const xDistance = mouseX - this.xCoordinate;
        const yDistance = mouseY - this.yCoordinate;
        const originalRadius = radius;
        this.yCoordinate += this.yVelocity;

        // Movement Functions
        if (
          this.xCoordinate + this.radius > canvasWidth ||
          this.xCoordinate - this.radius < 0
        ) {
          this.xVelocity = -this.xVelocity;
        }
        if (
          this.yCoordinate + this.radius > canvasHeight ||
          this.yCoordinate - this.radius < 0
        ) {
          this.yVelocity = -this.yVelocity;
        }

        // Radius Decrease Functions
        // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
        if (
          xDistance < 50 &&
          xDistance > -50 &&
          this.radius < maxRadius &&
          yDistance < 50 &&
          yDistance > -50
        ) {
          this.radius += 4;
        } else if (
          (xDistance >= 50 && originalRadius < this.radius) ||
          (xDistance <= -50 && originalRadius < this.radius) ||
          (yDistance >= 50 && originalRadius < this.radius) ||
          (yDistance <= -50 && originalRadius < this.radius)
        ) {
          this.radius -= 4;
        }

        this.draw();
      };

      this.draw = function () {
        c.beginPath();
        c.arc(
          this.xCoordinate,
          this.yCoordinate,
          Math.abs(this.radius),
          0,
          Math.PI * 2
        );
        c.fillStyle = this.color;
        c.fill();
      };
    }

    const colorArray = ["gray", "violet", "purple", "pink", "red","brown","blue","orange"];
    const myCircle = new Circle(30, 80, 10);
    let circleArray = [];

    for (let i = 0; i < 50; i++) {
      const randomXCoordinate = Math.random() * canvasWidth;
      const randomYCoordinate = Math.random() * canvasHeight;
      // const randomRadius = 5;
      circleArray.push(
        new Circle(randomXCoordinate, randomYCoordinate, 4)
      );
    }

    function updateAll() {
      c.clearRect(0, 0, canvasWidth, canvasHeight);
      myCircle.update();
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
      window.requestAnimationFrame(updateAll);
    }

    updateAll();
  }, []);
  
  const myUser=useSelector((state)=> 
  state.changeUser
  );

  const nav = useNavigate();

  useEffect(() => {
    if (myUser==null) nav("/");
  }, []);

  const { getCurrProfile } = useStateContext();

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try{ 
    const data = await getCurrProfile(myUser?._id);
    console.log(myUser?._id)
    if(data.length === 0){
      dispatch(changeCurrFreelancer(null));
      dispatch(changeCategory(null))
      localStorage.removeItem('freeCurrFreelancer');
      localStorage.setItem('freeCurrFreelancer', JSON.stringify(null))
    }else{
    dispatch(changeCurrFreelancer(data[0]));
    dispatch(changeCategory(null))
    localStorage.removeItem('freeCurrFreelancer');
      localStorage.setItem('freeCurrFreelancer', JSON.stringify(data[0]))
    }
    }catch(e){
      console.log(e)
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [])

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
    <motion.div variants={myVariant} initial="hidden" animate='visible' exit='exit' className="max-h-screen overflow-y-scroll no-scrollbar" style={{backgroundImage: `url(${pic8})` , backgroundBlendMode:'lighten'}}>
        <div style={{ position: "relative" }}>
        <canvas ref={canvasRef}></canvas>
        <div className="max-h-screen overflow-y-scroll no-scrollbar" style={{ position: "absolute", top: "0px" }}>
        <Navbar/>
        <HomeTop/>
        <Categories/>
        <Intro/>
        <Journey/>
        <Reviews/>
        <Talent/>
        <Comment/>
        <Footer col={"yes"}/>
        </div>
        </div>
    </motion.div>
  )
}

export default HomePage