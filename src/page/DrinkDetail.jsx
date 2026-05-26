import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  if (loading) return <div className="p-8">Loading drink details…</div>;
  if (!drink) return <div className="p-8">Drink not found.</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-600"
      >
        ← Back
      </button>

      <div className="grid gap-6 md:grid-cols-2">
        <img
          src={drink.thumbnail}
          alt={drink.name}
          className="rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-semibold">{drink.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {drink.category} · {drink.alcoholic}
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-700">Glass</h3>
            <p className="text-sm text-slate-600">{drink.glass}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-700">Tags</h3>
            <p className="text-sm text-slate-600">
              {(drink.tag || []).join(", ") || "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <ul className="mt-3 space-y-2">
          {drink.ingredients.map((ing, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-700"
            >
              {ing.name} — <span className="text-slate-500">{ing.measure}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Instructions</h3>
        <p className="mt-3 text-sm text-slate-700">{drink.instructions}</p>
      </div>
    </div>
  );
};

export default DrinkDetail;
