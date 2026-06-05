import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Loader, Dices, ArrowRight } from "lucide-react";
import {
  filterCocktailsByIngredient,
  getCocktailById,
  getIngredientList,
  getRandomCocktail,
  searchCocktails,
} from "../cocktailService.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const DrinkCard = ({ drink }) => {
  if (!drink) return null;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur-md transition-all hover:shadow-rose-500/20 hover:border-white/20"
    >
      <div className="overflow-hidden rounded-2xl aspect-4/3 bg-slate-800">
        <Link to={`/drink/${drink.id}`}>
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={drink.thumbnail}
            alt={drink.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="mt-5 flex flex-col grow">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
          <Link to={`/drink/${drink.id}`}>{drink.name}</Link>
        </h3>
        <p className="text-sm font-medium text-slate-400 mt-1">
          {drink.category} <span className="text-slate-600">•</span>{" "}
          {drink.alcoholic}
        </p>
        <p className="mt-3 text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {drink.ingredients.map((ing) => ing.name).join(", ")}
        </p>
        <div className="mt-auto pt-5 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-slate-300">
            {drink.glass}
          </span>
          {drink.tag?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-rose-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const SimpleDrinkCard = ({ drink }) => {
  const [full, setFull] = useState(null);
  const [loadingFull, setLoadingFull] = useState(false);

  const loadFull = async () => {
    if (full) return;
    setLoadingFull(true);
    const data = await getCocktailById(drink.id);
    setFull(data);
    setLoadingFull(false);
  };

  if (full) return <DrinkCard drink={full} />;

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md text-center hover:border-white/20 transition-all"
    >
      <Link to={`/drink/${drink.id}`}>
        <motion.img
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ duration: 0.4 }}
          src={drink.thumbnail}
          alt={drink.name}
          className="mb-4 h-40 w-40 object-cover rounded-full border-4 border-slate-800 shadow-lg shadow-black/40"
          loading="lazy"
        />
      </Link>
      <h3 className="text-lg font-bold text-slate-100">{drink.name}</h3>
      <div className="mt-5 w-full">
        <button
          onClick={loadFull}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-amber-500 to-rose-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-transform hover:scale-105 active:scale-95"
        >
          {loadingFull ? (
            <Loader
              className="animate-spin"
              size={18}
            />
          ) : (
            <>
              View details <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
};

const Home = () => {
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [bannerDrink, setBannerDrink] = useState(null);
  const [showcaseDrinks, setShowcaseDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Search by name or ingredient to explore cocktails.",
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      setLoading(true);
      const [randomBanner, featuredList, ingredientsList] = await Promise.all([
        getRandomCocktail(),
        searchCocktails("d"),
        getIngredientList(),
      ]);

      setBannerDrink(randomBanner);
      setShowcaseDrinks(featuredList.slice(0, 3));
      setIngredientOptions(
        ingredientsList.map((ing) => ({ label: ing, value: ing })),
      );
      setLoading(false);
    }

    loadHome();
  }, []);

  const refreshBanner = async () => {
    setLoading(true);
    const randomDrink = await getRandomCocktail();
    setBannerDrink(randomDrink);
    setLoading(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setStatusMessage("Please enter a cocktail name to search.");
      return;
    }

    setLoading(true);
    const results = await searchCocktails(searchQuery.trim());
    setSearchResults(results);
    setStatusMessage(results.length ? "Search results" : "No cocktails found.");
    setLoading(false);
  };

  const handleIngredientSearch = async (event) => {
    event.preventDefault();

    if (!ingredientQuery.trim()) {
      setSearchResults([]);
      setStatusMessage("Please select an ingredient to filter by.");
      return;
    }

    setLoading(true);
    const results = await filterCocktailsByIngredient(ingredientQuery.trim());
    setSearchResults(results);
    setStatusMessage(
      results.length
        ? `Drinks with ${ingredientQuery.trim()}`
        : `No cocktails found with ${ingredientQuery.trim()}`,
    );
    setLoading(false);
  };

  const handleIngredientChange = async (event) => {
    const selectedIngredient = event.target.value;
    setIngredientQuery(selectedIngredient);

    if (!selectedIngredient) {
      setSearchResults([]);
      setStatusMessage("Select an ingredient to filter cocktails.");
      return;
    }

    const option = ingredientOptions.find(
      (o) => o.value === selectedIngredient,
    );
    const label = option ? option.label : selectedIngredient;

    setLoading(true);
    const results = await filterCocktailsByIngredient(selectedIngredient);
    setSearchResults(results);
    setStatusMessage(
      results.length
        ? `Drinks with ${label}`
        : `No cocktails found with ${label}`,
    );
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 shadow-2xl shadow-rose-900/20">
        <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-rose-500/10 to-fuchsia-500/10" />

        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
          <div className="flex flex-col justify-center gap-8 p-8 sm:p-14 z-10">
            <div>
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex rounded-full bg-linear-to-r from-amber-400 to-amber-500 px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-lg shadow-amber-500/30"
              >
                Featured Cocktail
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-4xl font-extrabold sm:text-6xl text-white leading-tight"
              >
                SipWise picks a <br />
                <span className="bg-linear-to-r from-amber-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent">
                  fresh drink
                </span>{" "}
                for you.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 max-w-xl text-lg text-slate-300 leading-relaxed"
              >
                Discover a random cocktail every time, browse our curated
                showcase, or search for your next favorite drink.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-amber-500 to-rose-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-rose-500/30 transition-transform hover:scale-105 active:scale-95"
                onClick={refreshBanner}
              >
                <Dices size={20} />
                New random drink
              </button>
              <button
                className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/30"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                View showcase
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {bannerDrink && (
                <motion.div
                  key={bannerDrink.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 text-slate-200 mt-2 shadow-2xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                    {bannerDrink.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {bannerDrink.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {bannerDrink.ingredients.map((ing) => ing.name).join(", ")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium border border-white/5">
                      {bannerDrink.alcoholic}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium border border-white/5">
                      {bannerDrink.glass}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {bannerDrink && (
            <motion.div
              key={`img-${bannerDrink.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-full min-h-100 lg:min-h-full rounded-[2.5rem] overflow-hidden lg:rounded-l-none"
            >
              <img
                src={bannerDrink.thumbnail}
                alt={bannerDrink.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/40 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent lg:hidden block" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Search & Explore Section */}
      <section className="grid gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">
              Explore
            </p>
            <h2 className="text-4xl font-extrabold text-white mt-2">
              Find your mix.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-150">
            <form
              onSubmit={handleSearch}
              className="relative group"
            >
              <label
                htmlFor="cocktail-search"
                className="sr-only"
              >
                Search cocktails by name
              </label>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-400 transition-colors">
                <Search size={18} />
              </div>
              <input
                id="cocktail-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name..."
                className="w-full rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm py-4 pl-12 pr-24 text-slate-100 outline-none transition-all focus:border-rose-500/50 focus:bg-slate-900 focus:ring-4 focus:ring-rose-500/10 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 rounded-xl bg-rose-500 px-4 text-sm font-bold text-white transition-colors hover:bg-rose-400"
              >
                Search
              </button>
            </form>

            <form
              onSubmit={handleIngredientSearch}
              className="relative group"
            >
              <label
                htmlFor="ingredient-search"
                className="sr-only"
              >
                Filter cocktails by ingredient
              </label>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-400 transition-colors">
                <Filter size={18} />
              </div>
              <select
                id="ingredient-search"
                value={ingredientQuery}
                onChange={handleIngredientChange}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm py-4 pl-12 pr-24 text-slate-100 outline-none transition-all focus:border-amber-500/50 focus:bg-slate-900 focus:ring-4 focus:ring-amber-500/10 [&>option]:bg-slate-900"
              >
                <option value="">Select ingredient</option>
                {ingredientOptions.map((it) => (
                  <option
                    key={it.value}
                    value={it.value}
                  >
                    {it.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 rounded-xl bg-amber-500 px-4 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-400"
              >
                Filter
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-4xl border border-white/5 bg-slate-900/30 p-20 backdrop-blur-sm">
            <Loader
              className="animate-spin text-rose-500 mb-4"
              size={40}
            />
            <p className="text-slate-400 font-medium">Mixing drinks...</p>
          </div>
        ) : (
          <>
            {!searchQuery && !ingredientQuery && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {showcaseDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                  />
                ))}
              </motion.div>
            )}

            {(searchQuery || ingredientQuery || searchResults.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-4xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-md shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                  <div className="h-8 w-2 rounded-full bg-linear-to-b from-amber-400 to-rose-500" />
                  <h3 className="text-2xl font-bold text-white">
                    {statusMessage}
                  </h3>
                </div>

                {searchResults.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {searchResults.map((drink) =>
                      drink.instructions ? (
                        <DrinkCard
                          key={drink.id}
                          drink={drink}
                        />
                      ) : (
                        <SimpleDrinkCard
                          key={drink.id}
                          drink={drink}
                        />
                      ),
                    )}
                  </motion.div>
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <Dices
                      className="mx-auto mb-4 opacity-50"
                      size={48}
                    />
                    <p className="text-lg">
                      {searchQuery.trim()
                        ? "We couldn't find any drinks matching that name."
                        : "Search for a cocktail above to see matching results."}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </section>
    </motion.div>
  );
};

export default Home;
