const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-black text-zinc-500 py-12 px-6 md:px-20">
      {/* 1. CHANGED: Removed 'mx-auto' to stop centering.
          2. CHANGED: Added 'md:pl-10' to pull it closer to the left edge than before.
      */}
      <div className="max-w-[1800px] flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-10 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium md:pl-4">

        {/* Links Group */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-zinc-500">
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Terms</a>
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Privacy</a>
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Cookies</a>
        </div>

        {/* Copyright and Button */}
        <div className="flex items-center gap-6">
          <div className="text-zinc-600 font-semibold tracking-normal normal-case whitespace-nowrap">
            © {currentYear} RAW Culture.
          </div>

          <button 
            onClick={scrollToTop}
            className="p-3 border border-white/10 rounded-full text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;