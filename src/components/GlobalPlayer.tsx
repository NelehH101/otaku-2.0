import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import React from 'react';
import { useAudio } from '../context/AudioContext'; // Adjust path
import { useLocation } from 'react-router-dom';

const GlobalPlayer: React.FC = () => {
  const { isPlaying, currentSong, togglePlay, nextSong, prevSong } = useAudio();
  const location = useLocation();

  // HIDE this player when on the Home page to avoid "Double Players"
  if (location.pathname === '/') return null;

  return (
    <div className={`
      fixed right-2 bottom-4 md:right-10 md:bottom-10 z-[99] 
      flex flex-col items-end md:items-center transition-all duration-700 ease-in-out
      ${isPlaying ? 'translate-y-0' : 'translate-y-2'}
    `}>
      
      <style>{`
        @keyframes spin-record {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-record 4s linear infinite;
        }
      `}</style>

      {/* Main Player Container */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer group" onClick={togglePlay}>

        {/* SPINNING RECORD */}
        <div className={`
          absolute w-16 h-16 md:w-19 md:h-19 transition-all duration-700 ease-in-out z-0
          ${isPlaying ? '-translate-x-8 md:-translate-x-10 animate-spin-slow' : '-translate-x-0 opacity-0'}
        `}>
          <img src="/record.png" className="w-full h-full object-contain" alt="Vinyl" />
        </div>

        {/* ALBUM COVER */}
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-white/10">
          <img src="/hero-bg.jpg" className="w-full h-full object-cover" alt="Cover Art" />

          {/* CONTROLS OVERLAY */}
          <div className="absolute inset-0 flex items-center justify-around px-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[2px]">
            <button onClick={(e) => { e.stopPropagation(); prevSong(); }} className="hover:scale-110">
              <SkipBack size={13} fill="white" />
            </button>
            {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
            <button onClick={(e) => { e.stopPropagation(); nextSong(); }} className="hover:scale-110">
              <SkipForward size={13} fill="white" />
            </button>
          </div>
        </div>
      </div>

      {/* TRACK INFO */}
      <div className={`
        mt-3 md:mt-4 flex flex-col items-end md:items-center text-right md:text-center transition-all duration-500
        ${isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <p className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-white drop-shadow-md">
          {currentSong.title}
        </p>
        <p className="text-[8px] md:text-[9px] text-white font-medium uppercase tracking-[0.2em] mt-1">
          {currentSong.artist}
        </p>
      </div>
    </div>
  );
};

export default GlobalPlayer;