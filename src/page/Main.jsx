import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grow">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-slate-950/30 backdrop-blur-md py-6 text-center text-sm text-slate-400 mt-auto flex flex-col md:flex-row md:justify-between items-center px-0 md:px-4">
        <p>&copy; 2026 SipWise. All rights reserved.</p>
        <p>
          Made by{" "}
          <a
            href="https://github.com/pally0091"
            className="text-blue-400 hover:text-blue-300"
          >
            F R Esa
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Main;
