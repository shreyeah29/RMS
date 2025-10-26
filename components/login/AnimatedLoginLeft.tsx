'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function AnimatedLoginLeft() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const offsetWidth = rect.width;
    const offsetHeight = rect.height;
    
    // Calculate rotation for 3D tilt effect - increased multiplier for more movement
    const x = (offsetX / offsetWidth - 0.5) * 40;
    const y = (offsetY / offsetHeight - 0.5) * -40;
    setRotate({ x, y });
    
    // Track mouse position for individual shape movement
    setMousePosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className="relative hidden lg:flex lg:w-1/2 bg-gray-100 p-12 items-center justify-center overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* RMS Logo at the top */}
      <div className="absolute top-12 left-12 z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">RMS</h1>
        </div>
      </div>

      {/* Animated Character Shapes */}
      <div className="absolute w-full h-full">
        {/* Orange Semi-circle Character */}
        <motion.div
          className="absolute bottom-32 left-32 w-40 h-40"
          animate={{
            x: [0, 10, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transform: `translate(${rotate.y * 1}px, ${rotate.x * 1}px) rotateZ(${rotate.y * 0.1}deg)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-t-full flex flex-col items-center justify-center shadow-xl">
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="mt-1 w-8 h-1 bg-white rounded-full"></div>
          </div>
        </motion.div>

        {/* Blue Rectangle Character */}
        <motion.div
          className="absolute top-48 left-52 w-32 h-48"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          style={{
            transform: `translate(${-rotate.y * 0.8}px, ${-rotate.x * 0.8}px) rotateZ(${-rotate.y * 0.12}deg)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-xl">
            <div className="flex gap-2 mb-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </motion.div>

        {/* Black Rectangle Character */}
        <motion.div
          className="absolute top-40 right-40 w-28 h-40"
          animate={{
            x: [0, 15, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            transform: `translate(${rotate.y * 0.6}px, ${-rotate.x * 0.6}px) rotateZ(${rotate.y * 0.15}deg)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex flex-col items-center justify-center shadow-xl">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Yellow Blob Character */}
        <motion.div
          className="absolute top-28 right-24 w-36 h-40"
          animate={{
            x: [0, -10, 0],
            y: [0, -10, 0],
            rotateZ: [0, 8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
          style={{
            transform: `translate(${-rotate.y * 1.2}px, ${rotate.x * 1.2}px) rotateZ(${-rotate.y * 0.2}deg)`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-t-[50%] rounded-b-[30%] flex flex-col items-center justify-center shadow-xl">
            <div className="mt-6">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            </div>
            <div className="mt-1 w-4 h-0.5 bg-gray-800"></div>
          </div>
        </motion.div>
      </div>

      {/* Custom cursor effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400/20 to-orange-400/20 blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
      />
    </div>
  );
}

