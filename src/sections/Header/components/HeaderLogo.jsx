import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <Link
      to="/"
      className="text-red-600 text-2xl font-extrabold tracking-tight"
      aria-label="Go to homepage"
    >
      MOVIE<span className="text-white">APP</span>
    </Link>
  );
}
