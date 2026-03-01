import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const TrackOrders = () => {
  // Mock data - in a real app, this comes from your backend/database
  const orderDetails = {
    id: "RC-99201-B",
    date: "MARCH 02, 2026",
    status: "IN TRANSIT",
    progress: 65, // percentage
    items: [
      { id: 1, name: "RAW ARCHIVE HOODIE", size: "XL", price: "$85.00", img: "/lookbook/LB (1).jpg" },
      { id: 2, name: "VOL. 01 PRINT LOG", size: "OS", price: "$45.00", img: "/lookbook/LB (12).jpg" },
    ]
  };

  return (
    <div className="bg-black min-h-screen text-white no-scrollbar">
      <NavBar />
      
      <main className="pt-32 pb-24 px-6 md:px-20 max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-12">
          <div>
            <h1 className="text-[12vw] md:text-[8rem] font-black italic uppercase leading-[0.8] tracking-tighter">
              YOUR <br/> <span className="text-orange-500">ORDER</span>
            </h1>
            <p className="mt-8 font-mono text-zinc-500 text-xs tracking-widest uppercase">
              Tracking ID: {orderDetails.id} — {orderDetails.date}
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 px-6 py-2 border border-orange-500 text-orange-500 font-black italic text-[10px] uppercase tracking-widest">
            {orderDetails.status}
          </div>
        </div>

        {/* STATUS BAR  */}
        <div className="mb-24 relative">
          <div className="h-[2px] w-full bg-zinc-900 absolute top-1/2 -translate-y-1/2 z-0" />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${orderDetails.progress}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-[2px] bg-orange-500 absolute top-1/2 -translate-y-1/2 z-10"
          />
          
          <div className="relative z-20 flex justify-between">
            {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mb-4 ${i <= 2 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-zinc-800'}`} />
                <span className={`text-[8px] font-black uppercase tracking-widest ${i <= 2 ? 'text-white' : 'text-zinc-700'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* ITEM LIST */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-8">Shipment Contents</h3>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex gap-8 items-center border-b border-white/5 pb-8 group">
                <div className="w-24 h-32 bg-zinc-900 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-black italic uppercase tracking-tighter">{item.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">Size: {item.size}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY BOX */}
          <div className="bg-zinc-900/30 p-10 rounded-[2.5rem] border border-white/5 h-fit">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-8">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs uppercase tracking-widest">
                <span className="text-zinc-500">Subtotal</span>
                <span>R130.00</span>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-widest">
                <span className="text-zinc-500">Shipping</span>
                <span>FREE</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-zinc-500 text-[10px] uppercase font-black">Total Amount</span>
                <span className="text-3xl font-black italic text-orange-500">R130.00</span>
              </div>
            </div>
            
            <button className="w-full mt-10 py-4 bg-white text-black font-black uppercase italic tracking-widest text-[10px] hover:bg-orange-500 hover:text-white transition-all">
              Download Invoice
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrders;