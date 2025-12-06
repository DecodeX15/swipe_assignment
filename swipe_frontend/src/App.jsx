import StarField from "./Components/StarField";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Analyse from "./Pages/Analyse";
import './index.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen h-screen bg-white dark:bg-[#0d0d0f] transition-colors duration-300 overflow-x-hidden scrollbar-hide">
          <StarField />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyse" element={<Analyse />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
