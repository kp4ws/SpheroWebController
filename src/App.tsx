import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
