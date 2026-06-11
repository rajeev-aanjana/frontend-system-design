import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
          React Projects
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-white font-medium">
          <Link
            to="/"
            className="hover:text-yellow-200 transition duration-200"
          >
            Projects
          </Link>
          <Link
            to="/"
            className="hover:text-yellow-200 transition duration-200"
          >
            Rajeev Anjana
          </Link>

        </nav>
      </div>
    </header>
  );
};

export default Header;