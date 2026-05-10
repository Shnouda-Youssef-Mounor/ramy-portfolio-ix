import { Routes, Route, HashRouter } from "react-router-dom";
import ProjectDetails from "./screens/ProjectDetails";
import HomeScreen from "./screens/home";
import "./styles/main.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeScreen />} />

        {/* Details */}
        <Route path="/project/:slug" element={<ProjectDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
