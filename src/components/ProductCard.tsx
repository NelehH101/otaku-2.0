import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface ProductProps {
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    // Add your logic to update a global cart state here
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      {/* Product Card Trigger */}
      <div
        className="group relative h-full w-full bg-white/5 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700"
        onClick={() => setIsOpen(true)}
      >
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500 p-6 text-center">
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">Latest</span>
          <h3 className="text-white text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight mb-4">{name}</h3>
          <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-orange-500 text-xs font-black tracking-widest uppercase">{price}</span>
          </div>
        </div>
      </div>

      {/* Modern Side-Info Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
          {/* Backdrop - Deeper blur for focus */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-700" onClick={() => setIsOpen(false)} />

          {/* Container: Increased max-width to allow the image to grow bigger */}
          <div className="relative z-[205] w-full max-w-[1600px] h-full flex flex-col md:flex-row items-center justify-between p-6 md:px-12 lg:px-20">

            {/* Close Button */}
            <button className="absolute top-10 right-10 text-white/30 hover:text-orange-500 transition-colors z-[210] p-2" onClick={() => setIsOpen(false)}>
              <X size={32} strokeWidth={1} />
            </button>

            {/* LEFT: Product Image - Increased height to 90vh */}
            <div className="flex-[1.5] flex items-center justify-center h-full pointer-events-none p-4">
              <img
                src={image}
                alt={name}
                className="w-full h-full max-h-[75vh] object-contain drop-shadow-[0_0_120px_rgba(255,255,255,0.08)] animate-in zoom-in-95 duration-1000 ease-out"
              />
            </div>

            {/* RIGHT: Floating Side Panel - Compact width keeps it clean */}
            <div className="w-full md:w-[340px] bg-[#0a0a0a]/90 backdrop-blur-md p-10 rounded-[40px] border border-white/5 text-white animate-in slide-in-from-right-12 duration-700 md:ml-6 lg:ml-10">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                  <span className="text-orange-500 text-[9px] font-black uppercase tracking-[0.4em]">In Stock</span>
                </div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none mb-2">{name}</h2>
                <p className="text-xl italic font-bold text-orange-500">{price}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 px-5 rounded-full border text-[10px] font-black transition-all duration-500 ${selectedSize === size
                          ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
                          : 'border-white/10 hover:border-white/40'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Stack */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-black/60 rounded-2xl p-1 border border-white/5">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 hover:text-orange-500 transition-colors"><Minus size={14} /></button>
                  <span className="font-bold text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="p-4 hover:text-orange-500 transition-colors"><Plus size={14} /></button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full font-black uppercase py-5 rounded-2xl text-xs tracking-[0.2em] transition-all duration-500 active:scale-95 shadow-2xl ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-orange-500 hover:text-white'
                    }`}
                >
                  {isAdded ? 'Item Added' : 'Add To Cart'}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-[8px] text-white/20 leading-relaxed uppercase tracking-[0.2em]">
                  Part of the RAW 2026 Collection. <br />
                  Locally sourced materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;