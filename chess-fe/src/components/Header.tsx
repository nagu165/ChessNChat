
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-slate-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ChessNChat</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/game" className="hover:text-gray-300">Play</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};