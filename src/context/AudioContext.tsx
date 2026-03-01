import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const songs = [
  { title: "Don't Know Love", artist: "J-Wright", file: "/J-Wright - Don't Know Love.mp3" },
  { title: "divide", artist: "DIVEBAR YOUTH", file: "/DIVEBAR YOUTH - divide.mp3" },
  { title: "Memory Lane", artist: "just Min", file: "/just Min - Memory Lane.mp3" },
];

interface AudioContextType {
  isPlaying: boolean;
  currentSong: typeof songs[0];
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  // The magic is here: a ref that holds the Audio object globally
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only once
    audioRef.current = new Audio(songs[currentSongIndex].file);
    
    const handleEnded = () => nextSong();
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current?.pause();
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update source when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].file;
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  const prevSong = () => setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);

  return (
    <AudioContext.Provider value={{ isPlaying, currentSong: songs[currentSongIndex], togglePlay, nextSong, prevSong }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};