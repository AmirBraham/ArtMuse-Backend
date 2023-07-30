"use client";
import { motion } from "framer-motion";
import React from 'react';


type Props = {
    children: JSX.Element | null
  };
const  FloatingDiv: React.FC<Props> = ({ children }) => {
    return (

        <motion.div
           
            animate={["initial"]}
            variants={{
                
                rotate: {
                    rotate: [null, -5, 5, 0],
                    transition: {
                        // delay,
                        duration: 20
                        // repeat: Infinity,
                        // repeatDelay: 0.2,
                        // repeatType: "reverse"
                    }
                },
                initial: {
                    y: [-20,20],
                    x:[-10,10],
                    transition: {
                        delay:Math.random()*10,
                        duration: 6,
                        repeat: Infinity,
                        // repeatDelay: 0.2,
                        repeatType: "reverse"
                    }
                }
            }}
        >{children}</motion.div>

    );
}
export default FloatingDiv