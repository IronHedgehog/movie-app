import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
];

export default function HeaderNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors
             ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
