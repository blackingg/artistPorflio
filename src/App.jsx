import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";

import { Routes, Route, Navigate } from "react-router-dom";
import Radio from "./pages/Radio";
import Videos from "./pages/Videos";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="max-w-screen h-screen overflow-auto overflow-x-hidden">
      <Navbar />
      <Footer />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/radio"
          element={<Radio />}
        />
        <Route
          path="/videos"
          element={<Videos />}
        />
      </Routes>
    </div>
  );
}

export default App;
