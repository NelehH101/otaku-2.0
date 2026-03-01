import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';
import FooterSlider from '../components/FooterSlider';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    /* FIXED: Added overflow-x-hidden to prevent the 'right-side sticking' caused by motion animations */
    <div className="bg-black min-h-screen text-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <NavBar />
      
      {/* 1. HERO SECTION: Massive Typography */}
      <header className="pt-40 pb-24 px-6 md:px-20 max-w-[1800px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-[12rem] font-black italic uppercase tracking-tighter leading-[0.85] mb-16"
        >
          Raw <br/> <span className="text-orange-500">Culture.</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div /> {/* Empty spacer for asymmetrical look */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed italic"
          >
            "We didn't start a brand to follow trends. We started it because the current ones were boring."
          </motion.p>
        </div>
      </header>

      {/* 2. THE STORY: Image and Text Splits */}
      <main className="max-w-[1800px] mx-auto px-6 md:px-20 py-32 space-y-60">
        
        {/* BLOCK 1: THE ORIGIN (Image Left, Text Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[40px] overflow-hidden aspect-video bg-zinc-900 border border-white/5 group shadow-2xl shadow-orange-500/5"
            >
              {/* Using your uploaded graffiti image */}
              <img 
                src="/graffiti-2.jpg" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                alt="Graffiti roots"
              />
            </motion.div>
          </div>
          <div className="md:col-span-5 md:pt-12 space-y-6">
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm">Est. 2026</span>
            <h2 className="text-5xl font-black italic uppercase leading-none">The Origin</h2>
            <p className="text-zinc-500 text-lg leading-loose max-w-md">
              RAW was born in the streets of Cape Town. It started with 100 pieces of custom grip tape and a refusal to play by the rules of traditional skate aesthetics. 
            </p>
          </div>
        </section>

        {/* BLOCK 2: THE VISION (Text Left, Video Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1 space-y-6 md:text-right flex flex-col md:items-end">
            <h2 className="text-5xl font-black italic uppercase leading-none">
              Authentic <span className="text-orange-500">Noise</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-loose max-w-md">
              Rebellion isn't just a look; it's a standard. We blend industrial grit with street-ready durability. If it isn't authentic, it isn't RAW.
            </p>
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-[40px] overflow-hidden aspect-square md:aspect-video bg-zinc-900 border border-white/5"
            >
              {/* Using your uploaded anti-piracy video */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              >
                <source src="/anti-piracy.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </section>

        {/* BLOCK 3: FULL WIDTH STATEMENT */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="py-20 border-t border-white/5 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-12">
            Quality & <span className="text-orange-500">Authenticity</span> above everything.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-zinc-600">
            <span>Hand Crafted</span>
            <span className="text-orange-500">✦</span>
            <span>Limited Run</span>
            <span className="text-orange-500">✦</span>
            <span>Cape Town Rooted</span>
          </div>
        </motion.section>
      </main>

      {/* 3. FINAL CALL TO ACTION */}
      <footer className="px-6 pb-40 text-center">
        <div className="max-w-4xl mx-auto bg-zinc-900/50 border border-white/5 p-12 md:p-20 rounded-[40px] md:rounded-[60px] hover:border-orange-500/30 transition-colors group">
          <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-10 group-hover:scale-105 transition-transform duration-500">
            Be part of the noise.
          </h3>
          <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-black uppercase italic tracking-widest rounded-full hover:bg-orange-500 hover:text-white transition-all active:scale-95">
            Join the Discord
          </button>
        </div>
      </footer>

      <FooterSlider />
      <Footer />
    </div>
  );
};

export default AboutPage;