import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-350 mx-auto bg-amber-100">
        <Outlet />
      </div>
      <footer>
        <p>&copy; 2026 SipWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
