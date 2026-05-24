import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>SipWise</h1>
      <Outlet />
      <footer>
        <p>&copy; 2026 SipWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Main;
