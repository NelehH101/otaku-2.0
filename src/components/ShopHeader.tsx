const ShopHeader = () => {
  return (
    <header className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/graffiti-4.jpg')" }}
      />
      
      {/* Dark Overlay to make text pop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white drop-shadow-2xl">
          The Shop
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mt-4 rounded-full" />
      </div>
    </header>
  );
};

export default ShopHeader;