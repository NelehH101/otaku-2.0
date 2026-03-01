import { useState, useEffect } from 'react';
import { X } from 'lucide-react'; 

interface ProductProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isZoomed) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isZoomed]);

  return (
    <>
      <div 
        className="group relative h-full w-full bg-white/50 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700"
        onClick={() => setIsZoomed(true)}
      >
        {/* Product Image */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
        />

        {/* Centralized Text Overlay (Matching the Reference Image) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500 p-6 text-center">
          
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
            Latest
          </span>
          
          <h3 className="text-white text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight mb-4 transform transition-transform duration-700 group-hover:scale-105">
            {name}
          </h3>
          
          <div className="flex flex-col items-center gap-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
             <span className="text-white text-sm font-bold border-b border-white/60 pb-1 mb-2">
               Shop Now
             </span>
             <span className="text-orange-500 text-xs font-black tracking-widest uppercase">
               {price}
             </span>
          </div>
        </div>

        {/* Minimalist Badge */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          New
        </div>
      </div>

      {/* Lightbox */}
      {isZoomed && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsZoomed(false)} />
          <button className="absolute top-10 right-10 text-white z-[210] hover:text-orange-500 transition-colors" onClick={() => setIsZoomed(false)}>
            <X size={40} strokeWidth={1} />
          </button>
          <img src={image} alt={name} className="relative z-[205] max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" />
        </div>
      )}
    </>
  );
};

export default ProductCard;