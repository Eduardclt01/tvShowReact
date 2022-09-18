import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleView from "./components/singleView/SingleView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/show" element={<SingleView />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
