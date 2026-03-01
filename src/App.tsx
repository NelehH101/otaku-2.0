import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import { AudioProvider } from "./context/AudioContext";
import GlobalPlayer from "./components/GlobalPlayer";

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
      <GlobalPlayer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  );
}

export default App;