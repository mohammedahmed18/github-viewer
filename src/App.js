import { Route, Routes } from "react-router";

import { GithubProvider } from "./contexts/GithubContext";
import { AlertProvider } from "./contexts/AlertContext";

import Navbar from "./components/Navbar";

import NotFound from "./pages/404";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <AlertProvider>
      <GithubProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="flex-1 mt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/:login" element={<UserPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </GithubProvider>
    </AlertProvider>
  );
}

export default App;
