import { Instagram, Youtube, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext'; // Make sure this path matches your file structure
import { Link } from 'react-router-dom'; // Import Link for navigation

const Hero: React.FC = () => {
  // --- GLOBAL AUDIO STATE ---
  // We pull the logic from Context instead of defining it locally
  const { isPlaying, currentSong, togglePlay, nextSong, prevSong } = useAudio();

  // --- LOGO HOVER LOGIC ---
  const logoImages = [
    '/raw-blue.png', '/raw-purple.png', '/raw-dark-blue.png', '/raw-dark-pink.png',
    '/raw-green.png', '/raw-indigo.png', '/raw-pink-yellow.png', '/raw-pink.png',
    '/raw-purple-pink.png', '/raw-red.png', '/raw-yellow.png',
  ];

  const [currentLogo, setCurrentLogo] = useState(logoImages[0]); // Default to yellow
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const handleLogoHover = () => {
    const otherLogos = logoImages.filter(img => img !== currentLogo);
    const randomIndex = Math.floor(Math.random() * otherLogos.length);
    setCurrentLogo(otherLogos[randomIndex]);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white m-0 p-0 font-sans">
      
      {/* 1. Animation Styles */}
      <style>{`
        @keyframes spin-record {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-record 4s linear infinite;
        }
      `}</style>

      {/* SVG Gradient Definition for Social Icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="social-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0080" />
            <stop offset="50%" stopColor="#7928ca" />
            <stop offset="100%" stopColor="#0070f3" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/6.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* 3. Center Logo (Random Swap) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <img
          src={currentLogo}
          className="w-24 md:w-32 mb-4 transition-all duration-300 cursor-pointer pointer-events-auto"
          onMouseEnter={handleLogoHover}
          onMouseLeave={() => setCurrentLogo(logoImages[0])}
          alt="Logo"
        />
      </div>

      {/* 4. Social Icons */}
      <div className="absolute top-10 left-6 z-30 flex flex-col gap-6">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" 
           onMouseEnter={() => setHoveredSocial('instagram')} onMouseLeave={() => setHoveredSocial(null)} 
           className="transition-transform hover:scale-110">
          <Instagram size={24} strokeWidth={1.5} stroke={hoveredSocial === 'instagram' ? "url(#social-gradient)" : "white"} />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" 
           onMouseEnter={() => setHoveredSocial('tiktok')} onMouseLeave={() => setHoveredSocial(null)} 
           className="transition-transform hover:scale-110">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" 
               stroke={hoveredSocial === 'tiktok' ? "url(#social-gradient)" : "white"} 
               strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" 
           onMouseEnter={() => setHoveredSocial('youtube')} onMouseLeave={() => setHoveredSocial(null)} 
           className="transition-transform hover:scale-110">
          <Youtube size={27} strokeWidth={1.5} stroke={hoveredSocial === 'youtube' ? "url(#social-gradient)" : "white"} />
        </a>
      </div>

      {/* 5. Navigation */}
<nav className="absolute left-6 bottom-10 z-30 flex flex-col gap-2 font-bold uppercase tracking-[0.2em] text-[13px]">
  {[
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/about' },
    { name: 'LookBook', path: '/lookbook' },
    { name: 'Track Orders', path: '/track' },
    { name: 'Contact', path: '/contact' }
  ].map((link) => (
    <Link
      key={link.name}
      to={link.path} // Change 'href' to 'to'
      className="text-white no-underline transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
    >
      {link.name}
    </Link>
  ))}
</nav>

      {/* 6. PLAYER SECTION (Connected to Global Context) */}
      <div className={`
        absolute right-2 bottom-4 md:right-10 md:bottom-0 z-30 
        flex flex-col items-end md:items-center transition-transform duration-700 ease-in-out
        ${isPlaying ? '-translate-y-4 md:-translate-y-8' : 'translate-y-0'}
      `}>

        {/* Main Player Container */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer group" onClick={togglePlay}>

          {/* SPINNING RECORD - Slides IN when playing */}
          <div className={`
            absolute w-16 h-16 md:w-19 md:h-19 transition-all duration-700 ease-in-out z-0
            ${isPlaying ? '-translate-x-8 md:-translate-x-10 animate-spin-slow' : '-translate-x-20 md:-translate-x-24'}
          `}>
            <img src="/record.png" className="w-full h-full object-contain" alt="Vinyl" />
          </div>

          {/* ALBUM COVER */}
          <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/hero-bg.jpg"
              className="w-full h-full object-cover"
              alt="Cover Art"
            />

            {/* BUTTONS OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-around px-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[1px]">
              <button
                onClick={(e) => { e.stopPropagation(); prevSong(); }}
                className="p-1 hover:scale-110 transition-transform flex-shrink-0"
              >
                <SkipBack size={13} className="md:w-4 md:h-4" fill="white" />
              </button>

              <div className="flex items-center justify-center flex-shrink-0">
                {isPlaying ? (
                  <Pause size={16} className="md:w-[18px] md:h-[18px]" fill="white" stroke="none" />
                ) : (
                  <Play size={16} className="md:w-[18px] md:h-[18px]" fill="white" stroke="none" />
                )}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); nextSong(); }}
                className="p-1 hover:scale-110 transition-transform flex-shrink-0"
              >
                <SkipForward size={13} className="md:w-4 md:h-4" fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* TRACK INFO (Dynamic from Global Context) */}
        <div className={`
          mt-4 md:mt-6 flex flex-col items-end md:items-center text-right md:text-center transition-all duration-700
          ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}>
          <p className="text-[11px] md:text-sm font-bold tracking-widest uppercase max-w-[160px] md:max-w-[220px] leading-tight drop-shadow-lg">
            {currentSong.title}
          </p>

          <p className="text-[9px] md:text-[10px] text-white font-medium uppercase tracking-[0.2em] mt-1 
                max-w-[180px] md:max-w-[240px] leading-relaxed drop-shadow-lg">
            {currentSong.artist}
          </p>
        </div>
      </div>

    </section>
  );
};

export default Hero;