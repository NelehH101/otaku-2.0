import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import Lookbook from "./Pages/Lookbook";
import About from "./Pages/About";
import { AudioProvider } from "./context/AudioContext";
import GlobalPlayer from "./components/GlobalPlayer";
import CustomCursor from "./components/CustomCursor"; // 1. Import the cursor
import TrackOrders from "./Pages/TrackOrders";

function App() {
  return (
    <AudioProvider>
      {/* 2. Place the cursor here to stay on top of all pages */}
      <CustomCursor /> 
      
      <BrowserRouter>
        <GlobalPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/trackorders" element={<TrackOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;