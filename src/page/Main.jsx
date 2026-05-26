import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-slate-950/30 backdrop-blur-md py-6 text-center text-sm text-slate-400 mt-auto">
        <p>&copy; 2026 SipWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
