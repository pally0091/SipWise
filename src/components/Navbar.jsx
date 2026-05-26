import { motion } from "framer-motion";
import { Martini } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-md py-4 shadow-lg shadow-black/20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-rose-500 text-white shadow-md shadow-rose-500/20"
          >
            <Martini size={28} />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-amber-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent">
              SipWise
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Discover cocktails with style.
            </p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
