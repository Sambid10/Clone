"use client";
import React, { useState } from 'react';
import { motion, useAnimationControls } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  return (
    <div>
      {text.split(" ").map((word, i) => (
        <span className='inline-block' key={i}>
          {word.split("").map((char, j) => (
            <span key={j}>
              <TextSpan char={char} />
            </span>
          ))}
          <span className='pr-3'></span>
        </span>
      ))}
    </div>
  );
};

interface TextSpanProps {
  char: string;
}

const TextSpan: React.FC<TextSpanProps> = ({ char }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimationControls();

  const rubberband = () => {
    controls.start({
      transform: [
        "scale3d(1,1,1)",
        "scale3d(1.4,.55,1)",
        "scale3d(.75,1.25,1)",
        "scale3d(1.25,.85,1)",
        "scale3d(.9,1.05,1)",
        "scale3d(1,1,1)",
      ]
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      animate={controls}
      onMouseOver={() => {
        if (!isPlaying) {
          rubberband();
        }
      }}
      onAnimationComplete={() => setIsPlaying(false)}
      className='inline-block text-[#FAF3E1] font-cute text-5xl md:text-[4rem] uppercase lg:text-[5.5rem] font-bold mb-4 cursor-pointer hover:text-[#CFCFCF] ease-in duration-75 transition-colors'
    >
      {char}
    </motion.span>
  );
};

export default AnimatedText;
