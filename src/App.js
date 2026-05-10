import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./screens/ProjectDetails";
import HomeScreen from "./screens/home";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
