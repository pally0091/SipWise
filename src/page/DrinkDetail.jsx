import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader, Tag, Wine, Info, ListChecks } from "lucide-react";
import { getCocktailById } from "../cocktailService.js";

const DrinkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const d = await getCocktailById(id);
      setDrink(d);
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader className="animate-spin text-rose-500 mb-4" size={48} />
        <p className="text-slate-400 font-medium">Pouring details...</p>
      </div>
    );
  }

  if (!drink) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-slate-900 p-6 shadow-xl mb-6 border border-white/10">
          <Wine size={48} className="text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Drink not found</h2>
        <p className="text-slate-400 mb-6">We couldn't locate this cocktail.</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-linear-to-r from-amber-500 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Explorer
      </button>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2.5rem] p-2 border border-white/10 bg-slate-900/30 shadow-2xl"
        >
          <img
            src={drink.thumbnail}
            alt={drink.name}
            className="rounded-[2.25rem] w-full object-cover shadow-inner aspect-4/5 lg:aspect-auto h-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent rounded-[2.5rem]" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl font-extrabold text-white text-shadow-sm">{drink.name}</h1>
            <p className="mt-2 text-lg font-medium text-amber-300 drop-shadow-sm">
              {drink.category} <span className="text-white/50">•</span> {drink.alcoholic}
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4 rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg"
            >
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-500">
                <Wine size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Glass Type</h3>
                <p className="mt-1 font-medium text-slate-200">{drink.glass}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 rounded-3xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg"
            >
              <div className="rounded-2xl bg-rose-500/10 p-3 text-rose-500">
                <Tag size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Tags</h3>
                <p className="mt-1 font-medium text-slate-200">
                  {(drink.tag || []).join(", ") || "No tags"}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-md shadow-lg grow"
          >
            <div className="flex items-center gap-3 mb-6">
              <ListChecks size={24} className="text-amber-500" />
              <h3 className="text-2xl font-bold text-white">Ingredients</h3>
            </div>
            <ul className="space-y-4">
              {drink.ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <span className="font-semibold text-slate-200">{ing.name}</span>
                  <span className="rounded-lg bg-slate-900/50 px-3 py-1 text-sm font-medium text-amber-300">
                    {ing.measure || "To taste"}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-md shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Info size={24} className="text-rose-500" />
              <h3 className="text-2xl font-bold text-white">Instructions</h3>
            </div>
            <p className="text-lg leading-relaxed text-slate-300">
              {drink.instructions}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DrinkDetail;
