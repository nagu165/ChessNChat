
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-50 mb-4">Play Chess Online with Friends</h1>
              <p className="text-lg text-stone-300 mb-6">Challenge your friends, improve your skills, and have fun with our easy-to-use online chess platform.</p>
              <button 
                onClick={() => navigate('/game')}
                className="bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Start Playing Now
              </button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="/chessboard.jpeg" 
                alt="Chess board" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};