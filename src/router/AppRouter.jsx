import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movies/:id" element={<MovieDetails />} />
  </Routes>
);

export default AppRouter;
