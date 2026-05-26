import { useEffect, useState } from "react";
import { getRandomCocktail, searchCocktails } from "../cocktailService.js";

const DrinkCard = ({ drink }) => {
  if (!drink) return null;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={drink.thumbnail}
          alt={drink.name}
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-slate-900">{drink.name}</h3>
        <p className="text-sm text-slate-500">
          {drink.category} · {drink.alcoholic}
        </p>
        <p className="mt-3 max-h-16 overflow-hidden text-sm text-slate-600">
          {drink.instructions}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            {drink.glass}
          </span>
          {drink.tag?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-100 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const Home = () => {
  const [bannerDrink, setBannerDrink] = useState(null);
  const [showcaseDrinks, setShowcaseDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Type a cocktail name and press search.",
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      setLoading(true);
      const [randomBanner, featuredList] = await Promise.all([
        getRandomCocktail(),
        searchCocktails("a"),
      ]);

      setBannerDrink(randomBanner);
      setShowcaseDrinks(featuredList.slice(0, 3));
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

  return (
    <div className="space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-4xl bg-slate-900 text-white shadow-xl shadow-slate-900/20">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10">
            <span className="inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Featured Cocktail
            </span>
            <div>
              <h1 className="text-4xl font-semibold sm:text-5xl">
                SipWise picks a fresh drink for you.
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Discover a random cocktail every time, browse our curated
                showcase, or search for your next favorite drink.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                onClick={refreshBanner}
              >
                New random drink
              </button>
              <button
                className="rounded-full border border-slate-200/30 bg-slate-800 px-6 py-3 text-sm text-white transition hover:border-slate-100"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                View showcase
              </button>
            </div>
            {bannerDrink && (
              <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5 text-slate-200">
                <p className="text-sm uppercase tracking-[0.24em] text-amber-300">
                  {bannerDrink.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {bannerDrink.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {bannerDrink.instructions}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                    {bannerDrink.alcoholic}
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                    {bannerDrink.glass}
                  </span>
                </div>
              </div>
            )}
          </div>

          {bannerDrink && (
            <div className="relative overflow-hidden rounded-4xl">
              <img
                src={bannerDrink.thumbnail}
                alt={bannerDrink.name}
                className="h-full w-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-amber-500">
              Explore
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Featured Drinks
            </h2>
          </div>
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label
              htmlFor="cocktail-search"
              className="sr-only"
            >
              Search cocktails
            </label>
            <input
              id="cocktail-search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search cocktails by name"
              className="min-w-60 rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-200"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm shadow-slate-200/60">
            Loading drinks…
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {showcaseDrinks.map((drink) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                />
              ))}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/60">
              <h3 className="text-xl font-semibold text-slate-900">
                {statusMessage}
              </h3>
              {searchResults.length > 0 ? (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {searchResults.map((drink) => (
                    <DrinkCard
                      key={drink.id}
                      drink={drink}
                    />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-slate-600">
                  {searchQuery.trim()
                    ? "Try another name or check your spelling."
                    : "Search for a cocktail above to see matching results."}
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
