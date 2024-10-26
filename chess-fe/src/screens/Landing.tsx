import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import Header from "../components/Header";
import 'animate.css'; 

export const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col w-full">
            <div className="w-full">
                <Header />
            </div>
            <div className="flex-grow bg-cyan-500 flex flex-col items-center justify-center w-full">
                <div className="pt-8 max-w-screen-md w-full">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex justify-center animate__animated animate__fadeInLeft">
                            <img 
                                src="chessboard.jpeg" 
                                alt="Chess Icon" 
                                className="w-32 h-32 md:w-80 md:h-80 animate__animated animate__zoomIn"
                            />
                        </div>
                        <div className="pt-16 animate__animated animate__fadeInRight">
                            <div className="flex justify-center">
                                <h1 className="text-5xl font-bold text-white text-center animate__animated animate__lightSpeedInLeft">Play Chess Online with Friends</h1>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <Button 
                                    onClick={() => navigate("/game")}
                                    className="bg-yellow-500 text-black hover:bg-yellow-400 transition duration-300 ease-in-out px-6 py-3 rounded-lg shadow-lg animate__animated animate__bounce"
                                >
                                    Play Game
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}