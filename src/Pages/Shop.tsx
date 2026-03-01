import NavBar from '../components/NavBar';
import ShopHeader from '../components/ShopHeader';
import ProductCard from '../components/ProductCard';
import CurvedLoop from '../components/Loop';
import { products } from '../data/products';
import FooterSlider from '../components/FooterSlider';
import Footer from '../components/Footer';

const ShopPage = () => {
  return (
    <div className="bg-black min-h-screen no-scrollbar overflow-x-hidden">
      <NavBar />
      <ShopHeader />

      <div className="relative z-10 bg-black py-6">
        <CurvedLoop 
          marqueeText="✦ FIND THE ✦ COLLECTION ✦ GET IT RAW ✦ "
          speed={1.5}
          curveAmount={0} 
          className="italic font-black text-orange-500 uppercase tracking-[0.3em]"
        />
      </div>

      <main className="max-w-[1800px] mx-auto px-6 md:px-20 py-24">
        {/* CHANGED: Changed items-end to items-baseline for better alignment with text */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-20 gap-4">
          <h2 className="text-white text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.9]">
            New <br/> Arrivals
          </h2>
          {/* CHANGED: Added md:pb-2 to give the count some breathing room from the baseline */}
          <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] md:pb-2">
            {products.length} Items Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 auto-rows-[500px]">
          
          {/* FEATURED VIDEO CARD */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 group">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
            >
              <source src="/2.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
            
            <div className="absolute bottom-12 left-3">
              <h3 className="text-white text-6xl font-black italic uppercase tracking-tight leading-[0.85]">
                The <br/> <span className="text-orange-500">Raw</span> <br/> Collection
              </h3>
            </div>
          </div>

          {/* PRODUCT CARDS LOOP */}
          {products.map((item: any, index: number) => (
            <div key={index} className="md:col-span-1 md:row-span-1">
              <ProductCard name={item.name} price={item.price} image={item.image} />
            </div>
          ))}
        </div>
      </main>
      <FooterSlider />
      <Footer />
    </div>
  );
};

export default ShopPage;