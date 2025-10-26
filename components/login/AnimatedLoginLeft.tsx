'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function AnimatedLoginLeft() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { offsetX, offsetY } = e;
    const { offsetWidth, offsetHeight } = ref.current;
    const x = (offsetX / offsetWidth - 0.5) * 30;  // Increased from 20 to 30 for stronger tilt
    const y = (offsetY / offsetHeight - 0.5) * -30; // Increased from 20 to 30 for stronger tilt
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-orange-500 to-yellow-400 p-12 items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      {/* Animated shapes with parallax effect */}
      <motion.div
        className="absolute"
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          transition: { type: 'spring', stiffness: 50 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Orange Circle */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-400/30 blur-3xl"
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Yellow Rectangle */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-3xl bg-yellow-300/20 blur-3xl"
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Indigo Blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Small floating orbs */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-yellow-200/30 blur-2xl"
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-orange-300/25 blur-2xl"
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Company Logo/Text - Foreground */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/20">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            RMS
          </h1>
          <p className="text-xl text-white/90 max-w-sm mx-auto leading-relaxed">
            Streamline your expense management with our powerful reimbursement platform
          </p>
        </motion.div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:2rem_2rem]" />
    </div>
  );
}

