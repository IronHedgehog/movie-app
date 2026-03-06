import { useEffect, useState } from "react";

export const useFilterSidebar = (activeFilters, onFilterChange) => {
  const [localFilters, setLocalFilters] = useState(activeFilters);

  // Синхронізуємо локальний стейт, якщо фільтри скинулися ззовні (наприклад, при пошуку)
  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  // ✨ МАГІЯ DEBOUNCE: Спрацьовує автоматично при будь-якій зміні
  useEffect(() => {
    const handler = setTimeout(() => {
      // Перевірка: чи дійсно щось змінилось, і чи 'Від' не більше 'До'
      let finalFilters = { ...localFilters };
      const from = parseInt(finalFilters.yearFrom);
      const to = parseInt(finalFilters.yearTo);

      if (from && to && from > to) {
        finalFilters.yearFrom = to.toString();
        finalFilters.yearTo = from.toString();
        setLocalFilters(finalFilters); // Автоматично міняємо їх місцями в UI
      }

      if (JSON.stringify(finalFilters) !== JSON.stringify(activeFilters)) {
        onFilterChange(finalFilters);
      }
    }, 600); // Затримка 600 мілісекунд

    return () => clearTimeout(handler);
  }, [localFilters, activeFilters, onFilterChange]);

  const updateFilter = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { localFilters, updateFilter };
};
