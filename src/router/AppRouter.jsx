import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import MoviePage from "@/pages/MoviePage";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
      </Route>
    </Routes>
  );
}
