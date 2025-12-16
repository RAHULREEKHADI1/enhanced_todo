import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    console.log("topken k kyua hua lad;e");
    
    window.history.replaceState({}, "", "/welcome");
  }
}, []);

    const lines = [
        "TodoList can help you...",
        "Organize the everyday chaos",
        "Focus on the right things",
        "Achieve goals and finish projects",
        "Now it’s your turn!"
    ];

    const child = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const container = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    };
    const [visibleIndex, setVisibleIndex] = useState(0);

    return (
        <div
            className="p-6 sm:p-16 bg-cover bg-center min-h-screen w-full bg-no-repeat bg-fixed flex flex-col"
            style={{ backgroundImage: "url('/bg_image_login_new.png')" }}
        >
            <div className="flex flex-col md:flex md:flex-row sm:gap-8">
                <div className="flex flex-col gap-6 sm:gap-10 w-1/2">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <img
                            src="/my_todo_image.png"
                            alt="todo_icon_image"
                            className="h-12 w-12 lg:h-20 lg:w-20 rounded-full object-contain"
                        />
                        <h2 className="text-xl lg:text-4xl text-[#b1f392] font-semibold">TodoList</h2>
                    </div>
                    <div className="text-white text-2xl sm:text-3xl font-semibold">
                        Welcome To TodoList
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/todo')}
                            className="bg-[#CF3620] block md:hidden  text-xl  py-1 text-white font-medium hover:scale-110 transition-all duration-300 hover:border hover:border-[#b1f392] px-5 cursor-pointer rounded-lg shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
                        >
                            Let's go
                        </button>
                    </div>
                    <div className='text-white text-medium flex flex-col gap-2 border-2 hover:scale-120 transition-all duration-300 border-[#b1f392] py-8 px-4 w-fit rounded-xl bg-cover bg-center '
                    >
                        <div className="space-y-2">
                            {lines.map((line, index) => {
                                const words = line.split(" ");
                                return (
                                    <motion.p
                                        key={index}
                                        className={index === 0 ? 'text-xs sm:text-sm text-[#b1f392] font-semibold' : 'whitespace-nowrap'}
                                        variants={container}
                                        initial="hidden"
                                        animate={visibleIndex >= index ? "visible" : "hidden"}
                                        onAnimationComplete={() => {
                                            if (index < lines.length - 1) setVisibleIndex(prev => prev + 1);
                                        }}
                                    >
                                        {words.map((word, wIndex) => (
                                            <span key={wIndex} className="inline-block mr-2">
                                                {Array.from(word).map((letter, lIndex) => (
                                                    <motion.span
                                                        key={lIndex}
                                                        variants={child}
                                                        style={{ display: "inline-block" }}
                                                    >
                                                        {letter}
                                                    </motion.span>
                                                ))}
                                            </span>
                                        ))}
                                    </motion.p>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center md:w-1/2 gap-4 pt-10 md:pt-25">
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/download_app.png"
                            alt="num_of_downloads"
                            className="max-w-full object-contain hover:scale-110 transition-all duration-300"
                        />
                        <img
                            src="/reviews_image.png"
                            alt="num_of_reviews"
                            className="max-w-full object-contain hover:scale-110 transition-all duration-300"
                        />
                        <img
                            src="/years_buisness.png"
                            alt="buisness_years"
                            className="max-w-full object-contain hover:scale-110 transition-all duration-300"
                        />
                        <img
                            src="/task_completion.png"
                            alt="task_completion"
                            className="max-w-full object-contain hover:scale-110 transition-all duration-300"
                        />
                    </div>
                </div>

            </div>

            <div className="mt-15 flex justify-center lg:justify-start">
                <button
                    onClick={() => navigate('/todo')}
                    className="bg-[#CF3620] md:block hidden text-xl  py-4 text-white font-medium hover:scale-110 transition-all duration-300 hover:border hover:border-[#b1f392] px-12 cursor-pointer rounded-lg shadow-[0_8px_15px_rgba(207,54,32,0.4)]"
                >
                    Let's go
                </button>
            </div>

        </div>
    );
};

export default Welcome;
