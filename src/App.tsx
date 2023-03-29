import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
