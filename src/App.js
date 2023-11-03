import Home from "./pages/Home";
import Navbar from "./pages/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
