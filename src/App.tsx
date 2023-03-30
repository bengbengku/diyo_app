import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
