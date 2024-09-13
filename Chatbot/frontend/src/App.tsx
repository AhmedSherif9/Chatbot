import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthenticatePage from "./pages/AuthenticatePage";

const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-5 flex flex-col gap-y-10">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authenticate/:op" element={<AuthenticatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
