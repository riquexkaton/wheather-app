import React from 'react'
import "../styles/forecast.css";
import {motion} from "framer-motion";

const Forecast = (props) => {
    return (
        <motion.div className="card-forecast" layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <b>{props.date}</b>
            <img src="https://www.flaticon.es/svg/vstatic/svg/861/861059.svg?token=exp=1614374671~hmac=8a2f9cc50724b8d06a227af9682f1a66" alt=""></img>
           <p>{props.temp}</p>
        </motion.div>
    )
}

export default Forecast
