import React, { useRef } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white m-0 p-0">
      
      {/* 1. Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/6.mp4" type="video/mp4" />
      </video>

      {/* 2. Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3. Navigation (Bottom Left) */}
      <nav className="absolute left-10 bottom-10 z-20 flex flex-col gap-2 font-bold uppercase tracking-[0.2em] text-[13px]">
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Shop</a>
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Our Story</a>
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Collab</a>
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Blog</a>
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Track Orders</a>
        <a href="#" className="hover:text-gray-400 transition-colors no-underline text-white">Contact</a>
        <p className="text-[9px] mt-2 opacity-70 cursor-pointer hover:opacity-100 transition-opacity">Wanna Start a Brand !?</p>
      </nav>

      {/* 4. Center Logo & Clock
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <img src="/hero-bg.jpg" alt="Otaku Logo" className="w-24 md:w-32 mb-4" />
        <p className="text-[10px] font-mono tracking-[0.4em] uppercase">Thursday 14:55:20</p>
      </div> */}

    </section>
  );
};

export default Hero;