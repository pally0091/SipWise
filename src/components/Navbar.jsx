const Navbar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white py-4 shadow-sm shadow-slate-200/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold bg-linear-to-r from-amber-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
            SipWise
          </h1>
          <p className="text-sm text-slate-500">
            Discover cocktails with style.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
