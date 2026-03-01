import { motion } from 'framer-motion';

const FooterSlider = () => {
  // Array of your uploaded images
  const images = [
    '/carasoule.jpg',
    '/carasoule (2).jpg',
    '/carasoule (3).jpg',
    '/carasoule (4).jpg',
    '/carasoule (5).jpg',
    '/carasoule (6).jpg',
  ];

  // We double the array to ensure a seamless infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden bg-black py-10">
      <motion.div
        className="flex gap-4 px-4"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 25, // Adjust speed here
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div 
            key={index} 
            className="relative flex-shrink-0 w-[300px] h-[400px] md:w-[450px] md:h-[300px] rounded-[30px] overflow-hidden border border-white/10 group"
          >
            <img
              src={src}
              alt={`Gallery ${index}`}
              /* MOBILE: grayscale-0 (Full Color). 
                 DESKTOP: md:grayscale, group-hover:grayscale-0. 
              */
              className="w-full h-full object-cover transition-all duration-700 grayscale-0 md:grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
            />
            
            {/* STREET OVERLAYS: Hidden on mobile, shown on desktop hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent hidden md:block md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </motion.div>
      
      {/* Visual Noise/Grain Overlay for branding */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default FooterSlider;