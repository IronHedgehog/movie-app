import { Slider } from "@mui/material";
import { Calendar, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const GENRES = [
  { id: "", name: "Всі" },
  { id: "28", name: "Бойовик" },
  { id: "16", name: "Аніме" },
  { id: "35", name: "Комедія" },
  { id: "18", name: "Драма" },
  { id: "14", name: "Фентезі" },
  { id: "27", name: "Жахи" },
  { id: "10749", name: "Мелодрама" },
  { id: "878", name: "Фантастика" },
  { id: "53", name: "Трилер" },
];

const FilterSidebar = ({ isOpen, onClose, activeFilters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const debouncedOnChange = useDebouncedCallback((filtersToApply) => {
    let finalFilters = { ...filtersToApply };
    const from = parseInt(finalFilters.yearFrom);
    const to = parseInt(finalFilters.yearTo);

    if (from && to && from > to) {
      finalFilters.yearFrom = to.toString();
      finalFilters.yearTo = from.toString();
      setLocalFilters(finalFilters);
    }

    if (JSON.stringify(finalFilters) !== JSON.stringify(activeFilters)) {
      onFilterChange(finalFilters);
    }
  }, 600);

  const updateFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    debouncedOnChange(newFilters);
  };

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  return (
    <>
      {/* Темний оверлей для мобілки */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`
    fixed lg:static inset-y-0 left-0 z-50
    w-72 
    bg-zinc-950/80 lg:bg-zinc-900/40 backdrop-blur-xl 
    border border-zinc-800/50 lg:rounded-2xl
    p-6 
    transform transition-all duration-500 ease-in-out 
    
   
    hover:border-red-500/30 
    hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)]
    
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0
    max-h-[85vh] overflow-y-auto no-scrollbar flex flex-col
  `}
      >
        <div className="flex justify-between items-center lg:hidden mb-8">
          <h2 className="text-2xl font-black text-white">Фільтри</h2>
          <button
            onClick={onClose}
            className="p-2 bg-zinc-800/80 rounded-full text-white backdrop-blur-md"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-8">
          {/* Жанри */}
          <div>
            <h3 className="text-zinc-500 uppercase text-[10px] font-black tracking-widest mb-4">
              Жанри
            </h3>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => updateFilter("genre", g.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    localFilters.genre === g.id
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                      : "border-zinc-700/50 text-zinc-400 hover:border-zinc-500 hover:text-white bg-zinc-800/30"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Період (Два інпути) */}
          <div>
            <h3 className="text-zinc-500 uppercase text-[10px] font-black tracking-widest mb-4 flex items-center gap-2">
              <Calendar size={14} /> Роки виходу
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Від"
                value={localFilters.yearFrom}
                onChange={(e) => updateFilter("yearFrom", e.target.value)}
                /* ✨ ВБИВАЄМО СТРІЛОЧКИ ТУТ */
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-zinc-600 font-medium">—</span>
              <input
                type="number"
                placeholder="До"
                value={localFilters.yearTo}
                onChange={(e) => updateFilter("yearTo", e.target.value)}
                /* ✨ ВБИВАЄМО СТРІЛОЧКИ ТУТ */
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-red-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Рейтинг (MUI Slider) */}
          <div>
            <h3 className="text-zinc-500 uppercase text-[10px] font-black tracking-widest mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star size={14} /> Мін. рейтинг
              </span>
              <span className="text-white bg-zinc-800/80 px-2 py-0.5 rounded-md font-bold text-xs">
                {localFilters.rating}+
              </span>
            </h3>
            {/* ✨ ДАЄМО ПОВЗУНКУ КИСЕНЬ, щоб не жувало */}
            <div className="px-2 mx-1 mt-2">
              <Slider
                value={localFilters.rating}
                onChange={(_, newValue) => updateFilter("rating", newValue)}
                min={0}
                max={10}
                step={0.5}
                sx={{
                  color: "#ef4444",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#fff",
                    boxShadow: "0 0 10px rgba(239, 68, 68, 0.4)",
                  },
                  "& .MuiSlider-rail": { backgroundColor: "#3f3f46" }, // zinc-700
                }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
