import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';
import CurvedLoop from '../components/Loop';
import Footer from '../components/Footer';

// Define the magazine data structure
const VOLUMES = [
  {
    id: 1,
    title: "YOUNG STAGE",
    vol: "01",
    cover: "/lookbook/LB (12).jpg",
    description: "A digital tactile archive exploring urban landscape and community grit.",
    images: Array.from({ length: 15 }, (_, i) => i + 1) // Images 1-15
  },
  {
    id: 2,
    title: "URBAN GRIT",
    vol: "02",
    cover: "/lookbook/LB (20).jpg",
    description: "Raw textures and industrial silhouettes of the inner city.",
    images: Array.from({ length: 15 }, (_, i) => i + 16) // Images 16-30
  }
];

const Lookbook = () => {
  const [activeVolume, setActiveVolume] = useState<typeof VOLUMES[0] | null>(null);
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [showArchiveOnly, setShowArchiveOnly] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem('raw_lookbook_likes');
    if (savedLikes) setLikedImages(JSON.parse(savedLikes));
  }, []);

  const toggleLike = (num: number) => {
    const updatedLikes = likedImages.includes(num)
      ? likedImages.filter((id) => id !== num)
      : [...likedImages, num];
    setLikedImages(updatedLikes);
    localStorage.setItem('raw_lookbook_likes', JSON.stringify(updatedLikes));
  };

  const displayedImages = activeVolume 
    ? (showArchiveOnly 
        ? activeVolume.images.filter(num => likedImages.includes(num))
        : activeVolume.images)
    : [];

  return (
    <div className="bg-black min-h-screen no-scrollbar overflow-x-hidden relative flex flex-col">
      <NavBar />

      <main className="relative flex-grow z-10 px-6 md:px-20 max-w-[1800px] mx-auto w-full">
        
        {/* HEADER SECTION */}
        <div className="pt-32 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-white text-[15vw] md:text-[12rem] font-black italic leading-[0.75] uppercase tracking-tighter">
                LOOK <br/> 
                <span className="text-orange-500">BOOK</span>
              </h1>
              
              <AnimatePresence>
                {activeVolume && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex gap-4">
                    <button 
                      onClick={() => setShowArchiveOnly(!showArchiveOnly)}
                      className={`px-8 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all
                        ${showArchiveOnly ? 'bg-orange-500 border-orange-500 text-white' : 'bg-transparent border-white/20 text-zinc-500 hover:text-white'}`}
                    >
                      {showArchiveOnly ? 'Pinned' : 'Archive'}
                    </button>
                    <button 
                      onClick={() => { setActiveVolume(null); setShowArchiveOnly(false); }}
                      className="px-8 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:bg-white hover:text-black transition-all"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="max-w-sm hidden md:block border-l border-white/10 pl-8 text-right md:text-left">
              <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-2">
                RAW CULTURE • VOL. {activeVolume?.vol || "01-02"} • 2026
              </p>
              <p className="text-zinc-400 text-[10px] leading-relaxed uppercase tracking-widest font-medium">
                {activeVolume ? `Viewing ${activeVolume.title}` : "Select a volume to explore the archive."}
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE AREA */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!activeVolume ? (
              /* HORIZONTAL MAGAZINE SELECTOR */
              <motion.div 
                key="selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col md:flex-row gap-8 pb-20"
              >
                {VOLUMES.map((vol) => (
                  <motion.div 
                    key={vol.id}
                    whileHover={{ y: -10 }}
                    className="w-full max-w-sm cursor-pointer group"
                    onClick={() => setActiveVolume(vol)}
                  >
                    <div className="relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-orange-500/50">
                      <img src={vol.cover} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" alt={vol.title} />
                      <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-black/90 to-transparent">
                        <h2 className="text-white font-black italic text-4xl uppercase leading-none">
                          {vol.title.split(' ')[0]} <br/> {vol.title.split(' ')[1]}: <span className="text-orange-500 text-5xl">{vol.vol}</span>
                        </h2>
                        <div className="w-full py-3 bg-white text-black text-center text-[10px] font-black uppercase italic tracking-[0.3em] group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          Open Volume
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* SECTION 3: MASONRY GRID */
<motion.div 
  key="grid"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  /* Changing 'columns-1' to 'columns-2' for mobile 
     and reducing 'gap-10' to 'gap-4' to keep it tight.
  */
  className="columns-3 md:columns-2 lg:columns-4 gap-4 md:gap-10 space-y-4 md:space-y-10 pb-32"
>
  {displayedImages.map((num) => (
    <div key={num} className="group relative overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-zinc-900 border border-white/5 break-inside-avoid shadow-xl">
      
      {/* Smaller Like Button for Mobile */}
      <button 
        onClick={() => toggleLike(num)}
        className={`absolute top-3 right-3 md:top-5 md:right-5 z-30 p-2 md:p-4 rounded-full backdrop-blur-xl transition-all 
          ${likedImages.includes(num) ? 'bg-orange-500 text-white' : 'bg-white/20 text-white/40 opacity-100 md:opacity-0 group-hover:opacity-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={likedImages.includes(num) ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3 md:w-3 md:min-h-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <img 
        src={`/lookbook/LB (${num}).jpg`} 
        className={`w-full h-auto object-cover transition-all duration-1000 ${likedImages.includes(num) ? 'grayscale-0' : 'grayscale-0 md:grayscale group-hover:grayscale-0'}`} 
        alt="Archive" 
      />
    </div>
  ))}
</motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed bottom-20 -left-20 w-[120%] rotate-[-4deg] z-0 pointer-events-none opacity-20">
        <CurvedLoop marqueeText="✦ RAW CULTURE ✦ LOOKBOOK 2026 ✦ RAW CULTURE ✦ LOOKBOOK 2026 ✦ " speed={0.5} className="text-white font-black italic uppercase tracking-[0.5em] text-6xl whitespace-nowrap" />
      </div>

      <Footer />
    </div>
  );
};

export default Lookbook;