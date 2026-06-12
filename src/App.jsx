import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

function App() {
  const [score, setScore] = useState(0);

  const addScore = (pts) => {
    setScore((s) => s + pts);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Navbar score={score} addScore={addScore} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery addScore={addScore} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
